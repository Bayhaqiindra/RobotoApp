import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'; // Gunakan useHistory untuk v5
import { Box, Button } from 'grommet';
import styled from 'styled-components';
import { levelsSelectors, RootState } from '../../../state';

/**
 * LevelClearedDialog - Versi Kompatibel v5
 */
export const LevelClearedDialog: React.FC = () => {
  // v5 menggunakan useHistory
  const history = useHistory();

  // Mengambil state nextLevel menggunakan Selector Hook
  const nextLevel = useSelector((state: RootState) => 
    levelsSelectors.getNextLevel(state.levels)
  );

  const message = nextLevel === undefined 
    ? 'Congratulations, you finished the game!' 
    : 'Level Cleared';

  // Handler Navigasi menggunakan history.push
  const goToLevel = (level: number) => history.push(`/level/${level}`);
  const goToLevelSelection = () => history.push('/select-level');

  return (
    <DialogWrapper>
      <Box width="medium" gap="small" align="stretch" pad="small">
        <h1 data-testid="message">{message}</h1>
        
        {nextLevel !== undefined && (
          <Button 
            primary 
            label="Go to next level" 
            onClick={() => goToLevel(nextLevel)} 
          />
        )}
        
        <Button 
          label="Back to level selection" 
          onClick={goToLevelSelection} 
        />
      </Box>
    </DialogWrapper>
  );
};

const DialogWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.9); /* Diubah sedikit agar teks h1 terlihat jelas */
  backdrop-filter: blur(4px);
  border-radius: 1em;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  
  h1 {
    text-align: center;
    line-height: 1.2em;
    margin: 0.5em 0;
    color: #333;
  }
`;

export default LevelClearedDialog;