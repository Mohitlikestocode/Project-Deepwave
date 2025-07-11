import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import perryImg from './perry.png';
import jazzMp3 from './jazz.mp3';

interface TourGameModeModalProps {
  onClose: () => void;
  fadeOutJazz: () => void;
}

const TourGameModeModal: React.FC<TourGameModeModalProps> = ({ onClose, fadeOutJazz }) => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play audio on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.currentTime = 0;
      audio.play();
    }
  }, []);

  // Fade out music and navigate
  const handleTourClick = () => {
    fadeOutJazz();
    setTimeout(() => navigate('/tour'), 300); // fast fade
  };
  const handleGameClick = () => {
    fadeOutJazz();
    setTimeout(() => navigate('/game'), 300); // fast fade
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        {/* CHOOSE heading */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl md:text-6xl font-orbitron font-extrabold neon-text drop-shadow-lg tracking-wide mb-2">CHOOSE YOUR MODE</h2>
          <div className="text-cosmic-silver font-space text-xl md:text-2xl font-bold">Will you explore or play?</div>
        </div>
        {/* Modal content */}
        <div className="flex w-full gap-16 justify-center">
          {/* Tour Mode Option */}
          <div
            className="flex-1 bg-cosmic-blue/90 rounded-3xl p-16 flex flex-col items-center justify-center cursor-pointer shadow-2xl relative hover:scale-105 transition-transform min-h-[520px] max-w-2xl overflow-hidden border-4 border-cosmic-blue"
            onClick={handleTourClick}
            style={{ minWidth: 420 }}
          >
            {/* Perry as background, left, 50% visible */}
            <img
              src={perryImg}
              alt="Perry"
              className="absolute left-[-25%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] object-contain opacity-70 select-none pointer-events-none"
              style={{ zIndex: 1 }}
            />
            <div className="relative z-10 flex flex-col items-center">
              <div className="text-5xl font-orbitron font-extrabold text-cosmic-black mb-6 flex items-center gap-4 drop-shadow-lg">
                Tour Mode <span className="ml-2 text-4xl">🌊🌊🌊</span>
              </div>
              <div className="text-2xl font-orbitron font-bold text-cosmic-black/90 mb-2">Explore the AI-powered tsunami prediction system</div>
              <div className="text-lg font-space font-bold text-cosmic-black/80">See live data, and learn how it all works!</div>
            </div>
          </div>
          {/* Game Mode Option */}
          <div
            className="flex-1 bg-cosmic-green/90 rounded-3xl p-16 flex flex-col items-center justify-center cursor-pointer shadow-2xl relative hover:scale-105 transition-transform min-h-[520px] max-w-2xl overflow-hidden border-4 border-cosmic-green"
            onClick={handleGameClick}
            style={{ minWidth: 420 }}
          >
            {/* Perry as background, bottom right, upper half visible, vertically flipped */}
            <img
              src={perryImg}
              alt="Perry"
              className="absolute right-[-20%] bottom-[-30%] w-[380px] h-[380px] object-contain opacity-70 select-none pointer-events-none"
              style={{ zIndex: 1, transform: 'rotate(135deg) scaleY(-1)' }}
            />
            <div className="relative z-10 flex flex-col items-center">
              <div className="text-5xl font-orbitron font-extrabold text-cosmic-black mb-6 flex items-center gap-4 drop-shadow-lg">
                Game Mode <span className="ml-2 text-4xl">🕹️</span>
              </div>
              <div className="text-2xl font-orbitron font-bold text-cosmic-black/90 mb-2">Play as Perry and catch tsunamis in a fun mini-game</div>
              <div className="text-lg font-space font-bold text-cosmic-black/80">Can you join Team Disaster Alertinator?</div>
            </div>
          </div>
        </div>
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-cosmic-black hover:text-cosmic-green text-3xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {/* Audio element for login music */}
        <audio ref={audioRef} src={jazzMp3} loop={false} />
      </div>
    </div>
  );
};

export default TourGameModeModal; 