
import React, { useRef, useEffect } from 'react';
import type { AgeProfile } from '../data/ageProfiles';

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

    return (
        <dialog 
            ref={dialogRef} 
            className="minor-modal-backdrop" 
            onClick={handleBackdropClick}
            onClose={onClose}
        >
            <div className="minor-modal-content" role="dialog" aria-labelledby="m-title" aria-modal="true">
                <header>
                    <h2 id="m-title">{uiPayload.title}</h2>
                </header>
                <div className="body">
                    <p id="m-msg">{uiPayload.message}</p>
                    <div className="tips">
                        <ul>
                            {uiPayload.tips.map((tip, index) => <li key={index}>{tip}</li>)}
                        </ul>
                         {Object.keys(uiPayload.links).length > 0 && (
                            <p>
                                Je kunt ook anoniem contact opnemen met{" "}
                                {Object.entries(uiPayload.links).map(([name, url], index, arr) => (
                                    <React.Fragment key={name}>
                                        <a className="link" href={url} target="_blank" rel="noopener noreferrer">
                                            {name}
                                        </a>
                                        {index < arr.length - 2 ? ', ' : (index < arr.length - 1 ? ' of ' : '')}
                                    </React.Fragment>
                                ))}.
                            </p>
                        )}
                    </div>
                </div>
                <div className="footer">
                    <button className="btn-outline" onClick={onClose}>{uiPayload.cta.acknowledge}</button>
                    <button className="btn-primary" onClick={onWithAdult}>{uiPayload.cta.withAdult}</button>
                </div>
            </div>
        </dialog>
    );
};

export default MinorModal;
