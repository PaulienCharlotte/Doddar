import React from 'react';
import type { ImpactOnderbouwing, WetenschappelijkeReferentie } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ArticleIcon } from './icons/ArticleIcon';

interface ImpactOnderbouwingDisplayProps {
  onderbouwingen: ImpactOnderbouwing[];
}

const ImpactOnderbouwingDisplay: React.FC<ImpactOnderbouwingDisplayProps> = ({ onderbouwingen }) => {
  const safeOnderbouwingen = (onderbouwingen || []).filter(item => item && item.titel && item.onderbouwing);
  
  if (safeOnderbouwingen.length === 0) {
      return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
        <BookOpenIcon className="w-5 h-5"/>
        Wetenschappelijke Context
      </h3>
      <div className="space-y-3">
        {safeOnderbouwingen.map((item, index) => (
          <details key={index} className="impact-accordion group">
            <summary className="impact-summary list-none cursor-pointer p-4 bg-brand-surface rounded-xl flex justify-between items-center transition-colors hover:bg-brand-secondary/10 border border-brand-accent/30">
              <span className="font-bold text-[#13261f] text-sm md:text-base">{item.titel}</span>
              <ChevronDownIcon className="w-5 h-5 text-brand-subtle transform group-open:rotate-180 transition-transform duration-300" />
            </summary>
            <div className="impact-accordion-content p-5 border-x border-b border-brand-accent/30 rounded-b-xl bg-white space-y-4">
              <p className="text-brand-text leading-relaxed text-sm md:text-base font-light">{item.onderbouwing}</p>
              
              {item.referenties && item.referenties.length > 0 && (
                <div className="mt-6 pt-5 border-t border-brand-accent/40">
                    <h5 className="text-[10px] font-bold text-[#13261f] uppercase tracking-widest mb-4">Bibliografie / Bronvermelding</h5>
                    <div className="space-y-4">
                      {item.referenties.map((ref, refIndex) => (
                         <div key={refIndex} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                                <ArticleIcon className="w-4 h-4 text-brand-secondary/60" />
                            </div>
                            <div className="flex-grow">
                                <p className="text-xs md:text-sm text-brand-text leading-relaxed">
                                    <span className="font-bold">{ref.titel}</span> ({ref.jaar}).
                                    {ref.doi && <span className="ml-1 text-brand-subtle block md:inline md:ml-2">Referentie-id: {ref.doi}</span>}
                                </p>
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