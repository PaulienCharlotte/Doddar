
import React, { useState, useMemo } from 'react';
import { mockCases } from '../data/mockCases';
import CaseCard from './CaseCard';
import { LawIcon } from './icons/LawIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

const categories = ["Alles", "Arbeidsrecht", "Strafrecht", "Civiel Recht", "Familierecht", "Fraude", "Huurrecht", "Zorgfraude"];

const RecentCasesBanner: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Alles");
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredCases = useMemo(() => {
    let cases = [...mockCases];
    
    if (selectedCategory !== "Alles") {
      cases = cases.filter(c => c.category === selectedCategory || c.category.includes(selectedCategory));
    }

    cases.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return cases;
  }, [selectedCategory, sortOrder]);

  const visibleCases = filteredCases.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="w-full bg-white rounded-lg border border-[rgba(140,140,140,0.2)] p-5 md:p-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <h3 className="text-xl md:text-2xl font-medium text-taupe-dark flex items-center gap-3">
                    <LawIcon className="w-6 h-6 md:w-8 md:h-8 text-sage" />
                    Jurisprudentie Bibliotheek
                </h3>
                <p className="text-warm-grey mt-2 max-w-2xl text-sm leading-relaxed font-light">
                    Een overzicht van relevante uitspraken op het gebied van particulier onderzoek, arbeidsrecht, fraude en personen- en familierecht. Deze casuïstiek illustreert het belang van feitenonderzoek.
                </p>
            </div>
            
            {/* Sorteer Optie */}
            <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-warm-grey font-medium uppercase tracking-wide">Sorteer:</span>
                <button 
                    onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                    className="text-sm font-medium text-doddar-green hover:underline flex items-center gap-1"
                >
                    {sortOrder === 'desc' ? 'Nieuwste eerst' : 'Oudste eerst'}
                    <ChevronDownIcon className={`w-4 h-4 transform transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                </button>
            </div>
        </div>

        {/* Categorie Filters - Scrollable on Mobile */}
        <div className="flex gap-2 pb-4 border-b border-[rgba(140,140,140,0.1)] overflow-x-auto whitespace-nowrap scrollbar-hide -mx-2 px-2 md:mx-0 md:px-0 md:flex-wrap">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setVisibleCount(6); }}
                    className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-200 border flex-shrink-0 ${
                        selectedCategory === cat 
                        ? 'bg-doddar-green text-white border-doddar-green' 
                        : 'bg-transparent text-warm-grey border-[rgba(140,140,140,0.2)] hover:bg-mint-bg hover:border-doddar-green'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      </div>
      
      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCases.map(caseData => (
          <div key={caseData.id} className="h-full">
             <CaseCard caseData={caseData} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {visibleCases.length === 0 && (
          <div className="text-center py-12 text-warm-grey font-light">
              Geen uitspraken gevonden in deze categorie.
          </div>
      )}

      {/* Load More Button */}
      {visibleCount < filteredCases.length && (
          <div className="mt-10 text-center">
              <button 
                onClick={handleLoadMore}
                className="btn-outline"
              >
                  Laad meer artikelen ({filteredCases.length - visibleCount})
              </button>
          </div>
      )}
    </div>
  );
};

export default RecentCasesBanner;
