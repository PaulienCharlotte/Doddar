import React, { useState, useRef, useEffect } from 'react';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right' | 'bottom-end';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  placement?: TooltipPlacement;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, className = '', placement = 'top' }) => {
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

  // Positionering logica
  const getPositionClasses = () => {
    switch (placement) {
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-3';
      case 'bottom-end': // Onder, rechts uitgelijnd op desktop, gecentreerd op mobiel
        return 'top-full right-0 md:right-0 left-auto md:left-auto -translate-x-0 md:-translate-x-0 mt-3';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-3';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-3';
      case 'top':
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-3';
    }
  };

  const getArrowClasses = () => {
    switch (placement) {
      case 'bottom':
        return 'bottom-full left-1/2 -translate-x-1/2 border-b-[#13261f] border-x-transparent border-t-transparent border-8';
      case 'bottom-end':
        return 'bottom-full right-3 border-b-[#13261f] border-x-transparent border-t-transparent border-8';
      case 'left':
        return 'left-full top-1/2 -translate-y-1/2 border-l-[#13261f] border-y-transparent border-r-transparent border-8';
      case 'right':
        return 'right-full top-1/2 -translate-y-1/2 border-r-[#13261f] border-y-transparent border-l-transparent border-8';
      case 'top':
      default:
        return 'top-full left-1/2 -translate-x-1/2 border-t-[#13261f] border-x-transparent border-b-transparent border-8';
    }
  };

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
          className={`fixed md:absolute left-4 right-4 md:left-auto md:right-0 top-auto md:top-full w-auto md:w-72 max-w-[calc(100vw-2rem)] p-4 bg-[#13261f] text-white text-xs md:text-sm rounded-xl shadow-2xl z-[100] animate-fade-in cursor-auto mt-3`}
          style={{ transform: 'none' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative z-10 font-normal leading-relaxed">
            {content}
          </div>
          {/* Pijl - hidden on mobile fixed positioning */}
          <div className={`hidden md:block absolute w-0 h-0 ${getArrowClasses()}`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;