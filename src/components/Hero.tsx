import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function ServiceNode({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(clock.getElapsedTime() + position[0]) * 0.002;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  );
}

function AnimatedGlobe() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const nodes = [
    { pos: [2, 1, 0] as [number, number, number], color: '#6C5CE7' },
    { pos: [-2, -1, 1] as [number, number, number], color: '#00F5A0' },
    { pos: [1, -2, -1] as [number, number, number], color: '#00D9F5' },
    { pos: [-1.5, 2, -0.5] as [number, number, number], color: '#A29BFE' },
    { pos: [0, 2.5, 1] as [number, number, number], color: '#4834D4' },
  ];

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group>
      <Sphere ref={sphereRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial 
          color="#6C5CE7" 
          attach="material" 
          distort={0.3} 
          speed={2} 
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
        />
      </Sphere>
      {nodes.map((node, i) => (
        <ServiceNode key={i} position={node.pos} color={node.color} />
      ))}
    </group>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-gradient-hero">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F5A0" />
          <AnimatedGlobe />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel mb-6 border-[var(--color-primary)]/30">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-accent)]">Klickra AI Platform 2.0</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
            Supercharge Your <br />
            <span className="text-gradient">Digital Presence</span> <br />
            with AI
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl leading-relaxed">
            SEO • SXO • AEO • GEO • AIO • Web Design • AI Agents • Workflow Automation — All in One Platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#services" className="px-8 py-4 rounded-full bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] font-semibold hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center">
              Explore Services
            </a>
            <a href="/tools" className="px-8 py-4 rounded-full glass-panel font-semibold hover:bg-[var(--color-primary)]/10 transition-all duration-300 text-center border border-[var(--color-border)]">
              Get Free Audit
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}
