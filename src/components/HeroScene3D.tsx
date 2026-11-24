"use client";

import React, { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── Palette (warm parchment + deep forest green) ───────────────────────────
const PARCHMENT = new THREE.Color("#F3EFE6");
const FOREST = new THREE.Color("#163B2C");
const SAGE = new THREE.Color("#2B5441");
const TAN = new THREE.Color("#C8BFB0");
const CREAM = new THREE.Color("#F5F0E8");
const GOLD = new THREE.Color("#B8902A");

// ─── Floating Orb ────────────────────────────────────────────────────────────
interface OrbData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  baseScale: number;
  phase: number;
  colorA: THREE.Color;
  colorB: THREE.Color;
}

function FloatingOrbs({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);

  const orbs = useMemo<OrbData[]>(() => {
    const list: OrbData[] = [];
    const colors: [THREE.Color, THREE.Color][] = [
      [FOREST.clone(), SAGE.clone()],
      [TAN.clone(), CREAM.clone()],
      [SAGE.clone(), PARCHMENT.clone()],
      [GOLD.clone(), TAN.clone()],
      [CREAM.clone(), GOLD.clone()],
      [TAN.clone(), FOREST.clone()],
    ];
    for (let i = 0; i < 6; i++) {
      list.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6 - 2
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.003,
          0
        ),
        baseScale: 0.8 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
        colorA: colors[i][0],
        colorB: colors[i][1],
      });
    }
    return list;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const sp = scrollProgress.current;

    orbs.forEach((orb, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      // Drift
      orb.position.addScaledVector(orb.velocity, 1);
      if (Math.abs(orb.position.x) > 8) orb.velocity.x *= -1;
      if (Math.abs(orb.position.y) > 5) orb.velocity.y *= -1;

      mesh.position.copy(orb.position);

      // Breathe + scroll influence
      const breathe = 1 + 0.08 * Math.sin(t * 0.6 + orb.phase);
      const scrollPush = 1 + sp * 0.3;
      mesh.scale.setScalar(orb.baseScale * breathe * scrollPush);

      // Rotate slowly
      mesh.rotation.x = t * 0.07 + orb.phase;
      mesh.rotation.y = t * 0.11 + orb.phase * 0.5;

      // Color lerp with scroll
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.color.lerpColors(orb.colorA, orb.colorB, sp * 0.6 + 0.2);
      mat.opacity = 0.12 + 0.1 * Math.sin(t * 0.4 + orb.phase) + sp * 0.08;
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) meshRefs.current[i] = el; }}
          position={orb.position}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={orb.colorA}
            transparent
            opacity={0.15}
            roughness={0.3}
            metalness={0.1}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Particle Field ────────────────────────────────────────────────────────────
function ParticleField({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const COUNT = 400;
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    const palette = [FOREST, SAGE, TAN, CREAM, GOLD];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = 0.5 + Math.random() * 1.5;
    }
    return { positions, colors, sizes };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [positions, colors, sizes]);

  const originalPositions = useMemo(() => positions.slice(), [positions]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const sp = scrollProgress.current;
    const posAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;

    for (let i = 0; i < COUNT; i++) {
      const ox = originalPositions[i * 3 + 0];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];

      // Gentle wave + scroll ripple
      const wave = Math.sin(t * 0.3 + ox * 0.4 + oy * 0.3) * 0.25;
      const scrollRise = sp * 1.5;

      posAttr.setXYZ(i, ox + wave * 0.3, oy + wave + scrollRise * (Math.random() - 0.5) * 0.01, oz);
    }
    posAttr.needsUpdate = true;

    // Rotate the whole field gently
    pointsRef.current.rotation.z = t * 0.015;
    pointsRef.current.rotation.y = Math.sin(t * 0.1) * 0.08;
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─── Geometric Grid Lines (wireframe) ─────────────────────────────────────────
function GeometricLines({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  // Build THREE.Line objects directly (avoid JSX <line> which resolves to SVG)
  const lineObjects = useMemo(() => {
    const objs: THREE.Line[] = [];

    // Horizontal arcs
    for (let row = 0; row < 5; row++) {
      const pts: THREE.Vector3[] = [];
      const y = -4 + row * 2;
      for (let j = 0; j <= 40; j++) {
        const x = -10 + j * 0.5;
        const z = Math.sin(j * 0.3 + row) * 0.5;
        pts.push(new THREE.Vector3(x, y, z - 3));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: row % 2 === 0 ? FOREST : SAGE,
        transparent: true,
        opacity: 0.09,
        depthWrite: false,
      });
      objs.push(new THREE.Line(geo, mat));
    }

    // Vertical arcs
    for (let col = 0; col < 7; col++) {
      const pts: THREE.Vector3[] = [];
      const x = -9 + col * 3;
      for (let j = 0; j <= 30; j++) {
        const y = -5 + j * 0.33;
        const z = Math.cos(j * 0.25 + col) * 0.4;
        pts.push(new THREE.Vector3(x, y, z - 3));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: TAN,
        transparent: true,
        opacity: 0.09,
        depthWrite: false,
      });
      objs.push(new THREE.Line(geo, mat));
    }

    return objs;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const sp = scrollProgress.current;

    groupRef.current.rotation.z = Math.sin(t * 0.07) * 0.04 + sp * 0.12;
    groupRef.current.rotation.x = Math.cos(t * 0.05) * 0.03 - sp * 0.08;
    groupRef.current.position.z = -1 + sp * -1.5;

    // Fade lines on scroll
    groupRef.current.children.forEach((child, i) => {
      const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
      mat.opacity = (0.08 + 0.04 * Math.sin(t * 0.4 + i)) * (1 - sp * 0.5);
    });
  });

  return (
    <group ref={groupRef}>
      {lineObjects.map((lineObj, i) => (
        <primitive key={i} object={lineObj} />
      ))}
    </group>
  );
}

