import React, { useEffect, useState, useRef, RefObject } from "react";
import { useNavigate } from "react-router-dom";
import journeyBg from './journey.jpg';
import elevatorImg from './lift.jpg';
import endBg from './last.jpg';
import song from './song.mp3';
import TsunamiQuiz from '../components/TsunamiQuiz';
import level1Img from './1.jpg';
import level2Img from './2.jpg';
import level3Img from './3.jpg';
import level4Img from './4.jpg';

const rainAudio = "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae3e2.mp3";
const SECTIONS = 6; // ✅ Increased from 5 to 6

const tsunamiFloors = [
  {
    image: level1Img,
    title: "The 2004 Indian Ocean Tsunami",
    story: `<b>230,000 lives lost</b> in minutes as a wall of water swept across the Indian Ocean. Most had <b>no warning</b>.`,
    alertinator: `<b>Disaster Alertinator</b> could have sent instant alerts, giving families a chance to escape.`
  },
  {
    image: level2Img,
    title: "The 2011 Tōhoku Tsunami, Japan",
    story: `Waves crashed through Japan, leaving <b>devastation and heartbreak</b>.`,
    alertinator: `With <b>Disaster Alertinator</b>, AI-powered alerts could have saved more lives before the waves struck.`
  },
  {
    image: level3Img,
    title: "The 1755 Lisbon Earthquake and Tsunami",
    story: `A city destroyed, <b>tens of thousands lost</b> in chaos.`,
    alertinator: `Today, <b>Disaster Alertinator</b> can turn fear into <b>preparedness</b> with real-time warnings.`
  },
  {
    image: level4Img,
    title: "The 1883 Krakatoa Eruption and Tsunami",
    story: `<b>36,000 lives vanished</b> as tsunamis raced across oceans.`,
    alertinator: `<b>Disaster Alertinator</b> would have warned distant shores, turning tragedy into survival.`
  },
  {
    image: endBg,
    title: "Disaster Alertinator: Hope for the Future",
    story: `<b>Disaster Alertinator</b> is more than tech—it's a promise. <b>Predict. Warn. Empower.</b> Together, we save lives.`,
    alertinator: ''
  }
];

const funFactClouds = [
  "🌩️ AI predicts tsunamis in real time!",
  "📱 Instant alerts to your phone!",
  "🌊 Over 1 million lives could be saved!",
  "🚨 Early warning = more time to escape!",
  "🤖 Disaster Alertinator never sleeps!"
];

