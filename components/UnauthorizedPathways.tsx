import React from 'react';
import { MessageCircleIcon } from './icons/MessageCircleIcon';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';

const UnauthorizedPathways: React.FC = () => {
  return (
    <div className="w-full animate-fade-in text-center">
      <h2 className="text-2xl font-bold text-black">Mogelijke Volgende Stappen</h2>
      <p className="text-brand-subtle mt-2 mb-8 max-w-2xl mx-auto">
        Voor een formeel onderzoek is een bevestigd mandaat (gerechtvaardigd belang) vereist. Omdat dit in uw geval onduidelijk is, kunt u de volgende stappen overwegen om toch verder te komen.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {/* Intake Card */}
        <div className="bg-brand-surface p-6 rounded-xl border border-brand-accent/70 flex flex-col">
          <MessageCircleIcon className="w-10 h-10 mb-4 text-brand-primary" />
          <h3 className="font-bold text-brand-text text-md">Vrijblijvend Intakegesprek</h3>
          <p className="text-sm text-brand-subtle mt-2 flex-grow">
            In een vertrouwelijk gesprek bespreken we uw situatie en onderzoeken we samen de juridische mogelijkheden om een gerechtvaardigd belang vast te stellen.
          </p>
          <div className="mt-6">
            <button className="cta-onderzoek w-full">Plan een Gesprek</button>
          </div>
        </div>
        
        {/* Self-Analysis Card */}
        <div className="bg-brand-surface p-6 rounded-xl border border-brand-accent/70 flex flex-col">
          <BrainCircuitIcon className="w-10 h-10 mb-4 text-brand-primary" />
          <h3 className="font-bold text-brand-text text-md">Start Zelfanalyse</h3>
          <p className="text-sm text-brand-subtle mt-2 flex-grow">
            Gebruik onze gestructureerde tool om dieper inzicht te krijgen in de gedragspatronen en uw eigen positie te versterken.
          </p>
          <div className="mt-6">
            <button className="cta-onderzoek w-full opacity-60 cursor-not-allowed" disabled title="Binnenkort beschikbaar">Start Zelfanalyse</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPathways;
