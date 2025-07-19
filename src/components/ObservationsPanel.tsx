import React, { useState, useEffect } from 'react';
import { useObservations, submitObservation, Observation } from '../lib/observations';
import { supabase } from '../lib/supabaseClient';
import ObservationsMap from './ObservationsMap';

const observationTypes = [
  'Earthquake',
  'Unusual water behavior',
  'Strange animal behavior',
  'Other',
];

export default function ObservationsPanel() {
  const observations = useObservations();
  const [type, setType] = useState(observationTypes[0]);
  const [place, setPlace] = useState('');
  // Removed minutesAgo state
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserName(data?.user?.user_metadata?.full_name || data?.user?.email || '');
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!userName) {
      setError('You must be logged in to submit an observation.');
      return;
    }
    if (!place) {
      setError('Please fill all fields.');
      return;
    }
    setSubmitting(true);
    const obs: Observation = {
      user_name: userName,
      type,
      place,
    };
    const { error } = await submitObservation(obs);
    setSubmitting(false);
    if (error) {
      setError('Failed to submit observation.');
    } else {
      setSuccess('Observation submitted!');
      setPlace('');
    }
  }

  return (
    <section className="relative py-16 px-2 max-w-7xl mx-auto animate-fadeIn">
      <div className="bg-cosmic-black-light/80 border border-cosmic-blue/30 rounded-2xl shadow-2xl p-4 md:p-12 flex flex-col">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold neon-text mb-4 text-cosmic-green text-center drop-shadow-lg">
          🌍 Community Earthquake & Tsunami Observations
        </h2>
        <p className="text-cosmic-silver font-space text-lg md:text-xl mb-8 text-center">
          Did you feel any unusual activity? <span className="text-cosmic-green font-bold">Report so the world can see!</span>
        </p>
        <div className="flex flex-col xl:flex-row gap-10 justify-between items-stretch w-full">
          {/* Left: Perry + Report Form and Observations List */}
          <div className="flex-[2] flex flex-col gap-6 min-w-[320px]">
            <div className="flex flex-col gap-2 mb-2">
              <div className="flex items-center gap-4 bg-cosmic-blue/20 border-2 border-cosmic-blue rounded-xl px-4 py-2 shadow-lg">
                <img src="/components/perry.png" alt="Perry" className="w-16 h-16 rounded-full border-2 border-cosmic-blue shadow-lg bg-cosmic-black" />
                <div className="text-cosmic-silver font-space text-sm md:text-base leading-tight">
                  <span className="font-bold text-cosmic-blue">Note:</span> These are community-reported observations and may not be verified. Please use your own judgment!
                </div>
              </div>
              <div className="flex items-center gap-4 bg-cosmic-black border-2 border-cosmic-green rounded-xl px-4 py-2 shadow-lg">
                <img src="/components/perry.png" alt="Perry" className="w-16 h-16 rounded-full border-2 border-cosmic-green shadow-lg bg-cosmic-black" />
                <div className="text-cosmic-silver font-space text-sm md:text-base leading-tight">
                  <span className="font-bold text-cosmic-green">Tip:</span> If you're logged in, your observation will show your email as your name!
                </div>
              </div>
            </div>
            <div className="bg-cosmic-black border border-cosmic-blue/20 rounded-xl p-6 shadow-lg flex-1 flex flex-col justify-between">
              <h3 className="text-xl font-orbitron font-bold text-cosmic-blue mb-4 text-center">Report Observation</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-cosmic-blue">Your Name</label>
                  <input value={userName} disabled className="input bg-cosmic-black text-cosmic-silver border border-cosmic-blue/30 rounded px-3 py-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-cosmic-blue">Type</label>
                  <select value={type} onChange={e => setType(e.target.value)} className="input bg-cosmic-black text-cosmic-silver border border-cosmic-blue/30 rounded px-3 py-2">
                    {observationTypes.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-cosmic-blue">Place Name</label>
                  <input
                    type="text"
                    value={place}
                    onChange={e => setPlace(e.target.value)}
                    required
                    className="input bg-cosmic-black text-cosmic-silver border border-cosmic-blue/30 rounded px-3 py-2"
                  />
                </div>
                {/* Removed minutes ago input field */}
                <button
                  type="submit"
                  disabled={submitting || !userName}
                  className="w-full px-8 py-3 bg-cosmic-green hover:bg-cosmic-green-dark text-cosmic-black font-orbitron font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mt-2"
                >
                  {submitting ? 'Submitting...' : 'Submit Observation'}
                </button>
                {error && <div className="text-red-500 font-bold text-center animate-fadeIn">{error}</div>}
                {success && <div className="text-green-400 font-bold text-center animate-fadeIn">{success}</div>}
                {!userName && <div className="text-cosmic-silver text-center mt-2">You must be logged in to submit an observation.</div>}
              </form>
            </div>
            {/* Recent Observations List */}
            <div className="bg-cosmic-black border border-cosmic-blue/20 rounded-xl p-6 shadow-lg max-h-[520px] overflow-y-auto w-full">
              <h3 className="text-xl font-orbitron font-bold text-cosmic-blue mb-4 text-center">Recent Observations</h3>
              <ul className="space-y-4">
                {observations.length === 0 && (
                  <li className="text-cosmic-silver text-center">No observations yet. Be the first to report!</li>
                )}
                {observations.map(obs => (
                  <li key={obs.id} className="bg-cosmic-black-light border border-cosmic-blue/20 rounded-lg px-4 py-3 shadow flex flex-col md:flex-row md:items-center md:gap-4 animate-fadeIn">
                    <span className="font-bold text-cosmic-green">{obs.user_name}</span>
                    <span className="text-cosmic-silver">experienced</span>
                    <span className="font-bold text-cosmic-blue">{obs.type}</span>
                    <span className="text-cosmic-silver">at</span>
                    <span className="font-bold text-cosmic-green">{obs.place}</span>
                    <span className="text-cosmic-silver">{
                      obs.created_at
                        ? `${Math.floor((Date.now() - new Date(obs.created_at).getTime()) / 60000)} min ago`
                        : ''
                    }</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Map on the right, using extra horizontal space */}
          <div className="flex-1 flex flex-col min-w-[340px] max-w-[500px] xl:mt-0 mt-10 h-[700px] xl:h-auto">
            <ObservationsMap containerClassName="flex-1 h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
