
import React from 'react';
import type { WetenschappelijkeReferentie } from '../types';
import { InfoIcon } from './icons/InfoIcon';

interface WetenschappelijkeReferentiesDisplayProps {
  referenties: WetenschappelijkeReferentie[];
}

const formatDoiUrl = (doi: string): string => {
  if (!doi) return '#';

  try {
    // 1. Decode URI components (e.g. %2F -> /)
    let clean = decodeURIComponent(doi);

    // 2. Remove all whitespace (newlines, tabs, spaces)
    clean = clean.replace(/\s/g, '');

    // 3. Handle existing URLs (http or https)
    if (/^https?:\/\//i.test(clean)) {
      return clean;
    }

    // 4. Clean up "doi:" prefix (case insensitive) and any leading slashes
    // This handles "doi:10.xxx", "DOI: 10.xxx", "/10.xxx"
    clean = clean.replace(/^(doi:?|\/)+/i, '');

    // 5. Construct secure DOI URL
    return `https://doi.org/${clean}`;
  } catch (e) {
    console.error("Failed to format DOI:", doi);
    // Safe fallback: strip whitespace and prepend domain if not a URL
    const raw = doi.replace(/\s/g, '');
    return /^https?:\/\//i.test(raw) ? raw : `https://doi.org/${raw}`;
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
