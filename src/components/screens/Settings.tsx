import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox } from 'grommet';
import { RootState, settingsActions, settingsSelectors } from '../../state';
import BackButton from '../BackButton';
import Screen from '../Screen';

/**
 * Settings Component - Versi Modern
 * Mengatur preferensi kontrol layar menggunakan Redux Hooks.
 */
export const Settings: React.FC = () => {
  const dispatch = useDispatch();

  // Mengambil state kontrol layar menggunakan Selector
  const displayOnScreenControls = useSelector((state: RootState) =>
    settingsSelectors.displayOnScreenControls(state.settings)
  );

  // Handler untuk mengubah setting
  const handleToggle = () => {
    dispatch(settingsActions.toggleOnScreenControls());
  };

  return (
    <Screen title="Settings">
      <CheckBox
        label="Display on-screen controls (required on devices without a keyboard)"
        checked={displayOnScreenControls}
        onChange={handleToggle}
      />
      <BackButton />
    </Screen>
  );
};

export default Settings;