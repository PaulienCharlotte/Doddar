import React, { useState } from 'react';
import type { Gedragspatroon } from '../types';
import { InfoIcon } from './icons/InfoIcon';
import Tooltip from './Tooltip';

interface QuickResultProps {
  patterns: Gedragspatroon[];
}

const getBadgeInfo = (score: number = 0): { text: string; className: string } => {
  const s = score * 100;
  if (s < 30) return { text: 'Indicatie', className: 'bg-gray-100 text-gray-600' };
  if (s < 60) return { text: 'Substantieel', className: 'bg-[#F2F9F6] text-[#6A9489]' };
  if (s < 85) return { text: 'Sterke match', className: 'bg-[#E8F5EF] text-[#58B895]' };
  return { text: 'Zeer sterke match', className: 'bg-[#58B895] text-white' };
};

const PatternRow: React.FC<{ pattern: Gedragspatroon }> = ({ pattern }) => {
  // Zorg dat de score nooit boven de 1.0 uitkomt voor de UI-weergave
  const safeScore = Math.min(1.0, Math.max(0, pattern.score));
  const badge = getBadgeInfo(safeScore);
  const percentage = Math.round(safeScore * 100);

  return (
    <div className="py-5 border-b border-gray-100 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
            <span className="text-[#13261f] font-bold text-base">{pattern.label}</span>
            <span className={`text-[10px] uppercase tracking-wider font-bold rounded-md px-2 py-0.5 ${badge.className}`}>
            {badge.text}
            </span>
        </div>
        <div className="text-right">
            <span className="text-[#58B895] font-mono font-bold text-sm">{percentage}%</span>
            <span className="text-[10px] text-gray-400 block uppercase font-medium">Profile Match</span>
        </div>
      </div>
      
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
        <div 
          className="h-full bg-[#58B895] rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {pattern.why_short && (
        <div className="flex items-start gap-2 text-xs leading-relaxed text-gray-500 italic">
            <div className="mt-1 flex-shrink-0 w-1 h-1 bg-[#58B895] rounded-full"></div>
            <p>"{pattern.why_short}"</p>
        </div>
      )}
    </div>
  );
};

const QuickResult: React.FC<QuickResultProps> = ({ patterns }) => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);
  
  const sortedPatterns = (patterns || [])
    .filter(Boolean)
    .filter(p => p && p.label) 
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  return (
    <div className="bg-white shadow-xl rounded-[2rem] p-6 md:p-10 border border-[#E5E7EB] animate-fade-in">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#13261f]">Patroon-herkenning</h3>
            <p className="text-gray-500 text-sm mt-1">Eerste indicatieve match met gedragsmodellen.</p>
        </div>
        <Tooltip content="Deze percentages geven aan in welke mate uw beschrijving overeenkomt met bekende wetenschappelijke profielen (Match). Het is geen bewijs van schuld, maar een startpunt voor onderzoek.">
            <div className="flex items-center gap-2 bg-[#F9FCFA] px-4 py-2 rounded-xl border border-[#58B895]/20 cursor-help">
                <InfoIcon className="w-4 h-4 text-[#58B895]" />
                <span className="text-xs font-bold text-[#13261f] uppercase tracking-wide">Methodiek</span>
            </div>
        </Tooltip>
      </div>

      <div className="space-y-2">
        {sortedPatterns.length > 0 ? (
            sortedPatterns.map((p, index) => (
                <PatternRow key={`${p.label}-${index}`} pattern={p} />
            ))
        ) : (
            <p className="py-8 text-center text-gray-400 italic">Geen duidelijke patronen herkend in de initiële beschrijving.</p>
        )}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-100">
        <button 
            onClick={() => setIsExplanationOpen(!isExplanationOpen)} 
            className="flex items-center gap-2 text-sm font-bold text-[#6A9489] hover:text-[#58B895] transition-colors"
        >
           {isExplanationOpen ? '− Verberg details' : '+ Waarop is dit gebaseerd?'}
        </button>
        
        {isExplanationOpen && (
            <div className="mt-4 p-5 bg-[#F9FCFA] rounded-2xl border border-[#E5E7EB] animate-fade-in">
                <h4 className="text-xs font-bold text-[#13261f] uppercase tracking-widest mb-3">Wetenschappelijke Weging</h4>
                <p className="text-xs text-gray-600 leading-relaxed space-y-2">
                    De AI toetst uw tekst aan patronen uit de klinische psychologie en criminologie. Het match-percentage wordt bepaald door de aanwezigheid van:
                </p>
                <ul className="mt-3 space-y-2">
                    {[
                        { label: "Terminologie & Context", weight: "30%", desc: "Specifieke verhoudingen en setting." },
                        { label: "Gedragskenmerken", weight: "40%", desc: "De aard van de beschreven acties." },
                        { label: "Impact-indicatoren", weight: "30%", desc: "Emotionele of materiële gevolgen." }
                    ].map((item, i) => (
                        <li key={i} className="flex items-center justify-between py-1.5 border-b border-gray-200/50 last:border-0">
                            <span className="text-[11px] font-medium text-gray-500">{item.label}</span>
                            <span className="text-[11px] font-bold text-[#13261f]">{item.weight}</span>
                        </li>
                    ))}
                </ul>
                <p className="mt-4 text-[10px] text-gray-400 leading-tight">
                    * Let op: Patronen kunnen elkaar overlappen. De percentages zijn individuele match-scores en tellen niet op tot 100%.
                </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default QuickResult;