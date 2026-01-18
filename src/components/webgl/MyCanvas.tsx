import React from 'react';
import { useSelector, useStore, Provider } from 'react-redux';
import { Canvas } from '@react-three/fiber';
import { Color } from 'three';
import CameraControls from './CameraControls';
import Map from './Map';

/**
 * MyCanvas - Lightweight Enhanced Version
 */
export const MyCanvas: React.FC = () => {
  const store = useStore();

  return (
    <Canvas
      shadows
      camera={{ 
        fov: 60, 
        position: [8, 8, 8],
        near: 0.1,
        far: 1000
      }}
      style={{
        background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%)',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <Provider store={store}>
        <CameraControls />
        
        <group rotation={[-Math.PI / 2, 0, 0]}>
          {/* Ambient Light - cahaya dasar */}
          <ambientLight intensity={0.4} color="#b0c4de" />
          
          {/* Main directional light dengan shadow */}
          <directionalLight
            color={new Color('#ffffff')}
            castShadow
            intensity={1.2}
            position={[10, 10, 10]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.5}
            shadow-camera-far={50}
          />
          
          {/* Fill light dari samping */}
          <directionalLight
            color="#6a9bd8"
            intensity={0.5}
            position={[-5, 5, -5]}
          />

          <Map />
        </group>
      </Provider>
    </Canvas>
  );
};

export default MyCanvas;