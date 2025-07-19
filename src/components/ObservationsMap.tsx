import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useObservations } from '../lib/observations';

export default function ObservationsMap() {
  const observations = useObservations();

  return (
    <div className="w-full max-w-3xl mx-auto my-8 rounded-xl overflow-hidden shadow-lg border border-cosmic-blue/30">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: 400, width: '100%' }} scrollWheelZoom={false}>
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
