'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import './styles.css'; // CSS 파일 임포트

function ResizableCube() {
  const meshRef = useRef();
  const [clicked, setClicked] = useState(false);
  const [color, setColor] = useState(0xffa500); // 초기 색상 설정
  const [scale, setScale] = useState(1); // 초기 크기 설정
  const { camera, gl } = useThree();

  const handlePointerDown = () => {
    setClicked(prevClicked => !prevClicked);
    setColor(Math.random() * 0xffffff); // 랜덤 색상 생성
    setScale(1 + Math.random() * 4); // 1에서 5배까지 랜덤 크기 생성
  };

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.material.color.setHex(color);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerDown={handlePointerDown}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
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