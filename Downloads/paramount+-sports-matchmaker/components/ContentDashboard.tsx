import React from 'react';
import { MatchResult } from '../types';
import { Play, Plus, ChevronRight, Check } from 'lucide-react';

interface ContentDashboardProps {
  match: MatchResult;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const ContentDashboard: React.FC<ContentDashboardProps> = ({ match, isFavorite, onToggleFavorite }) => {
  
  // Helper to generate dynamic images
  const getHeroImage = () => {
    const prompt = match.category === 'Fighter'
      ? `cinematic shot of mma fighter ${match.name} in arena spotlight dark moody 8k`
      : `cinematic wide angle shot of ${match.name} stadium full crowd night game atmosphere 8k`;
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1920&height=1080&nologo=true&seed=hero`;
  };

  const getDocImage = () => {
    const prompt = `dramatic movie poster for documentary about ${match.name} sports cinematic lighting`;
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=600&nologo=true&seed=doc`;
  };

  const getHighlightImage = (title: string, index: number) => {
    const prompt = `sports action shot ${match.name} ${title} close up broadcast quality`;
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=600&height=400&nologo=true&seed=${index}`;
  };

  const getReplayImage = (title: string, index: number) => {
    const prompt = `wide broadcast angle soccer football field ${match.name} ${title} match play`;
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=450&nologo=true&seed=replay${index}`;
  };

  return (
    <div className="min-h-screen bg-[#02050C] animate-fade-in pb-20">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img 
            src={getHeroImage()}
            alt={match.name}
            className="w-full h-full object-cover opacity-70"
            loading="eager"
          />
          {/* Gradients - Smoother transitions */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#02050C] via-[#02050C]/30 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#02050C] via-[#02050C]/50 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex items-end z-10">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3 animate-fade-in-up">
               <span className="px-3 py-1 bg-[#0066FF] text-white text-[10px] font-black uppercase tracking-widest rounded-sm">
                 AI MATCH
               </span>
               <span className="text-gray-300 text-xs font-bold uppercase tracking-widest border-l border-gray-600 pl-3">
                 {match.archetype} Series
               </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9] italic animate-fade-in-up delay-100 drop-shadow-2xl">
              {match.name}
            </h1>
            
            <p className="text-lg text-gray-200 max-w-2xl font-medium leading-relaxed animate-fade-in-up delay-200 drop-shadow-md">
              {match.justification}
            </p>

            <div className="flex items-center gap-4 pt-4 animate-fade-in-up delay-300">
              <button className="flex items-center gap-3 px-8 py-3.5 bg-white text-black hover:bg-gray-200 transition-colors rounded-sm font-black uppercase tracking-widest text-sm">
                <Play size={18} fill="currentColor" />
                <span>Watch Live</span>
              </button>
              
              <button 
                onClick={onToggleFavorite}
                className={`flex items-center gap-3 px-8 py-3.5 backdrop-blur-md border transition-all rounded-sm font-black uppercase tracking-widest text-sm group ${
                  isFavorite 
                    ? 'bg-[#0066FF]/90 border-[#0066FF] text-white hover:bg-[#0066FF]' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
              >
                {isFavorite ? (
                   <>
                    <Check size={18} strokeWidth={4} />
                    <span>In My Team</span>
                   </>
                ) : (
                   <>
                    <Plus size={18} strokeWidth={3} />
                    <span>My Team</span>
                   </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections - Improved Spacing and Layout */}
      <div className="relative z-10 px-6 md:px-16 space-y-20 mt-12">
        
        {/* Recommended Hero Card */}
        <section>
          <div className="flex items-center gap-3 mb-8">
             <div className="h-6 w-1 bg-[#0066FF]"></div>
             <h3 className="text-xl font-bold text-white uppercase tracking-wide">Recommended For You</h3>
          </div>
          
          <div className="relative group cursor-pointer rounded-lg overflow-hidden w-full md:w-3/4 border border-white/10 hover:border-[#0066FF]/50 transition-all duration-300 shadow-2xl bg-[#0a0a0a]">
             <div className="aspect-[21/9] relative">
               <img 
                  src={getDocImage()}
                  alt="Doc"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90"
                  loading="lazy"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
               
               <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                  <span className="text-[#0066FF] text-xs font-black uppercase tracking-widest mb-3 block">Exclusive Documentary</span>
                  <h4 className="text-3xl md:text-5xl font-black text-white uppercase italic mb-2 leading-none">{match.content.documentary}</h4>
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mt-4 group-hover:text-white transition-colors">
                    <span>Stream Now</span>
                    <ChevronRight size={14} />
                  </div>
               </div>

               {/* Play Button Overlay */}
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                  <div className="h-16 w-16 bg-[#0066FF] rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                     <Play size={24} fill="white" className="text-white ml-1" />
                  </div>
               </div>
             </div>
          </div>
        </section>

        {/* Highlights Strip */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-200 uppercase tracking-wide">Highlights</h3>
            <button className="text-xs font-bold text-[#0066FF] uppercase tracking-widest hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {match.content.highlights.map((title, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-video rounded-md overflow-hidden bg-[#12151f] mb-3 border border-white/5 group-hover:border-[#0066FF]/40 transition-all shadow-lg">
                  <img 
                    src={getHighlightImage(title, i)}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    alt={title}
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/90 text-[10px] font-bold text-white tracking-wider rounded-sm">
                    04:2{i}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                    <div className="bg-black/50 p-3 rounded-full backdrop-blur-sm">
                       <Play size={20} fill="white" className="text-white" />
                    </div>
                  </div>
                </div>
                <h4 className="font-bold text-gray-200 text-sm leading-tight group-hover:text-white transition-colors line-clamp-2">{title}</h4>
                <p className="text-[10px] text-gray-500 mt-1.5 font-bold uppercase tracking-wider">Yesterday • CBS Sports</p>
              </div>
            ))}
          </div>
        </section>

        {/* Full Replays */}
        <section className="pb-12">
          <h3 className="text-xl font-bold text-gray-200 mb-8 uppercase tracking-wide">Full Match Replays</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {match.content.replays.map((title, i) => (
               <div key={i} className="group cursor-pointer bg-[#12151f] hover:bg-[#1a1c29] rounded-lg overflow-hidden border border-white/5 hover:border-[#0066FF]/30 transition-all shadow-xl">
                  <div className="relative aspect-video w-full overflow-hidden">
                     <img 
                      src={getReplayImage(title, i)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={title}
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#0066FF] px-2 py-0.5 text-[10px] font-black text-white uppercase tracking-widest rounded-sm">
                      Full Replay
                    </div>
                    {/* Play overlay for replays */}
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <Play size={32} fill="white" className="text-white drop-shadow-lg" />
                     </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-white text-base leading-tight mb-2 group-hover:text-[#0066FF] transition-colors">{title}</h4>
                    <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-4">
                       <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          <span className="bg-white/10 px-1.5 rounded text-gray-300">HD</span>
                          <span>CBS Sports</span>
                       </div>
                    </div>
                  </div>
               </div>
             ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ContentDashboard;