'use client';

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return (
    <button onClick={() => setDarkMode(!darkMode)} className="fixed top-4 right-4 bg-ai-accent p-2 rounded">
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
