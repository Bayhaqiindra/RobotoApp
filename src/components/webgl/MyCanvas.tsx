import React from 'react';
import { useSelector, useStore, Provider } from 'react-redux';
import { Canvas } from '@react-three/fiber';
/* Impor Stars untuk efek angkasa yang nyata */
import { Stars, Float } from '@react-three/drei'; 
import { Color, FogExp2 } from 'three';
import CameraControls from './CameraControls';
import Map from './Map';

/**
 * MyCanvas - Versi Sky & Deep Space 3D
 */
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
        /* Warna background deep space pekat */
        background: '#020408', 
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      /* Menambahkan kabut atmosfer agar map terlihat melayang secara natural */
      onCreated={({ scene }) => {
        scene.fog = new FogExp2('#020408', 0.04);
      }}
    >
      <Provider store={store}>
        {/* --- LINGKUNGAN ANGKASA --- */}
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
          {/* Ambient Light - cahaya dasar biru dingin */}
          <ambientLight intensity={0.5} color="#4facfe" />
          
          {/* Main directional light - Cahaya matahari/bintang utama */}
          <directionalLight
            color={new Color('#ffffff')}
            castShadow
            intensity={1.8}
            position={[10, 20, 10]}
            shadow-mapSize={[2048, 2048]}
          />
          
          {/* Rim Light - Cahaya aksen dari arah berlawanan untuk efek 3D kuat */}
          <pointLight 
            position={[-10, -5, -10]} 
            intensity={2} 
            color="#0077ff" 
          />

          {/* Map utama tanpa garis pembantu */}
          <Map />
        </group>
      </Provider>
    </Canvas>
  );
};

export default MyCanvas;