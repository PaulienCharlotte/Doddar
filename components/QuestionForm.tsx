

import React, { useState, useMemo, useCallback } from 'react';
import type { Verduidelijkingsvraag } from '../types';
import { InputType } from '../types';
import { InfoIcon } from './icons/InfoIcon';
import Tooltip from './Tooltip';

interface QuestionFormProps {
  vragen: Verduidelijkingsvraag[];
  minAnswersRequired: number;
  onSubmit: (answers: Record<string, string>) => void;
  answers: Record<string, any>;
  onAnswersChange: (answers: Record<string, any>) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ vragen, minAnswersRequired, onSubmit, answers, onAnswersChange }) => {
  const safeVragen = (vragen || []).filter(v => v && v.vraag);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getEffectiveInputType = (vraag: Verduidelijkingsvraag): string => {
    const qLower = vraag.vraag.toLowerCase();
    
    // Heuristics voor betere UX bij FREE_TEXT
    if (vraag.input_type === InputType.FREE_TEXT) {
        if (qLower.includes('hoe vaak') || qLower.includes('frequentie')) return 'SEGMENTED_CONTROL';
        if (qLower.includes('op een schaal van') || qLower.includes('hoe voelt u zich') || qLower.includes('mate van')) return InputType.SCALE_0_4;
        if ((qLower.startsWith('heeft u') || qLower.startsWith('is er') || qLower.startsWith('zijn er')) &&
            !qLower.includes('welke') && !qLower.includes('voorbeelden') && !qLower.includes('omschrijf')) {
            return InputType.YES_NO;
        }
    }
    
    if (vraag.input_type === InputType.MULTIPLE_CHOICE) return 'MULTI_SELECT_CHIPS';
    
    return vraag.input_type;
  };
  
  const andersOptionLabel = 'Anders, namelijk...';

  const isQuestionAnswered = useCallback((vraag: Verduidelijkingsvraag, currentAnswers: Record<string, any>): boolean => {
    const value = currentAnswers[vraag.question_id];
    // Check main value
    if (value !== undefined && value !== null && (Array.isArray(value) ? value.length > 0 : String(value).trim() !== '')) return true;
    
    // Check followup/context
    const toelichting = currentAnswers[`${vraag.question_id}_toelichting`];
    if(toelichting !== undefined && toelichting !== null && String(toelichting).trim() !== '') return true;

    return false;
  }, []);

  const answeredCount = useMemo(() => {
    return safeVragen.filter(vraag => isQuestionAnswered(vraag, answers)).length;
  }, [answers, safeVragen, isQuestionAnswered]);

  const validate = useCallback((questionId: string, currentAnswers: Record<string, any>): string | null => {
      const vraag = safeVragen.find(v => v.question_id === questionId);
      if (!vraag) return null;

      const effectiveType = getEffectiveInputType(vraag);
      if (effectiveType === 'MULTI_SELECT_CHIPS') {
          const selectedOptions = (currentAnswers[questionId] || []) as string[];
          const andersText = currentAnswers[`${questionId}_anders`] || '';

          if (selectedOptions.includes(andersOptionLabel) && andersText.trim() === '') {
              return "Vul a.u.b. de toelichting in voor ‘Anders, namelijk...’.";
          }
      }
      return null;
  }, [safeVragen, andersOptionLabel]);

  const handleAnswerChange = useCallback((questionId: string, value: any, type: 'set' | 'toggle_array' = 'set') => {
    let newAnswers: Record<string, any>;

    if (type === 'toggle_array') {
      const currentArray = (answers[questionId] || []) as string[];
      const isPresent = currentArray.includes(value);
      const newArray = isPresent
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      newAnswers = { ...answers, [questionId]: newArray };

      if (value === andersOptionLabel && isPresent) {
          const andersKey = `${questionId}_anders`;
          newAnswers[andersKey] = ''; 
      }
    } else {
      newAnswers = { ...answers, [questionId]: value };
    }
    
    const mainQuestionId = questionId.replace(/_anders|_toelichting/g, '');
    const error = validate(mainQuestionId, newAnswers);
    setErrors(prevErrors => ({ ...prevErrors, [mainQuestionId]: error || '' }));
    
    onAnswersChange(newAnswers);
  }, [answers, onAnswersChange, validate, andersOptionLabel]);

  const isSubmitDisabled = answeredCount < minAnswersRequired || Object.values(errors).some(e => !!e);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    // Final validation before submit
    let allValid = true;
    const finalErrors: Record<string, string> = {};
    safeVragen.forEach(vraag => {
      const error = validate(vraag.question_id, answers);
      if (error) {
        allValid = false;
        finalErrors[vraag.question_id] = error;
      }
    });

    if (!allValid) {
      setErrors(finalErrors);
      return;
    }

    const formattedAnswers: Record<string, string> = {};
    safeVragen.forEach(vraag => {
      if (isQuestionAnswered(vraag, answers)) {
         const effectiveType = getEffectiveInputType(vraag);
         const mainValue = answers[vraag.question_id];
         const toelichting = answers[`${vraag.question_id}_toelichting`];
         let finalAnswer = '';

         if (effectiveType === 'MULTI_SELECT_CHIPS') {
            const selectedOptions = (mainValue as string[]) || [];
            const andersText = answers[`${vraag.question_id}_anders`] || '';
            
            // Filter out the label "Anders..." itself, but include the typed text
            const cleanOptions = selectedOptions.filter(opt => opt !== andersOptionLabel);
            if (selectedOptions.includes(andersOptionLabel) && andersText) {
                cleanOptions.push(`Anders: ${andersText}`);
            }
            finalAnswer = JSON.stringify(cleanOptions);
         } else {
             finalAnswer = String(mainValue || ''); 
         }
         
         if (toelichting) {
            // Append context clearly
            finalAnswer += ` [Extra context: ${toelichting}]`;
         }
         
         formattedAnswers[vraag.vraag] = finalAnswer.trim();
      }
    });
    onSubmit(formattedAnswers);
  };

  const renderInput = (vraag: Verduidelijkingsvraag) => {
    const { question_id, options, placeholder } = vraag;
    const effectiveType = getEffectiveInputType(vraag);
    const value = answers[question_id] || '';
    const toelichtingValue = answers[`${question_id}_toelichting`] || '';

    // Context field styling - Explicit white background and dark text
    const renderContextField = () => (
      <div className="mt-5 bg-[#F9FAFB] p-4 rounded-xl border border-dashed border-gray-300">
        <label htmlFor={`${question_id}_toelichting`} className="flex items-center gap-2 text-xs font-bold text-[#13261f] uppercase tracking-wider mb-2">
            <InfoIcon className="w-3 h-3" />
            Aanvullende context (optioneel)
        </label>
        <textarea
            id={`${question_id}_toelichting`}
            value={toelichtingValue}
            onChange={(e) => handleAnswerChange(`${question_id}_toelichting`, e.target.value)}
            placeholder="Eventuele extra toelichting of nuance (optioneel)..."
            className="w-full bg-white text-[#13261f] placeholder:text-gray-400 border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all resize-y min-h-[80px] appearance-none"
        />
      </div>
    );

    // Only show context field for non-free-text types (since free text already allows explanation)
    const showToelichting = effectiveType !== InputType.FREE_TEXT;

    switch (effectiveType) {
      case InputType.YES_NO:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {['Ja', 'Nee'].map(opt => (
                <label 
                    key={opt} 
                    className={`
                        cursor-pointer text-center py-4 px-6 rounded-xl border-2 transition-all font-semibold select-none flex items-center justify-center h-full touch-manipulation
                        ${value === opt 
                            ? 'bg-brand-primary/10 border-brand-primary text-brand-primary shadow-sm' 
                            : 'bg-white border-gray-200 text-gray-600 hover:border-brand-secondary/50 hover:bg-gray-50'
                        }
                    `}
                >
                  <input 
                    type="radio" 
                    name={question_id} 
                    value={opt} 
                    checked={value === opt} 
                    onChange={(e) => handleAnswerChange(question_id, e.target.value)} 
                    className="hidden"
                  />
                  {opt}
                </label>
              ))}
            </div>
            {showToelichting && renderContextField()}
          </div>
        );

      case InputType.SCALE_0_4: {
        const scaleOptions = (options && options.length === 5) ? options : ['1', '2', '3', '4', '5'];
        return (
          <div className="space-y-4">
            <div className="bg-white p-2 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center gap-1 md:gap-2">
                    {scaleOptions.map((opt) => (
                        <label key={opt} className="flex-1 cursor-pointer group touch-manipulation">
                             <input 
                                type="radio" 
                                name={question_id} 
                                value={opt} 
                                checked={value === opt} 
                                onChange={(e) => handleAnswerChange(question_id, e.target.value)} 
                                className="hidden"
                            />
                            <div className={`
                                h-12 md:h-14 flex items-center justify-center rounded-lg font-bold text-lg transition-all
                                ${value === opt 
                                    ? 'bg-brand-secondary text-white shadow-md transform scale-105' 
                                    : 'text-gray-400 group-hover:bg-gray-100 group-hover:text-gray-600'
                                }
                            `}>
                                {opt}
                            </div>
                        </label>
                    ))}
                </div>
            </div>
            <div className="flex justify-between text-xs font-medium text-brand-subtle px-2">
                <span>Min / Nooit / Laag</span>
                <span>Max / Altijd / Hoog</span>
            </div>
            {showToelichting && renderContextField()}
          </div>
        );
      }

      case 'SEGMENTED_CONTROL': {
        const segmentOptions = (options && options.length > 0) ? options : ['Zelden', 'Soms', 'Regelmatig', 'Vaak'];
        return (
          <div className="space-y-4">
             <div className="flex flex-wrap gap-2 bg-gray-100 p-2 rounded-xl">
              {segmentOptions.map(opt => (
                <label key={opt} className="flex-grow flex-1 cursor-pointer min-w-[120px] touch-manipulation">
                   <input 
                        type="radio" 
                        name={question_id} 
                        value={opt} 
                        checked={value === opt} 
                        onChange={(e) => handleAnswerChange(question_id, e.target.value)} 
                        className="hidden"
                    />
                    <div className={`
                        text-center py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 h-full flex items-center justify-center whitespace-normal break-words leading-tight
                        ${value === opt 
                            ? 'bg-white text-brand-primary shadow-sm ring-1 ring-black/5' 
                            : 'text-gray-500 hover:text-gray-700'
                        }
                    `}>
                        {opt}
                    </div>
                </label>
              ))}
            </div>
            {showToelichting && renderContextField()}
          </div>
        );
      }
      
      case 'MULTI_SELECT_CHIPS': {
          const selected = (answers[question_id] || []) as string[];
          const andersText = answers[`${question_id}_anders`] || '';
          const isAndersSelected = selected.includes(andersOptionLabel);
          
          // Filter out existing 'Anders' options from API to prevent duplicates with our manual button
          const displayOptions = (options || []).filter(opt => !opt.toLowerCase().includes('anders'));

          return (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                  {displayOptions.map(opt => {
                      const isSelected = selected.includes(opt);
                      return (
                        <label 
                            key={opt} 
                            className={`
                                cursor-pointer px-4 py-2.5 rounded-full border transition-all text-sm font-medium select-none flex items-center h-auto min-h-[40px] whitespace-normal break-words touch-manipulation
                                ${isSelected
                                    ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-brand-secondary/50 hover:bg-gray-50'
                                }
                            `}
                        >
                            <input 
                                type="checkbox" 
                                value={opt} 
                                checked={isSelected} 
                                onChange={() => handleAnswerChange(question_id, opt, 'toggle_array')}
                                className="hidden"
                            />
                            {opt}
                        </label>
                      );
                  })}
                  
                  {/* Anders knop */}
                  <label 
                        className={`
                            cursor-pointer px-4 py-2.5 rounded-full border transition-all text-sm font-medium select-none flex items-center h-auto min-h-[40px] whitespace-normal touch-manipulation
                            ${isAndersSelected
                                ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-brand-secondary/50 hover:bg-gray-50'
                            }
                        `}
                    >
                        <input 
                            type="checkbox" 
                            value={andersOptionLabel} 
                            checked={isAndersSelected} 
                            onChange={() => handleAnswerChange(question_id, andersOptionLabel, 'toggle_array')}
                            className="hidden"
                        />
                        {andersOptionLabel}
                   </label>
              </div>

              {/* Anders Input Field - verschijnt als knop geselecteerd is */}
              {isAndersSelected && (
                  <div className="animate-fade-in mt-2">
                      <input 
                        id={`${question_id}_anders_input`} 
                        type="text" 
                        value={andersText} 
                        onChange={(e) => handleAnswerChange(`${question_id}_anders`, e.target.value)} 
                        placeholder="Specificeer uw antwoord..." 
                        className="w-full p-3 border border-brand-primary/50 rounded-lg text-sm bg-white text-[#13261f] placeholder:text-gray-400 focus:ring-2 focus:ring-brand-primary/20 outline-none appearance-none"
                        autoFocus
                      />
                  </div>
              )}

              {errors[question_id] && <p className="text-status-danger text-sm font-medium mt-1">{errors[question_id]}</p>}
              {showToelichting && renderContextField()}
            </div>
          );
      }
      
      case InputType.FREE_TEXT:
      default:
        return (
          <textarea 
            value={value} 
            onChange={(e) => handleAnswerChange(question_id, e.target.value)} 
            placeholder={placeholder || 'Typ hier uw antwoord...'} 
            className="w-full min-h-[120px] p-4 bg-white text-[#13261f] placeholder:text-gray-400 border border-gray-300 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none transition-all resize-y text-base appearance-none"
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
       <section id="clarify" className="space-y-8">
        <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#13261f]">Verduidelijkingsvragen</h3>
            <p className="text-brand-text mt-2 max-w-2xl leading-relaxed">
                Beantwoord alstublieft minimaal <span className="font-bold text-brand-primary">{minAnswersRequired}</span> van de onderstaande vragen. Dit helpt de AI om de nuances van uw situatie beter te begrijpen.
            </p>
        </div>

        <div className="flex flex-col gap-8">
            {safeVragen.sort((a,b) => a.priority - b.priority).map((vraag, index) => (
            <div 
                key={vraag.question_id} 
                className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
                <div className="mb-6">
                    <div className="flex justify-between items-start gap-4">
                         <div className="flex-grow">
                             <h4 className="text-lg md:text-xl font-bold text-[#13261f] leading-snug">
                                {index + 1}. {vraag.vraag}
                                {getEffectiveInputType(vraag) === 'MULTI_SELECT_CHIPS' && (
                                    <span className="ml-2 text-sm font-normal text-gray-500 block md:inline">
                                        (Meerdere opties mogelijk)
                                    </span>
                                )}
                            </h4>
                         </div>

                         {vraag.waarom_relevant && (
                            <div className="flex-shrink-0 mt-1">
                                <Tooltip 
                                    content={<p className="w-64 text-sm font-normal leading-relaxed">{vraag.waarom_relevant}</p>} 
                                    placement="bottom-end"
                                >
                                    <button 
                                        type="button" 
                                        className="p-1.5 rounded-full text-brand-subtle hover:text-brand-primary hover:bg-brand-surface transition-all"
                                        aria-label="Toon uitleg"
                                    >
                                        <InfoIcon className="w-5 h-5" />
                                    </button>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                </div>

                <div>{renderInput(vraag)}</div>
            </div>
            ))}
        </div>
        
        {/* MOBILE UPDATE: Removed sticky positioning for mobile to prevent keyboard issues.
            Only uses sticky on desktop (md:sticky). 
            Added explicit margin top for breathing room. 
        */}
        <div className="md:sticky md:bottom-4 md:z-20 mt-8 bg-white/95 md:bg-white/90 backdrop-blur-md border border-gray-200 p-4 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
            <span id="qa-count" className="text-sm font-semibold text-gray-600">
                {answeredCount} / {safeVragen.length} vragen beantwoord 
                {answeredCount < minAnswersRequired && <span className="text-status-warning ml-1">(nog {minAnswersRequired - answeredCount} te gaan)</span>}
                {answeredCount >= minAnswersRequired && <span className="text-status-safe ml-1">✓ Voldoende</span>}
            </span>
            <button 
                type="submit" 
                id="refine" 
                className="w-full md:w-auto btn-primary shadow-lg shadow-brand-primary/30" 
                disabled={isSubmitDisabled}
            >
                Analyse Verfijnen
            </button>
        </div>
       </section>
    </form>
  );
};

export default QuestionForm;