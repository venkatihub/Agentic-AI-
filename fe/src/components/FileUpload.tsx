'use client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  selectedFile,
  disabled = false,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
    disabled,
  });

  const removeFile = () => {
    onFileSelect(null);
  };

  if (selectedFile) {
    return (
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ImageIcon className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={removeFile}
            className="p-1 hover:bg-gray-100 rounded-full"
            disabled={disabled}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        {selectedFile && (
          <div className="mt-3">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              className="max-h-48 rounded-lg object-contain"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-gray-400'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      {isDragActive ? (
        <p className="text-blue-600">Drop the image here...</p>
      ) : (
        <div>
          <p className="text-gray-600 mb-2">
            Drag & drop an image here, or click to select
          </p>
          <p className="text-sm text-gray-500">
            Supports PNG, JPG, JPEG, GIF, WebP
          </p>
        </div>
      )}
    </div>
  );
};
