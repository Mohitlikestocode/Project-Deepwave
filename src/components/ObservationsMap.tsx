
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useObservations } from '../lib/observations';

// Fix Leaflet marker icons for Vercel/React builds
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function ObservationsMap({ containerClassName = "" }: { containerClassName?: string }) {
  const observations = useObservations();

  return (
    <div className={`w-full max-w-3xl mx-auto my-8 rounded-xl overflow-hidden shadow-lg border border-cosmic-blue/30 ${containerClassName}`} style={{ height: "100%" }}>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {observations
          .filter(obs => obs.lat && obs.lon)
          .map(obs => (
            <Marker key={obs.id} position={[obs.lat!, obs.lon!]}> 
              <Popup>
                <b>{obs.type}</b> at {obs.place} <br />
                by {obs.user_name}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
