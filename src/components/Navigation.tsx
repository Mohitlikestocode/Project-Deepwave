import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  "hero", "globe", "prediction", "dashboard", "history", "technology", "impact-stats", "impact", "faq"
];

interface NavigationProps {
  onLoginClick?: () => void;
  onTourGameClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onLoginClick, onTourGameClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Clear the previous timeout
      clearTimeout(scrollTimeout);
      
      // Set a new timeout to debounce the scroll event
      scrollTimeout = setTimeout(() => {
        let found = "hero";
        let minDistance = Infinity;
        
        // Check if we're in the hero or introduction section
        const heroEl = document.getElementById("hero");
        const introEl = document.getElementById("introduction");
        
        if (heroEl) {
          const heroRect = heroEl.getBoundingClientRect();
          const introRect = introEl?.getBoundingClientRect();
          
          // If we're in hero section or introduction section, stay on "hero"
          if (heroRect.bottom > 80 || (introRect && introRect.bottom > 80)) {
            found = "hero";
          } else {
            // Check other sections
            for (const id of sectionIds) {
              if (id === "hero") continue; // Skip hero as we already checked it
              
              const el = document.getElementById(id);
              if (el) {
                const rect = el.getBoundingClientRect();
                const distance = Math.abs(rect.top - 80); // Distance from top of viewport
                
                // Find the section closest to the top of the viewport
                if (distance < minDistance) {
                  minDistance = distance;
                  found = id;
                }
              }
            }
          }
        }
        
        // Only update if the active section actually changed
        setActive(prev => {
          if (prev !== found) {
            return found;
          }
          return prev;
        });
      }, 200); // Increased debounce for more stability
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call to set the correct active section
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleNavClick = (e, path, id) => {
    e.preventDefault();
    setActive(id);
    setIsOpen(false);
    setShowMore(false);
    
    const el = document.querySelector(path);
    if (el) {
      // Add a small delay to ensure the state is updated before scrolling
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-cosmic-black/80 backdrop-blur-md border-b border-cosmic-blue/30 shadow-lg h-24 flex items-center" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center space-x-3 mr-8" style={{ marginLeft: '-1.5rem' }}>
            <Satellite className="h-10 w-10 text-cosmic-green animate-pulse-glow" aria-label="Logo" />
            <span className="text-2xl font-orbitron font-bold neon-text">Project DeepWave</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
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
            {/* Tour & Game Mode Tab */}
            <button
              className={`px-4 py-2 rounded-full font-space font-medium flex items-center gap-1 transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:from-pink-500 hover:to-purple-500 ${location.pathname === "/game" ? "ring-4 ring-purple-400/30" : ""}`}
              aria-label="Tour & Game Mode"
              onClick={() => navigate('/game')}
              style={{ letterSpacing: "0.1em" }}
            >
              🎮 Tour & Game Mode
            </button>
            {/* Tour Mode & Game Mode Modal Button (optional, can be removed if not needed) */}
            <button
              className="cosmic-button ml-2 px-6 py-2 text-base font-orbitron"
              onClick={onLoginClick}
              type="button"
            >
              Login
            </button>
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
              {/* Mobile Login Button */}
              <button
                className="cosmic-button w-full mt-2"
                onClick={onLoginClick}
                type="button"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
