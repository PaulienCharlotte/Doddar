
import React from 'react';
import type { MockCase } from '../data/mockCases';
import Tag from './Tag';
import { BehaviorIcon } from './icons/BehaviorIcon';
import { LegalIcon } from './icons/LegalIcon';
import { InfoIcon } from './icons/InfoIcon';

interface CaseCardProps {
  caseData: MockCase;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseData }) => {
  return (
    <div className="flex flex-col h-full bg-white border border-[rgba(140,140,140,0.2)] rounded-lg p-5 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
         <span className="inline-block px-2 py-0.5 rounded-md bg-mint-bg text-taupe-dark text-[10px] font-medium uppercase tracking-wider">
            {caseData.category}
         </span>
         <span className="text-[10px] text-warm-grey font-light">{caseData.date}</span>
      </div>

      <h4 className="font-medium text-taupe-dark text-base leading-tight mb-2">{caseData.title}</h4>
      <p className="text-sm text-warm-grey flex-grow font-light italic mb-4">"{caseData.snippet}"</p>
      
      <div className="space-y-3 mt-auto">
        <div>
          <h5 className="text-[11px] font-medium text-warm-grey mb-1.5 flex items-center gap-1 uppercase tracking-wide">
            <BehaviorIcon className="w-3 h-3 text-sage" />
            Kenmerken
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {caseData.gedragskenmerken.slice(0, 3).map(kenmerk => (
              <span key={kenmerk} className="inline-block px-2 py-0.5 text-[10px] font-light rounded-full bg-mint-bg text-warm-grey border border-[rgba(140,140,140,0.1)]">
                {kenmerk}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-[11px] font-medium text-warm-grey mb-1.5 flex items-center gap-1 uppercase tracking-wide">
            <LegalIcon className="w-3 h-3 text-sage" />
            Kader
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {caseData.wetgeving.length > 0 ? caseData.wetgeving.slice(0, 2).map(wet => (
              <span key={wet.artikel} className="inline-block px-2 py-0.5 text-[10px] font-light rounded-full bg-white border border-sage text-sage">
                {wet.wetboek}: {wet.artikel}
              </span>
            )) : (
              <p className="text-xs text-warm-grey font-light">N.v.t.</p>
            )}
          </div>
        </div>
      
        {caseData.sourceUrl && (
            <div className="pt-3 border-t border-[rgba(140,140,140,0.1)]">
                <a 
                  href={caseData.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-doddar-green hover:text-sage hover:underline flex items-center gap-1 transition-colors"
                >
                    <InfoIcon className="w-3 h-3" />
                    Bekijk uitspraak
                </a>
            </div>
        )}
      </div>
    </div>
  );
};

export default CaseCard;
