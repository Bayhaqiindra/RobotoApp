import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'grommet';
import { Refresh } from 'grommet-icons';
import styled from 'styled-components';
import { levelsActions, levelsSelectors, RootState } from '../../../state';

/**
 * RestartButton - Versi Modern
 * Menggunakan Hooks untuk akses state dan dispatch action.
 */
export const RestartButton: React.FC = () => {
  const dispatch = useDispatch();

  // Mengambil level yang sedang terpilih dari state
  // Kita gunakan operator '!' atau aserasi karena logika asli mengharapkan level selalu ada
  const level = useSelector((state: RootState) => 
    levelsSelectors.getSelectedLevel(state.levels)!
  );

  // Handler untuk restart level
  const handleRestart = () => {
    dispatch(levelsActions.selectLevel(level));
  };

  return (
    <Wrapper>
      <Button 
        label="Restart" 
        icon={<Refresh />} 
        onClick={handleRestart} 
        primary={false} // Mengikuti gaya asli (default)
      />
    </Wrapper>
  );
};

// Styling tetap dipertahankan untuk posisi tombol
const Wrapper = styled.div`
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 1000;
`;

export default RestartButton;