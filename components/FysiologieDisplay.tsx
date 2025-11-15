import React from 'react';
import type { Fysiologie } from '../types';
import { PhysiologyIcon } from './icons/PhysiologyIcon';

interface FysiologieDisplayProps {
    fysiologie: Fysiologie;
}

const ProgressBar: React.FC<{ label: string; value: number }> = ({ label, value }) => {
    const getColor = (val: number) => {
        if (val > 0.7) return 'bg-status-danger';
        if (val > 0.4) return 'bg-status-warning';
        return 'bg-brand-secondary';
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-brand-text capitalize">{label}</span>
                <span className="text-sm font-bold text-brand-subtle">{Math.round(value * 100)}%</span>
            </div>
            <div className="w-full bg-brand-accent rounded-full h-2.5">
                <div
                    className={`h-2.5 rounded-full ${getColor(value)} transition-width duration-500`}
                    style={{ width: `${value * 100}%` }}
                ></div>
            </div>
        </div>
    );
};

const FysiologieDisplay: React.FC<FysiologieDisplayProps> = ({ fysiologie }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black flex items-center gap-2">
                <PhysiologyIcon className="w-5 h-5" /> Fysiologie
            </h3>

            {fysiologie.stressniveau != null && <ProgressBar label="Stressniveau" value={fysiologie.stressniveau} />}
            {fysiologie.slaapkwaliteit != null && <ProgressBar label="Slaapkwaliteit" value={fysiologie.slaapkwaliteit} />}
            {fysiologie.lichamelijke_spanning != null && <ProgressBar label="Lichamelijke Spanning" value={fysiologie.lichamelijke_spanning} />}

            {fysiologie.trend && (
                <div className="text-sm">
                    <span className="font-semibold text-brand-subtle">Trend: </span>
                    <span className="font-bold capitalize text-brand-text">{fysiologie.trend}</span>
                </div>
            )}
        </div>
    );
};

export default FysiologieDisplay;