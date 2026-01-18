import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button } from 'grommet';
import { Play, SettingsOption } from 'grommet-icons';
import Screen from '../Screen';

/**
 * Menu Utama - Debug Version
 */
const MenuComponent: React.FC<RouteComponentProps> = ({ history }) => {
  
  const handleStartGame = () => {
    console.log('🎮 Start Game clicked!');
    console.log('Current location:', history.location.pathname);
    console.log('Navigating to: /select-level');
    
    history.push('/select-level');
    
    // Cek apakah URL berubah setelah push
    setTimeout(() => {
      console.log('After push, location:', history.location.pathname);
    }, 100);
  };
  
  const handleOpenSettings = () => {
    console.log('⚙️ Settings clicked!');
    console.log('Current location:', history.location.pathname);
    history.push('/settings');
  };

  return (
    <Screen title="Sokobot">
      <Button 
        primary
        icon={<Play />} 
        label="Start Game" 
        onClick={handleStartGame} 
        margin={{ bottom: 'small' }}
      />
      <Button 
        icon={<SettingsOption />} 
        label="Settings" 
        onClick={handleOpenSettings} 
      />
    </Screen>
  );
};

export const Menu = withRouter(MenuComponent);
export default Menu;