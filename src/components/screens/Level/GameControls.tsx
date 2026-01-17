import React, { useEffect, useCallback } from 'react';
import { Box, Button } from 'grommet';
import { LinkDown, LinkUp, RotateLeft, RotateRight } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { gameActions, settingsSelectors, RootState } from '../../../state';

/**
 * Komponen GameControls yang telah di-upgrade.
 * Menggunakan Hooks untuk efisiensi dan pembacaan kode yang lebih bersih.
 */
export const GameControls: React.FC = () => {
  const dispatch = useDispatch();

  // Mengambil state menggunakan Selector Hook
  const displayOnScreenControls = useSelector((state: RootState) => 
    settingsSelectors.displayOnScreenControls(state.settings)
  );

  // Memoize fungsi dispatch agar referensi tetap stabil
  const moveForward = useCallback(() => dispatch(gameActions.moveForward()), [dispatch]);
  const moveBackward = useCallback(() => dispatch(gameActions.moveBackward()), [dispatch]);
  const turnLeft = useCallback(() => dispatch(gameActions.turnLeft()), [dispatch]);
  const turnRight = useCallback(() => dispatch(gameActions.turnRight()), [dispatch]);

  useEffect(() => {
    const keyMapping: Record<string, () => void> = {
      W: moveForward,
      A: turnLeft,
      S: moveBackward,
      D: turnRight,
    };

    const onKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (key in keyMapping) {
        keyMapping[key]();
      }
    };

    window.addEventListener('keydown', onKeyPress); // Menggunakan keydown karena keypress deprecated
    return () => window.removeEventListener('keydown', onKeyPress);
  }, [moveForward, moveBackward, turnLeft, turnRight]);

  if (!displayOnScreenControls) return null;

  return (
    <Wrapper>
      <Box align="center">
        <IconButton icon={<LinkUp />} title="Move forward (W)" onClick={moveForward} />
      </Box>
      <Box direction="row">
        <IconButton icon={<RotateLeft />} title="Turn left (A)" onClick={turnLeft} />
        <IconButton icon={<LinkDown />} title="Move backward (S)" onClick={moveBackward} />
        <IconButton icon={<RotateRight />} title="Turn right (D)" onClick={turnRight} />
      </Box>
    </Wrapper>
  );
};

// Sub-komponen dengan Typing yang lebih eksplisit
interface IconButtonProps {
  icon: React.ReactElement;
  title: string;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, title, onClick }) => (
  <Button icon={icon} title={title} onClick={onClick} plain={false} margin="xxsmall" />
);

// Styling
const Wrapper = styled.div`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;
  z-index: 1000;
`;

export default GameControls;