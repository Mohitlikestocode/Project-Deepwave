import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart2, Info } from 'lucide-react';

const AIPerformanceDashboard = () => {
  const performanceMetrics = {
    accuracy: 94.2,
    precision: 91.8,
    recall: 96.3,
    f1Score: 94.0
  };

  const featureImportance = [
    { feature: "Magnitude", importance: 85 },
    { feature: "Depth", importance: 78 },
    { feature: "Location", importance: 72 },
    { feature: "Seismic History", importance: 65 },
    { feature: "Ocean Depth", importance: 58 },
    { feature: "Plate Boundaries", importance: 45 }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold neon-text mb-2 flex items-center justify-center gap-2" aria-label="AI Model Performance">
          <BarChart2 className="w-7 h-7 text-cosmic-green" /> AI Model Performance
        </h2>
        <p className="text-cosmic-silver font-space text-lg flex items-center justify-center gap-2">
          <Info className="w-5 h-5 text-cosmic-blue" />
          Real-time accuracy and reliability metrics for tsunami risk prediction.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Performance Metrics */}
        <div className="lg:col-span-1">
          <Card className="space-card">
            <CardHeader>
              <CardTitle className="font-orbitron text-cosmic-green">Model Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(performanceMetrics).map(([metric, value]) => (
                <div key={metric} className="space-y-2">
                  <div className="flex justify-between text-cosmic-silver">
                    <span className="font-space capitalize">
                      {metric.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-orbitron text-cosmic-green">
                      {value}%
                    </span>
                  </div>
                  <Progress 
                    value={value} 
                    className="h-2 bg-cosmic-black"
                  />
                </div>
              ))}
              
              <div className="pt-4 border-t border-cosmic-blue/30">
                <div className="text-center">
                  <div className="text-3xl font-orbitron text-cosmic-green mb-1">
                    {performanceMetrics.accuracy}%
                  </div>
                  <div className="text-sm text-cosmic-silver">Overall Accuracy</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Importance Chart */}
        <div className="lg:col-span-2">
          <Card className="space-card">
            <CardHeader>
              <CardTitle className="font-orbitron text-cosmic-green">Feature Importance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featureImportance.map((item, index) => (
                  <div key={item.feature} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-space text-cosmic-silver">
                        {item.feature}
                      </span>
                      <span className="font-orbitron text-cosmic-green text-sm">
                        {item.importance}%
                      </span>
                    </div>
                    <div className="relative h-3 bg-cosmic-black rounded-full overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-cosmic-green to-cosmic-blue rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${item.importance}%`,
                          animationDelay: `${index * 200}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-cosmic-black rounded-lg">
                  <div className="text-lg font-orbitron text-cosmic-green">12,847</div>
                  <div className="text-xs text-cosmic-silver">Training Samples</div>
                </div>
                <div className="p-3 bg-cosmic-black rounded-lg">
                  <div className="text-lg font-orbitron text-cosmic-blue">3,211</div>
                  <div className="text-xs text-cosmic-silver">Test Samples</div>
                </div>
                <div className="p-3 bg-cosmic-black rounded-lg">
                  <div className="text-lg font-orbitron text-cosmic-purple">156</div>
                  <div className="text-xs text-cosmic-silver">Model Updates</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIPerformanceDashboard;
