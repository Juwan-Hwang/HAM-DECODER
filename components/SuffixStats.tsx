import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { CallsignAnalysis } from '../types';
import { Lang, translations } from '../services/translations';

interface Props {
  data: CallsignAnalysis;
  lang: Lang;
}

export const SuffixStats: React.FC<Props> = ({ data, lang }) => {
  const t = translations[lang];

  const stats = useMemo(() => {
    if (!data.maxPerType || data.currentTypeRank === undefined) return null;

    const rankInCurrentType = data.currentTypeRank;
    const maxPerType = data.maxPerType;
    const percentage = Math.min(100, Math.max(0, (rankInCurrentType / maxPerType) * 100));
    
    // Parse range string if available, otherwise fallback
    let startSuffix = "AAA";
    let endSuffix = "ZZZ";
    
    if (data.rangeString) {
        const parts = data.rangeString.split('~');
        if (parts.length === 2) {
            startSuffix = parts[0];
            endSuffix = parts[1];
        }
    }

    return {
        rank: rankInCurrentType,
        total: maxPerType,
        remaining: maxPerType - rankInCurrentType,
        percent: percentage.toFixed(2),
        startSuffix,
        endSuffix
    };
  }, [data]);

  const chartData = useMemo(() => {
    if (!stats) return [];
    return [{
      name: 'Allocation',
      used: stats.rank,
      remaining: stats.remaining,
      total: stats.total
    }];
  }, [stats]);

  if (!stats) return null;

  return (
    <div className="glass-panel p-6 w-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-4 bg-accent rounded-full shadow-[0_0_10px_rgba(0,212,170,0.5)]"></div>
        <h3 className="text-xs font-bold text-muted uppercase tracking-widest">
            {t.resource_title} <span className="text-accent/80">({data.typeLetter} {t.series_label})</span>
        </h3>
      </div>
      
      {/* Progress Bar Container */}
      <div className="mb-8 p-6 bg-black/20 rounded-2xl border border-white/5 relative overflow-hidden">
        {/* Text Stats */}
        <div className="flex justify-between text-xs mb-4 font-mono relative z-10">
          <span className="text-muted uppercase tracking-wider">{t.progress}</span>
          <span>
            {stats.rank.toLocaleString()} <span className="text-muted">/ {stats.total.toLocaleString()}</span>
            <span className="text-accent ml-3 font-bold">{stats.percent}%</span>
          </span>
        </div>
        
        {/* Recharts Bar */}
        <div className="h-12 w-full relative z-10">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                barSize={32}
              >
                <XAxis type="number" hide domain={[0, 'dataMax']} />
                <YAxis type="category" dataKey="name" hide />
                <Tooltip 
                  cursor={false}
                  contentStyle={{ 
                      backgroundColor: 'rgba(20, 20, 20, 0.9)', 
                      backdropFilter: 'blur(12px)',
                      borderColor: 'rgba(255,255,255,0.1)', 
                      borderRadius: '12px',
                      color: '#e8f0f5',
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '12px',
                      padding: '8px 12px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                  }}
                  formatter={(value: number, name: string) => {
                      if (name === 'used') return [`${value.toLocaleString()}`, t.issued];
                      if (name === 'remaining') return [`${value.toLocaleString()}`, t.remaining];
                      return [value, name];
                  }}
                  itemStyle={{ padding: 0 }}
                />
                
                {/* Used Bar */}
                <Bar dataKey="used" stackId="a" radius={[8, 0, 0, 8]} animationDuration={1000}>
                     <Cell fill="#00d4aa" />
                </Bar>
                
                {/* Remaining Bar */}
                <Bar dataKey="remaining" stackId="a" fill="#1d1d1f" radius={[0, 8, 8, 0]} animationDuration={1000} />
              </BarChart>
           </ResponsiveContainer>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-4 -top-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Metrics Blocks */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
          <div className="text-lg font-bold text-muted mono">{stats.startSuffix}</div>
          <div className="text-[9px] text-muted/60 mt-1 uppercase tracking-widest">{t.start}</div>
        </div>
        
        <div className="p-4 bg-accent/10 rounded-2xl border border-accent/30 shadow-[0_0_20px_rgba(0,212,170,0.1)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors"></div>
          <div className="relative z-10">
            <div className="text-lg font-bold text-white mono">{data.suffix}</div>
            <div className="text-[9px] text-accent mt-1 uppercase tracking-widest font-bold">{t.current}</div>
          </div>
        </div>
        
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
          <div className="text-lg font-bold text-muted mono">{stats.endSuffix}</div>
          <div className="text-[9px] text-muted/60 mt-1 uppercase tracking-widest">{t.end}</div>
        </div>
      </div>
    </div>
  );
};