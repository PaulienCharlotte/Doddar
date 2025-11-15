import React from 'react';

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const getScoreColor = (s: number) => {
    if (s > 70) return 'stroke-status-safe';
    if (s > 40) return 'stroke-status-warning';
    return 'stroke-status-danger';
  };

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  // Use a 3/4 circle for the gauge effect
  const gaugeCircumference = circumference * 0.75;
  const offset = gaugeCircumference - (score / 100) * gaugeCircumference;

  const colorClass = getScoreColor(score);

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 140 140">
        {/* Background track */}
        <circle
          className="stroke-current text-brand-accent"
          cx="70"
          cy="70"
          r={radius}
          fill="transparent"
          strokeWidth="12"
          strokeDasharray={gaugeCircumference}
          strokeDashoffset={0}
          transform="rotate(135 70 70)"
          strokeLinecap="round"
        />
        {/* Foreground score bar */}
        <circle
          className={`stroke-current ${colorClass} transition-all duration-1000 ease-out`}
          cx="70"
          cy="70"
          r={radius}
          fill="transparent"
          strokeWidth="12"
          strokeDasharray={gaugeCircumference}
          strokeDashoffset={offset}
          transform="rotate(135 70 70)"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-4xl font-bold ${colorClass.replace('stroke-', 'text-')}`}>{score}</span>
      </div>
    </div>
  );
};

export default ScoreGauge;