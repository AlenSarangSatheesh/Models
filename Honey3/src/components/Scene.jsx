import React from 'react';
import LiquidTransition from './LiquidTransition';
import FloatingPollen from './FloatingPollen';

export default function Scene() {
  return (
    <>
      {/* Full-Screen Cinematic Shader Transition */}
      <LiquidTransition />

      {/* Interactive 3D floating pollen particles that react to mouse hover */}
      <FloatingPollen count={3000} />
    </>
  );
}
