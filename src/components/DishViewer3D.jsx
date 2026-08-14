import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { RotateCw, Maximize2 } from 'lucide-react';

/* ── Procedural 3D Bowl ─────────────────────────────────── */
function Bowl3D({ brothColor = '#C4A276', toppings = [] }) {
  return (
    <group position={[0, -0.3, 0]}>
      {/* Outer bowl body */}
      <mesh castShadow>
        <cylinderGeometry args={[1.55, 0.85, 0.75, 40]} />
        <meshStandardMaterial color="#1a1010" roughness={0.1} metalness={0.15} />
      </mesh>
      {/* Gold rim */}
      <mesh position={[0, 0.38, 0]}>
        <torusGeometry args={[1.55, 0.045, 16, 60]} />
        <meshStandardMaterial color="#C5A059" roughness={0.15} metalness={0.85} />
      </mesh>
      {/* Broth surface */}
      <mesh position={[0, 0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.48, 40]} />
        <meshStandardMaterial color={brothColor} roughness={0.06} metalness={0.05} />
      </mesh>
      {/* Noodles hint */}
      {[...Array(6)].map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.5, 0.35, Math.sin(a) * 0.5]} rotation={[0, a, 0]}>
            <torusGeometry args={[0.3 + i * 0.04, 0.018, 6, 20]} />
            <meshStandardMaterial color="#e8d5a3" roughness={0.6} />
          </mesh>
        );
      })}
      {/* Egg */}
      {(toppings.includes('egg-half') || toppings.includes('egg')) && (
        <group position={[0.5, 0.35, 0.3]} rotation={[0.3, -0.5, 0.2]}>
          <mesh castShadow>
            <sphereGeometry args={[0.34, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#FAFAF6" roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="#FF9F1C" roughness={0.18} metalness={0.1} />
          </mesh>
        </group>
      )}
      {/* Chashu */}
      {toppings.includes('chashu') && (
        <mesh position={[-0.5, 0.37, -0.1]} rotation={[0.1, 0.7, -0.15]} castShadow>
          <boxGeometry args={[0.6, 0.07, 0.65]} />
          <meshStandardMaterial color="#7a2222" roughness={0.55} />
        </mesh>
      )}
      {/* Kimchi */}
      {toppings.includes('kimchi') && (
        <mesh position={[-0.25, 0.37, 0.4]} rotation={[0.2, -0.5, 0.1]} castShadow>
          <boxGeometry args={[0.4, 0.08, 0.35]} />
          <meshStandardMaterial color="#a11010" roughness={0.75} />
        </mesh>
      )}
      {/* Green onions */}
      {toppings.includes('scallions') && (
        <>
          {[0, 1, 2, 3, 4].map(i => {
            const a = (i / 5) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(a) * 0.75, 0.34, Math.sin(a) * 0.75]} castShadow>
                <cylinderGeometry args={[0.025, 0.025, 0.25, 6]} />
                <meshStandardMaterial color="#2e7d32" roughness={0.5} />
              </mesh>
            );
          })}
        </>
      )}
      {/* Tofu */}
      {toppings.includes('tofu') && (
        <>
          {[[-0.4, 0.38, 0.15], [-0.2, 0.38, -0.3]].map(([x, y, z], i) => (
            <mesh key={i} position={[x, y, z]} castShadow>
              <boxGeometry args={[0.22, 0.22, 0.22]} />
              <meshStandardMaterial color="#f5f0e0" roughness={0.7} />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

/* ── Main Viewer ─────────────────────────────────────────── */
export default function DishViewer3D({ dish }) {
  const [mode, setMode] = useState('360'); // '360' | '3d'
  const [frame, setFrame] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startFrame = useRef(0);

  const cfg = dish.threeConfig || { brothColor: '#C4A276', toppings: [] };

  /* ── drag handlers ── */
  const onDragStart = (clientX) => { setDragging(true); startX.current = clientX; startFrame.current = frame; };
  const onDragMove = (clientX) => {
    if (!dragging) return;
    const delta = Math.floor((startX.current - clientX) / 10);
    let next = (startFrame.current + delta) % 24;
    if (next < 0) next += 24;
    setFrame(next);
  };
  const onDragEnd = () => setDragging(false);

  useEffect(() => {
    const up = () => onDragEnd();
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
    return () => { window.removeEventListener('mouseup', up); window.removeEventListener('touchend', up); };
  });

  return (
    <div style={{
      width: '100%', height: 320, position: 'relative',
      background: 'radial-gradient(ellipse at center, rgba(74,14,23,0.25) 0%, rgba(11,8,8,0.6) 70%)',
      borderRadius: 24, overflow: 'hidden',
      border: '1px solid rgba(128,0,32,0.2)',
    }}>
      {/* Mode switcher */}
      <div style={{
        position: 'absolute', top: 14, right: 14, zIndex: 20,
        display: 'flex', gap: 4,
        background: 'rgba(11,8,8,0.9)',
        border: '1px solid rgba(128,0,32,0.35)',
        borderRadius: 12, padding: 4,
        backdropFilter: 'blur(8px)',
      }}>
        {['360', '3d'].map(m => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding: '6px 14px', borderRadius: 9,
            background: mode === m ? 'linear-gradient(135deg, #800020, #C51C24)' : 'transparent',
            border: 'none', cursor: 'pointer',
            color: mode === m ? 'var(--cream)' : 'rgba(250,249,246,0.5)',
            fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
            transition: 'all 0.3s',
          }}>
            {m === '360' ? '360°' : 'REAL 3D'}
          </button>
        ))}
      </div>

      {/* Hint */}
      <div style={{
        position: 'absolute', top: 14, left: 14, zIndex: 20,
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 12px', borderRadius: 999,
        background: 'rgba(11,8,8,0.8)',
        border: '1px solid rgba(128,0,32,0.3)',
        fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
        color: 'rgba(250,249,246,0.6)', textTransform: 'uppercase',
      }}>
        <RotateCw size={11} color="#D4AF37" style={{ animation: 'spin 4s linear infinite' }} />
        {mode === '360' ? 'Drag to Rotate' : 'Drag & Zoom'}
      </div>

      {/* Angle counter (360 mode) */}
      {mode === '360' && (
        <div style={{
          position: 'absolute', bottom: 14, right: 14, zIndex: 20,
          padding: '5px 12px', borderRadius: 8,
          background: 'rgba(11,8,8,0.75)', backdropFilter: 'blur(6px)',
          fontSize: 10, fontFamily: 'monospace', color: 'rgba(250,249,246,0.5)',
          border: '1px solid rgba(128,0,32,0.2)',
        }}>
          {(frame * 15).toString().padStart(3, '0')}°
        </div>
      )}

      {/* Viewer */}
      {mode === '3d' ? (
        <Canvas shadows style={{ width: '100%', height: '100%' }}>
          <PerspectiveCamera makeDefault position={[0, 2.5, 4.5]} fov={52} />
          <ambientLight intensity={0.45} />
          <directionalLight position={[6, 10, 5]} intensity={1.3} castShadow />
          <pointLight position={[-5, 3, -4]} intensity={0.9} color="#D4AF37" />
          <pointLight position={[5, -2, -4]} intensity={0.5} color="#800020" />
          <Bowl3D brothColor={cfg.brothColor} toppings={cfg.toppings} />
          <OrbitControls enableZoom minDistance={2.5} maxDistance={6} maxPolarAngle={Math.PI / 2.1} dampingFactor={0.06} enableDamping />
        </Canvas>
      ) : (
        /* 360 photo rotation */
        <div
          style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none' }}
          onMouseDown={e => onDragStart(e.clientX)}
          onMouseMove={e => onDragMove(e.clientX)}
          onTouchStart={e => onDragStart(e.touches[0].clientX)}
          onTouchMove={e => onDragMove(e.touches[0].clientX)}
        >
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', width: 250, height: 250, borderRadius: '50%',
            background: `radial-gradient(circle, ${cfg.brothColor}30 0%, transparent 70%)`,
            filter: 'blur(30px)', pointerEvents: 'none',
          }} />

          {/* Rotating dish image */}
          <div style={{
            width: 'clamp(220px, 50%, 280px)',
            height: 'clamp(220px, 50%, 280px)',
            position: 'relative',
            transform: `rotate(${frame * 15}deg)`,
            transition: dragging ? 'none' : 'transform 0.2s ease-out',
          }}>
            <img
              src={dish.image}
              alt={dish.name}
              draggable={false}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                borderRadius: '50%',
                border: '2px solid rgba(128,0,32,0.25)',
                boxShadow: '0 12px 50px rgba(0,0,0,0.6)',
              }}
            />
            {/* glare */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
              transform: `rotate(${-frame * 15}deg)`,
              pointerEvents: 'none',
            }} />
          </div>
        </div>
      )}
    </div>
  );
}
