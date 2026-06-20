import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Scene from './components/Scene';
import Overlay from './components/Overlay';

function App() {
  return (
    <>
      <div className="canvas-container">
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]} // Support high-DPI displays
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={['#000000']} />
          <Suspense fallback={null}>
            <ScrollControls pages={10} damping={0.1}>
              <Scene />
              <Overlay />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

export default App;
