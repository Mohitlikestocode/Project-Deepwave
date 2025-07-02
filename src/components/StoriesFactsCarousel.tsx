import { useState, useEffect } from "react";
import { MessageCircle, Sparkles, Star, Globe, Zap, Brain, Satellite, Info } from "lucide-react";

const testimonials = [
  {
    icon: <MessageCircle className="w-8 h-8 text-cosmic-green" />,
    text: "DeepWave's early warning gave us precious minutes to evacuate. It saved lives in our village.",
    author: "Coastal Resident"
  },
  {
    icon: <Brain className="w-8 h-8 text-cosmic-blue" />,
    text: "The science behind DeepWave is world-class. It's a game-changer for disaster response.",
    author: "Seismologist"
  },
  {
    icon: <Globe className="w-8 h-8 text-cosmic-purple" />,
    text: "Hackensmitz is the first city to pilot this technology globally.",
    author: "City Official"
  }
];

const facts = [
  {
    icon: <Sparkles className="w-8 h-8 text-cosmic-green" />,
    text: "Our AI analyzes over 50 years of seismic data in seconds."
  },
  {
    icon: <Zap className="w-8 h-8 text-cosmic-blue" />,
    text: "Tsunamis can travel at speeds up to 800 km/h—faster than a jet plane."
  },
  {
    icon: <Star className="w-8 h-8 text-cosmic-purple" />,
    text: "Early warning can reduce casualties by up to 80%."
  },
  {
    icon: <Satellite className="w-8 h-8 text-cosmic-green" />,
    text: "The 2004 Indian Ocean tsunami was detected by satellites in real time."
  },
  {
    icon: <Info className="w-8 h-8 text-cosmic-blue" />,
    text: "A tsunami can cross the entire Pacific Ocean in less than a day."
  }
];

const allCards = [
  ...testimonials.map(t => ({ ...t, type: "testimonial" })),
  ...facts.map(f => ({ ...f, type: "fact" }))
];

export default function StoriesFactsCarousel() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIdx(i => (i + 1) % allCards.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (i: number) => setIdx(i);

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-full max-w-xl mx-auto flex justify-center items-center">
        <div className={`transition-all duration-700 bg-cosmic-black-light/80 border-2 border-cosmic-green/30 rounded-2xl shadow-xl px-8 py-10 min-h-[220px] flex flex-col items-center gap-4 animate-fade-in scale-100`}
          key={idx}
        >
          <div className="mb-2">{allCards[idx].icon}</div>
          <div className="text-xl md:text-2xl font-space text-cosmic-silver mb-2 animate-fade-in" style={{ minHeight: 60 }}>
            {allCards[idx].text}
          </div>
          {allCards[idx].type === "testimonial" && (
            <div className="text-cosmic-green font-orbitron text-lg mt-2 animate-fade-in">— {allCards[idx].author}</div>
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-6 justify-center">
        {allCards.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full border-2 border-cosmic-green transition-all duration-300 ${i === idx ? 'bg-cosmic-green scale-125 shadow-lg' : 'bg-cosmic-black'}`}
            aria-label={`Go to card ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
} 