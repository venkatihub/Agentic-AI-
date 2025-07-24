'use client';
import { useState, useEffect } from 'react';
import { UIGeneratorAPI } from '@/lib/api';
import { KnowledgeBaseStats, KnowledgeBaseEntry } from '@/types/api';
import toast from 'react-hot-toast';

export const useKnowledgeBase = () => {
  const [stats, setStats] = useState<KnowledgeBaseStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingPattern, setIsAddingPattern] = useState(false);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const data = await UIGeneratorAPI.getKnowledgeBaseStats();
      setStats(data);
    } catch (err) {
      toast.error('Failed to fetch knowledge base stats');
    } finally {
      setIsLoading(false);
    }
  };

  const addPattern = async (entry: KnowledgeBaseEntry) => {
    setIsAddingPattern(true);
    try {
      await UIGeneratorAPI.addUIPattern(entry);
      toast.success('UI pattern added successfully!');
      await fetchStats(); // Refresh stats
    } catch (err) {
      toast.error('Failed to add UI pattern');
    } finally {
      setIsAddingPattern(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    isAddingPattern,
    addPattern,
    refreshStats: fetchStats,
  };
};
