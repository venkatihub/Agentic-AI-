'use client';
import { useEffect, useRef } from 'react';

type Props = { html: string };

export default function HtmlPreview({ html }: Props) {
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!frame.current) return;
    const doc = frame.current.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(html || '<!-- empty -->');
    doc.close();
  }, [html]);

  return (
    <iframe
      ref={frame}
      className="w-full h-[600px] border rounded shadow"
      sandbox="allow-same-origin allow-scripts"
    />
  );
}
