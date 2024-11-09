'use client'

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Physics, useSphere, usePlane, useBox } from '@react-three/cannon';
import './styles.css'; // CSS 파일 임포트

function Ball() {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 1, 0],
    velocity: [2, 2, 2],
    args: [0.5],
    restitution: 0.8, // 반사 계수 설정
  }));

  useFrame(() => {
    if (Math.abs(ref.current.position.x) > 5) {
      api.velocity.set(-ref.current.velocity.x, ref.current.velocity.y, ref.current.velocity.z); // x축 절대값이 5를 넘어가면 속도 반전
    }
    if (Math.abs(ref.current.position.y) > 5) {
      api.velocity.set(ref.current.velocity.x, -ref.current.velocity.y, ref.current.velocity.z); // y축 절대값이 5를 넘어가면 속도 반전
    }
    if (Math.abs(ref.current.position.z) > 5) {
      api.velocity.set(ref.current.velocity.x, ref.current.velocity.y, -ref.current.velocity.z); // z축 절대값이 5를 넘어가면 속도 반전
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    restitution: 5, // 탄성 계수 설정
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
}

function Wall({ position, rotation }) {
  const [ref] = useBox(() => ({
    position,
    rotation,
    restitution: 2,
    args: [10, 10, 0.1],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <boxGeometry args={[10, 10, 0.1]} />
      <meshStandardMaterial color="gray" transparent opacity={0.2} />
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
            <Physics>
              <Ball />
              <Plane />
              <Wall position={[0, 5, -5]} rotation={[0, 0, 0]} />
              <Wall position={[0, 5, 5]} rotation={[0, Math.PI, 0]} />
              <Wall position={[-5, 5, 0]} rotation={[0, Math.PI / 2, 0]} />
              <Wall position={[5, 5, 0]} rotation={[0, -Math.PI / 2, 0]} />
            </Physics>
            <OrbitControls />
          </Canvas>
        </div>
      </div>
    </div>
  );
}