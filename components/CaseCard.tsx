
import React from 'react';
import type { MockCase } from '../data/mockCases';
import Tag from './Tag';
import { BehaviorIcon } from './icons/BehaviorIcon';
import { LegalIcon } from './icons/LegalIcon';

interface CaseCardProps {
  caseData: MockCase;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseData }) => {
  return (
    <div className="flex-shrink-0 w-72 bg-brand-surface rounded-2xl shadow-md border border-brand-secondary/30 p-5 flex flex-col space-y-4 transform transition-transform duration-300 hover:-translate-y-1">
      <h4 className="font-bold text-black text-base">{caseData.title}</h4>
      <p className="text-sm text-black flex-grow italic">"{caseData.snippet}"</p>
      
      <div>
        <h5 className="text-sm font-semibold text-black mb-2 flex items-center gap-1.5">
          <BehaviorIcon className="w-4 h-4" />
          Gedragskenmerken
        </h5>
        <div className="flex flex-wrap gap-1.5">
          {caseData.gedragskenmerken.map(kenmerk => (
            <Tag key={kenmerk} text={kenmerk} className="bg-white/60 text-brand-text text-xs" />
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-sm font-semibold text-black mb-2 flex items-center gap-1.5">
          <LegalIcon className="w-4 h-4" />
          Relevante Wetgeving
        </h5>
        <div className="flex flex-wrap gap-1.5">
          {caseData.wetgeving.length > 0 ? caseData.wetgeving.map(wet => (
            // FIX: Corrected property access from 'boek' to 'wetboek' to match the data structure.
            <Tag key={wet.artikel} text={`${wet.wetboek}: ${wet.artikel}`} className="bg-brand-secondary text-white text-xs" />
          )) : (
            <p className="text-xs text-brand-subtle">N.v.t.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseCard;
