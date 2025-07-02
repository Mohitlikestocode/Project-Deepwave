
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface AccuracyComparison {
  event: string;
  date: string;
  location: string;
  actualWaveHeight: number;
  predictedWaveHeight: number;
  accuracy: number;
  outcome: string;
}

const ModelAccuracy = () => {
  const comparisons: AccuracyComparison[] = [
    {
      event: "2011 Tōhoku Tsunami",
      date: "March 11, 2011",
      location: "Honshu, Japan",
      actualWaveHeight: 9.3,
      predictedWaveHeight: 8.7,
      accuracy: 93.5,
      outcome: "Successfully predicted major tsunami risk"
    },
    {
      event: "2004 Indian Ocean Tsunami",
      date: "December 26, 2004",
      location: "Sumatra, Indonesia",
      actualWaveHeight: 24.0,
      predictedWaveHeight: 21.5,
      accuracy: 89.6,
      outcome: "Predicted extreme risk with high accuracy"
    },
    {
      event: "2010 Chile Tsunami",
      date: "February 27, 2010",
      location: "Maule, Chile",
      actualWaveHeight: 5.8,
      predictedWaveHeight: 6.2,
      accuracy: 93.1,
      outcome: "Accurate prediction enabled early warnings"
    },
    {
      event: "2006 Java Tsunami",
      date: "July 17, 2006",
      location: "Java, Indonesia",
      actualWaveHeight: 2.1,
      predictedWaveHeight: 1.9,
      accuracy: 90.5,
      outcome: "Correctly identified moderate risk level"
    },
    {
      event: "2012 Haida Gwaii",
      date: "October 28, 2012",
      location: "British Columbia, Canada",
      actualWaveHeight: 1.5,
      predictedWaveHeight: 1.3,
      accuracy: 86.7,
      outcome: "Predicted low risk, minimal damage occurred"
    },
    {
      event: "2018 Sulawesi Tsunami",
      date: "September 28, 2018",
      location: "Sulawesi, Indonesia",
      actualWaveHeight: 11.3,
      predictedWaveHeight: 10.1,
      accuracy: 89.4,
      outcome: "High accuracy for complex coastal geometry"
    }
  ];

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-cosmic-green';
    if (accuracy >= 80) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getAccuracyBg = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-cosmic-green/20';
    if (accuracy >= 80) return 'bg-yellow-400/20';
    return 'bg-orange-400/20';
  };

  return (
    <div className="min-h-screen bg-cosmic-gradient">
      <div className="space-grid min-h-screen">
        <Navigation />
        
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-orbitron font-bold neon-text mb-4">
                Model Accuracy Gallery
              </h1>
              <p className="text-cosmic-silver font-space text-lg max-w-3xl mx-auto">
                Comparing our AI predictions with real historic tsunami events to validate model performance
              </p>
            </div>

            {/* Overall Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card className="space-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-orbitron text-cosmic-green mb-2">90.1%</div>
                  <div className="text-cosmic-silver font-space">Average Accuracy</div>
                </CardContent>
              </Card>
              <Card className="space-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-orbitron text-cosmic-blue mb-2">1,247</div>
                  <div className="text-cosmic-silver font-space">Events Analyzed</div>
                </CardContent>
              </Card>
              <Card className="space-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-orbitron text-cosmic-purple mb-2">94.7%</div>
                  <div className="text-cosmic-silver font-space">Risk Level Accuracy</div>
                </CardContent>
              </Card>
              <Card className="space-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-orbitron text-cosmic-green mb-2">±12%</div>
                  <div className="text-cosmic-silver font-space">Wave Height Error</div>
                </CardContent>
              </Card>
            </div>

            {/* Comparison Cards */}
            <div className="grid lg:grid-cols-2 gap-8">
              {comparisons.map((comparison, index) => (
                <Card key={index} className="space-card">
                  <CardHeader>
                    <CardTitle className="font-orbitron text-cosmic-green">
                      {comparison.event}
                    </CardTitle>
                    <div className="text-cosmic-silver font-space">
                      {comparison.location} • {comparison.date}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Wave Height Comparison */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-cosmic-silver font-space">Actual Wave Height</span>
                        <span className="text-red-400 font-orbitron text-xl">
                          {comparison.actualWaveHeight}m
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-cosmic-silver font-space">Predicted Wave Height</span>
                        <span className="text-cosmic-blue font-orbitron text-xl">
                          {comparison.predictedWaveHeight}m
                        </span>
                      </div>
                    </div>

                    {/* Visual comparison bars */}
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="text-xs text-cosmic-silver">Actual</div>
                        <div className="w-full bg-cosmic-black rounded-full h-3">
                          <div 
                            className="bg-red-400 h-3 rounded-full"
                            style={{ width: `${Math.min(comparison.actualWaveHeight * 4, 100)}%` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-cosmic-silver">Predicted</div>
                        <div className="w-full bg-cosmic-black rounded-full h-3">
                          <div 
                            className="bg-cosmic-blue h-3 rounded-full"
                            style={{ width: `${Math.min(comparison.predictedWaveHeight * 4, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Accuracy Badge */}
                    <div className="flex items-center justify-between">
                      <div className={`px-4 py-2 rounded-lg ${getAccuracyBg(comparison.accuracy)}`}>
                        <span className={`font-orbitron font-bold ${getAccuracyColor(comparison.accuracy)}`}>
                          {comparison.accuracy}% Accurate
                        </span>
                      </div>
                    </div>

                    {/* Outcome */}
                    <div className="p-4 bg-cosmic-black rounded-lg">
                      <div className="text-sm text-cosmic-silver mb-1">Model Performance</div>
                      <p className="text-cosmic-silver font-space">
                        {comparison.outcome}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Model Improvements Section */}
            <div className="mt-16">
              <Card className="space-card">
                <CardHeader>
                  <CardTitle className="font-orbitron text-cosmic-green text-center">
                    Continuous Model Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-2xl font-orbitron text-cosmic-blue mb-2">v3.2</div>
                      <div className="text-cosmic-silver font-space mb-2">Current Model</div>
                      <div className="text-sm text-cosmic-silver/70">
                        Enhanced deep learning architecture with satellite data integration
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-orbitron text-cosmic-green mb-2">156</div>
                      <div className="text-cosmic-silver font-space mb-2">Updates Deployed</div>
                      <div className="text-sm text-cosmic-silver/70">
                        Regular model improvements based on new data and research
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-orbitron text-cosmic-purple mb-2">24/7</div>
                      <div className="text-cosmic-silver font-space mb-2">Monitoring</div>
                      <div className="text-sm text-cosmic-silver/70">
                        Continuous performance tracking and validation
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ModelAccuracy;
