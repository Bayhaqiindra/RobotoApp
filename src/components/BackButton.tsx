import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'grommet';
import { Previous } from 'grommet-icons';
import styled from 'styled-components';

const StyledGlassButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(79, 172, 254, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(79, 172, 254, 0.3);
  border-radius: 8px;
  padding: 10px 20px;
  color: #ffffff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 1.5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    background: rgba(79, 172, 254, 0.25);
    border-color: #4facfe;
    box-shadow: 0 0 20px rgba(79, 172, 254, 0.5);
    transform: scale(1.05) translateX(-5px);
    
    svg {
      fill: #ffffff;
      stroke: #ffffff;
    }
  }

  span {
    font-size: 0.85rem;
  }
`;

export const BackButton: React.FC = () => {
  const history = useHistory();

  return (
    <StyledGlassButton 
      icon={<Previous size="small" color="#4facfe" />} 
      label="Back" 
      onClick={() => history.goBack()} 
      plain 
    />
  );
};

export default BackButton;