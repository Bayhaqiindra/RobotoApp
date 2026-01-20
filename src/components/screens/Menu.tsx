import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Box } from 'grommet';
import { Play, Gamepad } from 'grommet-icons'; 
import styled, { keyframes } from 'styled-components';
/* Impor useAudio dari lokasi file AudioProvider Anda */
import { useAudio } from '../AudioProvider';

// --- ANIMASI SINEMATIK ---
const gridTravel = keyframes`
  0% { transform: perspective(800px) rotateX(60deg) translateY(0); }
  100% { transform: perspective(800px) rotateX(60deg) translateY(60px); }
`;

const glowPulse = keyframes`
  0%, 100% { filter: drop-shadow(0 0 15px rgba(79, 172, 254, 0.5)); }
  50% { filter: drop-shadow(0 0 30px rgba(79, 172, 254, 0.8)); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

// --- STYLED COMPONENTS ---
const Viewport = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
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

const CentralHub = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TitleBlock = styled.div`
  margin-bottom: 5rem;
  animation: ${glowPulse} 4s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BrandTitle = styled.h1`
  font-family: 'Exo 2', 'Orbitron', sans-serif;
  font-size: clamp(5rem, 15vw, 10rem);
  font-weight: 900;
  margin: 0;
  text-transform: uppercase;
  line-height: 0.8;
  letter-spacing: -0.2rem;
  background: linear-gradient(to bottom, #ffffff 0%, #4facfe 40%, #0077ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 5px 15px rgba(0,0,0,0.8));
`;

const Subtitle = styled.div`
  color: #4facfe;
  letter-spacing: 0.2rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  margin: 2.5rem 0 0 0;
  font-weight: 700;
  opacity: 0.8;
  line-height: 1.6;
  text-align: center;
  max-width: 600px;
`;

const ActionGroup = styled(Box)`
  gap: 1.5rem;
  width: 380px;
  animation: ${float} 4s ease-in-out infinite;
`;

const MenuButton = styled(Button)`
  border: 1px solid rgba(79, 172, 254, 0.4);
  background: rgba(10, 30, 60, 0.8);
  padding: 20px 0;
  border-radius: 4px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  color: #ffffff;
  backdrop-filter: blur(10px);
  font-weight: 800;
  letter-spacing: 3px;
  
  &:hover {
    background: #4facfe;
    color: #050a15;
    box-shadow: 0 0 40px rgba(79, 172, 254, 0.7);
    transform: scale(1.05);
    border-color: #ffffff;
    
    svg { fill: #050a15; stroke: #050a15; }
  }
`;

const MenuComponent: React.FC<RouteComponentProps> = ({ history }) => {
  /* Mengambil fungsi playClick dari AudioProvider global */
  const { playClick } = useAudio();

  return (
    <Viewport>
      <Scene3D>
        <GroundGrid />
      </Scene3D>
      
      <CentralHub>
        <TitleBlock>
          <BrandTitle>ROBOTO</BrandTitle>
          <Subtitle>
            LOGIKA TEPAT, MISI TAMAT
          </Subtitle>
        </TitleBlock>

        <ActionGroup>
          <MenuButton 
            primary
            icon={<Play size="medium" />}
            label="START MISSION"
            onClick={() => {
              playClick(); // Mainkan SFX
              history.push('/select-level');
            }}
          />
          <MenuButton 
            icon={<Gamepad size="medium" />}
            label="CONTROL CONFIG"
            onClick={() => {
              playClick(); // Mainkan SFX
              history.push('/settings');
            }}
            plain
          />
        </ActionGroup>
      </CentralHub>
    </Viewport>
  );
};

export const Menu = withRouter(MenuComponent);
export default Menu;