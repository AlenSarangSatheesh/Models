import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform sampler2D tex3;
uniform sampler2D tex4;
uniform float progress; // 0 to 1 across all 4 images
uniform float time;
uniform vec2 uResolution;
uniform vec2 uImageResolution;

varying vec2 vUv;

// Classic Perlin 2D Noise 
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  // Object-fit: cover logic
  vec2 ratio = vec2(
    min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
    min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
  );
  vec2 uvCover = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  float phase = progress * 3.0;
  int currentPhase = int(floor(phase));
  float transition = fract(phase); 
  
  float noise = snoise(uvCover * 3.0 + time * 0.5);
  
  float distortionStrength = sin(transition * 3.14159) * 0.2; 
  vec2 distortedUv1 = uvCover + noise * distortionStrength;
  vec2 distortedUv2 = uvCover - noise * distortionStrength;
  
  float swipe = smoothstep(transition - 0.2, transition + 0.2, uvCover.y + noise * 0.3);
  
  vec4 color1 = texture2D(tex1, distortedUv1);
  vec4 color2 = texture2D(tex2, distortedUv2);
  vec4 color3 = texture2D(tex3, distortedUv1); 
  vec4 color4 = texture2D(tex4, distortedUv2);
  
  vec4 finalColor;
  
  if (currentPhase == 0) {
    finalColor = mix(color2, color1, swipe); 
  } else if (currentPhase == 1) {
    finalColor = mix(color3, color2, swipe); 
  } else {
    finalColor = mix(color4, color3, swipe); 
  }
  
  if (progress >= 1.0) {
    finalColor = texture2D(tex4, uvCover);
  }

  finalColor.rgb -= distortionStrength * 0.5;
  
  gl_FragColor = finalColor;
}
`;

export default function LiquidTransition() {
  const meshRef = useRef();
  const materialRef = useRef();
  const scroll = useScroll();
  const { viewport } = useThree();

  const [tex1, tex2, tex3, tex4] = useTexture([
    '/flower.png',
    '/bee.png',
    '/hive.png',
    '/jar.png'
  ]);

  const uniforms = useMemo(
    () => ({
      tex1: { value: tex1 },
      tex2: { value: tex2 },
      tex3: { value: tex3 },
      tex4: { value: tex4 },
      progress: { value: 0 },
      time: { value: 0 },
      uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
      uImageResolution: { value: new THREE.Vector2(1024, 1024) } // Assuming generated images are square
    }),
    [tex1, tex2, tex3, tex4, viewport]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uResolution.value.set(viewport.width, viewport.height);
      
      const currentProgress = materialRef.current.uniforms.progress.value;
      const targetProgress = scroll.offset;
      materialRef.current.uniforms.progress.value = THREE.MathUtils.lerp(
        currentProgress,
        targetProgress,
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}
