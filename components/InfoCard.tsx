import React from 'react';

interface InfoCardProps {
  title: string;
  value: string | number | React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  subValue?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon, className = "", subValue }) => {
  return (
    <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 flex flex-col items-start hover:border-radio-500/50 transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-2 mb-2 text-slate-400 text-sm font-semibold uppercase tracking-wider">
        {icon}
        <span>{title}</span>
      </div>
      <div className="text-2xl md:text-3xl font-bold text-white font-mono break-all">
        {value}
      </div>
      {subValue && (
        <div className="mt-2 text-sm text-slate-400">
          {subValue}
        </div>
      )}
    </div>
  );
};