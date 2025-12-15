import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { Clip } from '../types';

interface VideoPlayerProps {
  clip: Clip;
  nextClip?: Clip;
  onEnded: () => void;
  onNext: () => void;
  autoPlay: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ clip, nextClip, onEnded, onNext, autoPlay }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(clip.duration);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const timerRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Robust check for video source: looks for common video extensions.
  // If no extension matches, we assume it's an image (e.g. Pollinations URL).
  const isVideoSource = clip.videoUrl.toLowerCase().includes('.mp4') || 
                        clip.videoUrl.toLowerCase().includes('.webm') ||
                        clip.videoUrl.toLowerCase().includes('.mov');

  useEffect(() => {
    // Reset state on clip change
    setCurrentTime(0);
    setDuration(clip.duration);
    setIsPlaying(autoPlay);
    
    if (isVideoSource && videoRef.current) {
      videoRef.current.load();
      if (autoPlay) {
        videoRef.current.play().catch(console.error);
      }
    }
  }, [clip, autoPlay, isVideoSource]);

  // Timer loop for Image Playback Simulation (Simulated Video)
  useEffect(() => {
    if (isVideoSource) return; // Native video handles its own timing

    if (isPlaying) {
      lastTimeRef.current = Date.now();
      timerRef.current = window.setInterval(() => {
        const now = Date.now();
        const delta = (now - lastTimeRef.current) / 1000;
        lastTimeRef.current = now;

        setCurrentTime(prev => {
          const nextTime = prev + delta;
          if (nextTime >= clip.duration) {
            onEnded();
            return clip.duration;
          }
          return nextTime;
        });
      }, 100); // 100ms update rate
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isVideoSource, clip.duration, onEnded]);

  const togglePlay = () => {
    if (isVideoSource && videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    const newTime = (val / 100) * duration;
    setCurrentTime(newTime);
    
    if (isVideoSource && videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Video-specific handlers
  const onVideoTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || clip.duration);
    }
  };

  const toggleFullscreen = () => {
    const container = document.getElementById('video-container');
    if (!document.fullscreenElement && container) {
      container.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div 
      id="video-container"
      className="relative w-full aspect-video bg-black group overflow-hidden rounded-lg shadow-2xl border border-gray-800"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {isVideoSource ? (
        <video
          ref={videoRef}
          src={clip.videoUrl}
          className="w-full h-full object-cover"
          onEnded={onEnded}
          onTimeUpdate={onVideoTimeUpdate}
          playsInline
        />
      ) : (
        /* Simulated Video Player using Thumbnail Image */
        <div className="w-full h-full overflow-hidden">
           <img 
             src={clip.thumbnail} 
             alt={clip.title}
             /* Smooth Ken Burns effect: Zoom slowly over 20s (longer than clip duration usually) */
             className={`w-full h-full object-cover transition-transform duration-[20000ms] ease-linear ${isPlaying ? 'scale-110' : 'scale-100'}`}
             key={clip.id} // Re-mount on clip change to reset animation
             onError={(e) => {
               (e.target as HTMLImageElement).src = 'https://image.pollinations.ai/prompt/generic%20sports%20stadium%20background%20blue%20lights?width=1280&height=720&nologo=true';
             }}
           />
        </div>
      )}

      {/* Overlay Gradient for Text Readability */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 ${showControls ? 'opacity-80' : 'opacity-0'}`} />

      {/* Info Overlay (Top Left) */}
      <div className={`absolute top-6 left-6 transition-all duration-500 ${showControls ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <div className="flex items-center space-x-2 mb-1">
          <span className="bg-[#0066cc] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            {clip.league}
          </span>
          <span className="text-gray-300 text-xs font-medium border-l border-gray-500 pl-2">
            {clip.timestamp}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white leading-tight drop-shadow-md">{clip.title}</h2>
        <p className="text-gray-200 text-sm mt-1 drop-shadow-sm max-w-md hidden md:block">
            {clip.description}
        </p>
      </div>

      {/* Next Up Toast */}
      {nextClip && progress > 85 && (
        <div className="absolute bottom-20 right-6 bg-gray-900/90 backdrop-blur-sm border border-gray-700 p-3 rounded-md flex items-center space-x-3 max-w-xs animate-in fade-in slide-in-from-right duration-500">
           <img 
              src={nextClip.thumbnail} 
              className="w-16 h-9 object-cover rounded" 
              alt="next" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://image.pollinations.ai/prompt/generic%20sports%20stadium%20background%20blue%20lights?width=1280&height=720&nologo=true';
              }}
           />
           <div className="flex flex-col">
             <span className="text-[10px] text-gray-400 uppercase">Up Next</span>
             <span className="text-xs font-bold text-white line-clamp-1">{nextClip.title}</span>
           </div>
        </div>
      )}

      {/* Controls Bar */}
      <div className={`absolute bottom-0 left-0 right-0 px-6 py-4 transition-all duration-300 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer relative group/progress">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={progress || 0} 
            onChange={handleSeek}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
          <div 
            className="h-full bg-[#0066cc] rounded-full relative z-10" 
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full scale-0 group-hover/progress:scale-100 transition-transform shadow-lg" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button onClick={togglePlay} className="text-white hover:text-[#0066cc] transition-colors">
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>
            
            <button onClick={onNext} className="text-white hover:text-[#0066cc] transition-colors group">
               <SkipForward size={24} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mute button is only relevant for real video, but we can keep it as a placebo or disable it */}
            <div className={`flex items-center space-x-2 group/vol ${!isVideoSource ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <button onClick={() => setIsMuted(!isMuted)} disabled={!isVideoSource} className="text-gray-300 hover:text-white">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>

          <button onClick={toggleFullscreen} className="text-gray-300 hover:text-white">
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;