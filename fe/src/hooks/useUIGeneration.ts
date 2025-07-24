'use client';
import { useState, useCallback } from 'react';
import { UIGeneratorAPI } from '@/lib/api';
import { UIGenerationResponse, UIGenerationRequest } from '@/types/api';
import toast from 'react-hot-toast';

export const useUIGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationResult, setGenerationResult] = useState<UIGenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateUI = useCallback(async (request: UIGenerationRequest) => {
    if (!request.prompt && !request.image) {
      toast.error('Please provide either a text prompt or upload an image');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const result = await UIGeneratorAPI.generateUI(request);
      setGenerationResult(result);
      
      // Show quality feedback
      if (result.quality_score && result.quality_score > 0.8) {
        toast.success(`High-quality UI generated! Score: ${(result.quality_score * 100).toFixed(1)}%`);
      } else if (result.quality_score && result.quality_score > 0.6) {
        toast.success(`UI generated with good quality. Score: ${(result.quality_score * 100).toFixed(1)}%`);
      } else {
        toast.success('UI generated. You may want to refine your prompt for better results.');
      }
      
      // Show validation warnings if any
      if (result.validation.issues.length > 0) {
        toast.error(`${result.validation.issues.length} issues detected in generated code`);
      }
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to generate UI';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setGenerationResult(null);
    setError(null);
  }, []);

  return {
    isGenerating,
    generationResult,
    error,
    generateUI,
    clearResult,
  };
};
