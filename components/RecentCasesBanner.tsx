
import React from 'react';
import { mockCases } from '../data/mockCases';
import CaseCard from './CaseCard';

const RecentCasesBanner: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-2xl p-6 border border-brand-accent animate-fade-in">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-black">
            Recente casussen
        </h3>
        <p className="text-[15px] text-black mt-1">
            Een selectie van recente anonieme casussen, gecategoriseerd naar type situatie.
        </p>
      </div>
      <div className="w-4/5 border-t" style={{ borderColor: '#DCC9B6' }}></div>
      <div className="flex space-x-4 overflow-x-auto pt-4 pb-2 -mb-2">
        {mockCases.map(caseData => (
          <CaseCard key={caseData.id} caseData={caseData} />
        ))}
      </div>
    </div>
  );
};

export default RecentCasesBanner;
