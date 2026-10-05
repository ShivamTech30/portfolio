import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedSphere = () => {
  const sphereRef = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.15;
    if (sphereRef.current) {
      sphereRef.current.distort = 0.3 + Math.sin(t) * 0.1;
    }
  });
  
  return (
    <Sphere args={[1, 100, 100]} position={[0, 0, 0]} scale={2.5}>
      <MeshDistortMaterial
        ref={sphereRef}
        color="#4f46e5"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
      />
    </Sphere>
  );
};

const FloatingParticles = ({ count = 100 }) => {
  const particles = useRef([]);
  
  useFrame(() => {
    particles.current.forEach((particle) => {
      particle.rotation.x += 0.001;
      particle.rotation.y += 0.001;
    });
  });
  
  const particlePositions = Array.from({ length: count }, () => [
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  ]);
  
  return (
    <>
      {particlePositions.map((position, i) => (
        <mesh 
          key={i} 
          position={position} 
          ref={(el) => (particles.current[i] = el)}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#2563eb" transparent opacity={0.6} />
        </mesh>
      ))}
    </>
  );
};

const HeroCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <AnimatedSphere />
        <FloatingParticles />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate rotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  );
};

export default HeroCanvas;