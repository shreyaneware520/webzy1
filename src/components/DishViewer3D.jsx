import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { RotateCw } from 'lucide-react';
import * as THREE from 'three';

/* ── 3D Steam Particles Component ── */
function SteamParticles() {
  const count = 30;
  const pointsRef = useRef(null);
  const tempPositions = useRef(new Float32Array(count * 3));

  // Initialize particles
  useEffect(() => {
    const pos = tempPositions.current;
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.2; // x
      pos[i * 3 + 1] = Math.random() * 1.5;     // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.2; // z
    }
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const arr = posAttr.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      arr[idx + 1] += delta * 0.35; // rise up
      arr[idx] += Math.sin(state.clock.elapsedTime + i) * 0.003; // drift x

      // Reset when particle goes high
      if (arr[idx + 1] > 1.8) {
        arr[idx] = (Math.random() - 0.5) * 1.0;
        arr[idx + 1] = 0.3;
        arr[idx + 2] = (Math.random() - 0.5) * 1.0;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[tempPositions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#F5EBDD"
        size={0.12}
        transparent
        opacity={0.18}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Asynchronous GLTF Model Loader ── */
function ModelLoader({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.8} position={[0, -0.2, 0]} castShadow receiveShadow />;
}

/* ── Realistic Procedural 3D Ramen Bowl ── */
function ProceduralBowl({ brothColor = '#C9A24A', toppings = [] }) {
  const groupRef = useRef(null);

  // Auto slow spin inside viewer
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* 1. Outer Ceramic Bowl (Black lacquer) */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.6, 0.9, 0.8, 48]} />
        <meshStandardMaterial
          color="#090708"
          roughness={0.12}
          metalness={0.1}
          bumpScale={0.02}
        />
      </mesh>

      {/* 2. Gold Rim Accent */}
      <mesh position={[0, 0.41, 0]}>
        <torusGeometry args={[1.6, 0.045, 12, 60]} />
        <meshStandardMaterial
          color="var(--warm-gold)"
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* 3. Broth Surface (Physical material for liquid gloss & clearcoat) */}
      <mesh position={[0, 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.52, 48]} />
        <meshPhysicalMaterial
          color={brothColor}
          roughness={0.05}
          metalness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transmission={0.3}
          thickness={0.5}
        />
      </mesh>

      {/* 4. Dense Noodle Bed */}
      {[...Array(8)].map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.45, 0.38, Math.sin(a) * 0.45]}
            rotation={[0.1, a, 0.15]}
          >
            <torusGeometry args={[0.32 + i * 0.045, 0.02, 8, 30]} />
            <meshStandardMaterial color="#E8D7A5" roughness={0.55} />
          </mesh>
        );
      })}

      {/* 5. Nori Seaweed Sheet (Stands up at the back) */}
      <mesh position={[0, 0.7, -1.05]} rotation={[-0.2, 0.15, -0.05]} castShadow>
        <boxGeometry args={[0.8, 0.75, 0.03]} />
        <meshStandardMaterial color="#121815" roughness={0.8} />
      </mesh>

      {/* 6. Soft-boiled Ajitama Egg (Half) */}
      {(toppings.includes('egg-half') || toppings.includes('egg')) && (
        <group position={[0.55, 0.39, 0.4]} rotation={[0.2, -0.6, 0.25]}>
          {/* Egg White */}
          <mesh castShadow>
            <sphereGeometry args={[0.36, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#F5F5ED" roughness={0.4} />
          </mesh>
          {/* Egg Yolk (Glossy and orange-yellow) */}
          <mesh position={[0, 0.11, 0]}>
            <sphereGeometry args={[0.21, 16, 16]} />
            <meshStandardMaterial color="#FF9A00" roughness={0.1} metalness={0.15} />
          </mesh>
        </group>
      )}

      {/* 7. Slow-braised Chashu Pork Slices */}
      {toppings.includes('chashu') && (
        <group position={[-0.55, 0.4, -0.1]} rotation={[0.08, 0.8, -0.1]}>
          <mesh castShadow>
            <boxGeometry args={[0.65, 0.06, 0.7]} />
            <meshStandardMaterial color="#6E2C22" roughness={0.6} />
          </mesh>
          {/* Fat Ribbon Details */}
          <mesh position={[0.1, 0.032, 0]}>
            <boxGeometry args={[0.1, 0.01, 0.65]} />
            <meshStandardMaterial color="#E8D0C5" roughness={0.6} />
          </mesh>
          <mesh position={[-0.15, 0.032, 0]}>
            <boxGeometry args={[0.08, 0.01, 0.65]} />
            <meshStandardMaterial color="#E8D0C5" roughness={0.6} />
          </mesh>
        </group>
      )}

      {/* 8. Tangy Aged Kimchi Mounds */}
      {toppings.includes('kimchi') && (
        <group position={[-0.25, 0.4, 0.5]} rotation={[0.1, -0.4, 0.05]}>
          {[...Array(3)].map((_, i) => (
            <mesh
              key={i}
              position={[(i - 1) * 0.12, 0.02, (i % 2) * 0.08]}
              rotation={[Math.random() * 0.5, Math.random() * 0.5, 0]}
              castShadow
            >
              <boxGeometry args={[0.22, 0.1, 0.25]} />
              <meshStandardMaterial color="var(--korean-red)" roughness={0.8} />
            </mesh>
          ))}
        </group>
      )}

      {/* 9. Scallion Cylinders (scattered rings) */}
      {toppings.includes('scallions') && (
        <group>
          {[
            [0.1, 0.39, -0.5],
            [-0.1, 0.39, 0.3],
            [0.3, 0.39, -0.2],
            [-0.3, 0.39, -0.6],
            [0.05, 0.39, 0.2],
            [-0.45, 0.39, 0.25],
          ].map(([x, y, z], i) => (
            <mesh key={i} position={[x, y, z]} rotation={[0.1, i * 1.2, 0.25]} castShadow>
              <cylinderGeometry args={[0.045, 0.045, 0.15, 8, 1, true]} />
              <meshStandardMaterial color="#3E8E41" roughness={0.45} side={THREE.DoubleSide} />
            </mesh>
          ))}
        </group>
      )}

      {/* 10. Grilled Silken Tofu Cubes */}
      {toppings.includes('tofu') && (
        <group>
          {[
            [-0.5, 0.42, 0.2],
            [-0.3, 0.42, -0.3],
          ].map(([x, y, z], i) => (
            <mesh key={i} position={[x, y, z]} rotation={[0, i * 0.5, 0]} castShadow>
              <boxGeometry args={[0.26, 0.26, 0.26]} />
              <meshStandardMaterial color="#FAF6EB" roughness={0.7} />
            </mesh>
          ))}
        </group>
      )}

      {/* 11. Baby Spinach / Bok Choy Folds */}
      {toppings.includes('spinach') && (
        <mesh position={[0.65, 0.39, -0.35]} rotation={[0.3, -0.4, 0.1]} castShadow>
          <sphereGeometry args={[0.22, 16, 8, 0, Math.PI, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#2E6930" roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}
      
      {/* 12. Sweet Corn Kernels */}
      {toppings.includes('corn') && (
        <group>
          {[
            [0.2, 0.39, 0.0],
            [0.28, 0.39, 0.05],
            [0.22, 0.39, -0.08],
            [0.34, 0.39, -0.02],
          ].map(([x, y, z], i) => (
            <mesh key={i} position={[x, y, z]} rotation={[Math.random(), 0, Math.random()]} castShadow>
              <sphereGeometry args={[0.048, 8, 8]} />
              <meshStandardMaterial color="#FFCA28" roughness={0.3} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

/* ── Main Viewer Component ── */
export default function DishViewer3D({ dish }) {
  const [mode, setMode] = useState('3d'); // Defaults to Real 3D mode
  const [frame, setFrame] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startFrame = useRef(0);

  const cfg = dish.threeConfig || { brothColor: '#C9A24A', toppings: [] };

  // Calculate horizontal drag offset to rotate frames (Image sequence player logic)
  const onDragStart = (clientX) => {
    setDragging(true);
    startX.current = clientX;
    startFrame.current = frame;
  };

  const onDragMove = (clientX) => {
    if (!dragging) return;
    const delta = Math.floor((startX.current - clientX) / 12);
    // Support wrapping frames (e.g. 24 frame loop)
    let next = (startFrame.current + delta) % 24;
    if (next < 0) next += 24;
    setFrame(next);
  };

  const onDragEnd = () => setDragging(false);

  useEffect(() => {
    const up = () => onDragEnd();
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
    };
  });

  return (
    <div
      style={{
        width: '100%',
        height: 380,
        position: 'relative',
        background: 'radial-gradient(ellipse at center, rgba(58, 12, 21, 0.3) 0%, rgba(9, 7, 8, 0.8) 75%)',
        borderRadius: 24,
        overflow: 'hidden',
        border: '1.5px solid rgba(158, 22, 43, 0.25)',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
      }}
    >
      {/* 3D Mode / 360° Image Sequence Toggler */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          zIndex: 20,
          display: 'flex',
          gap: 4,
          background: 'rgba(9, 7, 8, 0.9)',
          border: '1px solid rgba(158, 22, 43, 0.35)',
          borderRadius: 12,
          padding: 4,
          backdropFilter: 'blur(8px)',
        }}
      >
        {['3d', '360'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              padding: '6px 14px',
              borderRadius: 9,
              background:
                mode === m
                  ? 'linear-gradient(135deg, var(--korean-red), var(--warm-red))'
                  : 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: mode === m ? 'var(--soft-cream)' : 'rgba(245, 235, 221, 0.5)',
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition: 'all 0.3s var(--ease-premium)',
            }}
          >
            {m === '3d' ? 'Interactive 3D' : '360° View'}
          </button>
        ))}
      </div>

      {/* Guide Hints */}
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 14,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 14px',
          borderRadius: 999,
          background: 'rgba(9, 7, 8, 0.8)',
          border: '1px solid rgba(158, 22, 43, 0.25)',
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: '0.12em',
          color: 'rgba(245, 235, 221, 0.7)',
          textTransform: 'uppercase',
        }}
      >
        <RotateCw size={11} color="var(--warm-gold)" style={{ animation: 'spin 5s linear infinite' }} />
        {mode === '3d' ? 'Orbit & Zoom Model' : 'Drag to Rotate Bowl'}
      </div>

      {/* Angle indicator for 360 Spin */}
      {mode === '360' && (
        <div
          style={{
            position: 'absolute',
            bottom: 14,
            right: 14,
            zIndex: 20,
            padding: '5px 12px',
            borderRadius: 8,
            background: 'rgba(9, 7, 8, 0.85)',
            border: '1px solid rgba(158, 22, 43, 0.2)',
            fontSize: 10,
            fontFamily: 'monospace',
            color: 'var(--warm-gold)',
            fontWeight: 'bold',
          }}
        >
          Angle: {(frame * 15).toString().padStart(3, '0')}°
        </div>
      )}

      {/* ── MODE 1: Interactive Real 3D (R3F Canvas) ── */}
      {mode === '3d' && (
        <Canvas shadows style={{ width: '100%', height: '100%' }}>
          <PerspectiveCamera makeDefault position={[0, 2.3, 4.2]} fov={50} />
          
          {/* Studio Lights Configuration */}
          <ambientLight intensity={0.5} color="#1A080D" />
          <directionalLight
            position={[5, 10, 3]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          {/* Warm gold key light */}
          <pointLight position={[-4, 4, -2]} intensity={1.3} color="var(--warm-gold)" />
          {/* Subtle burgundy rim light */}
          <pointLight position={[3, -1, -3]} intensity={0.8} color="#9E162B" />

          {/* Steaming broth particles */}
          <SteamParticles />

          {/* Async Loader for GLB files, fallback to realistic procedural bowl */}
          <Suspense fallback={<ProceduralBowl brothColor={cfg.brothColor} toppings={cfg.toppings} />}>
            {cfg.glbPath ? (
              <ModelLoader url={cfg.glbPath} />
            ) : (
              <ProceduralBowl brothColor={cfg.brothColor} toppings={cfg.toppings} />
            )}
          </Suspense>

          <OrbitControls
            enableZoom
            minDistance={2.2}
            maxDistance={5.5}
            maxPolarAngle={Math.PI / 2.15}
            dampingFactor={0.06}
            enableDamping
          />
        </Canvas>
      )}

      {/* ── MODE 2: 360° Drag Sequence Loader (Falls back to auto-spinning 3D scene if frames aren't provided) ── */}
      {mode === '360' && (
        <div style={{ width: '100%', height: '100%' }}>
          {cfg.imageFrames ? (
            /* True Image sequence player */
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: dragging ? 'grabbing' : 'grab',
                userSelect: 'none',
              }}
              onMouseDown={(e) => onDragStart(e.clientX)}
              onMouseMove={(e) => onDragMove(e.clientX)}
              onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
            >
              {/* Preloaded active frame */}
              <img
                src={cfg.imageFrames[frame % cfg.imageFrames.length]}
                alt={`${dish.name} sequence frame ${frame}`}
                draggable={false}
                style={{
                  width: 'clamp(200px, 60%, 300px)',
                  height: 'clamp(200px, 60%, 300px)',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                  border: '2px solid var(--wine-red)',
                }}
              />
            </div>
          ) : (
            /* Auto-rotating 3D Canvas fallback so it NEVER fakes with a flat image rotation */
            <Canvas shadows style={{ width: '100%', height: '100%' }}>
              <PerspectiveCamera makeDefault position={[0, 2.3, 4.2]} fov={50} />
              <ambientLight intensity={0.55} color="#1A080D" />
              <directionalLight position={[5, 10, 3]} intensity={1.4} castShadow />
              <pointLight position={[-4, 4, -2]} intensity={1.2} color="var(--warm-gold)" />
              <pointLight position={[3, -1, -3]} intensity={0.7} color="#9E162B" />
              <SteamParticles />
              <ProceduralBowl brothColor={cfg.brothColor} toppings={cfg.toppings} />
              {/* Lock rotation axis, let procedural model auto-spin */}
            </Canvas>
          )}
        </div>
      )}
    </div>
  );
}
