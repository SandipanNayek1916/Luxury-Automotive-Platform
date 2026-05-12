"use client";

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, OrbitControls, Center } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    // Change the color of the car to orange
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && mat.name) {
          const name = mat.name.toLowerCase();
          if (name.includes('carpaint')) {
            mat.color.set('#111111'); // Phantom Black
            if (mat.map) mat.map = null;
            mat.needsUpdate = true;
          }
        }
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15; // Slow auto-rotation
    }
  });

  return (
    <group ref={ref}>
      <Center top position={[0, 0, 0]}>
        <primitive object={scene} scale={1.4} />
      </Center>
    </group>
  );
}

export function CarModel() {
  return (
    <div className="w-full h-full relative z-50 cursor-grab active:cursor-grabbing pointer-events-auto">
      <Canvas
        shadows
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        camera={{ position: [4.5, 1.5, 6], fov: 25 }}
      >
        <ambientLight intensity={1.0} />
        <spotLight position={[10, 15, 10]} angle={0.2} penumbra={1} intensity={2.0} castShadow />

        <Suspense fallback={null}>
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2.1}
            makeDefault
          />
          <Model url="/models/p1/scene.gltf" />
          <ContactShadows position={[0, -0.9, 0]} opacity={0.65} scale={16} blur={2.5} far={4} color="#000000" />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/p1/scene.gltf");
