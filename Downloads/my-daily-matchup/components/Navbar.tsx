import React, { useState, useRef } from 'react';
import { Menu, Search, Bell, User, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isSportsOpen, setIsSportsOpen] = useState(false);
  const location = useLocation();
  const timeoutRef = useRef<number | null>(null);

  const isActive = (path: string) => location.pathname === path ? "text-white font-bold" : "text-gray-300 hover:text-white";

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsSportsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsSportsOpen(false);
    }, 300); // 300ms delay to keep menu open ("sticky")
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/90 to-transparent pb-10 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Left: Logo & Links */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold tracking-widest text-[#0066cc] uppercase italic">
            Paramount+
          </Link>
          
          <div className="hidden md:flex items-center space-x-6 text-sm tracking-wide">
            <Link to="/" className={isActive('/')}>Home</Link>
            <span className="text-gray-300 hover:text-white cursor-pointer">Shows</span>
            <span className="text-gray-300 hover:text-white cursor-pointer">Movies</span>
            
            {/* Sports Dropdown */}
            <div 
              className="relative group h-full flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`flex items-center space-x-1 ${isActive('/sports')} group-hover:text-[#0066cc] py-2`}>
                <span>Sports</span>
                <ChevronDown size={14} />
              </button>

              {isSportsOpen && (
                <div 
                  className="absolute top-full left-0 pt-2 w-64"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-[#1e293b] border border-gray-700 rounded-md shadow-2xl overflow-hidden backdrop-blur-md bg-opacity-95">
                    <div className="py-2">
                      <Link 
                        to="/sports/daily-reel" 
                        className="block px-4 py-3 hover:bg-[#0066cc] transition-colors group"
                        onClick={() => setIsSportsOpen(false)}
                      >
                        <div className="text-white font-semibold">My Daily Matchup</div>
                        <div className="text-xs text-gray-400 group-hover:text-gray-200">Your personalized top 10</div>
                      </Link>
                      <div className="border-t border-gray-700 my-1"></div>
                      <div className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer">Live TV</div>
                      <div className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer">NFL on CBS</div>
                      <div className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer">Champions League</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <span className="text-gray-300 hover:text-white cursor-pointer">News</span>
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-6 text-white">
          <Search size={20} className="cursor-pointer hover:text-[#0066cc] transition-colors" />
          <Bell size={20} className="cursor-pointer hover:text-[#0066cc] transition-colors" />
          <div className="flex items-center space-x-2 cursor-pointer border border-transparent hover:border-gray-600 p-1 rounded transition-all">
            <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center font-bold">A</div>
            <span className="hidden lg:block text-sm font-medium">Alex</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;