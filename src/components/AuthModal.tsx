import React, { useState, useEffect } from 'react';
import perryImg from './perry.png';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  playJazz: () => void;
  fadeOutJazz: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, playJazz, fadeOutJazz }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Fun Perry message
  const perryMessage = (
    <>
      Login to experience a world where tsunamis can be predicted!<br />
      <span className="block mt-2">(Perry's got your back, <span className="whitespace-nowrap">Agent P style 🕵️‍♂️</span>)</span>
    </>
  );

  // Play jazz when modal opens
  useEffect(() => {
    if (isOpen) {
      playJazz();
    }
    // No cleanup needed
  }, [isOpen, playJazz]);

  if (!isOpen) return null;

  const handleTabSwitch = (newTab: 'login' | 'register') => {
    setTab(newTab);
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleReturnToMain = () => {
    fadeOutJazz();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation (expand later)
    if (!email || !password || (tab === 'register' && !confirmPassword)) {
      setError('Please fill in all fields.');
      return;
    }
    if (tab === 'register' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    // TODO: Call backend API here
    fadeOutJazz();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300"
        onClick={handleReturnToMain}
      />
      {/* Main modal content shifted right, Perry on left */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex items-center justify-center">
        {/* Perry section */}
        <div className="flex flex-col items-center justify-center mr-[-2rem]">
          <img
            src={perryImg}
            alt="Perry the Platypus"
            className="w-64 h-64 object-contain drop-shadow-lg animate-pulse-glow"
            style={{ filter: 'drop-shadow(0 0 24px #00ff88)' }}
          />
          {/* Speech bubble */}
          <div className="relative mt-4">
            <div className="bg-white/80 text-cosmic-black font-bold rounded-xl px-6 py-3 shadow-lg text-lg max-w-xs text-center border-2 border-cosmic-green relative">
              {perryMessage}
              <span className="absolute left-1/2 -bottom-4 -translate-x-1/2 w-0 h-0 border-t-8 border-t-white/80 border-x-8 border-x-transparent"></span>
            </div>
          </div>
        </div>
        {/* Auth modal shifted further right */}
        <div className="relative w-full max-w-md mx-auto rounded-2xl p-8 bg-white/10 backdrop-blur-lg border border-cosmic-blue/30 shadow-xl flex flex-col items-center ml-16">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-cosmic-silver hover:text-cosmic-green text-2xl font-bold focus:outline-none"
            onClick={handleReturnToMain}
            aria-label="Close"
          >
            ×
          </button>
          {/* Tabs */}
          <div className="flex mb-6 w-full">
            <button
              className={`flex-1 py-2 rounded-l-lg font-orbitron font-bold text-lg transition-all ${tab === 'login' ? 'bg-cosmic-green text-cosmic-black' : 'bg-cosmic-black-light text-cosmic-silver'}`}
              onClick={() => handleTabSwitch('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 rounded-r-lg font-orbitron font-bold text-lg transition-all ${tab === 'register' ? 'bg-cosmic-green text-cosmic-black' : 'bg-cosmic-black-light text-cosmic-silver'}`}
              onClick={() => handleTabSwitch('register')}
            >
              Register
            </button>
          </div>
          {/* Form */}
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-cosmic-black-light text-cosmic-silver border border-cosmic-blue/30 focus:outline-none focus:ring-2 focus:ring-cosmic-green"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-cosmic-black-light text-cosmic-silver border border-cosmic-blue/30 focus:outline-none focus:ring-2 focus:ring-cosmic-green"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {tab === 'register' && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-lg bg-cosmic-black-light text-cosmic-silver border border-cosmic-blue/30 focus:outline-none focus:ring-2 focus:ring-cosmic-green"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            )}
            {error && <div className="text-red-500 text-sm font-bold text-center">{error}</div>}
            <button
              type="submit"
              className="cosmic-button w-full mt-2"
            >
              {tab === 'login' ? 'Login' : 'Register'}
            </button>
            <button
              type="button"
              className="mt-2 text-cosmic-green underline font-bold hover:text-cosmic-blue transition-colors"
              onClick={handleReturnToMain}
            >
              Return to main page
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
