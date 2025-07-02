import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Info, RefreshCw, Share2, Shield, AlertTriangle, Flame, Zap, Clock, History, X, Locate, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';

interface PredictionResult {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  probability: number;
  waveHeight: number;
  arrivalTime: number;
  latitude: string;
  longitude: string;
  magnitude: string;
  depth: string;
  datetime: string;
}

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    magnitude: '',
    depth: '',
    datetime: ''
  });
  
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightLatLng, setHighlightLatLng] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<PredictionResult[]>(() => {
    const saved = localStorage.getItem('predictionHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [markerPos, setMarkerPos] = useState<LatLngExpression>(
    formData.latitude && formData.longitude
      ? [parseFloat(formData.latitude), parseFloat(formData.longitude)]
      : [20, 0]
  );

  // Listen for coordinate updates from URL params or other sources
  useEffect(() => {
    const updateCoordsFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const lat = urlParams.get('lat');
      const lng = urlParams.get('lng');
      if (lat && lng) {
        const newLat = parseFloat(lat).toFixed(4);
        const newLng = parseFloat(lng).toFixed(4);
        setFormData(prev => {
          if (prev.latitude === newLat && prev.longitude === newLng) {
            return prev;
          }
          const now = new Date();
          const pad = (n: number) => n.toString().padStart(2, '0');
          const formatted = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
          toast.info('Coordinates loaded from globe selection');
          setHighlightLatLng(true);
          setTimeout(() => setHighlightLatLng(false), 1200);
          // Auto-submit the form after a short delay
          setTimeout(() => {
            if (formRef.current) {
              formRef.current.requestSubmit();
            }
          }, 800);
          return {
            ...prev,
            latitude: newLat,
            longitude: newLng,
            datetime: formatted
          };
        });
      }
    };
    // Initial load
    updateCoordsFromUrl();
    // Listen for URL changes
    window.addEventListener('popstate', updateCoordsFromUrl);
    window.addEventListener('pushstate', updateCoordsFromUrl);
    window.addEventListener('replacestate', updateCoordsFromUrl);
    // Listen for manual changes (e.g. globe button click)
    const observer = new MutationObserver(updateCoordsFromUrl);
    observer.observe(document, { subtree: true, childList: true });
    return () => {
      window.removeEventListener('popstate', updateCoordsFromUrl);
      window.removeEventListener('pushstate', updateCoordsFromUrl);
      window.removeEventListener('replacestate', updateCoordsFromUrl);
      observer.disconnect();
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const simulatePrediction = async (): Promise<PredictionResult> => {
    // Simulate AI prediction based on input data
    const mag = parseFloat(formData.magnitude);
    const depth = parseFloat(formData.depth);
    
    let riskLevel: PredictionResult['riskLevel'] = 'LOW';
    let probability = Math.random() * 30;
    let waveHeight = Math.random() * 2;
    
    if (mag >= 7.5 && depth <= 50) {
      riskLevel = 'EXTREME';
      probability = 75 + Math.random() * 20;
      waveHeight = 5 + Math.random() * 10;
    } else if (mag >= 7.0 && depth <= 70) {
      riskLevel = 'HIGH';
      probability = 50 + Math.random() * 25;
      waveHeight = 3 + Math.random() * 5;
    } else if (mag >= 6.5 && depth <= 100) {
      riskLevel = 'MEDIUM';
      probability = 25 + Math.random() * 25;
      waveHeight = 1 + Math.random() * 3;
    }
    
    return {
      riskLevel,
      probability: Math.round(probability),
      waveHeight: Math.round(waveHeight * 10) / 10,
      arrivalTime: Math.round(15 + Math.random() * 120),
      latitude: formData.latitude,
      longitude: formData.longitude,
      magnitude: formData.magnitude,
      depth: formData.depth,
      datetime: formData.datetime
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Inline validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.latitude || isNaN(Number(formData.latitude)) || Number(formData.latitude) < -90 || Number(formData.latitude) > 90) {
      newErrors.latitude = 'Latitude must be between -90 and 90.';
    }
    if (!formData.longitude || isNaN(Number(formData.longitude)) || Number(formData.longitude) < -180 || Number(formData.longitude) > 180) {
      newErrors.longitude = 'Longitude must be between -180 and 180.';
    }
    if (!formData.magnitude || isNaN(Number(formData.magnitude)) || Number(formData.magnitude) < 4 || Number(formData.magnitude) > 9.5) {
      newErrors.magnitude = 'Magnitude must be between 4.0 and 9.5.';
    }
    if (!formData.depth || isNaN(Number(formData.depth)) || Number(formData.depth) < 0 || Number(formData.depth) > 700) {
      newErrors.depth = 'Depth must be between 0 and 700 km.';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const result = await simulatePrediction();
      setPrediction(result);
      toast.success("Tsunami risk analysis completed");
      // Save to history
      const newHistory = [result, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem('predictionHistory', JSON.stringify(newHistory));
    } catch (error) {
      toast.error("Failed to generate prediction");
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-cosmic-green';
      case 'MEDIUM': return 'text-yellow-400';
      case 'HIGH': return 'text-orange-400';
      case 'EXTREME': return 'text-red-400';
      default: return 'text-cosmic-silver';
    }
  };

  const handleReset = () => {
    setFormData({ latitude: '', longitude: '', magnitude: '', depth: '', datetime: '' });
    setPrediction(null);
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    if (formData.latitude && formData.longitude) {
      url.searchParams.set('lat', formData.latitude);
      url.searchParams.set('lng', formData.longitude);
    }
    navigator.clipboard.writeText(url.toString());
    toast.success('Prediction link copied!');
  };

  // Custom marker icon to avoid default Leaflet icon issues
  const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  function LocationSelector({ setLatLng }) {
    useMapEvents({
      click(e) {
        setLatLng({
          lat: e.latlng.lat.toFixed(4),
          lng: e.latlng.lng.toFixed(4)
        });
      }
    });
    return null;
  }

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      {/* Prediction History Sidebar/Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
          <div className="w-full max-w-md bg-cosmic-black-light h-full shadow-2xl p-6 overflow-y-auto transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-orbitron text-cosmic-green flex items-center gap-2"><History className="w-6 h-6" /> Prediction History</h3>
              <button onClick={() => setShowHistory(false)} aria-label="Close History"><X className="w-6 h-6 text-cosmic-silver hover:text-cosmic-green transition-colors" /></button>
            </div>
            {history.length === 0 ? (
              <div className="text-cosmic-silver font-space text-center">No predictions yet.</div>
            ) : (
              <ul className="space-y-4">
                {history.map((item, idx) => (
                  <li key={idx} className="bg-cosmic-black border border-cosmic-blue/20 rounded-lg p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-cosmic-green font-orbitron text-lg">
                      {item.riskLevel === 'LOW' && <Shield className="text-cosmic-green" />} 
                      {item.riskLevel === 'MEDIUM' && <AlertTriangle className="text-yellow-400" />} 
                      {item.riskLevel === 'HIGH' && <Flame className="text-orange-400" />} 
                      {item.riskLevel === 'EXTREME' && <Zap className="text-red-400" />} 
                      {item.riskLevel}
                    </div>
                    <div className="text-cosmic-silver font-space text-sm flex flex-wrap gap-2">
                      <span><strong>Lat:</strong> {item.latitude}</span>
                      <span><strong>Lng:</strong> {item.longitude}</span>
                      <span><strong>Mag:</strong> {item.magnitude}</span>
                      <span><strong>Depth:</strong> {item.depth} km</span>
                      <span><strong>Wave:</strong> {item.waveHeight}m</span>
                      <span><strong>Prob:</strong> {item.probability}%</span>
                      <span><strong>Arrival:</strong> {item.arrivalTime} min</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex-1" onClick={() => setShowHistory(false)} />
        </div>
      )}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-orbitron font-bold neon-text mb-4 flex items-center justify-center gap-2">
          <Shield className="inline-block text-cosmic-green animate-pulse-glow" />
          Tsunami Risk Prediction
        </h2>
        <p className="text-cosmic-silver font-space text-lg flex items-center justify-center gap-2">
          Enter earthquake parameters for AI-powered tsunami risk analysis
          <span onMouseEnter={() => setShowTooltip('info')} onMouseLeave={() => setShowTooltip(null)} className="relative cursor-pointer">
            <Info className="inline-block text-cosmic-blue w-5 h-5" />
            {showTooltip === 'info' && (
              <span className="absolute left-6 top-0 bg-cosmic-black-light text-cosmic-silver text-xs rounded px-2 py-1 shadow-lg z-10">
                Latitude/Longitude: Click globe or enter manually. Magnitude: 4.0-9.5. Depth: 0-700km.
              </span>
            )}
          </span>
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="space-card transition-all duration-500">
          <CardHeader>
            <CardTitle className="font-orbitron text-cosmic-green flex items-center gap-2">
              <Zap className="text-cosmic-green" /> Seismic Data Input
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`space-y-2 transition-all duration-500 ${highlightLatLng ? 'ring-2 ring-green-400 bg-green-100/10' : ''}`}>
                  <Label htmlFor="latitude" className="text-cosmic-silver font-space flex items-center gap-1">
                    Latitude * <Info className="w-4 h-4 text-cosmic-blue cursor-pointer" onMouseEnter={() => setShowTooltip('lat')} onMouseLeave={() => setShowTooltip(null)} />
                    {showTooltip === 'lat' && (
                      <span className="absolute left-6 top-0 bg-cosmic-black-light text-cosmic-silver text-xs rounded px-2 py-1 shadow-lg z-10">-90 to 90 (N/S)</span>
                    )}
                  </Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="0.0001"
                    placeholder="-90 to 90"
                    value={formData.latitude}
                    onChange={(e) => handleInputChange('latitude', e.target.value)}
                    className="bg-cosmic-black border-cosmic-blue text-cosmic-silver font-space"
                  />
                </div>
                <div className={`space-y-2 transition-all duration-500 ${highlightLatLng ? 'ring-2 ring-green-400 bg-green-100/10' : ''}`}>
                  <Label htmlFor="longitude" className="text-cosmic-silver font-space flex items-center gap-1">
                    Longitude * <Info className="w-4 h-4 text-cosmic-blue cursor-pointer" onMouseEnter={() => setShowTooltip('lng')} onMouseLeave={() => setShowTooltip(null)} />
                    {showTooltip === 'lng' && (
                      <span className="absolute left-6 top-0 bg-cosmic-black-light text-cosmic-silver text-xs rounded px-2 py-1 shadow-lg z-10">-180 to 180 (E/W)</span>
                    )}
                  </Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="0.0001"
                    placeholder="-180 to 180"
                    value={formData.longitude}
                    onChange={(e) => handleInputChange('longitude', e.target.value)}
                    className="bg-cosmic-black border-cosmic-blue text-cosmic-silver font-space"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-1 bg-cosmic-blue hover:bg-cosmic-green text-white rounded transition-all duration-300 font-space text-xs"
                  aria-label="Use My Location"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (pos) => {
                          setFormData(prev => ({
                            ...prev,
                            latitude: pos.coords.latitude.toFixed(4),
                            longitude: pos.coords.longitude.toFixed(4)
                          }));
                          toast.success('Location loaded!');
                        },
                        (err) => {
                          toast.error('Could not get your location.');
                        }
                      );
                    } else {
                      toast.error('Geolocation not supported.');
                    }
                  }}
                >
                  <Locate className="w-4 h-4" /> Use My Location
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="magnitude" className="text-cosmic-silver font-space flex items-center gap-1">
                    Magnitude * <Info className="w-4 h-4 text-cosmic-blue cursor-pointer" onMouseEnter={() => setShowTooltip('mag')} onMouseLeave={() => setShowTooltip(null)} />
                    {showTooltip === 'mag' && (
                      <span className="absolute left-6 top-0 bg-cosmic-black-light text-cosmic-silver text-xs rounded px-2 py-1 shadow-lg z-10">4.0 - 9.5</span>
                    )}
                  </Label>
                  <Input
                    id="magnitude"
                    type="number"
                    step="0.1"
                    placeholder="4.0 - 9.5"
                    value={formData.magnitude}
                    onChange={(e) => handleInputChange('magnitude', e.target.value)}
                    className="bg-cosmic-black border-cosmic-blue text-cosmic-silver font-space"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="depth" className="text-cosmic-silver font-space flex items-center gap-1">
                    Depth (km) * <Info className="w-4 h-4 text-cosmic-blue cursor-pointer" onMouseEnter={() => setShowTooltip('depth')} onMouseLeave={() => setShowTooltip(null)} />
                    {showTooltip === 'depth' && (
                      <span className="absolute left-6 top-0 bg-cosmic-black-light text-cosmic-silver text-xs rounded px-2 py-1 shadow-lg z-10">0 - 700 km</span>
                    )}
                  </Label>
                  <Input
                    id="depth"
                    type="number"
                    step="0.1"
                    placeholder="0 - 700"
                    value={formData.depth}
                    onChange={(e) => handleInputChange('depth', e.target.value)}
                    className="bg-cosmic-black border-cosmic-blue text-cosmic-silver font-space"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="datetime" className="text-cosmic-silver font-space flex items-center gap-1">
                  Date & Time (Optional) <Info className="w-4 h-4 text-cosmic-blue cursor-pointer" onMouseEnter={() => setShowTooltip('datetime')} onMouseLeave={() => setShowTooltip(null)} />
                  {showTooltip === 'datetime' && (
                    <span className="absolute left-6 top-0 bg-cosmic-black-light text-cosmic-silver text-xs rounded px-2 py-1 shadow-lg z-10">Current date/time auto-filled</span>
                  )}
                </Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={formData.datetime}
                  onChange={(e) => handleInputChange('datetime', e.target.value)}
                  className="bg-cosmic-black border-cosmic-blue text-cosmic-silver font-space"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full cosmic-button transition-all duration-300 ${highlightLatLng ? 'ring-4 ring-purple-400 scale-105' : ''}`}
                >
                  {isLoading ? <span className="flex items-center justify-center"><svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Analyzing Seismic Data...</span> : "Generate Prediction"}
                </Button>
                <Button type="button" variant="outline" className="flex items-center gap-2" onClick={handleReset}><RefreshCw className="w-4 h-4" />Reset</Button>
                <Button type="button" variant="outline" className="flex items-center gap-2" onClick={handleShare}><Share2 className="w-4 h-4" />Share</Button>
                <Button type="button" variant="outline" className="flex items-center gap-2" onClick={() => setShowHistory(true)}><History className="w-4 h-4" />History</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Prediction Results */}
        <Card className="space-card transition-all duration-500">
          <CardHeader>
            <CardTitle className="font-orbitron text-cosmic-green flex items-center gap-2">
              <Flame className="text-cosmic-orange" /> Tsunami Risk Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="transition-all duration-700" style={{ opacity: prediction ? 1 : 0.7, transform: prediction ? 'scale(1)' : 'scale(0.98)' }}>
              {prediction ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className={`text-6xl font-orbitron font-bold mb-2 flex items-center justify-center gap-2 ${getRiskColor(prediction.riskLevel)}`}>
                      {prediction.riskLevel === 'LOW' && <Shield className="text-cosmic-green" />} 
                      {prediction.riskLevel === 'MEDIUM' && <AlertTriangle className="text-yellow-400" />} 
                      {prediction.riskLevel === 'HIGH' && <Flame className="text-orange-400" />} 
                      {prediction.riskLevel === 'EXTREME' && <Zap className="text-red-400" />} 
                      {prediction.riskLevel}
                    </div>
                    <div className="text-cosmic-silver font-space">Risk Level</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-cosmic-black rounded-lg">
                      <div className="text-2xl font-orbitron text-cosmic-green">
                        {prediction.probability}%
                      </div>
                      <div className="text-sm text-cosmic-silver">Probability</div>
                    </div>
                    <div className="text-center p-4 bg-cosmic-black rounded-lg">
                      <div className="text-2xl font-orbitron text-cosmic-blue">
                        {prediction.waveHeight}m
                      </div>
                      <div className="text-sm text-cosmic-silver">Wave Height</div>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-cosmic-black rounded-lg">
                    <div className="text-2xl font-orbitron text-cosmic-purple">
                      {prediction.arrivalTime} min
                    </div>
                    <div className="text-sm text-cosmic-silver">Estimated Arrival Time</div>
                  </div>

                  <div className="relative h-24 bg-cosmic-black rounded-lg overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cosmic-blue to-cosmic-blue/30 animate-wave-animation"
                         style={{ height: `${Math.min(prediction.waveHeight * 10, 100)}%` }}>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-cosmic-silver font-space font-medium">
                        Wave Simulation
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-cosmic-silver font-space text-lg mb-4 flex items-center justify-center gap-2">
                    <Info className="w-5 h-5 text-cosmic-blue" />
                    Enter seismic parameters to generate tsunami risk prediction
                  </div>
                  <div className="text-cosmic-green/60 font-mono text-sm">
                    AI Model Ready • Satellite Data Connected
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Inline validation errors */}
      <div className="mt-2 space-y-1">
        {Object.entries(errors).map(([field, msg]) => (
          <div key={field} className="text-red-400 text-xs font-space flex items-center gap-1"><Info className="w-4 h-4" />{msg}</div>
        ))}
      </div>
      <div className="my-8">
        <h3 className="font-orbitron text-cosmic-green text-lg mb-2 flex items-center gap-2"><MapPin className="w-5 h-5" /> Select Location on 2D Map</h3>
        <MapContainer
          center={markerPos as any}
          zoom={2}
          scrollWheelZoom={true}
          style={{ height: '300px', width: '100%', borderRadius: '12px', border: '1px solid #0066cc' }}
          className="z-10"
          {...({} as any)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
            {...({} as any)}
          />
          <LocationSelector setLatLng={({ lat, lng }) => {
            setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
            setMarkerPos([parseFloat(lat), parseFloat(lng)]);
            toast.success('Coordinates selected on map!');
          }} />
          {formData.latitude && formData.longitude && (
            <Marker
              position={markerPos as any}
              icon={markerIcon as any}
              draggable={true}
              eventHandlers={{
                dragend: (e: any) => {
                  const marker = e.target;
                  const pos = marker.getLatLng();
                  setFormData(prev => ({ ...prev, latitude: pos.lat.toFixed(4), longitude: pos.lng.toFixed(4) }));
                  setMarkerPos([pos.lat, pos.lng]);
                  toast.success('Marker moved!');
                }
              }}
              {...({} as any)}
            />
          )}
        </MapContainer>
      </div>
    </section>
  );
};

export default PredictionForm;
