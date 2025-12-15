import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onStartQuiz: () => void;
  onDirectSelect: (name: string) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onStartQuiz, onDirectSelect }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onDirectSelect(searchValue);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-4 relative overflow-hidden bg-paramount-dark">
      {/* Background Texture & Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-[80%] bg-gradient-radial from-[#001d4a] via-[#02050C] to-[#02050C] opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-blue-900/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-3xl w-full text-center space-y-10 animate-fade-in-up z-10">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white leading-none drop-shadow-2xl">
            Stream Your <br />
            <span className="text-[#0066FF]">Team</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium tracking-wide max-w-xl mx-auto">
            Personalize your sports hub. Follow your teams. <br className="hidden md:block"/> Never miss a moment of the action.
          </p>
        </div>

        {/* Option A: Search */}
        <div className="bg-gradient-to-b from-[#1a1d2d] to-[#12141f] p-8 rounded-none md:rounded-lg border border-white/10 shadow-2xl w-full relative group">
          <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none"></div>
          
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-4 text-gray-400" size={24} />
            <input
              type="text"
              placeholder="SEARCH TEAMS, LEAGUES, OR FIGHTERS"
              className="w-full bg-black/40 border border-gray-600 text-white pl-14 pr-4 py-4 rounded-sm focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] outline-none transition-all placeholder-gray-500 font-bold tracking-wider text-sm uppercase"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
               <button type="submit" className="absolute right-2 top-2 bg-[#0066FF] p-2 rounded-sm hover:bg-blue-500 transition-colors">
                 <ArrowRight size={20} />
               </button>
            )}
          </form>
          
          <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs font-bold tracking-widest text-gray-400 uppercase">
            <span>Trending:</span>
            <button onClick={() => onDirectSelect("Kansas City Chiefs")} className="text-white hover:text-[#0066FF] transition-colors border-b border-transparent hover:border-[#0066FF]">Chiefs</button>
            <button onClick={() => onDirectSelect("Inter Milan")} className="text-white hover:text-[#0066FF] transition-colors border-b border-transparent hover:border-[#0066FF]">Inter</button>
            <button onClick={() => onDirectSelect("Canelo Alvarez")} className="text-white hover:text-[#0066FF] transition-colors border-b border-transparent hover:border-[#0066FF]">Canelo</button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full px-12 opacity-50">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-1"></div>
          <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">OR MATCH WITH AI</span>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-1"></div>
        </div>

        {/* Option B: AI Trigger */}
        <button
          onClick={onStartQuiz}
          className="group relative w-full bg-gradient-to-r from-[#003380] to-[#001a40] hover:from-[#0040a0] hover:to-[#002050] border border-[#0066FF]/30 p-1 rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#0066FF]/20"
        >
          <div className="bg-[#02050C]/40 backdrop-blur-sm p-6 flex items-center justify-between rounded-md h-full">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0066FF] to-blue-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="text-white" size={28} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-black text-white uppercase tracking-wide group-hover:text-[#0066FF] transition-colors">
                  Find Your Match
                </h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
                  Take the personality quiz
                </p>
              </div>
            </div>
            <ArrowRight className="text-gray-500 group-hover:text-white transform group-hover:translate-x-2 transition-all" size={28} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Onboarding;