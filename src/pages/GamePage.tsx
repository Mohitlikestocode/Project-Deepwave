import React, { useState, useRef, useEffect } from 'react';
import PerryTsunamiGame from '@/components/PerryTsunamiGame';
import looseMyMind from '@/components/loosemymind.mp3';
import tokyoDrift from '@/components/tokyodrift.mp3';
import tourTheme from './song.mp3';
import AuthModal from '@/components/AuthModal';
import { useNavigate } from 'react-router-dom';

const SONGS = [
  { name: 'Loose My Mind', src: looseMyMind },
  { name: 'Tokyo Drift', src: tokyoDrift },
];

const GamePage: React.FC = () => {
  const [gameKey, setGameKey] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // TODO: Replace with real auth
  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songsUnlocked, setSongsUnlocked] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showGodMode, setShowGodMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const themeRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();
  const [showExitBlack, setShowExitBlack] = useState(false);
  const [showExitText, setShowExitText] = useState(false);
  const [exitFadeOut, setExitFadeOut] = useState(false);

  // Play tour theme by default
  useEffect(() => {
    const theme = themeRef.current;
    if (theme) {
      theme.volume = 0.5;
      theme.currentTime = 0;
      theme.loop = true;
      theme.play();
    }
    return () => {
      if (theme) theme.pause();
    };
  }, []);

  // Handle song play
  const handlePlay = (idx: number) => {
    setCurrentSong(idx);
    setIsPlaying(true);
    // Fade out theme music
    if (themeRef.current) {
      const fadeOut = setInterval(() => {
        if (themeRef.current && themeRef.current.volume > 0.01) {
          themeRef.current.volume = Math.max(themeRef.current.volume - 0.05, 0);
        } else if (themeRef.current) {
          themeRef.current.pause();
          themeRef.current.currentTime = 0;
          clearInterval(fadeOut);
        }
      }, 60);
    }
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = SONGS[idx].src;
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0;
        audioRef.current.play();
        // Fade in
        const fadeIn = setInterval(() => {
          if (audioRef.current && audioRef.current.volume < 0.5) {
            audioRef.current.volume = Math.min(audioRef.current.volume + 0.05, 0.5);
          } else {
            clearInterval(fadeIn);
          }
        }, 60);
      }
    }, 300);
  };
  // Handle pause/stop
  const handleStop = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      // Fade out
      const fadeOut = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.01) {
          audioRef.current.volume = Math.max(audioRef.current.volume - 0.05, 0);
        } else if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          clearInterval(fadeOut);
          // Fade in and resume theme music
          if (themeRef.current) {
            themeRef.current.currentTime = 0;
            themeRef.current.play();
            themeRef.current.volume = 0;
            const fadeIn = setInterval(() => {
              if (themeRef.current && themeRef.current.volume < 0.5) {
                themeRef.current.volume = Math.min(themeRef.current.volume + 0.05, 0.5);
              } else {
                clearInterval(fadeIn);
              }
            }, 60);
          }
        }
      }, 60);
    }
    setCurrentSong(null);
  };

  // Visualizer bars
  const renderVisualizer = () => {
    if (!isPlaying) return null;
    return (
      <div className="fixed bottom-0 left-0 w-full flex items-end h-24 bg-gradient-to-t from-cosmic-black/90 to-transparent z-40 pointer-events-none">
        {[...Array(32)].map((_, i) => (
          <div
            key={i}
            className="mx-0.5 rounded bg-cosmic-green"
            style={{
              width: 6,
              height: Math.round(20 + 40 * Math.abs(Math.sin(Date.now() / 300 + i))),
              opacity: 0.7 + 0.3 * Math.sin(Date.now() / 300 + i),
              transition: 'height 0.2s',
            }}
          />
        ))}
      </div>
    );
  };

  // Unlock songs callback
  const handleUnlockSongs = () => {
    setSongsUnlocked(true);
    setShowCongrats(true);
    setTimeout(() => setShowCongrats(false), 4000);
  };

  // GOD MODE callback
  const handleGodMode = () => {
    setShowGodMode(true);
    setTimeout(() => setShowGodMode(false), 5000);
  };

  // Listen for game events from PerryTsunamiGame
  const handleGameEvent = (event: { type: string }) => {
    if (event.type === 'unlock') handleUnlockSongs();
    if (event.type === 'godmode') handleGodMode();
  };

  // Fade out special song on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current && !audioRef.current.paused) {
        const fadeOut = setInterval(() => {
          if (audioRef.current && audioRef.current.volume > 0.01) {
            audioRef.current.volume = Math.max(audioRef.current.volume - 0.05, 0);
          } else if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            clearInterval(fadeOut);
          }
        }, 60);
      }
    };
  }, []);

  const handleReturnToHome = () => {
    setShowExitBlack(true);
    setTimeout(() => setShowExitText(true), 500);
    setTimeout(() => {
      // Fade out whichever song is playing
      let audio = null;
      if (isPlaying && audioRef.current && !audioRef.current.paused) {
        audio = audioRef.current;
      } else if (themeRef.current && !themeRef.current.paused) {
        audio = themeRef.current;
      }
      if (audio) {
        let fadeAudio = () => {
          if (audio.volume > 0.05) {
            audio.volume -= 0.05;
            setTimeout(fadeAudio, 50);
          } else {
            audio.volume = 0;
            setShowExitBlack(false);
            setShowExitText(false);
            setExitFadeOut(false);
            navigate('/');
          }
        };
        fadeAudio();
      } else {
        setShowExitBlack(false);
        setShowExitText(false);
        setExitFadeOut(false);
        navigate('/');
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cosmic-black px-8 py-16 relative">
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        playJazz={() => {}}
        fadeOutJazz={() => {}}
      />
      {/* Congrats and God Mode messages (outside game border) */}
      <div className="absolute left-0 top-1/3 z-50 flex flex-col items-start pl-8">
        {showCongrats && (
          <div className="bg-cosmic-black/90 text-cosmic-green font-orbitron text-2xl p-6 rounded-lg shadow-xl border-2 border-cosmic-green mb-4">
            <div>Congratulations, you're part of Disaster Alertinator!</div>
            <div className="mt-2">Together we shall predict and prevent Tsunamis! 🌊</div>
            <div className="mt-2 text-cosmic-blue font-bold">Keep going for GOD MODE!</div>
          </div>
        )}
        {showGodMode && (
          <div className="bg-cosmic-black/90 text-cosmic-green font-orbitron text-2xl p-6 rounded-lg shadow-xl border-2 border-cosmic-green">
            <div>GOD MODE! You are a valuable asset to Disaster Alertinator!</div>
            <div className="mt-2">You caught 20 tsunamis! 🌊🌊🌊</div>
          </div>
        )}
      </div>
      {/* Top bar */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex gap-4">
          <button
            className="px-6 py-3 bg-cosmic-blue text-cosmic-black font-bold text-lg rounded-lg shadow hover:bg-cosmic-blue-dark transition-all"
            onClick={handleReturnToHome}
          >
            Return to Main Page
          </button>
        </div>
        <button
          className="px-6 py-3 bg-cosmic-green text-cosmic-black font-bold text-lg rounded-lg shadow hover:bg-cosmic-green-dark transition-all"
          onClick={() => setShowAuthModal(true)}
        >
          Login
        </button>
      </div>
      {/* Game and music player */}
      <div className="flex items-start justify-center w-full gap-16">
        <div className="flex flex-col items-center flex-shrink-0" style={{ marginLeft: '2vw' }}>
          <PerryTsunamiGame key={gameKey} onUnlockSongs={handleUnlockSongs} />
          <button
            className="mt-4 px-6 py-3 bg-cosmic-green text-cosmic-black font-bold text-lg rounded-lg shadow hover:bg-cosmic-green-dark transition-all"
            onClick={() => setGameKey(k => k + 1)}
          >
            Reset Game
          </button>
        </div>
        <div className="flex flex-col justify-start items-start max-w-lg ml-8 w-full">
          <h1 className="text-4xl font-orbitron font-bold neon-text mb-6">Perry Tsunami Catcher</h1>
          <p className="text-cosmic-silver font-space text-lg mb-4">
            Play as Perry and catch as many 🌊 as you can! Complete 10 rounds to join Team Disaster Alertinator and help us predict and prevent tsunamis!
          </p>
          {/* Music player */}
          <div className="w-full mt-8 p-6 bg-cosmic-black-light rounded-xl border border-cosmic-green/30 shadow-lg">
            <div className="font-orbitron text-xl font-bold mb-2">Music Player</div>
            {/* No restrictions on music access */}
            <div className="flex flex-col gap-3">
              {SONGS.map((song, idx) => (
                <button
                  key={song.name}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg font-bold text-lg transition-all border-2 ${currentSong === idx && isPlaying ? 'bg-cosmic-green/20 border-cosmic-green text-cosmic-green' : 'bg-cosmic-black border-cosmic-green/30 text-cosmic-silver'} hover:bg-cosmic-green/10`}
                  onClick={() => handlePlay(idx)}
                  disabled={false}
                >
                  <span className="w-6 h-6 flex items-center justify-center text-2xl">{idx === 0 ? '🎧' : '🎵'}</span>
                  <span>{song.name}</span>
                  {currentSong === idx && isPlaying && <span className="ml-4 text-cosmic-green font-bold">Now playing</span>}
                </button>
              ))}
            </div>
            {isPlaying && (
              <button
                className="mt-4 px-4 py-2 bg-cosmic-blue text-cosmic-black font-bold rounded hover:bg-cosmic-blue-dark"
                onClick={handleStop}
              >
                Stop
              </button>
            )}
            {!loggedIn && (
              <button
                className="mt-6 px-6 py-2 bg-cosmic-green text-cosmic-black font-bold rounded-lg shadow hover:bg-cosmic-green-dark"
                onClick={() => setShowAuthModal(true)}
              >
                Login
              </button>
            )}
            <audio ref={audioRef} />
            <audio ref={themeRef} src={tourTheme} />
          </div>
        </div>
      </div>
      {showExitBlack && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${exitFadeOut ? 'opacity-0' : 'opacity-100'}`}>
          {showExitText && (
            <span className={`text-4xl md:text-6xl font-extrabold tracking-widest text-white transition-opacity duration-700 ${exitFadeOut ? 'opacity-0' : 'opacity-100'}`}>Time for Disaster Alertinator</span>
          )}
        </div>
      )}
    </div>
  );
};

export default GamePage; 