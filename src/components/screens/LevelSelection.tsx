import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'; // Gunakan useHistory untuk v5
import { Button } from 'grommet';
import { Lock, Unlock } from 'grommet-icons';
import { getLevelNames } from '../../levels';
import { levelsSelectors, RootState } from '../../state';
import Screen from '../Screen';

/**
 * LevelSelection - Versi Kompatibel v5
 */
export const LevelSelection: React.FC = () => {
  // v5 menggunakan useHistory sebagai pengganti useNavigate
  const history = useHistory();
  
  const levelsState = useSelector((state: RootState) => state.levels);
  const levelNames = getLevelNames();

  const handleSelectLevel = (level: number) => {
    // Gunakan history.push untuk navigasi
    history.push(`/level/${level}`);
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