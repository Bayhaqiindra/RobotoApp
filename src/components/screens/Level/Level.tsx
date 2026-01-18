import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { getLevelNames, getLevelMap } from '../../../levels';
import { gameSelectors, levelsSelectors, RootState } from '../../../state';
import { gameActions } from '../../../state/ducks/game';
import { levelsActions } from '../../../state/ducks/levels'; // Tambahkan ini
import Screen from '../../Screen';
import MyCanvas from '../../webgl/MyCanvas';
import GameControls from './GameControls';
import LevelClearedDialog from './LevelClearedDialog';
import RestartButton from './RestartButton';

export const Level: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const levelIndex = level ? parseInt(level, 10) : NaN;
  const dispatch = useDispatch();

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
    if (!isNaN(levelIndex) && isUnlocked) {
      // 1. Sinkronkan selectedLevel di Redux agar getNextLevel bekerja
      dispatch(levelsActions.selectLevel(levelIndex));
      
      // 2. Muat Map baru
      const selectedLevelData = getLevelMap(levelIndex); 
      if (selectedLevelData) {
        dispatch(gameActions.startLevel(selectedLevelData));
      }
    }
  }, [levelIndex, isUnlocked, dispatch]);

  if (isNaN(levelIndex) || levelName === undefined || !isUnlocked) {
    return <Redirect to="/select-level" />;
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
        </div>
      )}
    </Screen>
  );
};

export default Level;