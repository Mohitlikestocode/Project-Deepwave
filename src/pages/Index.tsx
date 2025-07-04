import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import PredictionForm from "@/components/PredictionForm";
import AIPerformanceDashboard from "@/components/AIPerformanceDashboard";
import HistoricalEarthquakes from "@/components/HistoricalEarthquakes";
import Footer from "@/components/Footer";
import CosmicStarfield from "@/components/CosmicStarfield";
import StoriesFactsCarousel from "@/components/StoriesFactsCarousel";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <CosmicStarfield />
      <div className="space-grid min-h-screen">
        <Navigation />
        <section id="hero" data-aos="fade-up"><HeroSection /></section>
        <section id="introduction" data-aos="fade-up">
          <div className="py-20 px-4 max-w-5xl mx-auto text-center relative">
            {/* Floating particles */}
            <div className="absolute top-10 left-10 w-2 h-2 bg-cosmic-green rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-20 right-20 w-1 h-1 bg-cosmic-blue rounded-full animate-pulse opacity-40 delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-cosmic-purple rounded-full animate-pulse opacity-50 delay-2000"></div>
            
            <h2 className="text-4xl md:text-6xl font-orbitron font-bold neon-text mb-8 text-cosmic-blue">
              Revolutionizing Disaster Prediction
            </h2>
            <p className="text-cosmic-silver font-space text-xl md:text-2xl mb-6 leading-relaxed">
              In a world where natural disasters claim thousands of lives annually, we've built something unprecedented:
            </p>
            <div className="bg-gradient-to-r from-cosmic-green/20 to-cosmic-blue/20 border border-cosmic-green/30 rounded-lg p-8 mb-8">
              <p className="text-cosmic-green font-orbitron text-2xl md:text-3xl font-bold mb-4">
                An AI That Predicts Tsunamis Before They Strike
              </p>
              <p className="text-cosmic-silver font-space text-lg">
                Using satellite data, seismic sensors, and deep learning algorithms, we're creating the world's most advanced early warning system.
              </p>
            </div>
            <p className="text-cosmic-blue/80 font-space text-lg mb-8">
              This isn't just technology—it's a shield for coastal communities worldwide.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <div className="flex items-center gap-3 text-cosmic-green bg-cosmic-black-light px-4 py-2 rounded-lg border border-cosmic-green/30">
                <div className="w-3 h-3 bg-cosmic-green rounded-full animate-pulse" />
                <span className="font-space font-bold">Real-time Monitoring</span>
              </div>
              <div className="flex items-center gap-3 text-cosmic-green bg-cosmic-black-light px-4 py-2 rounded-lg border border-cosmic-green/30">
                <div className="w-3 h-3 bg-cosmic-green rounded-full animate-pulse delay-300" />
                <span className="font-space font-bold">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-3 text-cosmic-green bg-cosmic-black-light px-4 py-2 rounded-lg border border-cosmic-green/30">
                <div className="w-3 h-3 bg-cosmic-green rounded-full animate-pulse delay-600" />
                <span className="font-space font-bold">Early Warning System</span>
              </div>
            </div>
            
            {/* Down arrow indicator */}
            <div className="mt-12 animate-bounce">
              <div className="w-8 h-8 border-r-2 border-b-2 border-cosmic-green transform rotate-45 mx-auto"></div>
            </div>
          </div>
        </section>
        <section id="globe"><InteractiveGlobe /></section>
        
        {/* Bridge to Prediction */}
        <section className="py-8 px-4 max-w-3xl mx-auto text-center relative">
          <div className="bg-cosmic-black-light border border-cosmic-blue/20 rounded-lg p-6 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cosmic-green to-transparent animate-pulse"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 border border-cosmic-blue/30 rounded-full animate-spin"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-cosmic-purple/20 rounded-full animate-pulse"></div>
            
            <p className="text-cosmic-silver font-space text-lg relative z-10">
              <span className="text-cosmic-green font-bold">Now that you've explored the globe,</span> 
              let's put our AI to the test. Enter your coordinates and see how our system predicts tsunami risks in real-time.
            </p>
            
            {/* Arrow pointing to next section */}
            <div className="mt-4 flex justify-center">
              <div className="w-4 h-4 border-r-2 border-b-2 border-cosmic-green transform rotate-45 animate-pulse"></div>
            </div>
          </div>
        </section>
        
        <section id="prediction" data-aos="fade-up"><div data-section="prediction"><PredictionForm /></div></section>
        
        {/* Bridge to AI Performance */}
        <section className="py-8 px-4 max-w-3xl mx-auto text-center relative">
          <div className="bg-cosmic-black-light border border-cosmic-blue/20 rounded-lg p-6 relative overflow-hidden">
            {/* Circuit-like background pattern */}
            <div className="absolute top-2 left-2 w-8 h-8 border border-cosmic-blue/20 rounded-full"></div>
            <div className="absolute top-2 right-2 w-6 h-6 border border-cosmic-green/20 rounded-full"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cosmic-purple/10 rounded-full animate-pulse"></div>
            
            <p className="text-cosmic-silver font-space text-lg relative z-10">
              <span className="text-cosmic-green font-bold">But how do we know our predictions are reliable? </span> 
              Our AI model has been trained on decades of real-world data. Here's how accurate it really is.
            </p>
            
            {/* Data flow animation */}
            <div className="mt-4 flex justify-center space-x-1">
              <div className="w-1 h-4 bg-cosmic-green animate-pulse"></div>
              <div className="w-1 h-4 bg-cosmic-blue animate-pulse delay-100"></div>
              <div className="w-1 h-4 bg-cosmic-purple animate-pulse delay-200"></div>
              <div className="w-1 h-4 bg-cosmic-green animate-pulse delay-300"></div>
            </div>
          </div>
        </section>
        
        <section id="dashboard" data-aos="zoom-in"><AIPerformanceDashboard /></section>
        
        {/* Bridge to Historical Data */}
        <section className="py-8 px-4 max-w-3xl mx-auto text-center relative">
          <div className="bg-cosmic-black-light border border-cosmic-blue/20 rounded-lg p-6 relative overflow-hidden">
            {/* Timeline visual elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cosmic-blue/50 via-cosmic-green/50 to-cosmic-purple/50"></div>
            <div className="absolute top-4 left-4 w-2 h-2 bg-cosmic-blue rounded-full animate-pulse"></div>
            <div className="absolute top-4 right-4 w-2 h-2 bg-cosmic-green rounded-full animate-pulse delay-500"></div>
            <div className="absolute bottom-4 left-1/3 w-2 h-2 bg-cosmic-purple rounded-full animate-pulse delay-1000"></div>
            
            <p className="text-cosmic-silver font-space text-lg relative z-10">
              <span className="text-cosmic-green font-bold">Our model learns from history. </span> 
              Every major tsunami and earthquake has taught our AI something new. Here are the events that shaped our predictions.
            </p>
            
            {/* Historical timeline indicator */}
            <div className="mt-4 flex justify-center items-center space-x-2">
              <div className="w-3 h-3 bg-cosmic-blue/30 rounded-full"></div>
              <div className="w-8 h-0.5 bg-cosmic-blue/30"></div>
              <div className="w-3 h-3 bg-cosmic-green/30 rounded-full"></div>
              <div className="w-8 h-0.5 bg-cosmic-green/30"></div>
              <div className="w-3 h-3 bg-cosmic-purple/30 rounded-full"></div>
            </div>
          </div>
        </section>
        
        <section id="history" data-aos="fade-right"><HistoricalEarthquakes /></section>
        
        {/* Bridge to Technology Deep Dive */}
        <section className="py-8 px-4 max-w-3xl mx-auto text-center relative">
          <div className="bg-cosmic-black-light border border-cosmic-blue/20 rounded-lg p-6 relative overflow-hidden">
            {/* Tech visual elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cosmic-purple/50 via-cosmic-blue/50 to-cosmic-green/50"></div>
            <div className="absolute top-4 left-4 w-3 h-3 border border-cosmic-purple/30 rounded-full animate-spin"></div>
            <div className="absolute top-4 right-4 w-2 h-2 bg-cosmic-blue rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cosmic-green rounded-full animate-pulse delay-600"></div>
            
            <p className="text-cosmic-silver font-space text-lg relative z-10">
              <span className="text-cosmic-green font-bold">But what makes our technology so advanced? </span> 
              Let's dive deep into the cutting-edge systems that power our predictions.
            </p>
            
            {/* Tech indicator */}
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-cosmic-purple rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-cosmic-blue rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-2 bg-cosmic-green rounded-full animate-pulse delay-400"></div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="technology" data-aos="fade-up">
          <div className="py-16 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold neon-text mb-4">
                The Technology Behind the Magic
              </h2>
              <p className="text-cosmic-silver font-space text-lg">
                Advanced algorithms, satellite networks, and real-time data processing
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-cosmic-black-light border border-cosmic-blue/20 rounded-lg p-6 hover:border-cosmic-green/50 transition-colors">
                <div className="text-cosmic-green text-3xl mb-4">🛰️</div>
                <h3 className="text-xl font-orbitron font-bold text-cosmic-green mb-3">Satellite Network</h3>
                <p className="text-cosmic-silver font-space text-sm">
                  Global coverage with 24/7 monitoring of ocean conditions, seismic activity, and atmospheric changes.
                </p>
              </div>
              
              <div className="bg-cosmic-black-light border border-cosmic-blue/20 rounded-lg p-6 hover:border-cosmic-green/50 transition-colors">
                <div className="text-cosmic-blue text-3xl mb-4">🧠</div>
                <h3 className="text-xl font-orbitron font-bold text-cosmic-blue mb-3">Deep Learning AI</h3>
                <p className="text-cosmic-silver font-space text-sm">
                  Neural networks trained on 50+ years of historical data, continuously learning and improving.
                </p>
              </div>
              
              <div className="bg-cosmic-black-light border border-cosmic-blue/20 rounded-lg p-6 hover:border-cosmic-green/50 transition-colors">
                <div className="text-cosmic-purple text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-orbitron font-bold text-cosmic-purple mb-3">Real-time Processing</h3>
                <p className="text-cosmic-silver font-space text-sm">
                  Sub-second analysis of multiple data streams for instant threat assessment and alerts.
                </p>
              </div>
              
              <div className="bg-cosmic-black-light border border-cosmic-blue/20 rounded-lg p-6 hover:border-cosmic-green/50 transition-colors">
                <div className="text-cosmic-green text-3xl mb-4">🌊</div>
                <h3 className="text-xl font-orbitron font-bold text-cosmic-green mb-3">Ocean Sensors</h3>
                <p className="text-cosmic-silver font-space text-sm">
                  Advanced buoys and underwater sensors monitoring wave patterns and ocean floor movements.
                </p>
              </div>
              
              <div className="bg-cosmic-black-light border border-cosmic-blue/20 rounded-lg p-6 hover:border-cosmic-green/50 transition-colors">
                <div className="text-cosmic-blue text-3xl mb-4">📡</div>
                <h3 className="text-xl font-orbitron font-bold text-cosmic-blue mb-3">Seismic Array</h3>
                <p className="text-cosmic-silver font-space text-sm">
                  Global network of seismic stations detecting earthquakes and underwater tremors instantly.
                </p>
              </div>
              
              <div className="bg-cosmic-black-light border border-cosmic-blue/20 rounded-lg p-6 hover:border-cosmic-green/50 transition-colors">
                <div className="text-cosmic-purple text-3xl mb-4">🔮</div>
                <h3 className="text-xl font-orbitron font-bold text-cosmic-purple mb-3">Predictive Models</h3>
                <p className="text-cosmic-silver font-space text-sm">
                  Advanced mathematical models simulating wave propagation and coastal impact scenarios.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Bridge to Global Impact */}
        <section className="py-8 px-4 max-w-3xl mx-auto text-center relative">
          <div className="bg-cosmic-black-light border border-cosmic-blue/20 rounded-lg p-6 relative overflow-hidden">
            {/* Global visual elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cosmic-green/50 via-cosmic-blue/50 to-cosmic-purple/50"></div>
            <div className="absolute top-4 left-4 w-2 h-2 bg-cosmic-green rounded-full animate-pulse"></div>
            <div className="absolute top-4 right-4 w-2 h-2 bg-cosmic-blue rounded-full animate-pulse delay-400"></div>
            <div className="absolute bottom-4 left-1/3 w-2 h-2 bg-cosmic-purple rounded-full animate-pulse delay-800"></div>
            
            <p className="text-cosmic-silver font-space text-lg relative z-10">
              <span className="text-cosmic-green font-bold">Now let's see the real impact. </span> 
              How many lives could this technology save? How many communities could be protected?
            </p>
            
            {/* Global indicator */}
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-3">
                <div className="w-3 h-3 bg-cosmic-green rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-cosmic-blue rounded-full animate-pulse delay-300"></div>
                <div className="w-3 h-3 bg-cosmic-purple rounded-full animate-pulse delay-600"></div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="impact-stats" data-aos="fade-up">
          <div className="py-16 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold neon-text mb-4">
                Global Impact Potential
              </h2>
              <p className="text-cosmic-silver font-space text-lg">
                The numbers that drive our mission
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-cosmic-black-light border border-cosmic-green/20 rounded-lg p-6 text-center">
                <div className="text-4xl font-orbitron font-bold text-cosmic-green mb-2">2.5B</div>
                <div className="text-cosmic-silver font-space text-sm">People in coastal regions</div>
              </div>
              
              <div className="bg-cosmic-black-light border border-cosmic-blue/20 rounded-lg p-6 text-center">
                <div className="text-4xl font-orbitron font-bold text-cosmic-blue mb-2">80%</div>
                <div className="text-cosmic-silver font-space text-sm">Reduction in casualties</div>
              </div>
              
              <div className="bg-cosmic-black-light border border-cosmic-purple/20 rounded-lg p-6 text-center">
                <div className="text-4xl font-orbitron font-bold text-cosmic-purple mb-2">15min</div>
                <div className="text-cosmic-silver font-space text-sm">Early warning time</div>
              </div>
              
              <div className="bg-cosmic-black-light border border-cosmic-green/20 rounded-lg p-6 text-center">
                <div className="text-4xl font-orbitron font-bold text-cosmic-green mb-2">$50B</div>
                <div className="text-cosmic-silver font-space text-sm">Annual damage prevented</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cosmic-green/10 to-cosmic-blue/10 border border-cosmic-green/30 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-orbitron font-bold text-cosmic-green mb-4">
                This is why we do what we do
              </h3>
              <p className="text-cosmic-silver font-space text-lg">
                Every second of early warning can mean the difference between life and death. 
                Every prediction can save entire communities.
              </p>
            </div>
          </div>
        </section>
        
        {/* Bridge to Impact Message */}
        <section className="py-8 px-4 max-w-3xl mx-auto text-center relative">
          <div className="bg-cosmic-black-light border border-cosmic-blue/20 rounded-lg p-6 relative overflow-hidden">
            {/* Urgency visual elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 animate-pulse"></div>
            <div className="absolute top-2 left-2 w-3 h-3 border border-red-400/50 rounded-full animate-ping"></div>
            <div className="absolute top-2 right-2 w-3 h-3 border border-orange-400/50 rounded-full animate-ping delay-300"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-400/20 rounded-full animate-pulse"></div>
            
            <p className="text-cosmic-silver font-space text-lg relative z-10">
              <span className="text-cosmic-green font-bold">The stakes couldn't be higher. </span> 
              Every second counts when lives are at risk. This is why we built this system.
            </p>
            
            {/* Urgency indicator */}
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-150"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="impact" data-aos="fade-left">
          <div className="py-20 px-4 max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold neon-text mb-6 text-red-400 drop-shadow-lg">Irreversible Damage</h2>
            <p className="text-cosmic-silver font-space text-xl md:text-2xl mb-8">
              Every year, tsunamis claim thousands of lives and devastate entire communities. The scars they leave are permanent.<br/>
              <span className="text-cosmic-green font-bold block mt-4">That's why the world of Hackensmitz needs a breakthrough:<br/>A smart AI tsunami predictor.</span>
              <span className="block mt-4 text-cosmic-blue/80">Harnessing data, history, and cutting-edge AI, we're building a future where early warning saves lives.</span>
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
              <button
                className="cosmic-button px-8 py-3 text-lg font-orbitron font-bold shadow-lg hover:scale-105 transition-transform"
                onClick={() => {
                  const globe = document.getElementById('globe');
                  if (globe) globe.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Return to Globe
              </button>
              <a
                href="/tour"
                className="cosmic-button px-8 py-3 text-lg font-orbitron font-bold shadow-lg border-2 border-cosmic-green text-cosmic-green bg-cosmic-black-light hover:bg-cosmic-green/10 transition-transform hover:scale-105"
                style={{ letterSpacing: '0.1em', boxShadow: '0 0 12px 2px #a259e6' }}
                aria-label="Tour Mode"
              >
                🌊 Tour Mode
              </a>
            </div>
          </div>
        </section>
        <section id="faq" data-aos="fade-up">
          <div className="py-20 px-4 max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold neon-text mb-6 text-cosmic-blue drop-shadow-lg">FAQ</h2>
            <div className="text-left space-y-6">
              <div>
                <h3 className="font-bold text-cosmic-green">How accurate is DeepWave's prediction?</h3>
                <p className="text-cosmic-silver">Our AI model achieves over 94% accuracy, validated on decades of real-world tsunami and earthquake data.</p>
              </div>
              <div>
                <h3 className="font-bold text-cosmic-green">Where does the data come from?</h3>
                <p className="text-cosmic-silver">We use seismic data from USGS, EMSC, and NASA satellites, plus our own sensor network.</p>
              </div>
              <div>
                <h3 className="font-bold text-cosmic-green">Can I use this for my city?</h3>
                <p className="text-cosmic-silver">Yes! DeepWave is designed for global coverage. Just select your location on the globe or map.</p>
              </div>
              <div>
                <h3 className="font-bold text-cosmic-green">How does the AI work?</h3>
                <p className="text-cosmic-silver">Our deep learning model analyzes seismic signals, ocean data, and historical events to predict tsunami risk in real time.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="footer" data-aos="fade-up"><Footer /></section>
      </div>
    </div>
  );
};

export default Index;
