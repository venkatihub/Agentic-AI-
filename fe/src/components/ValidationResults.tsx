'use client';
import React from 'react';
import { ValidationResult } from '@/types/api';
import { CheckCircle, AlertTriangle, XCircle, Lightbulb } from 'lucide-react';

interface ValidationResultsProps {
  validation: ValidationResult;
  qualityScore?: number;
}

export const ValidationResults: React.FC<ValidationResultsProps> = ({ 
  validation, 
  qualityScore 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-50';
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 0.8) return <CheckCircle className="w-5 h-5" />;
    if (score >= 0.6) return <AlertTriangle className="w-5 h-5" />;
    return <XCircle className="w-5 h-5" />;
  };

  return (
    <div className="space-y-4">
      {/* Quality Score */}
      {qualityScore !== undefined && (
        <div className={`p-4 rounded-lg border ${getScoreColor(qualityScore)}`}>
          <div className="flex items-center space-x-3">
            {getScoreIcon(qualityScore)}
            <div>
              <h4 className="font-medium">Quality Score</h4>
              <p className="text-sm">
                {(qualityScore * 100).toFixed(1)}% - {
                  qualityScore >= 0.8 ? 'Excellent' :
                  qualityScore >= 0.6 ? 'Good' : 'Needs Improvement'
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Validation Status */}
      <div className={`p-4 rounded-lg border ${
        validation.is_valid 
          ? 'bg-green-50 border-green-200' 
          : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center space-x-3">
          {validation.is_valid ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600" />
          )}
          <div>
            <h4 className={`font-medium ${
              validation.is_valid ? 'text-green-900' : 'text-red-900'
            }`}>
              {validation.is_valid ? 'Valid Code' : 'Issues Detected'}
            </h4>
            <p className={`text-sm ${
              validation.is_valid ? 'text-green-700' : 'text-red-700'
            }`}>
              Confidence: {(validation.confidence_score * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Issues */}
      {validation.issues.length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-red-900 mb-2">Issues Found</h4>
              <ul className="space-y-1">
                {validation.issues.map((issue, index) => (
                  <li key={index} className="text-sm text-red-700">
                    • {issue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {validation.recommendations.length > 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 mb-2">Recommendations</h4>
              <ul className="space-y-1">
                {validation.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-blue-700">
                    • {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
