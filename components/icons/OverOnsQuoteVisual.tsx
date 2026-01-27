
import React from 'react';

export const OverOnsQuoteVisual: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        viewBox="0 0 500 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        {...props}
    >
        {/* 
            INSTRUCTIE VOOR DE GEBRUIKER:
            Dit is een placeholder illustratie van een netwerkstructuur. 
            Als u uw specifieke 'Over ons quote.svg' wilt gebruiken:
            1. Open uw .svg bestand in een teksteditor.
            2. Kopieer de <path>, <circle> of <g> elementen.
            3. Vervang de onderstaande inhoud tussen de commentaren door uw eigen code.
        */}

        <defs>
            <linearGradient id="grad_doddar" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#58B895" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2F3E37" stopOpacity="0.8" />
            </linearGradient>
        </defs>

        {/* Abstracte weergave van verstrengeling / netwerk (Doddar metafoor) */}
        <path 
            d="M50 350 C 150 50, 350 50, 450 350" 
            stroke="url(#grad_doddar)" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round"
        />
        <path 
            d="M50 50 C 150 350, 350 350, 450 50" 
            stroke="#6A9489" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round" 
            opacity="0.6"
        />
        <path 
            d="M250 0 V 400" 
            stroke="#B8E2D1" 
            strokeWidth="2" 
            strokeDasharray="10 10" 
            opacity="0.5"
        />
        
        <circle cx="250" cy="200" r="40" stroke="#2F3E37" strokeWidth="2" fill="none" opacity="0.2" />
        <circle cx="250" cy="200" r="100" stroke="#58B895" strokeWidth="1" fill="none" opacity="0.1" />

        <circle cx="130" cy="150" r="8" fill="#58B895" />
        <circle cx="370" cy="150" r="8" fill="#58B895" />
        <circle cx="250" cy="200" r="12" fill="#2F3E37" />
        <circle cx="130" cy="250" r="6" fill="#6A9489" />
        <circle cx="370" cy="250" r="6" fill="#6A9489" />

        {/* EINDE PLACEHOLDER */}
    </svg>
);
