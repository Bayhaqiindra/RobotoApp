import React, { useEffect, useCallback, useState } from 'react';
import { Box, Button } from 'grommet';
import { LinkDown, LinkUp, RotateLeft, RotateRight } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { gameActions, settingsSelectors, RootState } from '../../../state';
import { useAudio } from '../../AudioProvider';

// Animasi smooth dan minimal
const pressAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.96); }
  100% { transform: scale(1); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const subtleGlow = keyframes`
  0%, 100% { box-shadow: 0 4px 20px rgba(77, 166, 255, 0.2); }
  50% { box-shadow: 0 6px 30px rgba(77, 166, 255, 0.35); }
`;

export const GameControls: React.FC = () => {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const { playRobot } = useAudio();

  const displayOnScreenControls = useSelector((state: RootState) => 
    settingsSelectors.displayOnScreenControls(state.settings)
  );

  const moveForward = useCallback(() => {
    dispatch(gameActions.moveForward());
    setActiveKey('forward');
    playRobot();
    setTimeout(() => setActiveKey(null), 150);
  }, [dispatch, playRobot]);

  const moveBackward = useCallback(() => {
    dispatch(gameActions.moveBackward());
    setActiveKey('backward');
     playRobot();
    setTimeout(() => setActiveKey(null), 150);
  }, [dispatch, playRobot]);

  const turnLeft = useCallback(() => {
    dispatch(gameActions.turnLeft());
    setActiveKey('left');
     playRobot();
    setTimeout(() => setActiveKey(null), 150);
  }, [dispatch, playRobot]);

  const turnRight = useCallback(() => {
    dispatch(gameActions.turnRight());
    setActiveKey('right');
     playRobot();
    setTimeout(() => setActiveKey(null), 150);
  }, [dispatch, playRobot]);

  useEffect(() => {
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
        if (key.startsWith('ARROW')) {
          event.preventDefault();
        }
        keyMapping[key]();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [moveForward, moveBackward, turnLeft, turnRight]);

  const controlsUI = (
    <Wrapper>
      <ControlsContainer>
        {/* Simple elegant header */}
        <ControlsHeader>
          <HeaderTitle>CONTROLS</HeaderTitle>
          <HeaderSubtitle>WASD / Arrow Keys</HeaderSubtitle>
        </ControlsHeader>

        {/* Controls grid - clean layout */}
        <ControlsGrid>
          <TopRow>
            <EnhancedIconButton 
              icon={<LinkUp />} 
              title="Move forward" 
              onClick={moveForward}
              isActive={activeKey === 'forward'}
              keyHint="W"
            />
          </TopRow>
          
          <BottomRow>
            <EnhancedIconButton 
              icon={<RotateLeft />} 
              title="Turn left" 
              onClick={turnLeft}
              isActive={activeKey === 'left'}
              keyHint="A"
            />
            <EnhancedIconButton 
              icon={<LinkDown />} 
              title="Move backward" 
              onClick={moveBackward}
              isActive={activeKey === 'backward'}
              keyHint="S"
            />
            <EnhancedIconButton 
              icon={<RotateRight />} 
              title="Turn right" 
              onClick={turnRight}
              isActive={activeKey === 'right'}
              keyHint="D"
            />
          </BottomRow>
        </ControlsGrid>
      </ControlsContainer>
    </Wrapper>
  );

  return displayOnScreenControls ? controlsUI : null;
};

interface EnhancedIconButtonProps {
  icon: React.ReactElement;
  title: string;
  onClick: () => void;
  isActive: boolean;
  keyHint: string;
}

const EnhancedIconButton: React.FC<EnhancedIconButtonProps> = ({ 
  icon, 
  title, 
  onClick, 
  isActive,
  keyHint
}) => (
  <ButtonWrapper isActive={isActive}>
    <StyledButton 
      icon={icon} 
      title={title} 
      onClick={onClick}
    />
    <KeyHint>{keyHint}</KeyHint>
  </ButtonWrapper>
);

const Wrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  animation: ${fadeInUp} 0.5s ease-out;
`;

const ControlsContainer = styled.div`
  background: rgba(20, 30, 48, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 24px;
  padding: 1.5rem 1.8rem;
  border: 1px solid rgba(77, 166, 255, 0.2);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  animation: ${subtleGlow} 4s ease-in-out infinite;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(77, 166, 255, 0.4);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 0 40px rgba(77, 166, 255, 0.1);
  }
`;

const ControlsHeader = styled.div`
  text-align: center;
  margin-bottom: 1.2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(77, 166, 255, 0.15);
`;

const HeaderTitle = styled.h3`
  margin: 0 0 0.3rem 0;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
`;

const HeaderSubtitle = styled.p`
  margin: 0;
  color: rgba(77, 166, 255, 0.7);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 1px;
`;

const ControlsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: center;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.6rem;
`;

const ButtonWrapper = styled.div<{ isActive: boolean }>`
  position: relative;
  animation: ${props => props.isActive ? pressAnimation : 'none'} 0.15s ease;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(135deg, rgba(77, 166, 255, 0.08) 0%, rgba(77, 166, 255, 0.12) 100%) !important;
  border: 1px solid rgba(77, 166, 255, 0.3) !important;
  border-radius: 16px !important;
  padding: 14px !important;
  min-width: 60px;
  min-height: 60px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: linear-gradient(135deg, rgba(77, 166, 255, 0.15) 0%, rgba(77, 166, 255, 0.2) 100%) !important;
    border-color: rgba(77, 166, 255, 0.5) !important;
    transform: translateY(-3px);
    box-shadow: 
      0 8px 24px rgba(77, 166, 255, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset !important;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 
      0 4px 12px rgba(77, 166, 255, 0.15) !important;
  }

  svg {
    stroke: rgba(77, 166, 255, 0.9);
    stroke-width: 2;
    filter: drop-shadow(0 2px 4px rgba(77, 166, 255, 0.3));
    transition: all 0.25s ease;
  }

  &:hover svg {
    stroke: rgba(77, 166, 255, 1);
    transform: scale(1.1);
    filter: drop-shadow(0 2px 8px rgba(77, 166, 255, 0.5));
  }
`;

const KeyHint = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  background: linear-gradient(135deg, #4da6ff 0%, #2d86df 100%);
  color: #ffffff;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 8px;
  box-shadow: 
    0 4px 12px rgba(77, 166, 255, 0.4),
    0 0 0 2px rgba(255, 255, 255, 0.2) inset;
  letter-spacing: 0.5px;
`;

export default GameControls;