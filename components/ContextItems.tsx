
import React from 'react';
import type { WetenschappelijkeReferentie } from '../types';
import { InfoIcon } from './icons/InfoIcon';

interface WetenschappelijkeReferentiesDisplayProps {
  referenties: WetenschappelijkeReferentie[];
}

const formatDoiUrl = (doi: string): string => {
  if (!doi) return '#';

  try {
    // Step 1: Decode any URI-encoded characters (like %20).
    const decodedDoi = decodeURIComponent(doi);

    // Step 2: Aggressively remove all whitespace from the entire string.
    let cleanDoi = decodedDoi.trim().replace(/\s/g, '');

    // Step 3: If it's not a full URL, construct one.
    if (!cleanDoi.startsWith('http://') && !cleanDoi.startsWith('https://')) {
      // Also remove any "doi:" prefix that might be present.
      cleanDoi = cleanDoi.replace(/^doi:/i, '');
      return `https://doi.org/${cleanDoi}`;
    }
    
    // It was already a full URL, so return the cleaned version.
    return cleanDoi;
  } catch (e) {
    console.error("Failed to decode or format DOI string:", doi, e);
    // Fallback to a simpler cleaning method if decoding fails.
    const fallbackDoi = doi.replace(/\s/g, '');
    return fallbackDoi.startsWith('http') ? fallbackDoi : `https://doi.org/${fallbackDoi}`;
  }
};


const WetenschappelijkeReferentiesDisplay: React.FC<WetenschappelijkeReferentiesDisplayProps> = ({ referenties }) => {
  const safeReferenties = (referenties || []).filter(Boolean);
  
  if (safeReferenties.length === 0) {
    return null;
  }
  
  return (
    <section className="refs" aria-labelledby="refs-title">
      <h3 id="refs-title">Wetenschappelijke Referenties</h3>
      {safeReferenties.map((item, index) => (
        <div key={index} className="ref-card">
          <p>
            <strong>{item.titel} ({item.jaar})</strong>
            <br />
            <a 
              href={formatDoiUrl(item.doi)} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="doi-link"
            >
              {formatDoiUrl(item.doi)}
            </a>
          </p>
        </div>
      ))}
    </section>
  );
};

export default WetenschappelijkeReferentiesDisplay;