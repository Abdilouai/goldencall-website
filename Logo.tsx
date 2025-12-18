import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative flex items-center justify-center w-10 h-10">
      <div className="absolute inset-0 border-[3.5px] border-brand-blue rounded-full"></div>
      <div className="absolute inset-[6px] border-[2px] border-brand-blue rounded-full"></div>
      <div className="z-10 w-1.5 h-4 bg-brand-blue rounded-full rotate-[15deg]"></div>
    </div>
    <div className="flex font-sans font-bold text-2xl tracking-tight">
      <span className="text-brand-dark">golden</span>
      <span className="text-brand-blue">call</span>
      <span className="text-brand-grey font-light text-xs ml-0.5 mt-1">®</span>
    </div>
  </div>
);
const brandColors = { blue: '#0084c7', dark: '#333333', grey: '#4b5563' }; // For reference