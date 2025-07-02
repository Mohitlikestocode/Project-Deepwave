import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface EarthquakeData {
  id: string;
  magnitude: number;
  location: string;
  depth: number;
  time: string;
  coordinates: [number, number];
  tsunamiRisk: 'LOW' | 'MEDIUM' | 'HIGH';
}

const LiveDataPanel = () => {
  const [earthquakes, setEarthquakes] = useState<EarthquakeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Simulate live earthquake data
  const simulateEarthquakeData = (): EarthquakeData[] => {
    const locations = [
      { name: "Pacific Ring of Fire", coords: [35.6762, 139.6503] as [number, number] },
      { name: "San Andreas Fault, CA", coords: [34.0522, -118.2437] as [number, number] },
      { name: "Aegean Sea, Greece", coords: [39.0742, 21.8243] as [number, number] },
      { name: "Aleutian Islands, AK", coords: [51.8806, -176.6581] as [number, number] },
      { name: "Chile-Peru Trench", coords: [-33.4489, -70.6693] as [number, number] },
    ];

    return Array.from({ length: 5 }, (_, i) => {
      const location = locations[i];
      const magnitude = 4.5 + Math.random() * 3.5;
      const depth = 10 + Math.random() * 200;
      
      let tsunamiRisk: EarthquakeData['tsunamiRisk'] = 'LOW';
      if (magnitude > 7.0 && depth < 70) tsunamiRisk = 'HIGH';
      else if (magnitude > 6.5 && depth < 100) tsunamiRisk = 'MEDIUM';

      return {
        id: `eq_${Date.now()}_${i}`,
        magnitude: Math.round(magnitude * 10) / 10,
        location: location.name,
        depth: Math.round(depth),
        time: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        coordinates: location.coords,
        tsunamiRisk
      };
    });
  };

  const fetchLiveData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newData = simulateEarthquakeData();
      setEarthquakes(newData);
      setLastUpdate(new Date());
    } catch (error) {
      toast.error("Failed to fetch live data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    fetchLiveData();
    
    // Auto-refresh every 2 minutes
    const interval = setInterval(fetchLiveData, 120000);
    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-cosmic-green bg-cosmic-green/20';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-400/20';
      case 'HIGH': return 'text-red-400 bg-red-400/20';
      default: return 'text-cosmic-silver bg-cosmic-silver/20';
    }
  };

  const getMagnitudeColor = (magnitude: number) => {
    if (magnitude >= 7.0) return 'text-red-400';
    if (magnitude >= 6.0) return 'text-orange-400';
    if (magnitude >= 5.0) return 'text-yellow-400';
    return 'text-cosmic-green';
  };

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-orbitron font-bold neon-text mb-4">
          Live Seismic Data
        </h2>
        <p className="text-cosmic-silver font-space text-lg">
          Real-time earthquake monitoring and tsunami risk assessment
        </p>
      </div>

      <Card className="space-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-orbitron text-cosmic-green">
            Recent Earthquake Activity
          </CardTitle>
          <div className="flex items-center space-x-4">
            {lastUpdate && (
              <span className="text-sm text-cosmic-silver font-space">
                Last update: {lastUpdate.toLocaleTimeString()}
              </span>
            )}
            <Button
              onClick={fetchLiveData}
              disabled={isLoading}
              size="sm"
              className="cosmic-button"
            >
              {isLoading ? "Updating..." : "Refresh Data"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {earthquakes.length > 0 ? (
            <div className="space-y-4">
              {earthquakes.map((eq) => (
                <div
                  key={eq.id}
                  className="p-4 bg-cosmic-black rounded-lg border border-cosmic-blue/30 hover:border-cosmic-green/50 transition-colors"
                >
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div>
                      <div className={`text-2xl font-orbitron font-bold ${getMagnitudeColor(eq.magnitude)}`}>
                        M{eq.magnitude}
                      </div>
                      <div className="text-sm text-cosmic-silver">
                        Depth: {eq.depth}km
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <div className="font-space text-cosmic-silver mb-1">
                        {eq.location}
                      </div>
                      <div className="text-sm text-cosmic-silver/70">
                        {new Date(eq.time).toLocaleString()}
                      </div>
                      <div className="text-xs text-cosmic-silver/50 font-mono">
                        {eq.coordinates[0].toFixed(4)}, {eq.coordinates[1].toFixed(4)}
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-orbitron font-bold ${getRiskColor(eq.tsunamiRisk)}`}>
                        {eq.tsunamiRisk} RISK
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-cosmic-silver font-space text-lg mb-4">
                No recent earthquake data available
              </div>
              <Button onClick={fetchLiveData} className="cosmic-button">
                Load Data
              </Button>
            </div>
          )}
          
          {/* Data source disclaimer */}
          <div className="mt-6 p-4 bg-cosmic-black-light rounded-lg">
            <p className="text-xs text-cosmic-silver/70 font-space">
              * This is simulated data for demonstration purposes. In production, this would connect to USGS/NOAA real-time earthquake feeds.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default LiveDataPanel;
