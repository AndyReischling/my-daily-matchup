import React, { useEffect, useState, useCallback } from 'react';
import { generatePersonalizedPlaylist } from '../services/geminiService';
import { MOCK_USER } from '../constants';
import { Clip, PlaylistResponse } from '../types';
import VideoPlayer from './VideoPlayer';
import { Loader2, AlertCircle, Upload, Play, Clock } from 'lucide-react';

const HighlightReel: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState<PlaylistResponse | null>(null);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [customThumbnails, setCustomThumbnails] = useState<Record<string, string>>({});

  useEffect(() => {
    // Simulate loading optimization - eager fetch would happen on app load in real world
    const fetchPlaylist = async () => {
      setLoading(true);
      try {
        const result = await generatePersonalizedPlaylist(MOCK_USER);
        setPlaylist(result);
      } catch (err) {
        setError("Failed to load your Daily Matchup.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlaylist();
  }, []);

  const handleNext = useCallback(() => {
    if (playlist && currentClipIndex < playlist.clips.length - 1) {
      setCurrentClipIndex(prev => prev + 1);
    } else {
      // Loop back to start for demo
      setCurrentClipIndex(0); 
    }
  }, [playlist, currentClipIndex]);

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>, clipId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCustomThumbnails(prev => ({
        ...prev,
        [clipId]: imageUrl
      }));
    }
  };

  const getClipWithCustomImage = (clip: Clip) => ({
    ...clip,
    thumbnail: customThumbnails[clip.id] || clip.thumbnail
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-[#0f172a]">
        <Loader2 className="w-12 h-12 text-[#0066cc] animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-white">Curating your Daily Matchup...</h2>
        <p className="text-gray-400 mt-2">Gathering the best of NFL, UCL, and Serie A</p>
      </div>
    );
  }

  if (error || !playlist) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center bg-[#0f172a] text-center px-4">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-white">Something went wrong</h2>
        <p className="text-gray-400 mt-2">{error || "Could not load content."}</p>
        <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-2 bg-[#0066cc] hover:bg-blue-700 text-white rounded font-medium transition-colors"
        >
            Retry
        </button>
      </div>
    );
  }

  const currentClip = getClipWithCustomImage(playlist.clips[currentClipIndex]);
  const nextClip = playlist.clips[currentClipIndex + 1] ? getClipWithCustomImage(playlist.clips[currentClipIndex + 1]) : undefined;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-24 px-4 md:px-8 pb-12">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col space-y-2">
             <div className="flex items-center space-x-3">
               <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                 My Daily Matchup
               </h1>
               <span className="px-3 py-1 bg-gradient-to-r from-[#0066cc] to-[#004488] rounded-full text-xs font-bold tracking-wider uppercase shadow-lg">
                 Dec 14
               </span>
             </div>
             <p className="text-gray-400 text-sm max-w-2xl">{playlist.narrativeSummary}</p>
          </div>

          <VideoPlayer 
            clip={currentClip} 
            nextClip={nextClip}
            onEnded={handleNext}
            onNext={handleNext}
            autoPlay={true}
          />
          
          {/* Metadata Block below video */}
          <div className="bg-[#1e293b]/50 backdrop-blur-md p-6 rounded-lg border border-gray-700/50 shadow-xl">
             <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4 text-sm font-medium">
                    <button className="text-white border-b-2 border-[#0066cc] pb-1">Overview</button>
                    <button className="text-gray-400 hover:text-white transition-colors pb-1">Box Score</button>
                    <button className="text-gray-400 hover:text-white transition-colors pb-1">Related</button>
                </div>
                <button className="text-[#0066cc] text-sm hover:text-blue-400 font-medium transition-colors">+ Watch Later</button>
             </div>
             
             <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
               <div>
                  <h3 className="text-2xl font-bold mb-2 leading-tight">{currentClip.title}</h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-400 mb-3">
                     <span className="text-[#0066cc] font-bold uppercase">{currentClip.league}</span>
                     <span>•</span>
                     <span>{currentClip.timestamp}</span>
                     <span>•</span>
                     <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{Math.floor(currentClip.duration / 60)}:{(currentClip.duration % 60).toString().padStart(2, '0')}</span>
                     </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm max-w-2xl">{currentClip.description}</p>
               </div>
               
               {/* Badges */}
               <div className="flex flex-wrap gap-2 md:justify-end min-w-[200px]">
                 {currentClip.badges.map((badge, idx) => (
                   <span key={idx} className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded text-xs font-semibold text-gray-200 uppercase tracking-wide">
                     {badge}
                   </span>
                 ))}
               </div>
             </div>
          </div>
        </div>

        {/* Sidebar / Up Next */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-[#1e293b]/30 rounded-xl border border-gray-800 p-4 max-h-[85vh] overflow-y-auto custom-scrollbar">
             <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-lg font-bold text-white">Your Daily 10</h3>
                <span className="text-xs text-gray-400">{currentClipIndex + 1}/{playlist.clips.length}</span>
             </div>
             
             <div className="space-y-1">
               {playlist.clips.map((originalClip, idx) => {
                 const clip = getClipWithCustomImage(originalClip);
                 const isActive = idx === currentClipIndex;
                 const isPast = idx < currentClipIndex;
                 
                 return (
                   <div 
                     key={clip.id} 
                     onClick={() => setCurrentClipIndex(idx)}
                     className={`group relative flex space-x-3 p-2 rounded-lg transition-all cursor-pointer ${isActive ? 'bg-[#0066cc]/20 border border-[#0066cc]/50' : 'hover:bg-white/5 border border-transparent'} ${isPast ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}
                   >
                     {/* Numbering */}
                     <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full transition-colors ${isActive ? 'bg-[#0066cc]' : 'bg-transparent'}" />

                     {/* Thumbnail container */}
                     <div className="relative w-32 h-[72px] flex-shrink-0 rounded overflow-hidden bg-gray-900 shadow-sm group/thumb">
                       <img 
                          src={clip.thumbnail} 
                          alt={clip.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://image.pollinations.ai/prompt/generic%20sports%20stadium%20background%20blue%20lights?width=1280&height=720&nologo=true';
                          }}
                       />
                       
                       {/* Upload Overlay */}
                       <label 
                           className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity cursor-pointer z-30"
                           onClick={(e) => e.stopPropagation()}
                           title="Upload Custom Thumbnail"
                       >
                           <Upload className="w-4 h-4 text-white mb-0.5" />
                           <span className="text-[8px] text-gray-200 uppercase font-bold tracking-wider">Edit</span>
                           <input 
                               type="file" 
                               accept="image/*" 
                               className="hidden" 
                               onChange={(e) => handleThumbnailUpload(e, clip.id)}
                           />
                       </label>

                       {isActive && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 pointer-events-none">
                              <div className="w-8 h-8 rounded-full bg-[#0066cc]/90 flex items-center justify-center backdrop-blur-sm">
                                <Play size={12} fill="white" className="ml-0.5 text-white" />
                              </div>
                          </div>
                       )}
                       
                       <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-bold text-white z-10 pointer-events-none">
                           {Math.floor(clip.duration / 60)}:{(clip.duration % 60).toString().padStart(2, '0')}
                       </div>
                     </div>

                     {/* Info */}
                     <div className="flex flex-col justify-center min-w-0 flex-1 py-1">
                       <div className="flex items-center justify-between mb-0.5">
                         <span className="text-[10px] text-[#0066cc] font-bold uppercase truncate pr-2">{clip.league}</span>
                         {idx === 0 && <span className="text-[8px] bg-red-600 text-white px-1 rounded uppercase font-bold">Top Pick</span>}
                       </div>
                       <h4 className={`text-sm font-semibold leading-tight line-clamp-2 ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                         {clip.title}
                       </h4>
                       <div className="flex items-center mt-1 space-x-2">
                          {clip.badges.slice(0, 1).map((b, i) => (
                              <span key={i} className="text-[10px] text-gray-500 border border-gray-700 px-1 rounded truncate max-w-[80px]">{b}</span>
                          ))}
                       </div>
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HighlightReel;