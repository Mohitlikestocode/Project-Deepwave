
import Navigation from "@/components/Navigation";
import { Satellite, Radar, Brain, Waves } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-cosmic-gradient">
      <div className="space-grid min-h-screen">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 neon-text">
              How DeepWave Works
            </h1>
            <p className="text-xl text-cosmic-silver max-w-3xl mx-auto">
              Discover the cutting-edge technology behind our satellite-assisted tsunami prediction system
            </p>
          </div>
        </section>

        {/* Process Flow */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-card text-center">
                <Satellite className="h-16 w-16 text-cosmic-green mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-orbitron font-bold mb-2 text-cosmic-green">
                  Satellite Data
                </h3>
                <p className="text-cosmic-silver">
                  Real-time monitoring of seismic activity through our constellation of earth observation satellites
                </p>
              </div>

              <div className="space-card text-center">
                <Radar className="h-16 w-16 text-cosmic-blue mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-orbitron font-bold mb-2 text-cosmic-blue">
                  Data Processing
                </h3>
                <p className="text-cosmic-silver">
                  Advanced signal processing algorithms analyze seismic patterns and ocean floor movements
                </p>
              </div>

              <div className="space-card text-center">
                <Brain className="h-16 w-16 text-cosmic-purple mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-orbitron font-bold mb-2 text-cosmic-purple">
                  AI Analysis
                </h3>
                <p className="text-cosmic-silver">
                  Deep learning models trained on historical data predict tsunami probability and impact
                </p>
              </div>

              <div className="space-card text-center">
                <Waves className="h-16 w-16 text-cosmic-green mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-orbitron font-bold mb-2 text-cosmic-green">
                  Prediction
                </h3>
                <p className="text-cosmic-silver">
                  Real-time tsunami risk assessment with wave height predictions and impact zones
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-orbitron font-bold mb-12 text-center neon-text">
              The Science Behind DeepWave
            </h2>
            
            <div className="space-y-8">
              <div className="space-card">
                <h3 className="text-2xl font-orbitron font-bold mb-4 text-cosmic-green">
                  Satellite Network
                </h3>
                <p className="text-cosmic-silver mb-4">
                  Our global constellation of 24 satellites continuously monitors seismic activity across all major fault lines and ocean basins. Each satellite is equipped with advanced sensors capable of detecting ground displacement as small as 1 centimeter.
                </p>
                <div className="bg-cosmic-black rounded-lg p-4 border border-cosmic-blue/30">
                  <div className="text-cosmic-blue text-sm font-mono">
                    Coverage: 99.7% global ocean monitoring<br/>
                    Resolution: 10m ground sampling distance<br/>
                    Revisit time: 6 hours maximum<br/>
                    Data latency: &lt;30 seconds
                  </div>
                </div>
              </div>

              <div className="space-card">
                <h3 className="text-2xl font-orbitron font-bold mb-4 text-cosmic-blue">
                  Machine Learning Pipeline
                </h3>
                <p className="text-cosmic-silver mb-4">
                  Our AI system uses a combination of convolutional neural networks and recurrent neural networks to analyze seismic patterns. The model is trained on over 50 years of historical earthquake and tsunami data.
                </p>
                <div className="bg-cosmic-black rounded-lg p-4 border border-cosmic-green/30">
                  <div className="text-cosmic-green text-sm font-mono">
                    Model accuracy: 94.2%<br/>
                    Training data: 2.3M seismic events<br/>
                    Processing speed: 15ms per prediction<br/>
                    False positive rate: 2.1%
                  </div>
                </div>
              </div>

              <div className="space-card">
                <h3 className="text-2xl font-orbitron font-bold mb-4 text-cosmic-purple">
                  Real-time Analysis
                </h3>
                <p className="text-cosmic-silver">
                  When seismic activity is detected, our system analyzes multiple factors including magnitude, depth, fault type, and ocean floor topology to determine tsunami risk within seconds of the initial earthquake.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;
