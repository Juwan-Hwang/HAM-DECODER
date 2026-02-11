import React, { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { CallsignAnalysis } from '../types';
import { Lang, translations } from '../services/translations';

interface RankChartProps {
  data: CallsignAnalysis;
  lang: Lang;
}

export const RankChart: React.FC<RankChartProps> = ({ data, lang }) => {
  const t = translations[lang];

  const chartData = useMemo(() => {
    // We now rely on data provided by the analyzer (which gets it from coreLogic)
    if (!data.maxPerType || data.currentTypeRank === undefined) return [];

    const used = data.currentTypeRank;
    const remaining = data.maxPerType - used;
    
    return [
      {
        name: 'Distribution',
        used: used,
        remaining: remaining,
        total: data.maxPerType
      }
    ];
  }, [data]);

  if (chartData.length === 0) return null;

  const typeLabel = `${data.prefix}${data.typeLetter}${data.zone}`;

  return (
    <div className="glass-panel p-6 w-full h-80 flex flex-col relative overflow-hidden group">
      {/* Decorative background glow */}
      <div className="absolute -right-10 -top-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-700"></div>

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
           <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-1">
             {t.chart_title}
           </h3>
           <div className="text-fg font-mono text-lg font-semibold">{typeLabel} {t.type_label}</div>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-accent/5 border border-accent/10">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            <span className="text-[9px] font-mono text-accent font-bold tracking-wider uppercase">{t.live_tag}</span>
        </div>
      </div>
      
      <div className="flex-grow w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            barSize={48}
          >
            <XAxis type="number" hide domain={[0, 'dataMax']} />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip 
              cursor={false}
              contentStyle={{ 
                  backgroundColor: 'rgba(20, 20, 20, 0.8)', 
                  backdropFilter: 'blur(12px)',
                  borderColor: 'rgba(255,255,255,0.1)', 
                  borderRadius: '12px',
                  color: '#e8f0f5',
                  fontFamily: '"JetBrains Mono", monospace',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  fontSize: '12px',
                  padding: '12px',
                  border: '1px solid rgba(255,255,255,0.1)'
              }}
              formatter={(value: number, name: string) => {
                  if (name === 'used') return [`${value.toLocaleString()}`, t.issued];
                  if (name === 'remaining') return [`${value.toLocaleString()}`, t.remaining];
                  return [value, name];
              }}
              itemStyle={{ padding: '2px 0' }}
            />
            
            <Bar dataKey="used" stackId="a" radius={[12, 0, 0, 12]} animationDuration={1500}>
                 <Cell fill="#00d4aa" />
            </Bar>
            
            <Bar dataKey="remaining" stackId="a" fill="#1d1d1f" radius={[0, 12, 12, 0]} animationDuration={1500} />
            
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend / Stats Footer */}
      <div className="grid grid-cols-2 gap-4 mt-2 relative z-10 border-t border-white/5 pt-4">
          <div>
              <div className="text-[10px] text-muted uppercase tracking-wider mb-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent"></span> {t.issued}
              </div>
              <div className="text-2xl font-mono font-bold text-accent">
                {chartData[0].used.toLocaleString()}
              </div>
          </div>
          <div className="text-right">
              <div className="text-[10px] text-muted uppercase tracking-wider mb-1 flex items-center justify-end gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#1d1d1f] border border-white/20"></span> {t.total}
              </div>
              <div className="text-2xl font-mono font-bold text-fg opacity-40">
                {chartData[0].total.toLocaleString()}
              </div>
          </div>
      </div>
    </div>
  );
};