// ─── Floating Abstract Shapes ─────────────────────────────────────────────────
function AbstractShapes({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const shapeRefs = useRef<THREE.Mesh[]>([]);

  const shapes = useMemo(() => [
    {
      geo: new THREE.OctahedronGeometry(0.9, 0),
      pos: new THREE.Vector3(-5.5, 2.5, -1),
      color: FOREST.clone(),
      speed: 0.4,
      phase: 0,
    },
    {
      geo: new THREE.TetrahedronGeometry(0.7, 0),
      pos: new THREE.Vector3(5, -2, -0.5),
      color: SAGE.clone(),
      speed: 0.55,
      phase: 1.1,
    },
    {
      geo: new THREE.IcosahedronGeometry(0.6, 0),
      pos: new THREE.Vector3(-4, -3, -1.5),
      color: TAN.clone(),
      speed: 0.3,
      phase: 2.2,
    },
    {
      geo: new THREE.OctahedronGeometry(0.5, 1),
      pos: new THREE.Vector3(4.5, 3, -2),
      color: FOREST.clone(),
      speed: 0.6,
      phase: 0.7,
    },
  ], []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const sp = scrollProgress.current;

    shapes.forEach((shape, i) => {
      const mesh = shapeRefs.current[i];
      if (!mesh) return;

      mesh.rotation.x = t * shape.speed * 0.7 + shape.phase;
      mesh.rotation.y = t * shape.speed + shape.phase * 0.5;
      mesh.rotation.z = t * shape.speed * 0.5;

      // Float up/down
      mesh.position.set(
        shape.pos.x + Math.sin(t * 0.3 + shape.phase) * 0.3,
        shape.pos.y + Math.sin(t * 0.4 + shape.phase) * 0.4 + sp * -1.5,
        shape.pos.z
      );

      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.18 + 0.06 * Math.sin(t * 0.5 + shape.phase);
      mat.wireframe = sp > 0.5;
    });
  });

  return (
    <group>
      {shapes.map((shape, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) shapeRefs.current[i] = el; }}
          geometry={shape.geo}
          position={shape.pos}
        >
          <meshStandardMaterial
            color={shape.color}
            transparent
            opacity={0.18}
            roughness={0.5}
            metalness={0.2}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Mouse-reactive Camera Rig ─────────────────────────────────────────────────
function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x += (mouse.current.x * 1.2 - camera.position.x) * 0.03;
    camera.position.y += (-mouse.current.y * 0.7 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Main Scene ───────────────────────────────────────────────────────────────
interface HeroScene3DProps {
  scrollProgress: React.MutableRefObject<number>;
}

export const HeroScene3D: React.FC<HeroScene3DProps> = ({ scrollProgress }) => {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} color={CREAM} />
        <directionalLight
          position={[8, 10, 5]}
          intensity={1.2}
          color={CREAM}
        />
        <pointLight position={[-6, -4, 2]} intensity={0.5} color={SAGE} />
        <pointLight position={[6, 4, 1]} intensity={0.4} color={TAN} />

        {/* Scene elements */}
        <GeometricLines scrollProgress={scrollProgress} />
        <ParticleField scrollProgress={scrollProgress} />
        <FloatingOrbs scrollProgress={scrollProgress} />
        <AbstractShapes scrollProgress={scrollProgress} />

        {/* Mouse-reactive camera */}
        <CameraRig mouse={mouse} />
      </Canvas>
    </div>
  );
};
