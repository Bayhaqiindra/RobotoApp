import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { extend, useThree, ThreeElements } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gameSelectors, RootState } from '../../state';
import { useEffectOnce } from '../../utils/hooks';

// Mendaftarkan OrbitControls agar bisa digunakan sebagai tag JSX
extend({ OrbitControls });

// Perbaikan deklarasi tipe agar tidak error "Property does not exist"
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: any; // Menggunakan any untuk melewati pengecekan tipe yang ketat
    }
  }
}

export const CameraControls: React.FC = () => {
  const { camera, gl } = useThree();
  const controls = useRef<any>(null);

  const initialPosition = useSelector((state: RootState) => {
    try {
      const mapDimensions = gameSelectors.getMapDimensions(state.game);
      const n = Math.max(3, Math.max(...mapDimensions) * 0.7);
      return [n, n, n] as [number, number, number];
    } catch {
      return undefined;
    }
  });

  useEffectOnce(() => {
    if (initialPosition) {
      camera.position.set(...initialPosition);
      camera.lookAt(0, 0, 0);
      if (controls.current) {
        controls.current.update();
      }
    }
  });

  return (
    <orbitControls 
      ref={controls}
      args={[camera, gl.domElement]} 
      maxPolarAngle={Math.PI / 2.1}
      enablePan={false} 
    />
  );
};

export default CameraControls;