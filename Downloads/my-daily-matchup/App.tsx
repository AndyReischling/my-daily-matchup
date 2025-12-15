import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HighlightReel from './components/HighlightReel';
import { Play } from 'lucide-react';

// Simple Landing Page for Demo
const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-[url('https://image.pollinations.ai/prompt/cinematic%20sports%20streaming%20background%20abstract%20blue%20neon%20lights%20dark%20theme%204k?width=1920&height=1080&nologo=true')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-8 h-screen flex flex-col justify-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight max-w-3xl">
          A Mountain of Entertainment.
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl">
          Stream Live Sports, Breaking News, and a Mountain of Entertainment from Paramount+.
        </p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#0f172a] font-sans selection:bg-blue-500 selection:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sports/daily-reel" element={<HighlightReel />} />
          {/* Redirect generic sports link to daily reel for demo purposes */}
          <Route path="/sports" element={<Navigate to="/sports/daily-reel" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;