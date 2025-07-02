
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";

interface SimulationData {
  epicenterLat: number;
  epicenterLng: number;
  magnitude: number;
  depth: number;
  waveHeight: number;
  speed: number;
  affectedAreas: string[];
}

const Simulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [magnitude, setMagnitude] = useState([7.0]);
  const [depth, setDepth] = useState([50]);
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null);
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    scenario: 'custom'
  });

  const presetScenarios = [
    {
      name: "Cascadia Subduction Zone",
      lat: 44.0,
      lng: -125.0,
      mag: 9.0,
      depth: 25,
      description: "Major earthquake scenario off Pacific Northwest coast"
    },
    {
      name: "Caribbean Fault System",
      lat: 18.0,
      lng: -67.0,
      mag: 8.2,
      depth: 35,
      description: "Large earthquake affecting Caribbean islands"
    },
    {
      name: "Mediterranean Sea",
      lat: 35.0,
      lng: 23.0,
      mag: 7.8,
      depth: 45,
      description: "Significant seismic event in Eastern Mediterranean"
    }
  ];

  const runSimulation = async () => {
    if (!formData.latitude || !formData.longitude) {
      toast.error("Please enter valid coordinates");
      return;
    }

    setIsRunning(true);
    
    try {
      // Simulate calculation delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Calculate tsunami parameters based on magnitude and depth
      const mag = magnitude[0];
      const depthKm = depth[0];
      
      let waveHeight = 0;
      let speed = 0;
      let affectedAreas: string[] = [];
      
      if (mag >= 8.5) {
        waveHeight = 8 + Math.random() * 12;
        speed = 700 + Math.random() * 100;
        affectedAreas = ["Coastal areas within 2000km", "Pacific Basin", "Indian Ocean"];
      } else if (mag >= 7.5) {
        waveHeight = 3 + Math.random() * 8;
        speed = 500 + Math.random() * 200;
        affectedAreas = ["Regional coastal areas", "Nearby islands"];
      } else if (mag >= 7.0) {
        waveHeight = 1 + Math.random() * 4;
        speed = 300 + Math.random() * 200;
        affectedAreas = ["Local coastal communities"];
      } else {
        waveHeight = 0.1 + Math.random() * 1;
        speed = 100 + Math.random() * 200;
        affectedAreas = ["Very localized areas"];
      }

      const simulation: SimulationData = {
        epicenterLat: parseFloat(formData.latitude),
        epicenterLng: parseFloat(formData.longitude),
        magnitude: mag,
        depth: depthKm,
        waveHeight: Math.round(waveHeight * 10) / 10,
        speed: Math.round(speed),
        affectedAreas
      };

      setSimulationData(simulation);
      toast.success("Tsunami simulation completed");
    } catch (error) {
      toast.error("Simulation failed");
    } finally {
      setIsRunning(false);
    }
  };

  const loadPreset = (preset: typeof presetScenarios[0]) => {
    setFormData({
      latitude: preset.lat.toString(),
      longitude: preset.lng.toString(),
      scenario: 'preset'
    });
    setMagnitude([preset.mag]);
    setDepth([preset.depth]);
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
                Tsunami Simulation
              </h1>
              <p className="text-cosmic-silver font-space text-lg max-w-3xl mx-auto">
                Visualize tsunami risk scenarios with custom earthquake parameters
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Control Panel */}
              <div className="lg:col-span-1 space-y-6">
                {/* Preset Scenarios */}
                <Card className="space-card">
                  <CardHeader>
                    <CardTitle className="font-orbitron text-cosmic-green">
                      Preset Scenarios
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {presetScenarios.map((preset, index) => (
                      <div
                        key={index}
                        className="p-3 bg-cosmic-black rounded-lg border border-cosmic-blue/30 hover:border-cosmic-green/50 cursor-pointer transition-colors"
                        onClick={() => loadPreset(preset)}
                      >
                        <div className="font-space text-cosmic-green text-sm font-medium">
                          {preset.name}
                        </div>
                        <div className="text-cosmic-silver text-xs mb-2">
                          {preset.description}
                        </div>
                        <div className="flex justify-between text-xs text-cosmic-silver/70">
                          <span>M{preset.mag}</span>
                          <span>{preset.depth}km deep</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Custom Parameters */}
                <Card className="space-card">
                  <CardHeader>
                    <CardTitle className="font-orbitron text-cosmic-green">
                      Custom Parameters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-cosmic-silver font-space">Latitude</Label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.latitude}
                          onChange={(e) => setFormData(prev => ({ ...prev, latitude: e.target.value }))}
                          className="bg-cosmic-black border-cosmic-blue text-cosmic-silver"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-cosmic-silver font-space">Longitude</Label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={formData.longitude}
                          onChange={(e) => setFormData(prev => ({ ...prev, longitude: e.target.value }))}
                          className="bg-cosmic-black border-cosmic-blue text-cosmic-silver"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-cosmic-silver font-space">
                        Magnitude: {magnitude[0]}
                      </Label>
                      <Slider
                        value={magnitude}
                        onValueChange={setMagnitude}
                        min={6.0}
                        max={9.5}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-cosmic-silver font-space">
                        Depth: {depth[0]}km
                      </Label>
                      <Slider
                        value={depth}
                        onValueChange={setDepth}
                        min={5}
                        max={200}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <Button
                      onClick={runSimulation}
                      disabled={isRunning}
                      className="w-full cosmic-button"
                    >
                      {isRunning ? "Running Simulation..." : "Run Simulation"}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Simulation Results */}
              <div className="lg:col-span-2">
                <Card className="space-card h-full">
                  <CardHeader>
                    <CardTitle className="font-orbitron text-cosmic-green">
                      Simulation Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {simulationData ? (
                      <div className="space-y-8">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-cosmic-black rounded-lg">
                            <div className="text-2xl font-orbitron text-cosmic-green">
                              M{simulationData.magnitude}
                            </div>
                            <div className="text-sm text-cosmic-silver">Magnitude</div>
                          </div>
                          <div className="text-center p-4 bg-cosmic-black rounded-lg">
                            <div className="text-2xl font-orbitron text-cosmic-blue">
                              {simulationData.waveHeight}m
                            </div>
                            <div className="text-sm text-cosmic-silver">Max Wave Height</div>
                          </div>
                          <div className="text-center p-4 bg-cosmic-black rounded-lg">
                            <div className="text-2xl font-orbitron text-cosmic-purple">
                              {simulationData.speed}
                            </div>
                            <div className="text-sm text-cosmic-silver">Speed (km/h)</div>
                          </div>
                          <div className="text-center p-4 bg-cosmic-black rounded-lg">
                            <div className="text-2xl font-orbitron text-orange-400">
                              {simulationData.depth}km
                            </div>
                            <div className="text-sm text-cosmic-silver">Depth</div>
                          </div>
                        </div>

                        {/* Wave Animation */}
                        <div className="relative h-32 bg-cosmic-black rounded-lg overflow-hidden">
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cosmic-blue to-cosmic-blue/30 animate-wave-animation"
                               style={{ height: `${Math.min(simulationData.waveHeight * 8, 100)}%` }}>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-cosmic-silver font-space font-medium">
                              Tsunami Wave Propagation
                            </span>
                          </div>
                          {/* Epicenter marker */}
                          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                        </div>

                        {/* Affected Areas */}
                        <div>
                          <h3 className="font-orbitron text-cosmic-green mb-4 text-lg">
                            Affected Areas
                          </h3>
                          <div className="space-y-2">
                            {simulationData.affectedAreas.map((area, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-3 p-3 bg-cosmic-black rounded-lg"
                              >
                                <div className="w-2 h-2 bg-red-400 rounded-full" />
                                <span className="text-cosmic-silver font-space">{area}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Risk Assessment */}
                        <div className="p-6 bg-cosmic-black rounded-lg">
                          <h3 className="font-orbitron text-cosmic-green mb-4 text-lg">
                            Risk Assessment
                          </h3>
                          <div className="space-y-3 text-cosmic-silver font-space">
                            <p>
                              <strong>Tsunami Risk Level:</strong>{' '}
                              <span className={
                                simulationData.waveHeight > 5 ? 'text-red-400' :
                                simulationData.waveHeight > 2 ? 'text-orange-400' :
                                simulationData.waveHeight > 1 ? 'text-yellow-400' : 'text-cosmic-green'
                              }>
                                {simulationData.waveHeight > 5 ? 'EXTREME' :
                                 simulationData.waveHeight > 2 ? 'HIGH' :
                                 simulationData.waveHeight > 1 ? 'MEDIUM' : 'LOW'}
                              </span>
                            </p>
                            <p>
                              <strong>Estimated Arrival Time:</strong> {Math.round(300 / simulationData.speed * 60)} minutes to nearest coast
                            </p>
                            <p>
                              <strong>Recommended Action:</strong>{' '}
                              {simulationData.waveHeight > 2 
                                ? 'Immediate evacuation of coastal areas'
                                : 'Monitor conditions and prepare for potential evacuation'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="text-cosmic-silver font-space text-lg mb-4">
                          Set parameters and run simulation to visualize tsunami risk
                        </div>
                        <div className="text-cosmic-green/60 font-mono text-sm">
                          Simulation Engine Ready
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Simulation;
