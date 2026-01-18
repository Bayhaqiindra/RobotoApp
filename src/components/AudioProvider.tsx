import React, { createContext, useContext, useState, useEffect } from 'react';
import useSound from 'use-sound';

// 1. Tambahkan playSuccess ke dalam Interface
interface AudioContextType {
  playClick: () => void;
  playSuccess: () => void; // Fungsi baru untuk suara menang
  startAudio: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasStarted, setHasStarted] = useState(false);

  // Background Music (BGM)
  const [playBgm, { stop: stopBgm }] = useSound('/sounds/backsound.mp3', {
    volume: 0.3,
    loop: true,
    preload: true,
  });

  // Sound Effect (SFX) Klik
  const [playClick] = useSound('/sounds/click.mp3', {
    volume: 0.6,
    preload: true,
  });

  // 2. Setup Sound Effect (SFX) Menang
  // File: public/sounds/success.mp3
  const [playSuccess] = useSound('/sounds/success.mp3', {
    volume: 0.7, // Sedikit lebih keras untuk efek selebrasi
    preload: true,
  });

  const startAudio = () => {
    if (!hasStarted) {
      playBgm();
      setHasStarted(true);
    }
  };

  useEffect(() => {
    return () => stopBgm();
  }, [stopBgm]);

  return (
    // 3. Masukkan playSuccess ke dalam Provider
    <AudioContext.Provider value={{ playClick, playSuccess, startAudio }}>
      <div 
        onClick={startAudio} 
        style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        {children}
      </div>
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio harus digunakan di dalam AudioProvider');
  }
  return context;
};