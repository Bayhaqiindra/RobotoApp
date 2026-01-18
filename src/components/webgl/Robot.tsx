import React, { Suspense, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { animated } from '@react-spring/three';
import { useLoader, useFrame } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial, BufferGeometry, Group } from 'three'; 
// @ts-ignore
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { gameSelectors, RootState } from '../../state';
import { directionToAngle } from '../../mechanics/directions';
import { useMinimalRotation, useSimpleMovementAnimation } from '../../utils/hooks';

interface RobotMeshProps {
  position: [number, number, number];
  direction: number;
}

const RobotMesh: React.FC<RobotMeshProps> = ({ position, direction }) => {
  const modelPath = `${import.meta.env.BASE_URL}3d-models/robot.glb`.replace('//', '/');
  const gltf = useLoader(GLTFLoader, modelPath);
  const groupRef = useRef<Group>(null);

  // Animasi ringan - hanya hover
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.z = Math.sin(state.clock.elapsedTime * 2) * 0.03;
    }
  });

  const geometry = useMemo(() => {
    let foundGeometry: BufferGeometry | undefined;
    gltf.scene.traverse((child: any) => { 
      if (child.isMesh) {
        foundGeometry = (child as any).geometry;
      }
    });
    return foundGeometry;
  }, [gltf]);

  // Material robot yang sederhana tapi menarik
  const material = useMemo(() => 
    new MeshStandardMaterial({ 
      color: '#d0e0f0',
      roughness: 0.4,
      metalness: 0.7,
      emissive: '#4a90e2',
      emissiveIntensity: 0.3,
    }), 
  []);

  const zRotation = useMinimalRotation(direction);
  
  const springProps = useSimpleMovementAnimation({
    position,
    rotation: [0, 0, zRotation] as [number, number, number]
  });

  return (
    <animated.group {...springProps}>
      <group ref={groupRef}>
        {/* Single point light - ringan */}
        <pointLight
          color="#4a90e2"
          intensity={1}
          distance={3}
          decay={2}
          position={[0, 0, 0.5]}
        />
        
        {/* Robot mesh */}
        <mesh 
          castShadow 
          receiveShadow 
          geometry={geometry} 
          material={material}
        />
        
        {/* Simple glow ring */}
        <mesh position={[0, 0, 0.05]} rotation={[0, 0, 0]}>
          <ringGeometry args={[0.35, 0.4, 32]} />
          <meshBasicMaterial 
            color="#4a90e2" 
            transparent 
            opacity={0.5}
          />
        </mesh>
      </group>
    </animated.group>
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