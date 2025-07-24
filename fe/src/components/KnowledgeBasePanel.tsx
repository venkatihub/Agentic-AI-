'use client';
import React, { useState } from 'react';
import { useKnowledgeBase } from '@/hooks/useKnowledgeBase';
import { Plus, Database, Loader, RefreshCw } from 'lucide-react';

export const KnowledgeBasePanel: React.FC = () => {
  const { stats, isLoading, isAddingPattern, addPattern, refreshStats } = useKnowledgeBase();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPattern, setNewPattern] = useState({
    content: '',
    metadata: {
      type: '',
      category: '',
      style: 'modern',
    },
  });

  const handleAddPattern = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPattern.content.trim()) return;

    await addPattern({
      content: newPattern.content,
      metadata: {
        ...newPattern.metadata,
        added_at: new Date().toISOString(),
      },
    });

    setNewPattern({
      content: '',
      metadata: { type: '', category: '', style: 'modern' },
    });
    setShowAddForm(false);
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Database className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Knowledge Base</h2>
        </div>
        <button
          onClick={refreshStats}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          disabled={isLoading}
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{stats.total_patterns}</p>
            <p className="text-sm text-blue-700">UI Patterns</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-600">{stats.status}</p>
            <p className="text-sm text-green-700">Status</p>
          </div>
        </div>
      )}

      {/* Add Pattern Button */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>Add UI Pattern</span>
      </button>

      {/* Add Pattern Form */}
      {showAddForm && (
        <form onSubmit={handleAddPattern} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pattern Description
            </label>
            <textarea
              value={newPattern.content}
              onChange={(e) => setNewPattern(prev => ({ ...prev, content: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Describe the UI pattern, its implementation details, and best practices..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={newPattern.metadata.type}
                onChange={(e) => setNewPattern(prev => ({
                  ...prev,
                  metadata: { ...prev.metadata, type: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Type</option>
                <option value="form">Form</option>
                <option value="navigation">Navigation</option>
                <option value="card">Card</option>
                <option value="modal">Modal</option>
                <option value="button">Button</option>
                <option value="layout">Layout</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                value={newPattern.metadata.category}
                onChange={(e) => setNewPattern(prev => ({
                  ...prev,
                  metadata: { ...prev.metadata, category: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., authentication, ecommerce"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isAddingPattern}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isAddingPattern && <Loader className="w-4 h-4 animate-spin" />}
              <span>Add Pattern</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
