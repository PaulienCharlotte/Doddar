
import React from 'react';
import type { ImpactOnderbouwing, WetenschappelijkeReferentie } from '../types';
import { BrainIcon } from './icons/BrainIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ArticleIcon } from './icons/ArticleIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

interface ImpactOnderbouwingDisplayProps {
  onderbouwingen: ImpactOnderbouwing[];
}

const formatDoiUrl = (doi: string): string => {
  if (!doi) return '#';
  try {
    const decodedDoi = decodeURIComponent(doi);
    let cleanDoi = decodedDoi.trim().replace(/\s/g, '');
    if (!cleanDoi.startsWith('http://') && !cleanDoi.startsWith('https://')) {
      cleanDoi = cleanDoi.replace(/^doi:/i, '');
      return `https://doi.org/${cleanDoi}`;
    }
    return cleanDoi;
  } catch (e) {
    const fallbackDoi = doi.replace(/\s/g, '');
    return fallbackDoi.startsWith('http') ? fallbackDoi : `https://doi.org/${fallbackDoi}`;
  }
};

const ImpactOnderbouwingDisplay: React.FC<ImpactOnderbouwingDisplayProps> = ({ onderbouwingen }) => {
  const safeOnderbouwingen = (onderbouwingen || []).filter(item => item && item.titel && item.onderbouwing);
  
  if (safeOnderbouwingen.length === 0) {
      return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
        <BrainIcon className="w-5 h-5"/>
        Impact van Gedragspatronen
      </h3>
      <div className="space-y-3">
        {safeOnderbouwingen.map((item, index) => (
          <details key={index} className="impact-accordion group">
            <summary className="impact-summary list-none cursor-pointer p-4 bg-brand-surface rounded-xl flex justify-between items-center transition-colors hover:bg-brand-secondary/10">
              <span className="font-medium text-taupe-dark">{item.titel}</span>
              <ChevronDownIcon className="w-5 h-5 text-brand-subtle transform group-open:rotate-180 transition-transform duration-300" />
            </summary>
            <div className="impact-accordion-content p-4 pt-2 border-x border-b border-brand-accent/30 rounded-b-xl bg-white space-y-4">
              <p className="text-brand-text leading-relaxed text-sm">{item.onderbouwing}</p>
              
              {item.referenties && item.referenties.length > 0 && (
                <div className="mt-4 pt-4 border-t border-brand-accent/20">
                    <h5 className="text-xs font-bold text-brand-secondary uppercase tracking-wider mb-3">Wetenschappelijke Onderbouwing</h5>
                    <div className="grid grid-cols-1 gap-3">
                      {item.referenties.map((ref, refIndex) => (
                         <div key={refIndex} className="citation-card group/card">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-0.5">
                                    <ArticleIcon className="w-5 h-5 text-brand-secondary/70 group-hover/card:text-brand-primary transition-colors" />
                                </div>
                                <div className="flex-grow">
                                    <h5 className="text-sm font-semibold text-taupe-dark leading-snug group-hover/card:text-brand-primary transition-colors">
                                        {ref.titel}
                                    </h5>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="citation-badge">
                                            {ref.jaar}
                                        </span>
                                        <a 
                                            href={formatDoiUrl(ref.doi)} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="ml-auto flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-secondary transition-colors"
                                        >
                                            Bekijk bron
                                            <ExternalLinkIcon className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                         </div>
                      ))}
                    </div>
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default ImpactOnderbouwingDisplay;
