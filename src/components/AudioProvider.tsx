import React, { createContext, useContext, useState, useEffect } from 'react';
import useSound from 'use-sound';

interface AudioContextType {
  playClick: () => void;
  playSuccess: () => void;
  playRobot: () => void; // 1. Tambahkan ke Interface
  startAudio: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasStarted, setHasStarted] = useState(false);

  const [playBgm, { stop: stopBgm }] = useSound('/sounds/backsound.mp3', {
    volume: 0.3,
    loop: true,
    preload: true,
  });

  const [playClick] = useSound('/sounds/click.mp3', {
    volume: 0.6,
    preload: true,
  });

  const [playSuccess] = useSound('/sounds/succes.mp3', {
    volume: 0.7,
    preload: true,
  });

  // 2. Setup SFX Robot (Pastikan nama file sesuai: robot.wav)
  const [playRobot] = useSound('/sounds/robot.wav', {
    volume: 0.5,
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
    // 3. Masukkan playRobot ke dalam Provider value
    <AudioContext.Provider value={{ playClick, playSuccess, playRobot, startAudio }}>
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