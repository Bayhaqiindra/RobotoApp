import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'grommet';
import { Refresh } from 'grommet-icons';
import styled from 'styled-components';
import { levelsActions, levelsSelectors, RootState } from '../../../state';

/**
 * RestartButton - Versi Glassmorphism Modern
 */
const StyledGlassButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(79, 172, 254, 0.1);
  /* Efek blur kaca di belakang tombol */
  backdrop-filter: blur(12px); 
  border: 1px solid rgba(79, 172, 254, 0.3);
  border-radius: 8px;
  padding: 8px 16px;
  color: #ffffff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 1.5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    background: rgba(79, 172, 254, 0.25);
    border-color: #4facfe;
    /* Efek cahaya biru saat diarahkan kursor */
    box-shadow: 0 0 20px rgba(79, 172, 254, 0.5); 
    transform: scale(1.05);
    
    svg {
      fill: #ffffff;
      stroke: #ffffff;
      /* Animasi putar ikon saat hover */
      transform: rotate(-180deg);
    }
  }

  &:active {
    transform: scale(0.95);
  }

  span {
    font-size: 0.8rem;
  }

  svg {
    transition: transform 0.5s ease;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  /* Memberikan bayangan halus pada area penempatan agar tidak 'flat' */
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5));
`;

export const RestartButton: React.FC = () => {
  const dispatch = useDispatch();

  const level = useSelector((state: RootState) => 
    levelsSelectors.getSelectedLevel(state.levels)!
  );

  const handleRestart = () => {
    dispatch(levelsActions.selectLevel(level));
  };

  return (
    <Wrapper>
      <StyledGlassButton 
        label="Restart" 
        icon={<Refresh size="small" color="#4facfe" />} 
        onClick={handleRestart} 
        plain 
      />
    </Wrapper>
  );
};

export default RestartButton;