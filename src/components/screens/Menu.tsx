import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button } from 'grommet';
import { Play, SettingsOption } from 'grommet-icons';
import Screen from '../Screen';

/**
 * Menu Utama - Menggunakan withRouter untuk stabilitas v5
 */
const MenuComponent: React.FC<RouteComponentProps> = ({ history }) => {
  
  const handleStartGame = () => history.push('/select-level');
  const handleOpenSettings = () => history.push('/settings');

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

// Membungkus komponen dengan withRouter agar mendapatkan akses ke object history
export const Menu = withRouter(MenuComponent);
export default Menu;