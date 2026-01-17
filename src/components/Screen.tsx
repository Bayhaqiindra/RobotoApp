import React from 'react';
import { Box } from 'grommet';
import styled from 'styled-components';

/**
 * Screen Props - Menggunakan standar tipe data React terbaru.
 */
interface ScreenProps {
  title: string;
  children: React.ReactNode;
}

/**
 * H1 Styled Component - Tetap dipertahankan untuk styling judul.
 */
const H1 = styled.h1`
  text-align: center;
  margin-bottom: 1rem; /* Tambahan sedikit spacing agar lebih proporsional */
`;

/**
 * Screen - Versi Modern
 * Bertindak sebagai layout dasar untuk semua layar/menu dalam game.
 */
export const Screen: React.FC<ScreenProps> = ({ title, children }) => {
  return (
    <Box width="medium" pad="medium">
      <header>
        <H1>{title}</H1>
      </header>
      <Box 
        width="medium" 
        gap="small" 
        align="stretch"
      >
        {children}
      </Box>
    </Box>
  );
};

export default Screen;