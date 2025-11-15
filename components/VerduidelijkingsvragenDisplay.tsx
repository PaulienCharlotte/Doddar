

import React from 'react';
import { QuoteIcon } from './icons/QuoteIcon';

interface VerduidelijkingsvragenDisplayProps {
  vragen: string[];
}

const VerduidelijkingsvragenDisplay: React.FC<VerduidelijkingsvragenDisplayProps> = ({ vragen }) => {
  const safeVragen = (vragen || []).filter(Boolean);
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-black">
        Aanvullende Vragen ter Reflectie
      </h3>
      
      {safeVragen.length > 0 ? (
         <div className="space-y-3">
            {safeVragen.map((vraag, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-brand-surface rounded-lg border border-brand-accent">
                <QuoteIcon className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                <p className="text-brand-text text-sm">{vraag}</p>
              </div>
            ))}
          </div>
      ) : (
        <p className="text-sm text-brand-subtle bg-brand-surface p-3 rounded-md">Geen aanvullende vragen nodig op dit moment.</p>
      )}

    </div>
  );
};

export default VerduidelijkingsvragenDisplay;