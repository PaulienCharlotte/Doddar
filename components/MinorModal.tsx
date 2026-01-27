
import React, { useRef, useEffect } from 'react';
import type { AgeProfile } from '../data/ageProfiles';
import { CheckIcon } from './icons/CheckIcon';

interface MinorModalProps {
    uiPayload: AgeProfile;
    onClose: () => void;
    onWithAdult: () => void;
}

const MinorModal: React.FC<MinorModalProps> = ({ uiPayload, onClose, onWithAdult }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog) {
            dialog.showModal();
        }
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
            if (dialog?.open) {
                dialog.close();
            }
        };
    }, []);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    };

    // Helper functie om specifieke teksten (URL's en telefoonnummers) klikbaar te maken
    const renderTipContent = (text: string) => {
        // Regex splitst op telefoonnummer of website URL en behoudt de separator in de array
        const parts = text.split(/(0800-0432|kindertelefoon\.nl)/g);
        
        return (
            <span>
                {parts.map((part, index) => {
                    if (part === 'kindertelefoon.nl') {
                        return (
                            <a 
                                key={index}
                                href="https://www.kindertelefoon.nl" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-[#58B895] hover:underline font-bold"
                            >
                                {part}
                            </a>
                        );
                    }
                    if (part === '0800-0432') {
                         return (
                            <a 
                                key={index}
                                href="tel:08000432" 
                                className="text-[#58B895] hover:underline font-bold"
                            >
                                {part}
                            </a>
                        );
                    }
                    return part;
                })}
            </span>
        );
    };

    return (
        <dialog 
            ref={dialogRef} 
            className="minor-modal-backdrop bg-transparent p-0 m-0 w-full h-full max-w-none max-h-none flex items-center justify-center backdrop:bg-[#1E2925]/60 backdrop:backdrop-blur-sm transition-all"
            onClick={handleBackdropClick}
            onClose={onClose}
        >
            <div className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-xl p-8 md:p-12 border border-[#B8E2D1] relative animate-fade-in flex flex-col" role="dialog" aria-labelledby="m-title" aria-modal="true">
                <header className="mb-6">
                    <h2 id="m-title" className="text-2xl md:text-3xl font-bold text-[#13261f] tracking-tight">{uiPayload.title}</h2>
                </header>
                
                <div className="space-y-6 flex-grow">
                    <p id="m-msg" className="text-lg text-[#4B5563] leading-relaxed font-normal">
                        {uiPayload.message}
                    </p>
                    
                    <div className="bg-[#F2F9F6] p-6 rounded-2xl border border-[#E5E7EB] shadow-sm">
                        <ul className="space-y-4">
                            {uiPayload.tips.map((tip, index) => (
                                <li key={index} className="flex items-start gap-4 text-[#374151] leading-snug">
                                    <div className="mt-0.5 flex-shrink-0 text-[#58B895] bg-white rounded-full p-1 shadow-sm">
                                        <CheckIcon className="w-4 h-4" />
                                    </div>
                                    <span className="text-base font-medium">{renderTipContent(tip)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                     {Object.keys(uiPayload.links).length > 0 && (
                        <p className="text-sm text-[#6B7280] text-center pt-2">
                            Je kunt ook anoniem contact opnemen met{" "}
                            {Object.entries(uiPayload.links).map(([name, url], index, arr) => (
                                <React.Fragment key={name}>
                                    <a className="font-bold text-[#58B895] hover:underline transition-colors" href={url} target="_blank" rel="noopener noreferrer">
                                        {name}
                                    </a>
                                    {index < arr.length - 2 ? ', ' : (index < arr.length - 1 ? ' of ' : '')}
                                </React.Fragment>
                            ))}.
                        </p>
                    )}
                </div>

                {/* Grid layout zorgt voor exact gelijke breedte buttons */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#E5E7EB]">
                    <button className="btn-outline w-full justify-center py-4 text-base" onClick={onClose}>
                        {uiPayload.cta.acknowledge}
                    </button>
                    <button className="btn-primary w-full justify-center py-4 shadow-lg shadow-[#58B895]/20 text-base" onClick={onWithAdult}>
                        {uiPayload.cta.withAdult}
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default MinorModal;
