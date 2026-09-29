'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function CakeModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    // Auto-rotate with smooth mouse interaction
    groupRef.current.rotation.y += 0.003;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.15,
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      pointer.x * -0.1,
      0.05
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={1.2} position={[0, -0.5, 0]}>
        {/* Cake Base Plate */}
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[1.6, 1.7, 0.1, 32]} />
          <meshStandardMaterial color="#F2C66D" metalness={0.4} roughness={0.2} />
        </mesh>

        {/* Bottom layer */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.6, 32]} />
          <meshStandardMaterial color="#FFD6C9" roughness={0.6} />
        </mesh>
        
        {/* Sprinkles on Bottom Layer */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = 1.32;
          return (
            <mesh key={`sprinkle-bot-${i}`} position={[Math.cos(angle)*radius, -0.3 + (Math.random()*0.4 - 0.2), Math.sin(angle)*radius]} rotation={[0, 0, Math.random() * Math.PI]}>
               <capsuleGeometry args={[0.02, 0.1, 4, 8]} />
               <meshStandardMaterial color={['#FF5C8A', '#F2C66D', '#FFF'][i%3]} />
            </mesh>
          )
        })}

        {/* Frosting bottom */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[1.35, 1.3, 0.15, 32]} />
          <meshStandardMaterial color="#FFF8F2" roughness={0.4} />
        </mesh>

        {/* Middle layer */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.55, 32]} />
          <meshStandardMaterial color="#FF9F9F" roughness={0.6} />
        </mesh>
        
        {/* Sprinkles on Middle Layer */}
        {Array.from({ length: 15 }).map((_, i) => {
          const angle = (i / 15) * Math.PI * 2;
          const radius = 0.92;
          return (
            <mesh key={`sprinkle-mid-${i}`} position={[Math.cos(angle)*radius, 0.4 + (Math.random()*0.3 - 0.15), Math.sin(angle)*radius]} rotation={[0, 0, Math.random() * Math.PI]}>
               <capsuleGeometry args={[0.02, 0.1, 4, 8]} />
               <meshStandardMaterial color={['#FFF', '#F2C66D', '#FF5C8A'][i%3]} />
            </mesh>
          )
        })}

        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.95, 0.9, 0.12, 32]} />
          <meshStandardMaterial color="#FFF8F2" roughness={0.4} />
        </mesh>

        {/* Top layer */}
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.55, 32]} />
          <meshStandardMaterial color="#FFF0F4" roughness={0.6} />
        </mesh>
        
         <mesh position={[0, 1.35, 0]}>
          <cylinderGeometry args={[0.6, 0.55, 0.1, 32]} />
          <meshStandardMaterial color="#FF5C8A" roughness={0.4} />
        </mesh>

        {/* Candles */}
        {[-0.25, 0, 0.25].map((x, i) => (
          <group key={i} position={[x, 1.55, 0]}>
            {/* Candle stick */}
            <mesh>
              <cylinderGeometry args={[0.03, 0.03, 0.35, 12]} />
              <meshStandardMaterial color={['#FF9F9F', '#F2C66D', '#FFF'][i]} />
            </mesh>
            {/* Flame */}
            <pointLight position={[0, 0.3, 0]} color="#ffaa00" intensity={0.6} distance={2} />
            <mesh position={[0, 0.25, 0]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial
                color="#FF5C8A"
                emissive="#F2C66D"
                emissiveIntensity={2}
                transparent
                opacity={0.8}
              />
            </mesh>
          </group>
        ))}

        {/* Strawberries on top */}
        {[0, 90, 180, 270].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh key={i} position={[0.4 * Math.cos(rad), 1.45, 0.4 * Math.sin(rad)]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial color="#E63946" roughness={0.3} />
            </mesh>
          );
        })}
        
        {/* Glow Sparkles around the cake */}
        <Sparkles count={40} scale={3} size={2} speed={0.4} opacity={0.5} color="#F2C66D" position={[0, 1, 0]} />
      </group>
    </Float>
  );
}

export default function ThreeCanvas() {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px]" onError={() => setError(true)}>
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#fff8f2" />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#FFD6C9" />
        <pointLight position={[0, 4, 2]} intensity={0.8} color="#FF5C8A" />

        <Stars
          radius={15}
          depth={10}
          count={300}
          factor={3}
          saturation={0.8}
          fade
          speed={1.5}
        />

        <CakeModel />
        {/* @ts-ignore */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
      </Canvas>
    </div>
  );
}
