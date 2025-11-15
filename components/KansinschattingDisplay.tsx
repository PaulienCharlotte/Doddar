import React from 'react';
import type { Kansinschatting } from '../types';
import { ProbabilityIcon } from './icons/ProbabilityIcon';
import Tag from './Tag';

interface KansinschattingDisplayProps {
  kansinschatting: Kansinschatting;
}

const ProbabilityBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between items-center mb-1 text-sm">
      <span className="font-medium text-brand-subtle">{label}</span>
      <span className={`font-bold ${color.replace('bg-', 'text-')}`}>{Math.round(value * 100)}%</span>
    </div>
    <div className="w-full bg-brand-accent rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full ${color} transition-width duration-500`}
        style={{ width: `${value * 100}%` }}
      ></div>
    </div>
  </div>
);

const KansinschattingDisplay: React.FC<KansinschattingDisplayProps> = ({ kansinschatting }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-black flex items-center gap-2">
        <ProbabilityIcon className="w-5 h-5" /> Kansinschatting
      </h3>

      {kansinschatting.basis_context && kansinschatting.basis_context.length > 0 && (
        <div>
          <p className="text-sm font-medium text-brand-subtle mb-2">Basis Context</p>
          <div className="flex flex-wrap gap-2">
            {kansinschatting.basis_context.map((factor, index) => (
              <Tag key={index} text={factor} className="bg-brand-light text-status-warning" />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3 pt-2">
        <ProbabilityBar label="Prior Schatting" value={kansinschatting.prior_schatting_0_1} color="bg-brand-secondary" />
        <ProbabilityBar label="Signaal Sterkte" value={kansinschatting.signaal_likelihood_0_1} color="bg-status-warning" />
        <ProbabilityBar label="Posterior Kans" value={kansinschatting.posterior_kans_0_1} color="bg-status-danger" />
      </div>

      <div>
        <p className="text-sm font-medium text-brand-subtle mb-1">Uitleg</p>
        <p className="text-brand-text text-sm bg-brand-surface p-3 rounded-md">{kansinschatting.uitleg}</p>
      </div>
    </div>
  );
};

export default KansinschattingDisplay;