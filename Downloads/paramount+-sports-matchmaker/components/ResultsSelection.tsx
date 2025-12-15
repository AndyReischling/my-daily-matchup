import React from 'react';
import { MatchResult } from '../types';
import { Play, Info } from 'lucide-react';

interface ResultsSelectionProps {
  matches: MatchResult[];
  onSelect: (match: MatchResult) => void;
}

const ResultsSelection: React.FC<ResultsSelectionProps> = ({ matches, onSelect }) => {
  
  const getImageUrl = (match: MatchResult) => {
    const prompt = match.category === 'Fighter' 
      ? `cinematic portrait of mma fighter ${match.name} in the octagon dramatic lighting`
      : `professional sports photography ${match.name} ${match.category} action shot stadium`;
    
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=600&nologo=true&seed=${match.name.length}`;
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 flex flex-col items-center animate-fade-in bg-paramount-dark">
      <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Your Personal Lineup
        </h1>
        <p className="text-gray-400 font-medium text-lg tracking-wide">
          Based on your personality, we've scouted these matches for you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full px-4">
        {matches.map((match, idx) => (
          <div 
            key={idx} 
            className="group relative bg-[#12151f] rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,102,255,0.3)] border border-white/5 hover:border-[#0066FF]"
          >
            {/* Header Image Area */}
            <div className="h-56 relative overflow-hidden bg-[#000]">
               <img 
                 src={getImageUrl(match)} 
                 alt={match.name}
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                 loading="lazy"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#12151f] via-transparent to-transparent"></div>
               <div className="absolute top-0 right-0 bg-[#0066FF] px-3 py-1 text-[10px] font-black text-white uppercase tracking-widest">
                 {match.category}
               </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 flex flex-col items-center text-center">
              <div className="mb-8">
                <div className="text-[#0066FF] text-[11px] font-black uppercase tracking-widest mb-3">
                  {match.archetype}
                </div>
                <h3 className="text-3xl font-black text-white mb-4 leading-none uppercase italic">{match.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  {match.justification}
                </p>
              </div>

              <div className="mt-auto w-full">
                 <button 
                   onClick={() => onSelect(match)}
                   className="w-full py-4 rounded-sm bg-white hover:bg-gray-200 text-black font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                 >
                   <Play size={20} fill="currentColor" />
                   <span>Start Watching</span>
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
        <Info size={14} />
        <span>Manage your favorites in account settings</span>
      </div>
    </div>
  );
};

export default ResultsSelection;