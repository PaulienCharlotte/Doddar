import React from 'react';

export const AdviceVectorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g opacity="0.15">
            <path fill="currentColor" d="M100 20C100 20 160 30 160 100C160 170 100 180 100 180C100 180 40 170 40 100C40 30 100 20 100 20Z" />
        </g>
        <path d="M100 20C100 20 160 30 160 100C160 170 100 180 100 180C100 180 40 170 40 100C40 30 100 20 100 20Z" fill="none" stroke="#7BA69B" strokeWidth="4"/>
        <path d="M125 70H75C72.2386 70 70 72.2386 70 75V135C70 137.761 72.2386 140 75 140H125C127.761 140 130 137.761 130 135V75C130 72.2386 127.761 70 125 70Z" fill="#E8F5EF" stroke="#7BA69B" strokeWidth="3" />
        <line x1="80" y1="85" x2="120" y2="85" stroke="#7BA69B" strokeWidth="3" strokeLinecap="round"/>
        <line x1="80" y1="100" x2="120" y2="100" stroke="#7BA69B" strokeWidth="3" strokeLinecap="round"/>
        <line x1="80" y1="115" x2="100" y2="115" stroke="#7BA69B" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="120" cy="55" r="10" fill="#58B895" stroke="#FFFFFF" strokeWidth="2"/>
        <path d="M118 52 L120 55 L123 50" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);