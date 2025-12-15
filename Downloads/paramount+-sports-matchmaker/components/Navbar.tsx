import React, { useState } from 'react';
import { Search, ChevronDown, Star, X } from 'lucide-react';
import { MatchResult } from '../types';

interface NavbarProps {
  favorites: MatchResult[];
  onHomeClick: () => void;
  onSelectFavorite: (match: MatchResult) => void;
}

const Navbar: React.FC<NavbarProps> = ({ favorites, onHomeClick, onSelectFavorite }) => {
  const [isSportsOpen, setIsSportsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent md:bg-[#000000CC] md:backdrop-blur-md transition-all duration-300 border-b border-white/5">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* Left Side: Logo + Nav Items */}
          <div className="flex items-center gap-8 lg:gap-10">
            {/* Logo Proxy */}
            <div 
              className="cursor-pointer flex-shrink-0"
              onClick={onHomeClick}
            >
              <h1 className="text-2xl font-black italic tracking-tighter text-white select-none">
                Paramount<span className="text-[#0066FF] not-italic text-3xl align-top">+</span>
              </h1>
            </div>

            {/* Desktop Nav Links - Changed from xl:flex to md:flex so they show on laptops */}
            <div className="hidden md:flex items-center gap-6 text-[13px] font-bold tracking-widest-nav text-white">
                <a href="#" onClick={(e) => {e.preventDefault(); onHomeClick();}} className="hover:text-[#0066FF] transition-colors">HOME</a>
                <a href="#" className="hover:text-[#0066FF] transition-colors">SHOWS</a>
                <a href="#" className="hover:text-[#0066FF] transition-colors">MOVIES</a>
                <a href="#" className="hover:text-[#0066FF] transition-colors">LIVE TV</a>
                
                {/* Sports Dropdown */}
                <div 
                  className="relative group h-[72px] flex items-center"
                  onMouseEnter={() => setIsSportsOpen(true)}
                  onMouseLeave={() => setIsSportsOpen(false)}
                >
                  <button className={`flex items-center gap-1 transition-colors text-white hover:text-[#0066FF]`}>
                    SPORTS
                    <ChevronDown size={14} strokeWidth={3} className={`transform transition-transform duration-200 ${isSportsOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Content */}
                  <div 
                    className={`absolute top-[72px] left-[-20px] w-72 bg-[#0a0a0a] border-t-2 border-[#0066FF] shadow-2xl py-0 flex flex-col transition-all duration-200 origin-top ${isSportsOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}
                  >
                      {/* Favorites Section */}
                      {favorites.length > 0 && (
                        <div className="bg-[#1a1c29]">
                           <div className="px-5 pt-4 pb-2 text-[10px] text-blue-400 font-black uppercase tracking-widest">My Favorites</div>
                           
                           {favorites.map((fav, idx) => (
                             <a 
                               key={idx} 
                               href="#" 
                               onClick={(e) => {
                                 e.preventDefault();
                                 onSelectFavorite(fav);
                                 setIsSportsOpen(false);
                               }}
                               className="px-5 py-3 block text-white hover:bg-[#25283d] flex items-center gap-3 transition-colors group"
                             >
                                <div className="p-1 rounded bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                  <Star size={12} fill="currentColor" />
                                </div>
                                <span className="font-bold text-sm tracking-wide uppercase italic">{fav.name}</span>
                             </a>
                           ))}
                           
                           <div className="h-px w-full bg-gray-800 mt-2"></div>
                        </div>
                      )}
                      
                      <div className="py-2">
                        <a href="#" className="px-5 py-3 text-gray-300 hover:text-white hover:bg-[#1a1c29] block font-bold text-sm tracking-wide transition-colors">NFL on CBS</a>
                        <a href="#" className="px-5 py-3 text-gray-300 hover:text-white hover:bg-[#1a1c29] block font-bold text-sm tracking-wide transition-colors">UEFA Champions League</a>
                        <a href="#" className="px-5 py-3 text-gray-300 hover:text-white hover:bg-[#1a1c29] block font-bold text-sm tracking-wide transition-colors">NWSL</a>
                        <a href="#" className="px-5 py-3 text-gray-300 hover:text-white hover:bg-[#1a1c29] block font-bold text-sm tracking-wide transition-colors">Serie A</a>
                        <a href="#" className="px-5 py-3 text-gray-300 hover:text-white hover:bg-[#1a1c29] block font-bold text-sm tracking-wide transition-colors">Bellator MMA</a>
                        <div className="h-px w-full bg-gray-800 my-1"></div>
                        <a href="#" className="px-5 py-3 text-gray-300 hover:text-white hover:bg-[#1a1c29] block font-bold text-sm tracking-wide transition-colors">All Sports</a>
                      </div>
                  </div>
                </div>

                <a href="#" className="hover:text-[#0066FF] transition-colors">NEWS</a>
                <a href="#" className="hover:text-[#0066FF] transition-colors">MY LIST</a>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
             <button className="text-white hover:text-[#0066FF] transition-colors">
              <Search size={22} strokeWidth={2.5} />
            </button>
             <div className="flex items-center gap-2 cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0066FF] to-cyan-400 border border-white/20 group-hover:border-white transition-colors">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Andy" alt="Profile" className="w-full h-full rounded-full" />
                </div>
                <span className="hidden md:block text-[11px] font-bold tracking-widest text-white group-hover:text-[#0066FF] transition-colors">ANDY</span>
                <ChevronDown size={14} className="text-gray-400 group-hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;