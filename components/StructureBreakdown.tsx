import React from 'react';
import { CallsignAnalysis } from '../types';
import { Lang, translations } from '../services/translations';

interface Props {
  data: CallsignAnalysis;
  lang: Lang;
}

export const StructureBreakdown: React.FC<Props> = ({ data, lang }) => {
  const t = translations[lang];
  const hasType = !!data.typeLetter;

  return (
    <div className="glass-panel p-8 text-center w-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-50"></div>
      
      <h3 className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-8">{t.structure_title}</h3>
      
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 select-none">
        {/* Block 1: Prefix */}
        <div className="flex flex-col items-center gap-3 group cursor-default">
           <div className="w-16 h-20 md:w-24 md:h-24 px-2 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-3xl md:text-5xl font-mono font-bold text-accent shadow-[0_0_20px_rgba(0,212,170,0.1)] transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/20 group-hover:shadow-[0_0_30px_rgba(0,212,170,0.2)]">
             {data.prefix}
           </div>
           <span className="text-[10px] font-bold text-muted uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-accent transition-all">{t.prefix}</span>
        </div>

        <div className="w-2 h-2 rounded-full bg-white/10"></div>

        {/* Block 2: Type (Optional) */}
        {hasType && (
            <>
                <div className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="w-16 h-20 md:w-20 md:h-24 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex items-center justify-center text-4xl md:text-5xl font-mono font-bold text-blue-400 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-500/15 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        {data.typeLetter}
                    </div>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-blue-400 transition-all">{t.type}</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-white/10"></div>
            </>
        )}

        {/* Block 3: Zone */}
        <div className="flex flex-col items-center gap-3 group cursor-default">
            <div className="w-16 h-20 md:w-20 md:h-24 rounded-2xl bg-purple-500/5 border border-purple-500/20 flex items-center justify-center text-4xl md:text-5xl font-mono font-bold text-purple-400 transition-all duration-300 group-hover:scale-105 group-hover:bg-purple-500/15 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                {data.zone}
            </div>
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-purple-400 transition-all">{t.zone}</span>
        </div>

        <div className="w-2 h-2 rounded-full bg-white/10"></div>

        {/* Block 4: Suffix */}
        <div className="flex flex-col items-center gap-3 group cursor-default">
            <div className="h-20 md:h-24 min-w-[5rem] px-6 rounded-2xl bg-orange-500/5 border border-orange-500/20 flex items-center justify-center text-4xl md:text-5xl font-mono font-bold text-orange-400 transition-all duration-300 group-hover:scale-105 group-hover:bg-orange-500/15 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                {data.suffix}
            </div>
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest opacity-60 group-hover:opacity-100 group-hover:text-orange-400 transition-all">{t.suffix}</span>
        </div>
      </div>
    </div>
  );
};