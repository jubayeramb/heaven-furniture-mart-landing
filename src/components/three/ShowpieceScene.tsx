"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Box3, MathUtils, Vector3, type Group, type Object3D, type PerspectiveCamera } from "three";

const DRACO_PATH = "/draco/";
const SOFA_URL = "/models/Sofa_01.glb";
const CHAIR_URL = "/models/ArmChair_01.glb";
/** Resting yaw so the set faces the camera three-quarter on. */
const BASE_YAW = -Math.PI / 7;
const CHAIR_TOE_IN = Math.PI / 7;

export type SceneProps = {
  /** 0 → 1 scroll progress of the showpiece section. Read every frame, never re-rendered. */
  progress: RefObject<number>;
  /** Set by the scene so the stage can request a frame when progress changes. */
  invalidateRef: RefObject<(() => void) | null>;
  /** When true the set rests at a fixed angle instead of following scroll. */
  reducedMotion: boolean;
};

type Bounds = { radius: number; height: number };

/** Rest a model on y = 0 and centre it on x/z; returns its size. */
function ground(object: Object3D) {
  const box = new Box3().setFromObject(object);
  const size = box.getSize(new Vector3());
  const center = box.getCenter(new Vector3());
  object.position.set(-center.x, -box.min.y, -center.z);
  return size;
}

function LivingSet({
  progress,
  reducedMotion,
  onBounds,
}: Pick<SceneProps, "progress" | "reducedMotion"> & { onBounds: (b: Bounds) => void }) {
  const group = useRef<Group>(null);
  const sofa = useGLTF(SOFA_URL, DRACO_PATH);
  const chair = useGLTF(CHAIR_URL, DRACO_PATH);
  const leftChair = useMemo(() => chair.scene.clone(true), [chair.scene]);
  const rightChair = useMemo(() => chair.scene.clone(true), [chair.scene]);
  const aspect = useThree((s) => s.viewport.aspect);
  const invalidate = useThree((s) => s.invalidate);
  const compact = aspect < 0.9;
  const current = useRef(reducedMotion ? 0.12 : 0);

  const leftPivot = useRef<Group>(null);
  const rightPivot = useRef<Group>(null);

  useLayoutEffect(() => {
    const sofaSize = ground(sofa.scene);
    const chairSize = ground(leftChair);
    ground(rightChair);
    const gap = 0.22;
    const x = sofaSize.x / 2 + chairSize.x / 2 + gap;
    const z = 0.42;
    leftPivot.current?.position.set(-x, 0, z);
    rightPivot.current?.position.set(x, 0, z);
    leftPivot.current?.rotation.set(0, CHAIR_TOE_IN, 0);
    rightPivot.current?.rotation.set(0, -CHAIR_TOE_IN, 0);

    // Footprint radius so the whole set stays in frame at every angle.
    const halfW = compact ? sofaSize.x / 2 : x + chairSize.x / 2;
    const halfD = compact ? sofaSize.z / 2 : Math.max(sofaSize.z / 2, z + chairSize.z / 2);
    onBounds({ radius: Math.hypot(halfW, halfD), height: Math.max(sofaSize.y, chairSize.y) });
    invalidate();
  }, [sofa.scene, leftChair, rightChair, compact, onBounds, invalidate]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const target = reducedMotion ? 0.12 : progress.current;
    const next = reducedMotion ? target : MathUtils.damp(current.current, target, 5.5, Math.min(delta, 0.05));
    current.current = next;
    const entrance = MathUtils.smootherstep(next, 0, 0.1);
    g.rotation.y = BASE_YAW + next * Math.PI * 2;
    g.position.y = -0.25 * (1 - entrance);
    g.scale.setScalar(0.92 + entrance * 0.08);
    if (!reducedMotion && Math.abs(target - next) > 0.0004) invalidate();
  });

  return (
    <group ref={group}>
      <primitive object={sofa.scene} />
      <group ref={leftPivot} visible={!compact}>
        <primitive object={leftChair} />
      </group>
      <group ref={rightPivot} visible={!compact}>
        <primitive object={rightChair} />
      </group>
    </group>
  );
}

/** Fits the camera to the set for the current aspect ratio. */
function Framer({ bounds }: { bounds: Bounds | null }) {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const aspect = useThree((s) => s.viewport.aspect);
  const invalidate = useThree((s) => s.invalidate);
  useLayoutEffect(() => {
    if (!bounds) return;
    const fov = MathUtils.degToRad(camera.fov);
    const tan = Math.tan(fov / 2);
    const halfH = (bounds.height / 2) * 2.0;
    const halfW = bounds.radius * 1.18;
    const dist = Math.max(halfH / tan, halfW / (tan * aspect));
    const elevation = MathUtils.degToRad(13);
    const targetY = bounds.height * 0.44;
    camera.position.set(0, targetY + dist * Math.sin(elevation), dist * Math.cos(elevation));
    camera.lookAt(0, targetY, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [bounds, aspect, camera, invalidate]);
  return null;
}

function ScrollBridge({ invalidateRef }: Pick<SceneProps, "invalidateRef">) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidateRef.current = invalidate;
    return () => {
      invalidateRef.current = null;
    };
  }, [invalidate, invalidateRef]);
  return null;
}

export default function ShowpieceScene({ progress, invalidateRef, reducedMotion }: SceneProps) {
  const [bounds, setBounds] = useState<Bounds | null>(null);
  return (
    <Canvas
      dpr={[1, 1.6]}
      frameloop="demand"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 26, near: 0.1, far: 60, position: [0, 1, 7] }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.28;
      }}
      aria-hidden
    >
      <Framer bounds={bounds} />
      <ScrollBridge invalidateRef={invalidateRef} />
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 7, 6]} angle={0.55} penumbra={1} intensity={80} color="#ffefd6" />
      <spotLight position={[-6, 4, -3]} angle={0.6} penumbra={1} intensity={24} color="#dfe9ff" />
      <Environment resolution={256} frames={1} environmentIntensity={1.3}>
        <Lightformer intensity={2.4} rotation-x={Math.PI / 2} position={[0, 6, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-7, 2, -1]} scale={[8, 3, 1]} color="#ffe9cf" />
        <Lightformer intensity={1.3} rotation-y={-Math.PI / 2} position={[7, 1.5, 1]} scale={[8, 3, 1]} color="#dbe9ff" />
        <Lightformer intensity={1.4} position={[0, 2, 8]} scale={[10, 3, 1]} color="#fff6ea" />
        <Lightformer intensity={1} rotation-y={Math.PI} position={[0, 2, -8]} scale={[12, 4, 1]} />
      </Environment>
      <Suspense fallback={null}>
        <LivingSet progress={progress} reducedMotion={reducedMotion} onBounds={setBounds} />
      </Suspense>
      <ContactShadows position={[0, -0.005, 0]} opacity={0.6} scale={12} blur={2.4} far={3} resolution={512} color="#04100f" />
    </Canvas>
  );
}

useGLTF.preload(SOFA_URL, DRACO_PATH);
useGLTF.preload(CHAIR_URL, DRACO_PATH);
