import React, { useEffect, useRef, useState } from 'react';
import perryImg from './perry.png';

const GRID_SIZE = 20;
const CELL_SIZE = 30; // 20x30 = 600px
const GAME_SIZE = GRID_SIZE * CELL_SIZE;
const INITIAL_POSITION = { x: 10, y: 10 };
const INITIAL_DIRECTION = { x: 1, y: 0 };
const MAX_ROUNDS = 20;
const UNLOCK_SONGS_AT = 10;

function getRandomPosition(snake: { x: number; y: number }[]) {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(seg => seg.x === pos.x && seg.y === pos.y));
  return pos;
}

interface PerryTsunamiGameProps {
  onUnlockSongs?: () => void;
}

const PerryTsunamiGame: React.FC<PerryTsunamiGameProps> = ({ onUnlockSongs }) => {
  const [snake, setSnake] = useState([{ ...INITIAL_POSITION }]);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [tsunami, setTsunami] = useState(getRandomPosition([{ ...INITIAL_POSITION }]));
  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const moveRef = useRef(direction);
  const runningRef = useRef(true);

  const handleRetry = () => {
    setSnake([{ ...INITIAL_POSITION }]);
    setDirection(INITIAL_DIRECTION);
    setTsunami(getRandomPosition([{ ...INITIAL_POSITION }]));
    setRound(0);
    setGameOver(false);
    setUnlocked(false);
    moveRef.current = INITIAL_DIRECTION;
    runningRef.current = true;
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!runningRef.current) return;
      switch (e.key) {
        case 'ArrowUp':
          if (moveRef.current.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (moveRef.current.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (moveRef.current.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (moveRef.current.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    moveRef.current = direction;
    const interval = setInterval(() => {
      setSnake(prev => {
        const newHead = {
          x: (prev[0].x + moveRef.current.x + GRID_SIZE) % GRID_SIZE,
          y: (prev[0].y + moveRef.current.y + GRID_SIZE) % GRID_SIZE,
        };
        // Check collision with self
        if (prev.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          setGameOver(true);
          runningRef.current = false;
          return prev;
        }
        // Check if caught tsunami
        if (newHead.x === tsunami.x && newHead.y === tsunami.y) {
          const newRound = round + 1;
          setRound(newRound);
          if (newRound === UNLOCK_SONGS_AT && !unlocked) {
            setUnlocked(true);
            if (onUnlockSongs) onUnlockSongs();
          }
          if (newRound >= MAX_ROUNDS) {
            setGameOver(true);
            runningRef.current = false;
            return [newHead, ...prev];
          }
          setTsunami(getRandomPosition([newHead, ...prev]));
          return [newHead, ...prev];
        }
        // Move forward
        return [newHead, ...prev.slice(0, -1)];
      });
    }, 120);
    return () => clearInterval(interval);
  }, [direction, tsunami, gameOver, round, unlocked, onUnlockSongs]);

  // Reset game on mount/unmount
  useEffect(() => {
    return () => {
      runningRef.current = true;
    };
  }, []);

  return (
    <div className="relative" style={{ width: GAME_SIZE, height: GAME_SIZE, background: 'rgba(10,10,15,0.95)', borderRadius: 16, border: '2px solid #00ff88', overflow: 'hidden' }}>
      {/* Tsunami emoji */}
      {!gameOver && (
        <div
          style={{
            position: 'absolute',
            left: tsunami.x * CELL_SIZE,
            top: tsunami.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
            fontSize: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          🌊
        </div>
      )}
      {/* Perry segments */}
      {snake.map((seg, idx) => (
        <img
          key={idx}
          src={perryImg}
          alt="Perry"
          style={{
            position: 'absolute',
            left: seg.x * CELL_SIZE,
            top: seg.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
            zIndex: 3,
            filter: idx === 0 ? 'drop-shadow(0 0 8px #00ff88)' : 'opacity(0.7)',
            transition: 'left 0.1s, top 0.1s',
          }}
        />
      ))}
      {/* Grid lines (optional, for style) */}
      {[...Array(GRID_SIZE + 1)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', left: i * CELL_SIZE, top: 0, width: 1, height: GAME_SIZE, background: 'rgba(0,255,136,0.08)', zIndex: 1 }} />
      ))}
      {[...Array(GRID_SIZE + 1)].map((_, i) => (
        <div key={i} style={{ position: 'absolute', top: i * CELL_SIZE, left: 0, height: 1, width: GAME_SIZE, background: 'rgba(0,255,136,0.08)', zIndex: 1 }} />
      ))}
      {/* Game over message */}
      {gameOver && round >= MAX_ROUNDS && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-cosmic-green font-orbitron text-2xl p-8 rounded-lg z-10">
          <div>GOD MODE! You are a valuable asset to Disaster Alertinator!</div>
          <div className="mt-2">You caught {MAX_ROUNDS} tsunamis! 🌊🌊🌊</div>
          <button
            className="mt-8 px-8 py-3 bg-cosmic-green text-cosmic-black font-bold text-xl rounded-lg shadow-lg hover:bg-cosmic-green-dark transition-all"
            onClick={handleRetry}
          >
            Retry
          </button>
        </div>
      )}
      {/* Score */}
      <div className="absolute top-2 left-2 bg-cosmic-black-light/80 text-cosmic-green px-4 py-1 rounded font-bold text-lg z-20">
        Tsunamis caught: {round} / {MAX_ROUNDS}
      </div>
    </div>
  );
};

export default PerryTsunamiGame; 