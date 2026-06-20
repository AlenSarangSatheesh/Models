import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
uniform float uTime;
uniform vec3 uMouse;
attribute vec3 randoms; // x: speed, y: offset, z: scale
varying float vAlpha;

void main() {
  vec3 pos = position;

  // Gentle floating based on time
  pos.x += sin(uTime * randoms.x + randoms.y) * 0.5;
  pos.y += cos(uTime * randoms.x + randoms.y) * 0.5;
  pos.z += sin(uTime * randoms.x * 0.5 + randoms.y) * 0.5;

  // Mouse repulsion logic
  float distanceToMouse = distance(pos, uMouse);
  float maxDistance = 5.0; // The radius of repulsion
  if (distanceToMouse < maxDistance) {
    vec3 direction = normalize(pos - uMouse);
    // Push particles away, strength diminishes with distance
    float strength = (1.0 - (distanceToMouse / maxDistance));
    pos += direction * strength * 2.0;
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Size attenuation based on distance
  gl_PointSize = (10.0 * randoms.z) * (20.0 / -mvPosition.z);

  // Fade out particles that are far away from center
  float distFromCenter = length(pos);
  vAlpha = smoothstep(15.0, 0.0, distFromCenter) * 0.6; // max opacity 0.6
}
`;

const fragmentShader = `
varying float vAlpha;

void main() {
  // Make the particles soft and circular
  vec2 uv = gl_PointCoord.xy - 0.5;
  float dist = length(uv);
  if (dist > 0.5) discard;
  
  // Soft edge glow
  float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
  
  // Golden honey color
  gl_FragColor = vec4(1.0, 0.8, 0.4, alpha);
}
`;

export default function FloatingPollen({ count = 2000 }) {
  const pointsRef = useRef();
  const materialRef = useRef();
  const { mouse, camera } = useThree();

  // Create an invisible plane to raycast the mouse against in 3D space
  const mousePlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const targetVec = useMemo(() => new THREE.Vector3(), []);

  // Generate random positions and attributes for the particles
  const [positions, randoms] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Scatter in a large 30x30x30 volume
      pos[i * 3 + 0] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;

      // Speed, offset, size
      rnd[i * 3 + 0] = 0.2 + Math.random() * 0.8;
      rnd[i * 3 + 1] = Math.random() * Math.PI * 2;
      rnd[i * 3 + 2] = 0.5 + Math.random() * 1.5;
    }
    return [pos, rnd];
  }, [count]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

      // Project the 2D mouse screen coordinates into the 3D space on our invisible plane
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(mousePlane, targetVec);

      // Pass the 3D mouse position to the shader
      // We slowly lerp it so the swarm "follows" gracefully
      materialRef.current.uniforms.uMouse.value.lerp(targetVec, 0.1);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-randoms"
          count={randoms.length / 3}
          array={randoms}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector3() }
        }}
      />
    </points>
  );
}
