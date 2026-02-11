import React, { useState, useEffect } from 'react';
import { analyzeCallsign } from './services/analyzer';
import { CallsignAnalysis } from './types';
import { StructureBreakdown } from './components/StructureBreakdown';
import { DetailGrid } from './components/DetailGrid';
import { SuffixStats } from './components/SuffixStats';
import { RegionStats } from './components/RegionStats';
import { Lang, translations } from '../services/translations';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState<CallsignAnalysis | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const [lang, setLang] = useState<Lang>('zh');

  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.length >= 3) {
        const result = analyzeCallsign(input);
        setData(result);
        if (result.isValid) {
            setRippleKey(prev => prev + 1);
        }
      } else {
        setData(null);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    if (/^[A-Z0-9]*$/.test(val) && val.length <= 7) {
        setInput(val);
    }
  };

  const clearInput = () => {
      setInput('');
      setData(null);
  };

  const toggleLang = () => {
      setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center w-full max-w-7xl mx-auto selection:bg-accent selection:text-black font-sans">
        
        {/* Language Switcher - Absolute Top Right */}
        <button 
            onClick={toggleLang}
            className="fixed top-6 right-6 z-50 flex items-center gap-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1 shadow-2xl hover:bg-white/10 transition-all"
        >
             <span className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'zh' ? 'bg-accent text-bg shadow-lg' : 'text-muted hover:text-fg'}`}>CN</span>
             <span className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-accent text-bg shadow-lg' : 'text-muted hover:text-fg'}`}>EN</span>
        </button>

        {/* Header */}
        <header className="text-center mb-16 mt-8 z-10 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md mb-6 shadow-xl">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
             <span className="text-[10px] text-muted font-mono tracking-[0.2em] uppercase">{t.system_status}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold text-fg tracking-tighter mb-4 drop-shadow-2xl">
            {t.title_main}
          </h1>
          <p className="text-muted text-sm font-mono tracking-[0.3em] uppercase opacity-70 border-t border-white/5 pt-4 inline-block px-8">{t.title_sub}</p>
        </header>

        {/* Input Section */}
        <div className="relative w-full max-w-xl mb-20 z-20">
            {/* Ripple Effect */}
            {data && data.isValid && (
                <div key={rippleKey} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="pulse-ring active"></div>
                    <div className="pulse-ring active" style={{ animationDelay: '0.2s' }}></div>
                </div>
            )}
            
            <div className="relative group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-teal-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder={t.input_placeholder}
                    className="callsign-input w-full py-8 px-8 text-center text-4xl md:text-5xl tracking-[0.15em] placeholder:text-muted/20 placeholder:text-xl md:placeholder:text-2xl placeholder:tracking-normal placeholder:font-sans shadow-2xl relative z-10 bg-black/50 backdrop-blur-2xl"
                />
                {input && (
                    <button 
                        onClick={clearInput}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-muted/50 hover:text-accent transition-all p-2 rounded-full hover:bg-white/10 z-20"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                )}
            </div>
            
            {data && !data.isValid && data.error && (
                <div className="absolute top-full left-0 right-0 mt-6 text-center animate-in fade-in slide-in-from-top-4 duration-300">
                     <div className="inline-flex items-center gap-3 px-5 py-3 bg-red-500/5 border border-red-500/20 text-red-400 rounded-2xl font-mono text-xs backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                        <span className="font-bold">{t.error_prefix}:</span> {data.error}
                     </div>
                </div>
            )}
        </div>

        {/* Dashboard Grid */}
        {data && data.isValid && (
             <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 animate-[fadeIn_0.6s_cubic-bezier(0.2,0.8,0.2,1)]">
                
                {/* Row 1: Identity & Macro Stats */}
                <div className="lg:col-span-8">
                    <StructureBreakdown data={data} lang={lang} />
                </div>
                <div className="lg:col-span-4">
                    <RegionStats data={data} lang={lang} />
                </div>

                {/* Row 2: Details & Series Stats */}
                <div className="lg:col-span-6">
                    <DetailGrid data={data} lang={lang} />
                </div>
                <div className="lg:col-span-6">
                    <SuffixStats data={data} lang={lang} />
                </div>

             </div>
        )}

        {/* Footer */}
        <div className="fixed bottom-6 left-6 text-[10px] text-muted font-mono opacity-30 pointer-events-none hidden md:block">
            NO.2403 // V.3.5.0
        </div>
    </div>
  );
};

export default App;