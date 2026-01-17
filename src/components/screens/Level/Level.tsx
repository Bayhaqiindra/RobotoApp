import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { levels, getLevelNames } from '../../../levels'; // Pastikan import levels (array data)
import { gameSelectors, levelsSelectors, RootState } from '../../../state';
import { gameActions } from '../../../state/ducks/game';
import Screen from '../../Screen';
import MyCanvas from '../../webgl/MyCanvas';
import GameControls from './GameControls';
import LevelClearedDialog from './LevelClearedDialog';
import RestartButton from './RestartButton';

export const Level: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const levelIndex = level ? parseInt(level, 10) : NaN;
  const dispatch = useDispatch();

  // 1. Ambil data state menggunakan Selector
  const { isLevelCleared, isUnlocked, levelName, isMapLoaded } = useSelector((state: RootState) => {
    const names = getLevelNames();
    return {
      isLevelCleared: gameSelectors.isLevelCleared(state.game),
      isUnlocked: levelsSelectors.isUnlocked(state.levels, levelIndex),
      levelName: names[levelIndex],
      // Proteksi: cek apakah objek map di state game sudah terisi
      isMapLoaded: !!state.game.map 
    };
  });

  // 2. TRIGGER: Memuat data level yang sesungguhnya ke Redux
  useEffect(() => {
    if (!isNaN(levelIndex) && isUnlocked) {
      const selectedLevelData = levels[levelIndex];
      if (selectedLevelData) {
        // PERBAIKAN: Mengirim objek level, bukan sekadar angka indeks
        dispatch(gameActions.startLevel(selectedLevelData));
      }
    }
  }, [levelIndex, isUnlocked, dispatch]);

  // 3. Logika pengalihan jika level tidak valid
  if (isNaN(levelIndex) || levelName === undefined || !isUnlocked) {
    return <Redirect to="/select-level" />;
  }

  return (
    <Screen title={levelName}>
      {/* 4. GUARD: Canvas hanya muncul jika data Map sudah siap di Redux */}
      {isMapLoaded ? (
        <>
          <MyCanvas />
          {isLevelCleared ? (
            <LevelClearedDialog />
          ) : (
            <>
              <GameControls />
              <RestartButton />
            </>
          )}
        </>
      ) : (
        <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>
          <h2>Loading Level Map...</h2>
        </div>
      )}
    </Screen>
  );
};

export default Level;