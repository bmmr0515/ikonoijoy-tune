'use client';

import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`w-full max-w-[1200px] mx-auto px-4 md:px-8 py-4 md:py-6 flex flex-col flex-1 ${className}`}>
      {children}
    </div>
  );
}
