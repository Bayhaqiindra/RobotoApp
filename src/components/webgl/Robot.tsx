import React, { Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { animated } from '@react-spring/three';
import { useLoader } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gameSelectors, RootState } from '../../state';
import { directionToAngle } from '../../mechanics/directions';
import { useMinimalRotation, useSimpleMovementAnimation } from '../../utils/hooks';

/**
 * Robot - Versi Modern
 */
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

interface RobotMeshProps {
  position: [number, number, number];
  direction: number;
}

const RobotMesh: React.FC<RobotMeshProps> = ({ position, direction }) => {
  // PERBAIKAN: Gunakan import.meta.env.BASE_URL atau path relatif untuk Vite
  // Menghilangkan penggunaan process.env.PUBLIC_URL yang menyebabkan error
  const modelPath = `${import.meta.env.BASE_URL}3d-models/robot.glb`.replace('//', '/');
  const gltf = useLoader(GLTFLoader, modelPath);

  const geometry = useMemo(() => {
    // Pastikan mencari mesh di dalam scene secara rekursif jika perlu
    let foundGeometry;
    gltf.scene.traverse((child) => {
      if ((child as Mesh).isMesh && !foundGeometry) {
        foundGeometry = (child as Mesh).geometry;
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

export default Robot;