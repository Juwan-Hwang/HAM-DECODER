import React from 'react';
import { CallsignAnalysis, RadioType } from '../types';
import { Lang, translations } from '../services/translations';

interface Props {
  data: CallsignAnalysis;
  lang: Lang;
}

export const DetailGrid: React.FC<Props> = ({ data, lang }) => {
  const t = translations[lang];

  const TYPE_NAME_MAP: Record<RadioType, string> = {
    [RadioType.General]: t.type_general,
    [RadioType.Space]: t.type_space,
    [RadioType.Repeater]: t.type_repeater,
    [RadioType.Reserved]: t.type_reserved,
    [RadioType.Unknown]: t.type_unknown
  };

  return (
    <div className="glass-panel p-6 w-full decode-animation">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-4 bg-accent rounded-full shadow-[0_0_10px_rgba(0,212,170,0.5)]"></div>
        <h3 className="text-xs font-bold text-muted uppercase tracking-widest">{t.detail_title}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
        
        {/* Row 1: Region */}
        <div className="flex justify-between items-center py-4 border-b border-white/5 group hover:border-white/10 transition-colors md:col-span-2">
          <span className="text-muted text-sm font-medium">{t.region}</span>
          <div className="text-right">
             <span className="font-semibold text-fg tracking-wide block">{data.province}</span>
          </div>
        </div>

        {/* Row 2: Category */}
        <div className="flex justify-between items-center py-4 border-b border-white/5 group hover:border-white/10 transition-colors">
          <span className="text-muted text-sm font-medium">{t.category}</span>
          <div className="text-right flex items-center justify-end gap-2">
            <span className="font-semibold text-fg text-sm">{TYPE_NAME_MAP[data.typeCategory]}</span>
          </div>
        </div>

        {/* Row 3: Call Area (Restored Feature) */}
        <div className="flex justify-between items-center py-4 border-b border-white/5 group hover:border-white/10 transition-colors">
            <span className="text-muted text-sm font-medium">{t.zone_label}</span>
            <div className="text-right">
                <span className="font-mono font-bold text-fg">Area {data.zone}</span>
            </div>
        </div>

        {/* Row 4: Zones (ITU / CQ) - Always visible now */}
        <div className="flex justify-between items-center py-4 border-b border-white/5 group hover:border-white/10 transition-colors">
          <span className="text-muted text-sm font-medium">{t.itu_zone} / {t.cq_zone}</span>
          <span className="font-mono font-bold text-accent text-sm">
             {data.ituZone || '--'} / {data.cqZone || '--'}
          </span>
        </div>

        {/* Row 5: Rank (Conditional) */}
        {data.issuanceRank && (
            <div className="flex justify-between items-center py-4 border-b border-white/5 group hover:border-white/10 transition-colors">
              <span className="text-muted text-sm font-medium">{t.rank}</span>
              <span className="font-mono font-bold text-accent text-lg drop-shadow-[0_0_8px_rgba(0,212,170,0.3)]">
                 #{data.issuanceRank.toString().padStart(4, '0')}
              </span>
            </div>
        )}

        {/* Row 6: Format */}
        <div className="flex justify-between items-center py-4 border-b border-white/5 group hover:border-white/10 transition-colors">
            <span className="text-muted text-sm font-medium">{t.format}</span>
            <div className="text-right">
                <span className="text-fg">{data.suffix.length}-Char {t.suffix}</span>
            </div>
        </div>
        
        {/* Row 7: Continent (Conditional) */}
        {data.contient && (
             <div className="flex justify-between items-center py-4 border-b border-white/5 group hover:border-white/10 transition-colors">
                <span className="text-muted text-sm font-medium">{t.continent}</span>
                <span className="font-mono font-bold text-fg">{data.contient}</span>
             </div>
        )}
        
        {/* Row 8: Phonetics */}
        <div className="flex flex-col py-5 md:col-span-2">
           <span className="text-muted text-[10px] uppercase tracking-wider mb-3">{t.phonetics}</span>
           <div className="flex flex-wrap gap-2">
              {data.phonetic.map((word, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-muted hover:bg-white/10 hover:border-accent/30 transition-all cursor-default group">
                      <b className="text-accent mr-1 group-hover:scale-110 transition-transform">{word.charAt(0)}</b>{word.slice(1)}
                  </span>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};