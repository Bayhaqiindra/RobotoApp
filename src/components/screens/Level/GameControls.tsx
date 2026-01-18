import React, { useEffect, useCallback } from 'react';
import { Box, Button } from 'grommet';
import { LinkDown, LinkUp, RotateLeft, RotateRight } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { gameActions, settingsSelectors, RootState } from '../../../state';

export const GameControls: React.FC = () => {
  const dispatch = useDispatch();

  const displayOnScreenControls = useSelector((state: RootState) => 
    settingsSelectors.displayOnScreenControls(state.settings)
  );

  const moveForward = useCallback(() => dispatch(gameActions.moveForward()), [dispatch]);
  const moveBackward = useCallback(() => dispatch(gameActions.moveBackward()), [dispatch]);
  const turnLeft = useCallback(() => dispatch(gameActions.turnLeft()), [dispatch]);
  const turnRight = useCallback(() => dispatch(gameActions.turnRight()), [dispatch]);

  useEffect(() => {
    // Mapping tombol keyboard (menambahkan Arrow Keys agar lebih user-friendly)
    const keyMapping: Record<string, () => void> = {
      W: moveForward,
      ARROWUP: moveForward,
      A: turnLeft,
      ARROWLEFT: turnLeft,
      S: moveBackward,
      ARROWDOWN: moveBackward,
      D: turnRight,
      ARROWRIGHT: turnRight,
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      
      if (key in keyMapping) {
        // Mencegah halaman scroll otomatis saat menekan tombol panah
        if (key.startsWith('ARROW')) {
          event.preventDefault();
        }
        keyMapping[key]();
      }
    };

    // PENTING: Gunakan 'keydown' pada window
    window.addEventListener('keydown', onKeyDown);
    
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [moveForward, moveBackward, turnLeft, turnRight]);

  // Meskipun kontrol visual disembunyikan, keyboard tetap harus berfungsi
  // Jadi kita hanya me-return null untuk render visualnya saja
  const controlsUI = (
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

  return displayOnScreenControls ? controlsUI : null;
};

interface IconButtonProps {
  icon: React.ReactElement;
  title: string;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, title, onClick }) => (
  <Button icon={icon} title={title} onClick={onClick} plain={false} margin="xxsmall" />
);

const Wrapper = styled.div`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;
  z-index: 1000;
`;

export default GameControls;