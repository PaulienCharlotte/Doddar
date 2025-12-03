
import React, { useState, useMemo, useCallback } from 'react';
import type { Verduidelijkingsvraag } from '../types';
import { InputType } from '../types';

interface QuestionFormProps {
  vragen: Verduidelijkingsvraag[];
  minAnswersRequired: number;
  onSubmit: (answers: Record<string, string>) => void;
  answers: Record<string, any>;
  onAnswersChange: (answers: Record<string, any>) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ vragen, minAnswersRequired, onSubmit, answers, onAnswersChange }) => {
  const safeVragen = (vragen || []).filter(v => v && v.vraag); // Ensure question exists
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getEffectiveInputType = (vraag: Verduidelijkingsvraag): string => {
    const qLower = vraag.vraag.toLowerCase();
    
    // Some heuristics to enforce nicer UI elements if the model returns FREE_TEXT but the question is clearly structural
    if (vraag.input_type === InputType.FREE_TEXT) {
        if (qLower.includes('hoe vaak') || qLower.includes('frequentie')) return 'SEGMENTED_CONTROL';
        if (qLower.includes('op een schaal van') || qLower.includes('hoe voelt u zich')) return InputType.SCALE_0_4;
        if ((qLower.startsWith('heeft u') || qLower.startsWith('is er') || qLower.startsWith('zijn er')) &&
            !qLower.includes('welke') && !qLower.includes('voorbeelden') && !qLower.includes('omschrijf')) {
            return InputType.YES_NO;
        }
    }
    
    if (vraag.input_type === InputType.MULTIPLE_CHOICE) return 'MULTI_SELECT_CHIPS';
    
    return vraag.input_type;
  };
  
  const andersOptionLabel = 'Anders, namelijk…';

  const isQuestionAnswered = useCallback((vraag: Verduidelijkingsvraag, currentAnswers: Record<string, any>): boolean => {
    const value = currentAnswers[vraag.question_id];
    if (value !== undefined && value !== null && String(value).trim() !== '') return true;
    
    // Check for followup answers which also count
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
              return "Vul de toelichting in voor ‘Anders, namelijk…’.";
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
            const finalValues = selectedOptions
              .filter(opt => opt !== andersOptionLabel)
              .concat(selectedOptions.includes(andersOptionLabel) && andersText ? [andersText] : []);
            finalAnswer = JSON.stringify(finalValues);
         } else {
             finalAnswer = String(mainValue || ''); // Use empty string if main value is not set
         }
         
         if (toelichting) {
            finalAnswer += `${finalAnswer ? '. ' : ''}Toelichting: ${toelichting}`;
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

    // Only show the toelichting field for non-free-text questions
    const showToelichting = effectiveType !== InputType.FREE_TEXT;

    const toelichtingField = showToelichting ? (
      <div className="mt-5 pt-4 border-t border-gray-100">
        <label htmlFor={`${question_id}_toelichting`} className="block text-xs font-semibold text-brand-subtle uppercase tracking-wide mb-2">
            Aanvullende context (optioneel)
        </label>
        <textarea
            id={`${question_id}_toelichting`}
            value={toelichtingValue}
            onChange={(e) => handleAnswerChange(`${question_id}_toelichting`, e.target.value)}
            placeholder="Wilt u hier nog iets over kwijt? (Bijv. 'Vooral in het weekend...')"
            className="q-followup-input"
            rows={2}
        />
      </div>
    ) : null;

    switch (effectiveType) {
      case InputType.YES_NO:
        return (
          <div>
            <div className="q-radio-group">
              {['Ja', 'Nee'].map(opt => (
                <div key={opt} className="q-radio-wrapper">
                  <input type="radio" id={`${question_id}_${opt}`} name={question_id} value={opt} checked={value === opt} onChange={(e) => handleAnswerChange(question_id, e.target.value)} className="q-radio-input"/>
                  <label htmlFor={`${question_id}_${opt}`} className="q-radio-label">{opt}</label>
                </div>
              ))}
            </div>
            {toelichtingField}
          </div>
        );

      case InputType.SCALE_0_4: {
        const scaleOptions = (options && options.length === 5) ? options : ['1', '2', '3', '4', '5'];
        return (
          <div>
            <div className="q-radio-group q-scale-group">
              {scaleOptions.map((opt) => (
                <div key={opt} className="q-radio-wrapper flex-1">
                  <input type="radio" id={`${question_id}_${opt}`} name={question_id} value={opt} checked={value === opt} onChange={(e) => handleAnswerChange(question_id, e.target.value)} className="q-radio-input"/>
                  <label htmlFor={`${question_id}_${opt}`} className="q-radio-label q-scale-label">{opt}</label>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-brand-subtle mt-1 px-1">
                <span>Min / Nooit / Laag</span>
                <span>Max / Altijd / Hoog</span>
            </div>
            {toelichtingField}
          </div>
        );
      }

      case 'SEGMENTED_CONTROL': {
        const segmentOptions = (options && options.length > 0) ? options : ['Zelden', 'Soms', 'Regelmatig', 'Vaak'];
        
        return (
          <div>
            <div className="q-segmented-control">
              {segmentOptions.map(opt => (
                <div key={opt} className="q-radio-wrapper">
                  <input type="radio" id={`${question_id}_${opt}`} name={question_id} value={opt} checked={value === opt} onChange={(e) => handleAnswerChange(question_id, e.target.value)} className="q-radio-input"/>
                  <label htmlFor={`${question_id}_${opt}`} className="q-radio-label">{opt}</label>
                </div>
              ))}
            </div>
            {toelichtingField}
          </div>
        );
      }
      
      case 'MULTI_SELECT_CHIPS': {
          const selected = (answers[question_id] || []) as string[];
          const andersText = answers[`${question_id}_anders`] || '';
          const isAndersSelected = selected.includes(andersOptionLabel);
          
          return (
            <>
              <div className="chips">
                  {(options || []).map(opt => (
                        <label key={opt}><input type="checkbox" value={opt} checked={selected.includes(opt)} onChange={() => handleAnswerChange(question_id, opt, 'toggle_array')}/><span>{opt}</span></label>
                  ))}
                  <span className="chip-other">
                      <label><input type="checkbox" value={andersOptionLabel} checked={isAndersSelected} onChange={() => handleAnswerChange(question_id, andersOptionLabel, 'toggle_array')}/><span>{andersOptionLabel}</span></label>
                      <input id={`${question_id}_anders_input`} type="text" value={andersText} onChange={(e) => handleAnswerChange(`${question_id}_anders`, e.target.value)} placeholder="Specificeer uw antwoord..." className="other-input" disabled={!isAndersSelected}/>
                  </span>
              </div>
              {errors[question_id] && <p className="q-error">{errors[question_id]}</p>}
              {toelichtingField}
            </>
          );
      }
      case InputType.FREE_TEXT:
      default:
        return (
          <textarea value={value} onChange={(e) => handleAnswerChange(question_id, e.target.value)} placeholder={placeholder || 'Uw antwoord...'} className="q-input w-full min-h-[80px] resize-y"/>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
       <section id="clarify" className="qa-scope">
        <h3 className="qa-title">Verduidelijkingsvragen</h3>
        <p className="qa-sub">
            Beantwoord alstublieft minimaal {minAnswersRequired} van de onderstaande vragen voor een nauwkeuriger analyse.
        </p>
        <div className="qa-grid">
            {safeVragen.sort((a,b) => a.priority - b.priority).map((vraag, index) => (
            <div key={vraag.question_id} className="q-card" role="group" aria-labelledby={vraag.question_id}>
                <h4 id={vraag.question_id} className="q-title">
                  {index + 1}. {vraag.vraag}
                  {getEffectiveInputType(vraag) === 'MULTI_SELECT_CHIPS' && <span className="q-note">(Meerdere opties mogelijk)</span>}
                </h4>
                
                {vraag.waarom_relevant ? (<p className="q-help">{vraag.waarom_relevant}</p>) : (<div />)}

                <div className="q-spacer" />

                <div>{renderInput(vraag)}</div>
            </div>
            ))}
        </div>
        
        <div className="qa-footer">
            <span id="qa-count" aria-live="polite">
                {answeredCount} / {safeVragen.length} vragen beantwoord ({minAnswersRequired} vereist)
            </span>
            <button type="submit" id="refine" className="btn-primary" disabled={isSubmitDisabled}>Verfijn Analyse</button>
        </div>
       </section>
    </form>
  );
};

export default QuestionForm;
