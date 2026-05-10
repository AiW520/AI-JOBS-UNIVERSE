import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { StarField } from './StarField';

export function BackgroundScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <group ref={groupRef}>
      <StarField />
    </group>
  );
}