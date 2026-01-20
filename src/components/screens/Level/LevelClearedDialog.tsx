import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button, Text } from 'grommet';
import { StatusGood, Apps } from 'grommet-icons'; 
import styled, { keyframes } from 'styled-components';
import { levelsSelectors, RootState } from '../../../state';
/* Impor useAudio untuk suara kemenangan dan klik */
import { useAudio } from '../../AudioProvider';

// --- ANIMASI ---
const slideIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -40%) scale(0.9); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

// --- STYLED COMPONENTS ---
const DialogWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  
  width: 100%;
  max-width: 500px;
  background: linear-gradient(
    135deg, 
    rgba(10, 30, 60, 0.85) 0%, 
    rgba(5, 15, 30, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(79, 172, 254, 0.5);
  border-radius: 16px;
  padding: 3rem 2rem;
  animation: ${slideIn} 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.8),
    inset 0 0 20px rgba(79, 172, 254, 0.2);
  
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 15px; left: 15px;
    width: 25px; height: 25px;
    border-top: 2px solid #4facfe;
    border-left: 2px solid #4facfe;
  }
`;

const SuccessTitle = styled.h1`
  font-family: 'Exo 2', 'Orbitron', sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 900;
  margin: 0 0 2.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  line-height: 1.3;
  
  background: linear-gradient(to bottom, #ffffff 10%, #4facfe 50%, #0077ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(79, 172, 254, 0.5));
`;

const ActionButton = styled(Button)`
  background: rgba(79, 172, 254, 0.1);
  border: 1px solid rgba(79, 172, 254, 0.3);
  border-radius: 8px;
  padding: 12px 20px;
  color: #ffffff;
  transition: all 0.3s ease;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;

  &:hover {
    background: ${props => props.primary ? '#4facfe' : 'rgba(79, 172, 254, 0.25)'};
    color: ${props => props.primary ? '#050a15' : '#ffffff'};
    box-shadow: 0 0 20px rgba(79, 172, 254, 0.4);
    border-color: #ffffff;
    transform: translateY(-2px);
  }

  span {
    font-size: 0.9rem;
  }
`;

export const LevelClearedDialog: React.FC = () => {
  const history = useHistory();
  const { playClick, playSuccess } = useAudio();

  const nextLevel = useSelector((state: RootState) => 
    levelsSelectors.getNextLevel(state.levels)
  );

  useEffect(() => {
    console.log("Dialog Muncul - Mencoba membunyikan suara...");
    
    // Beri sedikit jeda 100ms agar browser siap
    const timer = setTimeout(() => {
      try {
        playSuccess();
        console.log("Suara dimainkan");
      } catch (error) {
        console.error("Gagal memutar suara:", error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [playSuccess]);

  const isGameFinished = nextLevel === undefined;
  const message = isGameFinished 
    ? 'MISSION ACCOMPLISHED: GAME COMPLETE' 
    : 'MISSION SUCCESSFUL';

  const goToLevel = (level: number) => {
    playClick();
    history.push(`/level/${level}`);
  };

  const goToLevelSelection = () => {
    playClick();
    history.push('/select-level');
  };

  return (
    <DialogWrapper>
      <Box align="center" gap="medium">
        <SuccessTitle data-testid="message">{message}</SuccessTitle>
        
        <Box width="100%" gap="small">
          {nextLevel !== undefined && (
            <ActionButton 
              primary 
              icon={<StatusGood size="medium" />}
              label="Next Mission" 
              onClick={() => goToLevel(nextLevel)} 
            />
          )}
          
          <ActionButton 
            icon={<Apps size="medium" color="#4facfe" />}
            label="Mission Selection" 
            onClick={goToLevelSelection} 
            plain
          />
        </Box>

        {isGameFinished && (
          <Text size="small" color="rgba(79, 172, 254, 0.6)" weight="bold" margin={{ top: 'medium' }}>
            SYSTEM STATUS: ALL OBJECTIVES SECURED
          </Text>
        )}
      </Box>
    </DialogWrapper>
  );
};

export default LevelClearedDialog;