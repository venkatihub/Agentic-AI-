'use client';
import { useState, ChangeEvent } from 'react';

interface Props {
  onSelect: (file: File) => void;
}

export default function ImagePicker({ onSelect }: Props) {
  const [preview, setPreview] = useState<string>();

  function handle(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    onSelect(file);
    setPreview(URL.createObjectURL(file));
  }

  return (
    <div className="space-y-2">
      <label className="block">
        <span className="font-medium">Reference screenshot (PNG/JPG)</span>
        <input
          type="file"
          accept="image/*"
          onChange={handle}
          className="mt-1"
        />
      </label>

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="max-h-64 border rounded shadow"
        />
      )}
    </div>
  );
}
