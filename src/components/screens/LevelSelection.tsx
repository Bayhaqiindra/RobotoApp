import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'grommet';
import { Lock, Unlock } from 'grommet-icons';
import { getLevelNames } from '../../levels';
import { levelsSelectors, RootState } from '../../state';
import Screen from '../Screen';

export const LevelSelection: React.FC = () => {
  const history = useHistory();
  
  const levelsState = useSelector((state: RootState) => state.levels);
  const levelNames = getLevelNames();

  const handleSelectLevel = (level: number) => {
    console.log(`🎯 Level ${level} clicked - Navigating...`);
    
    // Navigate ke level
    history.push(`/level/${level}`);
    
    // Force scroll to top (optional, untuk UX lebih baik)
    window.scrollTo(0, 0);
  };

  return (
    <Screen title="Select Level">
      {levelNames.map((levelName, levelIndex) => {
        const isUnlocked = levelsSelectors.isUnlocked(levelsState, levelIndex);

        return (
          <Button
            key={levelIndex}
            label={levelName}
            icon={isUnlocked ? <Unlock color="brand" /> : <Lock />}
            disabled={!isUnlocked}
            onClick={isUnlocked ? () => handleSelectLevel(levelIndex) : undefined}
            margin={{ bottom: 'small' }}
          />
        );
      })}
    </Screen>
  );
};

export default LevelSelection;