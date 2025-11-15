import React from 'react';

export const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 10v7" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="7" r="1.2" fill="currentColor"/>
    </svg>
);
