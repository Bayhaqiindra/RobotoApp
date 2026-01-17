import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'grommet';
import { Previous } from 'grommet-icons';

/**
 * BackButton - Versi Modern
 * Menggunakan hook useNavigate untuk kembali ke halaman sebelumnya.
 */
export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  // navigate(-1) berfungsi sama seperti menekan tombol back pada browser
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button 
      icon={<Previous />} 
      label="Back" 
      onClick={handleGoBack} 
    />
  );
};

export default BackButton;