export default function Tour() {
  const [showBlack, setShowBlack] = useState(true);
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showExitBlack, setShowExitBlack] = useState(false);
  const [showExitText, setShowExitText] = useState(false);
  const [exitFadeOut, setExitFadeOut] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioStarted, setAudioStarted] = useState(false);
  const navigate = useNavigate();

  const [currentFloor, setCurrentFloor] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const floorRefs = useRef<RefObject<HTMLDivElement>[]>(Array(SECTIONS).fill(null).map(() => React.createRef<HTMLDivElement>()));
  const atEnd = currentFloor === SECTIONS - 1;

  const songRef = useRef<HTMLAudioElement>(null);
  const [fadingOut, setFadingOut] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 1000);
    const fadeTimer = setTimeout(() => setFadeOut(true), 3000);
    const removeTimer = setTimeout(() => setShowBlack(false), 3500);
    const audioTimer = setTimeout(() => {
      if (audioRef.current && !audioStarted) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => {});
        setAudioStarted(true);
      }
    }, 1500);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      clearTimeout(audioTimer);
    };
  }, [audioStarted]);

  useEffect(() => {
    function tryPlay() {
      if (audioRef.current && !audioStarted) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => {});
        setAudioStarted(true);
      }
    }
    window.addEventListener('scroll', tryPlay, { once: true });
    window.addEventListener('pointerdown', tryPlay, { once: true });
    return () => {
      window.removeEventListener('scroll', tryPlay);
      window.removeEventListener('pointerdown', tryPlay);
    };
  }, [audioStarted]);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    if (showText && songRef.current) {
      songRef.current.currentTime = 0;
      songRef.current.play().catch(() => {});
    }
    return () => {
      if (songRef.current) {
        songRef.current.pause();
        songRef.current.currentTime = 0;
      }
    };
  }, [showText]);

  const goToFloor = (floor: number) => {
    if (floor < 0 || floor >= SECTIONS) return;
    setIsMoving(true);
    const target = floorRefs.current[floor].current as HTMLDivElement | null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => setIsMoving(false), 900);
    }
  };

  useEffect(() => {
    function onScroll() {
      const windowHeight = window.innerHeight;
      let minDist = Infinity;
      let closest = 0;
      floorRefs.current.forEach((ref, i) => {
        const el = ref.current as HTMLDivElement | null;
        if (el) {
          const rect = el.getBoundingClientRect();
          const dist = Math.abs(rect.top + rect.height / 2 - windowHeight / 2);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        }
      });
      setCurrentFloor(closest);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isBetweenLevels(scrollProgress: number, sections: number, threshold = 0.12) {
    for (let i = 0; i < sections; i++) {
      const levelProgress = i / (sections - 1);
      if (Math.abs(scrollProgress - levelProgress) < threshold) {
        return false;
      }
    }
    return true;
  }

  const handleBackToHome = () => {
    setShowExitBlack(true);
    setTimeout(() => setShowExitText(true), 500);
    setTimeout(() => {
      if (songRef.current) {
        setFadingOut(true);
        const audio = songRef.current;
        let fadeAudio = () => {
          if (audio.volume > 0.05) {
            audio.volume -= 0.05;
            setTimeout(fadeAudio, 50);
          } else {
            audio.volume = 0;
            setFadingOut(false);
            navigate("/");
          }
        };
        fadeAudio();
      } else {
        navigate("/");
      }
    }, 3000);
  };

  useEffect(() => {
    if (songRef.current) songRef.current.volume = 1;
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen text-[#222] overflow-x-hidden">
      <div className="pt-16 pb-8 flex justify-center">
        <div className="bg-[#fffbe6] border-4 border-[#a259e6] rounded-2xl px-8 py-4 shadow-xl max-w-2xl mx-auto cartoon-outline text-2xl md:text-3xl font-extrabold text-[#a259e6] tracking-wide flex items-center gap-4 animate-fadeIn">
          <span role="img" aria-label="megaphone">📢</span>
          <span>Scroll down to see the real impact <span className="text-[#ffb347]">Team Disaster Alertinator</span> is trying to solve!</span>
        </div>
      </div>
      {showBlack && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          {showText && (
            <span className={`text-4xl md:text-6xl font-extrabold tracking-widest text-white transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>It&apos;s time for a journey.</span>
          )}
        </div>
      )}
      {showExitBlack && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${exitFadeOut ? 'opacity-0' : 'opacity-100'}`}>
          {showExitText && (
            <span className={`text-4xl md:text-6xl font-extrabold tracking-widest text-white transition-opacity duration-700 ${exitFadeOut ? 'opacity-0' : 'opacity-100'}`}>Time for Disaster Alertinator</span>
          )}
        </div>
      )}
      <audio ref={audioRef} src={rainAudio} loop preload="auto" />
      <audio ref={songRef} src={song} loop preload="auto" />
      <button onClick={handleBackToHome} className="fixed top-6 left-6 z-40 bg-black/60 hover:bg-black/80 text-white px-5 py-2 rounded-full font-semibold shadow-lg border border-white/20 backdrop-blur-lg transition-all duration-300 text-lg flex items-center gap-2">
        <span aria-hidden>←</span> Back to Home
      </button>
      <div className="fixed inset-0 -z-10">
        <img src={journeyBg} alt="Journey Background" className={`w-full h-full object-cover fixed inset-0 transition-all duration-1000 ${atEnd ? 'opacity-0 scale-100 blur-[2px]' : 'opacity-100 scale-100 blur-[2px]'}`} style={{ zIndex: -2 }} />
        <img src={endBg} alt="End Background" className={`w-full h-full object-cover fixed inset-0 transition-all duration-1000 ${atEnd ? 'opacity-100 scale-105 blur-[1px]' : 'opacity-0 scale-100 blur-[1.5px]'}`} style={{ zIndex: -1 }} />
      </div>
      {isBetweenLevels(scrollProgress, SECTIONS) && (
        <div className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500" style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 60%, rgba(0,0,0,1) 100%)"
        }} />
      )}
      <div className="flex flex-row w-full max-w-6xl mx-auto min-h-screen pt-32 pb-32 gap-4">
        <div className="flex-1 flex flex-col gap-24 items-end pr-4">
          {tsunamiFloors.map((floor, i) => (
            <React.Fragment key={i}>
              <div className="h-[60vh] flex items-center" ref={floorRefs.current[i]}>
                <img src={floor.image} alt={floor.title} className="rounded-3xl shadow-xl border-4 border-white/80 w-[28rem] h-96 object-cover" />
              </div>
              {i === 3 && (
                <div className="h-[60vh] flex items-center justify-center" ref={floorRefs.current[i + 1]}>
                  <TsunamiQuiz />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="w-32 flex flex-col items-center relative">
          <div className="relative w-16 -mt-6 ml-8" style={{ height: `calc(${SECTIONS} * 60vh + 12rem)` }}>
            <div className="absolute left-1/4 w-2 h-full bg-gradient-to-b from-gray-300 to-gray-700 rounded-full shadow-md border border-[#999] z-0" />
            <div className="absolute right-1/4 w-2 h-full bg-gradient-to-b from-gray-300 to-gray-700 rounded-full shadow-md border border-[#999] z-0" />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-24 items-start pl-12">
          {tsunamiFloors.map((floor, i) => (
            <React.Fragment key={i}>
              <div className="h-[60vh] flex items-center">
                <div className="bg-white/80 px-8 py-8 rounded-3xl shadow-xl text-2xl font-bold text-[#222] max-w-xl">
                  <div className="text-xl font-bold text-[#a259e6] mb-2">Level {i + 1}</div>
                  <div className="text-3xl font-extrabold mb-2 text-[#a259e6]">{floor.title}</div>
                  <div className="text-lg font-normal text-[#444] mb-2" dangerouslySetInnerHTML={{ __html: floor.story }} />
                  {floor.alertinator && (
                    <div className="text-lg font-bold text-[#a259e6] mt-2" dangerouslySetInnerHTML={{ __html: floor.alertinator }} />
                  )}
                </div>
              </div>
              {i === 3 && (
                <div className="h-[60vh] flex items-center justify-center">
                  <div className="w-full max-w-xl">
                    <TsunamiQuiz />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className={`fixed left-1/2 top-32 -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-[#ffb347] to-[#ffcc70] border-[3px] border-[#222] rounded-2xl shadow-xl backdrop-blur-md flex items-center justify-center z-40 transition-all duration-700 ${!isMoving ? 'animate-pulse' : ''}`} style={{ marginTop: '2rem' }}>
        <img src={elevatorImg} alt="Elevator" className="w-full h-full object-contain" />
      </div>

      <div className="absolute left-0 top-40 w-1/3 h-full pointer-events-none z-20">
        {funFactClouds.map((fact, i) => (
          <div key={i} className={`absolute px-6 py-3 bg-white/90 rounded-full shadow-lg border-2 border-[#a259e6] text-[#222] text-lg font-bold flex items-center gap-2 animate-floatCloud${i % 2 === 0 ? '1' : '2'}`} style={{
            top: `${15 + i * 15}%`,
            left: `${5 + (i % 3) * 8}%`,
            minWidth: '12rem',
            maxWidth: '16rem',
            filter: 'drop-shadow(0 4px 16px rgba(162,89,230,0.10))'
          }}>
            {fact}
          </div>
        ))}
      </div>
    </div>
  );
}
