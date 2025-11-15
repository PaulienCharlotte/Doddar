

import React, { useState } from 'react';
import type { Gedragspatroon } from '../types';

interface QuickResultProps {
  patterns: Gedragspatroon[];
}

const getBadgeInfo = (score: number = 0): { text: string; className: string } => {
  const s = score * 100;
  if (s < 30) return { text: 'Laag', className: 'bg-brand-accent/60' };
  if (s < 60) return { text: 'Middel', className: 'bg-brand-secondary/35' };
  if (s < 80) return { text: 'Hoog', className: 'bg-brand-primary/35' };
  return { text: 'Zeer hoog', className: 'bg-brand-primary/60' };
};

const PatternRow: React.FC<{ pattern: Gedragspatroon }> = ({ pattern }) => {
  const badge = getBadgeInfo(pattern.score);
  const percentage = Math.round((pattern.score || 0) * 100);

  return (
    <div className="my-4">
      <div className="flex items-center gap-3">
        <span className="text-black font-semibold flex-grow">{pattern.label}</span>
        <span className={`text-xs rounded-full px-2 py-0.5 text-black font-medium ${badge.className}`}>
          {badge.text}
        </span>
        <span className="ml-auto text-brand-subtle text-xs font-mono w-8 text-right">{percentage}%</span>
      </div>
      <div className="h-2 bg-brand-surface rounded-full overflow-hidden mt-1.5">
        <div className="h-full bg-brand-primary rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
      {pattern.why_short && (
        <p className="mt-1.5 text-black/80 text-xs italic">
            <span className="font-semibold">Waarom:</span> {pattern.why_short}
        </p>
      )}
    </div>
  );
};

const QuickResult: React.FC<QuickResultProps> = ({ patterns }) => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  
  const sortedPatterns = (patterns || [])
    .filter(Boolean) // FIX: Filter out any null/undefined items in the array.
    .filter(p => p && p.label) 
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 md:p-6 border border-brand-accent animate-fade-in">
      <div className="patterns-head">
        <h3 className="mb-1 text-black font-semibold text-lg">Belangrijkste patronen (indicatief)</h3>
        <p className="mb-3 text-brand-subtle text-sm">Op basis van uw invoer; geen juridisch oordeel.</p>
      </div>

      <div className="divide-y divide-brand-accent/50 max-h-[40vh] overflow-y-auto pr-2">
        {sortedPatterns.map((p, index) => (
           <div className="py-2" key={`${p.label}-${index}`}>
             <PatternRow pattern={p} />
           </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button onClick={() => setIsExplanationOpen(!isExplanationOpen)} className="text-xs text-brand-secondary hover:underline">
           Hoe wordt de sterkte berekend?
        </button>
        {isExplanationOpen && (
            <div className="mt-2 text-xs text-brand-subtle bg-brand-surface p-3 rounded-lg text-left">
                De score is een gewogen indicatie gebaseerd op de volgende factoren in uw beschrijving:
                <ul className="list-disc list-inside mt-1">
                    <li>Frequentie & Duur (25%)</li>
                    <li>Intensiteit & Escalatie (25%)</li>
                    <li>Psychologische Impact (20%)</li>
                    <li>Context & Afhankelijkheid (15%)</li>
                    <li>Recente gebeurtenissen (10%)</li>
                    <li>Aanwezigheid van bewijs (5%)</li>
                </ul>
            </div>
        )}
      </div>

    </div>
  );
};

export default QuickResult;