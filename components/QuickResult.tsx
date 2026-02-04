import React, { useState } from 'react';
import type { Gedragspatroon } from '../types';
import { InfoIcon } from './icons/InfoIcon';
import Tooltip from './Tooltip';

interface QuickResultProps {
  patterns: Gedragspatroon[];
}

const getBadgeInfo = (label: string): { className: string } => {
  switch (label) {
    case 'Indicatief': return { className: 'bg-gray-100 text-gray-600' };
    case 'Nader te onderzoeken': return { className: 'bg-[#F2F9F6] text-[#6A9489]' };
    case 'Aanwezig': return { className: 'bg-[#E8F5EF] text-[#58B895]' };
    default: return { className: 'bg-gray-50 text-gray-500' };
  }
};

const PatternRow: React.FC<{ pattern: Gedragspatroon }> = ({ pattern }) => {
  const badge = getBadgeInfo(pattern.relevance_label);

  return (
    <div className="py-5 border-b border-gray-100 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[#13261f] font-bold text-base">{pattern.label}</span>
        </div>
        <div className="text-right">
          <span className={`text-[10px] uppercase tracking-wider font-bold rounded-md px-2 py-1 ${badge.className}`}>
            {pattern.relevance_label}
          </span>
        </div>
      </div>

      {pattern.why_short && (
        <div className="flex items-start gap-2 text-xs leading-relaxed text-gray-500 italic mt-1">
          <div className="mt-1 flex-shrink-0 w-1 h-1 bg-[#58B895] rounded-full"></div>
          <p>"{pattern.why_short}"</p>
        </div>
      )}
    </div>
  );
};

const QuickResult: React.FC<QuickResultProps> = ({ patterns }) => {
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);

  // Sort priority: Aanwezig > Nader te onderzoeken > Indicatief
  const priorityMap: Record<string, number> = {
    'Aanwezig': 3,
    'Nader te onderzoeken': 2,
    'Indicatief': 1
  };

  const sortedPatterns = (patterns || [])
    .filter(Boolean)
    .filter(p => p && p.label)
    .sort((a, b) => (priorityMap[b.relevance_label] || 0) - (priorityMap[a.relevance_label] || 0));

  return (
    <div className="bg-white shadow-xl rounded-[2rem] p-6 md:p-10 border border-[#E5E7EB] animate-fade-in">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-[#13261f]">Patroon-herkenning</h3>
          <p className="text-gray-500 text-sm mt-1">Eerste indicatieve structurering van signalen.</p>
        </div>
        <Tooltip content="Deze labels geven aan of specifieke gedragskenmerken in de tekst zijn herkend. Dit is een tekstuele analyse, geen psychologische diagnose.">
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
          <p className="py-8 text-center text-gray-400 italic">Geen specifieke patronen herkend in de initiële beschrijving.</p>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={() => setIsExplanationOpen(!isExplanationOpen)}
          className="flex items-center gap-2 text-sm font-bold text-[#6A9489] hover:text-[#58B895] transition-colors"
        >
          {isExplanationOpen ? '− Verberg details' : '+ Hoe werkt deze analyse?'}
        </button>

        {isExplanationOpen && (
          <div className="mt-4 p-5 bg-[#F9FCFA] rounded-2xl border border-[#E5E7EB] animate-fade-in">
            <h4 className="text-xs font-bold text-[#13261f] uppercase tracking-widest mb-3">Kwalitatieve Structurering</h4>
            <p className="text-xs text-gray-600 leading-relaxed space-y-2">
              De AI ordent uw tekst op basis van kenmerken uit de onderzoekspraktijk. De labels hebben de volgende betekenis:
            </p>
            <ul className="mt-3 space-y-2">
              {[
                { label: "Aanwezig", desc: "Duidelijke signalen in de tekst gevonden." },
                { label: "Nader te onderzoeken", desc: "Mogelijke signalen, maar context ontbreekt." },
                { label: "Indicatief", desc: "Zwakke signalen of taalkundige match." }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 py-1.5 border-b border-gray-200/50 last:border-0">
                  <span className="text-[11px] font-bold text-[#13261f] min-w-[120px]">{item.label}:</span>
                  <span className="text-[11px] font-medium text-gray-500">{item.desc}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[10px] text-gray-400 leading-tight">
              * Let op: Dit is een hulpmiddel voor informatie-ordening, geen juridisch bewijs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickResult;