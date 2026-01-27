

import React from 'react';
import { BehaviorIcon } from './icons/BehaviorIcon';
import Tag from './Tag';

interface GedragskenmerkenDisplayProps {
  kenmerken: string[];
}

const GedragskenmerkenDisplay: React.FC<GedragskenmerkenDisplayProps> = ({ kenmerken }) => {
  const safeKenmerken = (kenmerken || []).filter(Boolean);
  return (
    <div>
      <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
        <BehaviorIcon className="w-5 h-5"/>
        Gedragskenmerken
      </h3>
      <div className="flex flex-wrap gap-2">
        {safeKenmerken.map((kenmerk, index) => (
          <Tag key={index} text={kenmerk} className="bg-brand-accent text-brand-secondary" />
        ))}
        {safeKenmerken.length === 0 && <p className="text-sm text-brand-subtle">Geen specifieke kenmerken geïdentificeerd.</p>}
      </div>
    </div>
  );
};

export default GedragskenmerkenDisplay;