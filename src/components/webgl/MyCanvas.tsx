import React from 'react';
import { useSelector, useStore, Provider } from 'react-redux';
import { Canvas } from '@react-three/fiber';
import { Color } from 'three';
import CameraControls from './CameraControls';
import Map from './Map';

/**
 * MyCanvas - Versi Modern
 * Mengintegrasikan React Three Fiber dengan Redux Store.
 */
export const MyCanvas: React.FC = () => {
  // Mengambil instance store secara langsung menggunakan hook
  const store = useStore();

  return (
    <Canvas
      shadows // Properti 'shadowMap' sekarang diganti menjadi 'shadows'
      camera={{ fov: 75 }} // Definisi kamera opsional tapi disarankan
      style={{
        backgroundColor: 'black',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      {/* Menjembatani Provider agar State Redux bisa diakses di dalam elemen Canvas */}
      <Provider store={store}>
        <CameraControls />
        
        <group rotation={[-Math.PI / 2, 0, 0]}>

          <ambientLight intensity={0.4} />
          
          <spotLight
            color={new Color('#fffda7')}
            castShadow
            intensity={1.5} // Intensitas di versi terbaru seringkali butuh penyesuaian lebih tinggi
            penumbra={1}
            decay={2} // Nilai decay default Three.js sekarang adalah 2
            angle={Math.PI / 8}
            position={[10, 10, 10]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          <Map />
        </group>
      </Provider>
    </Canvas>
  );
};

export default MyCanvas;