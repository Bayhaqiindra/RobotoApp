import React from 'react';
import { useHistory } from 'react-router-dom'; // Gunakan useHistory, bukan useNavigate
import { Button } from 'grommet';
import { Previous } from 'grommet-icons';

/**
 * BackButton - Versi v5 Compatibility
 * Menggunakan hook useHistory untuk kembali ke halaman sebelumnya.
 */
export const BackButton: React.FC = () => {
  const history = useHistory();

  const handleGoBack = () => {
    // goBack() adalah fungsi standar untuk navigasi mundur di v5
    history.goBack();
  };

  return (
    <Button 
      icon={<Previous />} 
      label="Back" 
      onClick={handleGoBack} 
      plain // Menambah estetika jika diperlukan
    />
  );
};

export default BackButton;