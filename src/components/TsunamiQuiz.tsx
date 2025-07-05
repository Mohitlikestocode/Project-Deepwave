import React, { useState, useEffect } from 'react';

const question = {
  text: "What's the best way to survive a Tsunami?",
  options: [
    '🏊‍♂️ Learn how to swim through tsunamis like Aquaman',
    '😎 Ignore tsunamis because you\'re a chill guy',
    '📱 Use Disaster Alertinator to predict tsunamis',
    '🤷‍♂️ Tsunamis don\'t exist bro, it\'s just big waves'
  ],
  correct: 2
};

export default function TsunamiQuiz() {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    setShowResult(true);
  };

  const handleRetry = () => {
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="relative bg-[#fffbe6] border-4 border-[#a259e6] rounded-2xl px-8 py-6 shadow-xl max-w-xl mx-auto cartoon-outline text-xl font-bold text-[#222] flex flex-col items-center gap-4 animate-fadeIn">
      <div className="text-2xl font-extrabold text-[#a259e6] mb-2">🌊 Tsunami Safety Quiz</div>
      <div className="mb-4 text-lg text-[#222]">{question.text}</div>
      <div className="flex flex-col gap-3 w-full">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            className={`w-full px-4 py-2 rounded-full border-2 font-bold transition-all duration-200 shadow-md
              ${selected === idx
                ? idx === question.correct
                  ? 'bg-green-200 border-green-500 text-green-900'
                  : 'bg-red-200 border-red-500 text-red-900'
                : 'bg-white border-[#a259e6] text-[#222] hover:bg-[#e0e7ff]'}
              ${showResult && idx !== question.correct ? 'opacity-60' : ''}`}
            disabled={showResult}
            onClick={() => handleSelect(idx)}
          >
            {opt}
          </button>
        ))}
      </div>
      {showResult && (
        <div className="mt-4 text-lg font-bold">
          {selected === question.correct ? (
            <span className="text-green-700">✅ Correct! Use Disaster Alertinator to predict tsunamis!</span>
          ) : (
            <span className="text-red-700">❌ Oops! The best way is to <b>use Disaster Alertinator to predict tsunamis</b>!</span>
          )}
        </div>
      )}
      {showResult && (
        <button
          className="mt-4 px-6 py-2 rounded-full bg-[#a259e6] text-white font-bold shadow hover:bg-[#7c3aed] transition-all"
          onClick={handleRetry}
        >
          Try Again
        </button>
      )}
    </div>
  );
} 