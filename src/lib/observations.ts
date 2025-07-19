import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';

export type Observation = {
  id?: number;
  user_name: string;
  type: string;
  place: string;
  created_at?: string;
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
  // Remove minutes_ago before insert
  const { minutes_ago, ...obsNoMinutes } = observation as any;
  const { data, error } = await supabase.from('observations').insert([obsNoMinutes]);
  return { data, error };
}
