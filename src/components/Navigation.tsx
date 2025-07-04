import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Satellite, Home, BarChart2, HelpCircle, Activity, Zap, List, Globe } from 'lucide-react';

const mainNavItems = [
  { name: "Home", path: "#hero", icon: <Home className="inline-block w-5 h-5 mr-1" aria-label="Home" /> },
  { name: "Globe", path: "#globe", icon: <Satellite className="inline-block w-5 h-5 mr-1" aria-label="Globe" /> },
  { name: "Prediction", path: "#prediction", icon: <Zap className="inline-block w-5 h-5 mr-1" aria-label="Prediction" /> },
  { name: "Model", path: "#dashboard", icon: <BarChart2 className="inline-block w-5 h-5 mr-1" aria-label="AI Model Performance" /> },
];
const moreNavItems = [
  { name: "Introduction", path: "#introduction", icon: <HelpCircle className="inline-block w-5 h-5 mr-1" aria-label="Introduction" /> },
  { name: "History", path: "#history", icon: <List className="inline-block w-5 h-5 mr-1" aria-label="Historical Earthquakes" /> },
  { name: "Technology", path: "#technology", icon: <Activity className="inline-block w-5 h-5 mr-1" aria-label="Technology" /> },
  { name: "Impact", path: "#impact", icon: <Globe className="inline-block w-5 h-5 mr-1" aria-label="Impact" /> },
];

const sectionIds = [
  "hero", "globe", "prediction", "dashboard", "introduction", "history", "technology", "impact"
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      let found = "hero";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            found = id;
            break;
          }
        }
      }
      setActive(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, path, id) => {
    e.preventDefault();
    setActive(id);
    setIsOpen(false);
    setShowMore(false);
    const el = document.querySelector(path);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-cosmic-black/80 backdrop-blur-md border-b border-cosmic-blue/30 shadow-lg" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Satellite className="h-8 w-8 text-cosmic-green animate-pulse-glow" aria-label="Logo" />
            <span className="text-xl font-orbitron font-bold neon-text">Project DeepWave</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {mainNavItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`px-3 py-2 rounded-full font-space font-medium flex items-center gap-1 transition-all duration-300 ${active === item.path.replace('#','') ? 'bg-cosmic-green/20 text-cosmic-green shadow-md' : 'text-cosmic-silver hover:text-cosmic-green hover:bg-cosmic-green/10'}`}
                aria-label={item.name}
                onClick={e => handleNavClick(e, item.path, item.path.replace('#',''))}
              >
                {item.icon}{item.name}
              </a>
            ))}
            <div className="relative">
              <button
                className={`px-3 py-2 rounded-full font-space font-medium flex items-center gap-1 transition-all duration-300 ${moreNavItems.some(i => active === i.path.replace('#','')) ? 'bg-cosmic-green/20 text-cosmic-green shadow-md' : 'text-cosmic-silver hover:text-cosmic-green hover:bg-cosmic-green/10'}`}
                onClick={() => setShowMore(v => !v)}
                aria-haspopup="true"
                aria-expanded={showMore}
              >
                More
                <span className="ml-1">▼</span>
              </button>
              {showMore && (
                <div className="absolute right-0 mt-2 w-48 bg-cosmic-black-light border border-cosmic-blue/30 rounded-lg shadow-lg z-50 animate-fade-in">
                  {moreNavItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.path}
                      className={`block px-4 py-2 font-space font-medium transition-all duration-200 rounded-lg ${active === item.path.replace('#','') ? 'bg-cosmic-green/20 text-cosmic-green' : 'text-cosmic-silver hover:text-cosmic-green hover:bg-cosmic-green/10'}`}
                      aria-label={item.name}
                      onClick={e => handleNavClick(e, item.path, item.path.replace('#',''))}
                    >
                      {item.icon}{item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/tour"
              className={`tour-nav-btn px-4 py-2 rounded-full font-bold border-2 border-cosmic-green text-cosmic-green bg-cosmic-black-light shadow-lg hover:bg-cosmic-green/10 transition-all duration-300${location.pathname === "/tour" ? " active ring-4 ring-cosmic-green/30" : ""}`}
              aria-label="Tour Mode"
              style={{ letterSpacing: "0.1em", boxShadow: '0 0 12px 2px #a259e6' }}
            >
              🌊 Tour Mode
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cosmic-silver hover:text-cosmic-green"
              aria-label="Toggle Navigation Menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`h-0.5 bg-current transition-transform ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <div className={`h-0.5 bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                <div className={`h-0.5 bg-current transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden transition-all duration-500">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-cosmic-black-light rounded-lg mt-2">
              {[...mainNavItems, ...moreNavItems].map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  className={`block px-3 py-2 rounded-full font-space font-medium flex items-center gap-1 transition-all duration-300 ${active === item.path.replace('#','') ? 'bg-cosmic-green/20 text-cosmic-green shadow-md' : 'text-cosmic-silver hover:text-cosmic-green hover:bg-cosmic-green/10'}`}
                  aria-label={item.name}
                  onClick={e => handleNavClick(e, item.path, item.path.replace('#',''))}
                >
                  {item.icon}{item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
