import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div 
      ref={containerRef}
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={(e) => { 
        e.stopPropagation(); 
        setIsOpen(!isOpen); 
      }}
    >
      <div className="cursor-pointer">
        {children}
      </div>
      
      {isOpen && (
        <div 
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 md:w-72 p-4 bg-[#2F3E37] text-white text-xs md:text-sm rounded-xl shadow-2xl z-50 animate-fade-in cursor-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative z-10 font-light leading-relaxed">
            {content}
          </div>
          {/* Pijl naar beneden */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.5 w-3 h-3 bg-[#2F3E37] transform rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;