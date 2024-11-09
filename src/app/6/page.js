'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import './styles.css'; // CSS 파일 임포트

function ResizableCube() {
  const meshRef = useRef();
  const [clicked, setClicked] = useState(false);

  const handlePointerDown = () => {
    setClicked(true);
  };

  const handlePointerUp = () => {
    setClicked(false);
  };

  useFrame(() => {
    if (meshRef.current) {
      const material = meshRef.current.material;
      if (clicked) {
        material.color.setHex(0xff0000);
      } else {
        material.color.setHex(0xffa500);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Page() {
  return (
    <div id="main-container">
      <div id="configurator">
        <div id="canvas-container">
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} />
            <ResizableCube />
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </div>
  );
}