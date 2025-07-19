
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import { geocodePlace } from './geocode';

export type Observation = {
  id?: number;
  user_name: string;
  type: string;
  place: string;
  created_at?: string;
  lat?: number;
  lon?: number;
};

export function useObservations() {
  const [observations, setObservations] = useState<Observation[]>([]);

  useEffect(() => {
    fetchObservations();
    const channel = supabase
      .channel('public:observations')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'observations' }, (payload) => {
        fetchObservations();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchObservations() {
    const { data, error } = await supabase
      .from('observations')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setObservations(data);
  }

  return observations;
}

export async function submitObservation(observation: Observation) {
  // Geocode the place before submitting
  let coords = null;
  try {
    coords = await geocodePlace(observation.place);
    console.log('Geocoding result for', observation.place, ':', coords);
  } catch (e) {
    console.error('Geocoding error:', e);
  }
  const obsWithCoords = coords
    ? { ...observation, lat: coords.lat, lon: coords.lon }
    : { ...observation, lat: null, lon: null };
  const { data, error } = await supabase.from('observations').insert([obsWithCoords]);
  if (error) {
    console.error('Supabase insert error:', error);
  }
  return { data, error };
}
