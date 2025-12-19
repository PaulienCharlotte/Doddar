
import React from 'react';
import type { MockCase } from '../data/mockCases';
import { BehaviorIcon } from './icons/BehaviorIcon';
import { LegalIcon } from './icons/LegalIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

interface CaseCardProps {
  caseData: MockCase;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseData }) => {
  // Omdat we nu echte data hebben met sourceUrl, gebruiken we die direct.
  // Fallback naar zoeken is alleen nodig voor legacy data (wat we niet meer hebben, maar voor veiligheid laten we het staan).
  const hasDirectLink = !!caseData.sourceUrl;
  
  const searchQuery = `${caseData.category} ${caseData.gedragskenmerken[0] || ''}`;
  const searchUrl = `https://uitspraken.rechtspraak.nl/resultaat?zoekterm=${encodeURIComponent(searchQuery)}`;

  const targetUrl = hasDirectLink ? caseData.sourceUrl : searchUrl;
  const linkText = "Bekijk officiële uitspraak";

  return (
    <div className="flex flex-col h-full bg-white border border-[rgba(140,140,140,0.2)] rounded-lg p-5 transition-all duration-300 hover:shadow-md group relative overflow-hidden">
      <div className="flex justify-between items-start mb-3">
         <span className="inline-block px-2 py-0.5 rounded-md bg-mint-bg text-taupe-dark text-[10px] font-medium uppercase tracking-wider">
            {caseData.category}
         </span>
         <span className="text-[10px] text-warm-grey font-light">{caseData.date}</span>
      </div>

      {caseData.ecli && (
          <div className="text-[10px] font-mono text-brand-subtle mb-2 select-all">
              {caseData.ecli}
          </div>
      )}

      <h4 className="font-medium text-taupe-dark text-base leading-tight mb-2 group-hover:text-doddar-green transition-colors">{caseData.title}</h4>
      <p className="text-sm text-warm-grey flex-grow font-light italic mb-4 line-clamp-4">"{caseData.snippet}"</p>
      
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
      
        <div className="pt-3 border-t border-[rgba(140,140,140,0.1)]">
            <a 
              href={targetUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-bold text-doddar-green hover:text-sage hover:underline flex items-center gap-1.5 transition-colors"
            >
                {linkText}
                <ExternalLinkIcon className="w-3 h-3" />
            </a>
        </div>
      </div>
    </div>
  );
};

export default CaseCard;
