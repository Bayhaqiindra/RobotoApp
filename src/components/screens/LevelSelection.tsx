import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Text } from 'grommet';
import { Lock, Unlock } from 'grommet-icons';
import styled, { keyframes } from 'styled-components';
import { getLevelNames } from '../../levels';
import { levelsSelectors, RootState } from '../../state';
import BackButton from '../BackButton';

// --- ANIMASI ---
const gridTravel = keyframes`
  0% { transform: perspective(800px) rotateX(60deg) translateY(0); }
  100% { transform: perspective(800px) rotateX(60deg) translateY(60px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

// --- STYLED COMPONENTS ---
const Viewport = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #050a15; 
  overflow: hidden;
  position: relative;
`;

const Scene3D = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: radial-gradient(circle at center, #101e3a 0%, #050a15 100%);
`;

const GroundGrid = styled.div`
  position: absolute;
  width: 200%;
  height: 200%;
  bottom: -50%;
  left: -50%;
  background-image: 
    linear-gradient(rgba(79, 172, 254, 0.2) 1.5px, transparent 1.5px),
    linear-gradient(90deg, rgba(79, 172, 254, 0.2) 1.5px, transparent 1.5px);
  background-size: 60px 60px;
  animation: ${gridTravel} 2s linear infinite;
  mask-image: linear-gradient(to top, rgba(0,0,0,1) 20%, transparent 80%);
`;

const TopNavigation = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: 20;
`;

const ContentCenter = styled.div`
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto; 
`;

const Title = styled.h1`
  font-family: 'Exo 2', 'Orbitron', sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  margin-bottom: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  
  /* --- FIX TEKS TERPOTONG --- */
  line-height: 1.4; /* Memberikan ruang antar baris yang cukup */
  padding: 10px 0;   /* Memberikan ruang aman di atas dan bawah teks */
  display: block;    /* Memastikan elemen mengambil ruang yang dibutuhkan */
  
  background: linear-gradient(to bottom, #ffffff, #4facfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(79, 172, 254, 0.5));
  text-align: center;
`;

const LevelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 900px;
  padding: 20px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const LevelCard = styled.button<{ isUnlocked: boolean }>`
  background: ${props => props.isUnlocked 
    ? 'rgba(10, 30, 60, 0.7)' 
    : 'rgba(5, 10, 20, 0.8)'};
  backdrop-filter: blur(15px);
  border: 1px solid ${props => props.isUnlocked 
    ? 'rgba(79, 172, 254, 0.4)' 
    : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${props => props.isUnlocked ? 'pointer' : 'not-allowed'};
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;

  &:hover {
    ${props => props.isUnlocked && `
      background: rgba(79, 172, 254, 0.2);
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 0 25px rgba(79, 172, 254, 0.4);
      border-color: #ffffff;
    `}
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 3px;
    background: ${props => props.isUnlocked ? '#4facfe' : 'transparent'};
    opacity: 0.6;
  }
`;

export const LevelSelection: React.FC = () => {
  const history = useHistory();
  const levelsState = useSelector((state: RootState) => state.levels);
  const levelNames = getLevelNames();

  const handleSelectLevel = (level: number) => {
    history.push(`/level/${level}`);
    window.scrollTo(0, 0);
  };

  return (
    <Viewport>
      <Scene3D>
        <GroundGrid />
      </Scene3D>

      <TopNavigation>
        <BackButton />
      </TopNavigation>

      <ContentCenter>
        <Title>SELECT MISSION</Title>
        
        <LevelGrid>
          {levelNames.map((levelName, levelIndex) => {
            const isUnlocked = levelsSelectors.isUnlocked(levelsState, levelIndex);

            return (
              <LevelCard
                key={levelIndex}
                isUnlocked={isUnlocked}
                onClick={isUnlocked ? () => handleSelectLevel(levelIndex) : undefined}
              >
                <Box direction="column" align="start">
                  <Text size="xsmall" color={isUnlocked ? "#4facfe" : "rgba(255,255,255,0.3)"} weight="bold">
                    MISSION {levelIndex + 1}
                  </Text>
                  <Text 
                    color={isUnlocked ? "white" : "rgba(255,255,255,0.3)"} 
                    weight="bold"
                    style={{ letterSpacing: '1px', marginTop: '4px' }}
                  >
                    {levelName}
                  </Text>
                </Box>
                
                {isUnlocked ? (
                  <Unlock color="#4facfe" size="medium" />
                ) : (
                  <Lock color="rgba(255,255,255,0.2)" size="medium" />
                )}
              </LevelCard>
            );
          })}
        </LevelGrid>
      </ContentCenter>
    </Viewport>
  );
};

export default LevelSelection;