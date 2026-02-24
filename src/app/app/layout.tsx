'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    setIsDemo(localStorage.getItem('solobite_demo') === 'true');
  }, []);

  return (
    <div className="max-w-4xl mx-auto min-h-screen flex flex-col px-4 sm:px-6 lg:px-8">
      {isDemo && (
        <div className="bg-brand-50 border border-brand-200 text-brand-700 text-sm text-center py-2 px-4 rounded-xl mt-4">
          Demo mode — your data is saved locally.{' '}
          <Link href="/login" className="underline font-medium hover:text-brand-900">
            Sign in
          </Link>{' '}
          to save across devices.
        </div>
      )}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
