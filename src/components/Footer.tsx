import { Satellite, Copyright, Github, Globe, Twitter, Map, Zap, BarChart2, History, AlertTriangle, MessageCircle, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";

const facts = [
  "Our AI analyzes over 50 years of seismic data in seconds.",
  "Tsunamis can travel at speeds up to 800 km/h—faster than a jet plane.",
  "Early warning can reduce casualties by up to 80%.",
  "Project DeepWave uses satellite data and deep learning for real-time prediction.",
  "Hackensmitz is the first city to pilot this technology globally.",
  "The 2004 Indian Ocean tsunami was detected by satellites in real time.",
  "A tsunami can cross the entire Pacific Ocean in less than a day.",
  "Seismic waves travel through the Earth at up to 8 km/s.",
  "AI models can spot patterns invisible to human experts.",
  "The word 'tsunami' comes from Japanese, meaning 'harbor wave.'"
];

const Footer = () => {
  const [factIdx, setFactIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setFactIdx((i) => (i + 1) % facts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full py-10 bg-cosmic-black-light border-t border-cosmic-blue/30 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-8">
        <div className="flex flex-col gap-2 text-cosmic-silver font-space text-sm mb-4 md:mb-0" aria-label="Copyright">
          <div className="flex items-center gap-2">
            <Copyright className="w-4 h-4" />
            {new Date().getFullYear()} Project DeepWave
          </div>
          <div className="font-bold text-cosmic-green">Made by the team – Disaster Alertinator</div>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-cosmic-silver hover:text-cosmic-green transition-colors duration-300 flex items-center gap-1">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-cosmic-silver hover:text-cosmic-green transition-colors duration-300 flex items-center gap-1">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://deepwave.com/" target="_blank" rel="noopener noreferrer" aria-label="Website" className="text-cosmic-silver hover:text-cosmic-green transition-colors duration-300 flex items-center gap-1">
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
