import React from 'react';
import { ISSUANCE_ORDER } from '../services/callsignData';
import { CallsignAnalysis } from '../types';
import { Lang, translations } from '../services/translations';

interface Props {
  data: CallsignAnalysis;
  lang: Lang;
}

export const HistorySequence: React.FC<Props> = ({ data, lang }) => {
  const t = translations[lang];
  const currentIndex = ISSUANCE_ORDER.indexOf(data.typeLetter);

  if (currentIndex === -1) return null;

  return (
    <div className="glass-panel p-6 w-full relative">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-1 h-4 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
        <h3 className="text-xs font-bold text-muted uppercase tracking-widest">{t.history_title}</h3>
      </div>
      
      {/* 
         Use a container with padding to prevent glow clipping.
         We remove overflow-hidden from parent to allow shadows to breathe.
      */}
      <div className="relative w-full overflow-x-auto no-scrollbar pb-4 pt-2 px-2">
        
        <div className="flex relative min-w-max gap-6">
            {/* Connection Line: Positioned absolutely relative to the flex container.
                The boxes are h-12 (48px). Center is 24px. 
            */}
            <div className="absolute top-6 left-0 w-full h-[2px] bg-white/10 -z-10 rounded-full"></div>

            {ISSUANCE_ORDER.map((letter, index) => {
                let boxStyles = "";
                let labelStyles = "";
                let labelText = "";
                let glow = "";
                
                if (index < currentIndex) {
                    // Past
                    boxStyles = "bg-white/5 border-white/10 text-muted opacity-50 grayscale scale-95";
                    labelStyles = "text-muted/40";
                    labelText = t.seq_done;
                } else if (index === currentIndex) {
                    // Current
                    boxStyles = "bg-accent text-bg border-accent scale-110 font-black ring-4 ring-accent/20 z-10";
                    // Full glow around the box
                    glow = "shadow-[0_0_30px_rgba(0,212,170,0.5)]"; 
                    labelStyles = "text-accent font-bold";
                    labelText = t.seq_now;
                } else {
                    // Future
                    boxStyles = "bg-black/40 border-white/5 text-muted opacity-30 scale-90";
                    labelStyles = "text-muted/20";
                    labelText = t.seq_wait;
                }

                return (
                    <div key={letter} className="flex flex-col items-center group relative">
                        {/* The Box */}
                        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-lg transition-all duration-500 ease-out ${boxStyles} ${glow}`}>
                            {letter}
                        </div>
                        
                        {/* The Label */}
                        <div className={`mt-4 text-[9px] font-mono uppercase tracking-widest transition-colors ${labelStyles}`}>
                            {labelText}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};