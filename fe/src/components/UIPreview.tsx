'use client';
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Eye, Code, Copy, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

interface UIPreviewProps {
  html: string;
  title?: string;
}

export const UIPreview: React.FC<UIPreviewProps> = ({ html, title = "Generated UI" }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html);
    toast.success('Code copied to clipboard!');
  };

  const openInNewWindow = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Header */}
      <div className="border-b bg-gray-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-gray-200 rounded-md transition-colors"
              title="Copy code"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={openInNewWindow}
              className="p-2 hover:bg-gray-200 rounded-md transition-colors"
              title="Open in new window"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex mt-3 space-x-1">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeTab === 'preview'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Eye className="w-4 h-4 inline mr-1" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeTab === 'code'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Code className="w-4 h-4 inline mr-1" />
            Code
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'preview' ? (
          <div className="p-4">
            <div 
              className="border rounded-lg overflow-hidden"
              style={{ minHeight: '350px' }}
            >
              <iframe
                srcDoc={html}
                className="w-full h-full min-h-[350px]"
                title="UI Preview"
                sandbox="allow-same-origin"
              />
            </div>
          </div>
        ) : (
          <div className="overflow-auto max-h-[500px]">
            <SyntaxHighlighter
              language="html"
              style={tomorrow}
              customStyle={{
                margin: 0,
                fontSize: '14px',
              }}
            >
              {html}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
};
