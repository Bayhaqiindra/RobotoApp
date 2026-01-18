import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { getLevelNames, getLevelMap } from '../../../levels';
import { gameSelectors, levelsSelectors, RootState } from '../../../state';
import { gameActions } from '../../../state/ducks/game';
import { levelsActions } from '../../../state/ducks/levels';
import Screen from '../../Screen';
import MyCanvas from '../../webgl/MyCanvas';
import GameControls from './GameControls';
import LevelClearedDialog from './LevelClearedDialog';
import RestartButton from './RestartButton';

export const Level: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const levelIndex = level ? parseInt(level, 10) : NaN;
  const dispatch = useDispatch();
  
  // State untuk memaksa component update setelah level loaded
  const [isInitialized, setIsInitialized] = useState(false);

  const { isLevelCleared, isUnlocked, levelName, isMapLoaded } = useSelector((state: RootState) => {
    const names = getLevelNames();
    return {
      isLevelCleared: gameSelectors.isLevelCleared(state.game),
      isUnlocked: levelsSelectors.isUnlocked(state.levels, levelIndex),
      levelName: names[levelIndex],
      isMapLoaded: !!state.game.map 
    };
  });

  useEffect(() => {
    console.log('🔄 Level useEffect - Starting initialization');
    
    if (!isNaN(levelIndex) && isUnlocked) {
      console.log('✅ Loading level:', levelIndex);
      
      // Reset initialization state
      setIsInitialized(false);
      
      // 1. Sinkronkan selectedLevel di Redux
      dispatch(levelsActions.selectLevel(levelIndex));
      
      // 2. Muat Map baru
      const selectedLevelData = getLevelMap(levelIndex);
      if (selectedLevelData) {
        dispatch(gameActions.startLevel(selectedLevelData));
        
        // 3. Tunggu sebentar lalu set initialized
        setTimeout(() => {
          setIsInitialized(true);
          console.log('✅ Level initialized');
        }, 100);
      }
    } else {
      setIsInitialized(true);
    }
  }, [levelIndex, isUnlocked, dispatch]);

  // Redirect checks
  if (isNaN(levelIndex) || levelName === undefined || !isUnlocked) {
    console.log('🔴 Redirecting to level selection');
    return <Redirect to="/select-level" />;
  }

  // Tampilkan loading sampai initialized
  if (!isInitialized) {
    return (
      <Screen title={levelName}>
        <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>
          <h2>Initializing Level {levelIndex + 1}...</h2>
        </div>
      </Screen>
    );
  }

  return (
    <Screen title={levelName}>
      {isMapLoaded ? (
        <>
          <MyCanvas />
          {isLevelCleared ? <LevelClearedDialog /> : (
            <>
              <GameControls />
              <RestartButton />
            </>
          )}
        </>
      ) : (
        <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>
          <h2>Loading Level {levelIndex + 1}...</h2>
          <p style={{ fontSize: '14px', opacity: 0.7 }}>
            Please wait...
          </p>
        </div>
      )}
    </Screen>
  );
};

export default Level;