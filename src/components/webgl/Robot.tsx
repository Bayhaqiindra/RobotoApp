import React, { Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { animated } from '@react-spring/three';
import { useLoader } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial, BufferGeometry, Object3D } from 'three'; 
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { gameSelectors, RootState } from '../../state';
import { directionToAngle } from '../../mechanics/directions';
import { useMinimalRotation, useSimpleMovementAnimation } from '../../utils/hooks';

// Definisi props untuk RobotMesh
interface RobotMeshProps {
  position: [number, number, number];
  direction: number;
}

const RobotMesh: React.FC<RobotMeshProps> = ({ position, direction }) => {
  // Gunakan import.meta.env.BASE_URL untuk Vite
  const modelPath = `${import.meta.env.BASE_URL}3d-models/robot.glb`.replace('//', '/');
  
  // Memuat model GLTF
  const gltf = useLoader(GLTFLoader, modelPath);

  // Mencari geometry di dalam scene
  const geometry = useMemo(() => {
    let foundGeometry: BufferGeometry | undefined;
    
    // Gunakan tipe any atau Object3D dari three
gltf.scene.traverse((child: any) => { 
  if (child.isMesh) {
    // Berikan type casting agar geometry dikenali
    foundGeometry = (child as any).geometry;
  }
});
    
    return foundGeometry;
  }, [gltf]);

  const material = useMemo(() => 
    new MeshStandardMaterial({ color: '#ffffff', roughness: 0.5, metalness: 0.6 }), 
  []);

  const zRotation = useMinimalRotation(direction);
  
  const springProps = useSimpleMovementAnimation({
    position,
    rotation: [0, 0, zRotation] as [number, number, number]
  });

  return (
    <animated.mesh 
      {...springProps} 
      castShadow 
      receiveShadow 
      geometry={geometry} 
      material={material} 
    />
  );
};

export const Robot: React.FC = () => {
  const { position, direction } = useSelector((state: RootState) => ({
    position: gameSelectors.getRobotPosition(state.game),
    direction: directionToAngle(gameSelectors.getRobotDirection(state.game)),
  }));

  return (
    <Suspense fallback={null}>
      <RobotMesh position={position} direction={direction} />
    </Suspense>
  );
};

export default Robot;