import React, { useMemo } from 'react';
import { CallsignAnalysis } from '../types';
import { Lang, translations } from '../services/translations';
import { PART2_ORDER } from '../services/coreLogic';

interface Props {
  data: CallsignAnalysis;
  lang: Lang;
}

export const RegionStats: React.FC<Props> = ({ data, lang }) => {
  const t = translations[lang];

  const stats = useMemo(() => {
    if (!data.regionTotalCapacity || !data.issuanceRank || !data.maxPerType) return null;

    const used = data.issuanceRank;
    const total = data.regionTotalCapacity;
    const percent = Math.min(100, Math.max(0, (used / total) * 100));
    
    // Determine which "Block" we are in (1 to 11)
    const currentBlockIndex = PART2_ORDER.indexOf(data.typeLetter);
    
    return {
      used,
      total,
      percent: percent.toFixed(2),
      currentBlockIndex,
    };
  }, [data]);

  if (!stats) return null;

  return (
    <div className="glass-panel p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
           <div className="w-1 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
           <h3 className="text-xs font-bold text-muted uppercase tracking-widest">{t.region_stats_title}</h3>
        </div>
        <div className="text-[10px] font-mono text-muted bg-white/5 px-2 py-1 rounded">
            {data.province.split('(')[0]} AREA
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
         <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
             <div className="text-[10px] text-blue-400 uppercase tracking-wider font-bold mb-1">{t.region_occupancy}</div>
             <div className="text-3xl font-mono text-blue-100 font-bold">{stats.percent}<span className="text-sm ml-1 opacity-50">%</span></div>
         </div>
         <div className="p-4 rounded-xl bg-white/5 border border-white/5">
             <div className="text-[10px] text-muted uppercase tracking-wider font-bold mb-1">{t.region_capacity}</div>
             <div className="text-3xl font-mono text-muted/80 font-bold tracking-tighter">{stats.total.toLocaleString()}</div>
         </div>
      </div>

      {/* Segmented Progress Bar for all 11 Types */}
      <div className="flex gap-1 h-3 mb-2 w-full">
        {PART2_ORDER.map((letter, index) => {
           let bgClass = "bg-white/5"; // Future
           let glowClass = "";
           
           if (index < stats.currentBlockIndex) {
               bgClass = "bg-blue-500 opacity-60"; // Past (Full)
           } else if (index === stats.currentBlockIndex) {
               bgClass = "bg-blue-400 animate-pulse"; // Current
               glowClass = "shadow-[0_0_8px_rgba(96,165,250,0.6)] z-10";
           }

           return (
             <div key={letter} className="flex-1 relative group">
                <div className={`w-full h-full rounded-sm transition-all duration-500 ${bgClass} ${glowClass}`}></div>
                {/* Tooltip for segment */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                    <div className="bg-black/90 text-white text-[9px] px-2 py-1 rounded border border-white/10 font-mono whitespace-nowrap backdrop-blur-md">
                        SERIES {letter}
                    </div>
                </div>
             </div>
           );
        })}
      </div>
      
      <div className="flex justify-between text-[9px] font-mono text-muted uppercase tracking-widest px-1">
          <span>G-Series (Start)</span>
          <span>L-Series (End)</span>
      </div>

    </div>
  );
};