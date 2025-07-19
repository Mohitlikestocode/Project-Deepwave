
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
  // Filter to only show observations from the last 1 day (24 hours)
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const recentObservations = observations.filter(obs => {
    if (!obs.created_at) return false;
    const created = new Date(obs.created_at).getTime();
    return now - created <= oneDayMs;
  });

  // Helper to format time ago
  function timeAgo(dateString?: string) {
    if (!dateString) return '';
    const diffMs = now - new Date(dateString).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  }

  return (
    <div className={`w-full max-w-3xl mx-auto my-8 rounded-xl overflow-hidden shadow-lg border border-cosmic-blue/30 ${containerClassName}`} style={{ height: "100%" }}>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%", width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {recentObservations
          .filter(obs => obs.lat && obs.lon)
          .map(obs => (
            <Marker key={obs.id} position={[obs.lat!, obs.lon!]}> 
              <Popup>
                <b>{obs.type}</b> at {obs.place}<br />
                Reported by <b>{obs.user_name}</b> {timeAgo(obs.created_at)}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
