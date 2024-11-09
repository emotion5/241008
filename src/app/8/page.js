'use client'

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import './styles.css'; // CSS 파일 임포트

function Model() {
  const { scene } = useGLTF('/glb/aa03n.glb');
  return <primitive object={scene} />;
}

export default function Page() {
  return (
    <div id="main-container">
      <div id="configurator">
        <div id="canvas-container">
          <Canvas>
            <ambientLight intensity={0.5} />
            {/* <directionalLight position={[10, 10, 10]} /> */}
            <Suspense fallback={null}>
              <Model />
            </Suspense>
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </div>
  );
}