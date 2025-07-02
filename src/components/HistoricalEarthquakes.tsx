import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { List, Info } from 'lucide-react';

interface HistoricalEvent {
  id: number;
  title: string;
  location: string;
  date: string;
  magnitude: number;
  toll: string;
  impact: string;
  image: string;
}

const HistoricalEarthquakes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const historicalEvents: HistoricalEvent[] = [
    {
      id: 1,
      title: "2004 Indian Ocean Tsunami",
      location: "Sumatra, Indonesia",
      date: "December 26, 2004",
      magnitude: 9.1,
      toll: "230,000+ casualties",
      impact: "Devastated coastlines across 14 countries, leading to major improvements in tsunami warning systems.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400"
    },
    {
      id: 2,
      title: "2011 Tōhoku Tsunami",
      location: "Honshu, Japan",
      date: "March 11, 2011",
      magnitude: 9.1,
      toll: "20,000+ casualties",
      impact: "Triggered Fukushima nuclear disaster, revolutionized tsunami preparedness and coastal defenses.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
    },
    {
      id: 3,
      title: "1755 Lisbon Earthquake",
      location: "Lisbon, Portugal",
      date: "November 1, 1755",
      magnitude: 8.5,
      toll: "60,000+ casualties",
      impact: "First documented tsunami in Europe, influenced Enlightenment philosophy and seismology development.",
      image: "https://images.unsplash.com/photo-1580500550469-0b85be48a5b0?w=400"
    },
    {
      id: 4,
      title: "1960 Chilean Tsunami",
      location: "Valdivia, Chile",
      date: "May 22, 1960",
      magnitude: 9.5,
      toll: "5,700+ casualties",
      impact: "Largest earthquake ever recorded, created Pacific-wide tsunami warning systems.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
    },
    {
      id: 5,
      title: "1964 Alaska Tsunami",
      location: "Prince William Sound, Alaska",
      date: "March 27, 1964",
      magnitude: 9.2,
      toll: "130+ casualties",
      impact: "Led to establishment of US Tsunami Warning Centers and improved building codes.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400"
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % historicalEvents.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, historicalEvents.length]);

  const currentEvent = historicalEvents[currentIndex];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-orbitron font-bold neon-text mb-2 flex items-center justify-center gap-2" aria-label="Historical Earthquakes">
          <List className="w-7 h-7 text-cosmic-green" /> Historical Earthquakes
        </h2>
        <p className="text-cosmic-silver font-space text-lg flex items-center justify-center gap-2">
          <Info className="w-5 h-5 text-cosmic-blue" />
          Explore major seismic events and their impact on tsunami risk.
        </p>
      </div>

      <div className="relative">
        <Card className="space-card overflow-hidden">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 min-h-[400px]">
              {/* Image */}
              <div className="relative">
                <img
                  src={currentEvent.image}
                  alt={currentEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-cosmic-black/40" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between items-center">
                    <span className="text-cosmic-green font-orbitron font-bold text-2xl">
                      M{currentEvent.magnitude}
                    </span>
                    <span className="text-cosmic-silver font-space text-sm">
                      {currentEvent.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-orbitron font-bold text-cosmic-green mb-2">
                    {currentEvent.title}
                  </h3>
                  <p className="text-cosmic-blue font-space text-lg">
                    {currentEvent.location}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-cosmic-black rounded-lg">
                    <div className="text-sm text-cosmic-silver mb-1">Human Toll</div>
                    <div className="text-lg font-space text-red-400">
                      {currentEvent.toll}
                    </div>
                  </div>

                  <div className="p-4 bg-cosmic-black rounded-lg">
                    <div className="text-sm text-cosmic-silver mb-2">Historical Impact</div>
                    <p className="text-cosmic-silver font-space leading-relaxed">
                      {currentEvent.impact}
                    </p>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between pt-4">
                  <div className="flex space-x-2">
                    {historicalEvents.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentIndex(index);
                          setIsAutoPlay(false);
                        }}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentIndex 
                            ? 'bg-cosmic-green' 
                            : 'bg-cosmic-silver/30 hover:bg-cosmic-silver/60'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => {
                        setCurrentIndex((prev) => (prev - 1 + historicalEvents.length) % historicalEvents.length);
                        setIsAutoPlay(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="border-cosmic-blue text-cosmic-blue hover:bg-cosmic-blue hover:text-cosmic-black"
                    >
                      Previous
                    </Button>
                    
                    <Button
                      onClick={() => setIsAutoPlay(!isAutoPlay)}
                      variant="outline"
                      size="sm"
                      className="border-cosmic-green text-cosmic-green hover:bg-cosmic-green hover:text-cosmic-black"
                    >
                      {isAutoPlay ? 'Pause' : 'Play'}
                    </Button>
                    
                    <Button
                      onClick={() => {
                        setCurrentIndex((prev) => (prev + 1) % historicalEvents.length);
                        setIsAutoPlay(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="border-cosmic-blue text-cosmic-blue hover:bg-cosmic-blue hover:text-cosmic-black"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event counter */}
        <div className="absolute top-4 right-4 bg-cosmic-black/80 backdrop-blur-sm rounded-lg px-3 py-1">
          <span className="text-cosmic-green font-orbitron text-sm">
            {currentIndex + 1} / {historicalEvents.length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HistoricalEarthquakes;
