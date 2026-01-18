import React from 'react';
import { Box, Text } from 'grommet';
import styled, { keyframes } from 'styled-components';
import BackButton from '../BackButton';

// --- ANIMASI ---
const gridTravel = keyframes`
  0% { transform: perspective(800px) rotateX(60deg) translateY(0); }
  100% { transform: perspective(800px) rotateX(60deg) translateY(60px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
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
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const SettingsCard = styled.div`
  width: 100%;
  max-width: 650px;
  background: linear-gradient(
    135deg, 
    rgba(10, 30, 60, 0.7) 0%, 
    rgba(5, 15, 30, 0.9) 100%
  );
  backdrop-filter: blur(25px);
  border: 1px solid rgba(79, 172, 254, 0.4);
  border-radius: 16px;
  padding: 4.5rem 3rem;
  animation: ${fadeIn} 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.6),
    inset 0 0 20px rgba(79, 172, 254, 0.15);
  text-align: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 15px; left: 15px;
    width: 30px; height: 30px;
    border-top: 2px solid #4facfe;
    border-left: 2px solid #4facfe;
    opacity: 0.6;
  }
`;

const Title = styled.h1`
  font-family: 'Exo 2', 'Orbitron', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  margin: 0 0 3.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.35rem;
  line-height: 1.2;
  padding: 0.2em 0;
  background: linear-gradient(to bottom, #ffffff 10%, #4facfe 50%, #0077ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 15px rgba(79, 172, 254, 0.5));
`;

const ControlGuide = styled.div`
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(79, 172, 254, 0.2);
  padding: 2.2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5);
`;

const Key = styled.span`
  background: rgba(26, 42, 74, 0.8);
  border: 1px solid #4facfe;
  color: #fff;
  padding: 5px 12px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 0.95rem;
  box-shadow: 0 3px 0 #0077ff;
  display: inline-block;
`;

export const Settings: React.FC = () => {
  return (
    <Viewport>
      <Scene3D>
        <GroundGrid />
      </Scene3D>

      <TopNavigation>
        <BackButton />
      </TopNavigation>

      <ContentCenter>
        <SettingsCard>
          <Title>CONTROL CONFIG</Title>
          <Box align="center">
            <ControlGuide>
              <Box direction="row" align="center" gap="large" justify="between">
                <Text size="medium" color="#fff" weight="bold">GERAKAN UNIT</Text>
                <Box direction="row" gap="xsmall" align="center">
                  <Key>W</Key><Key>A</Key><Key>S</Key><Key>D</Key>
                  <Text color="rgba(79, 172, 254, 0.5)" margin={{ horizontal: 'small' }} size="small" weight="bold">OR</Text>
                  <Key>↑</Key><Key>←</Key><Key>↓</Key><Key>→</Key>
                </Box>
              </Box>

              <Box direction="row" align="center" gap="large" justify="between">
                <Text size="medium" color="#fff" weight="bold">RESET POSISI</Text>
                <Key>R</Key>
              </Box>

              <Box direction="row" align="center" gap="large" justify="between">
                <Text size="medium" color="#fff" weight="bold">INTERAKSI MENU</Text>
                <Key>ESC</Key>
              </Box>
            </ControlGuide>
          </Box>
        </SettingsCard>
      </ContentCenter>
    </Viewport>
  );
};

export default Settings;