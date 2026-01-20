import React from 'react';
import { useSelector, useStore, Provider } from 'react-redux';
import { Canvas } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei'; 
import { Color, FogExp2 } from 'three';
import CameraControls from './CameraControls';
import Map from './Map';

export const MyCanvas: React.FC = () => {
  const store = useStore();

  return (
    <Canvas
      shadows
      camera={{ 
        fov: 50, 
        position: [10, 10, 10], 
        near: 0.1,
        far: 1000
      }}
      style={{
        background: '#020408', 
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      onCreated={({ scene }) => {
        scene.fog = new FogExp2('#020408', 0.04);
      }}
    >
      <Provider store={store}>
        <Stars 
          radius={100} 
          depth={50} 
          count={7000} 
          factor={4} 
          saturation={0.5} 
          fade 
          speed={1} 
        />

        <CameraControls />
        
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <ambientLight intensity={0.5} color="#4facfe" />
          <directionalLight
            color={new Color('#ffffff')}
            castShadow
            intensity={1.8}
            position={[10, 20, 10]}
            shadow-mapSize={[2048, 2048]}
          />
          
          <pointLight 
            position={[-10, -5, -10]} 
            intensity={2} 
            color="#0077ff" 
          />

          <Map />
        </group>
      </Provider>
    </Canvas>
  );
};

export default MyCanvas;