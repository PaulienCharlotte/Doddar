
import React from 'react';

interface TagProps {
  text: string;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ text, className = '' }) => {
  return (
    <span className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-full capitalize leading-normal ${className}`}>
      {text}
    </span>
  );
};

export default Tag;
