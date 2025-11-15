

import React from 'react';
import type { ImpactOnderbouwing, WetenschappelijkeReferentie } from '../types';
import { BrainIcon } from './icons/BrainIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

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
      <div className="space-y-2">
        {safeOnderbouwingen.map((item, index) => (
          <details key={index} className="impact-accordion">
            <summary className="impact-summary">
              <span>{item.titel}</span>
              <ChevronDownIcon className="w-5 h-5 text-brand-subtle accordion-icon" />
            </summary>
            <div className="impact-accordion-content">
              <p>{item.onderbouwing}</p>
              
              {item.referenties && item.referenties.length > 0 && (
                <div>
                    <h5>Wetenschappelijke Onderbouwing</h5>
                    <ul>
                      {item.referenties.map((ref, refIndex) => (
                         <li key={refIndex}>
                           <strong>{ref.titel} ({ref.jaar})</strong>
                           <br />
                           <a 
                              href={formatDoiUrl(ref.doi)} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="doi-link"
                            >
                              {formatDoiUrl(ref.doi)}
                            </a>
                         </li>
                      ))}
                    </ul>
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