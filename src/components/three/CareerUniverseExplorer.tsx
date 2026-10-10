import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  ArrowUpRight,
  Focus,
  Hand,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import type { Job } from "@/types";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { careerSectors, stationPosition } from "@/utils/careerUniverse";

type Quality = "high" | "balanced" | "low";
type CameraCommand = {
  action: "overview" | "focus" | "in" | "out";
  sequence: number;
};
type SceneProps = {
  jobs: Job[];
  selected: Job;
  quality: Quality;
  paused: boolean;
  command: CameraCommand;
  onSelect: (job: Job) => void;
  onFailure: () => void;
  touchCamera: boolean;
};

class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function Box({
  position,
  scale,
  color = "#aabfc5",
  glow = false,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color?: string;
  glow?: boolean;
}) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <boxGeometry />
      <meshStandardMaterial
        color={color}
        emissive={glow ? color : "#000000"}
        emissiveIntensity={glow ? 0.55 : 0}
        roughness={0.38}
        metalness={0.22}
      />
    </mesh>
  );
}

function Label({
  text,
  color,
  position,
  size = 2.4,
}: {
  text: string;
  color: string;
  position: [number, number, number];
  size?: number;
}) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 768;
    canvas.height = 128;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#f5faf7";
    context.fillRect(0, 0, 768, 128);
    context.fillStyle = color;
    context.fillRect(0, 0, 8, 128);
    context.fillStyle = "#183b35";
    context.font = "600 46px Arial";
    context.fillText(text, 28, 78, 712);
    const map = new THREE.CanvasTexture(canvas);
    map.colorSpace = THREE.SRGBColorSpace;
    return map;
  }, [text, color]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <sprite position={position} scale={[size, size / 6, 1]}>
      <spriteMaterial map={texture} depthTest={false} />
    </sprite>
  );
}

function Station({
  job,
  selected,
  quality,
  onSelect,
}: {
  job: Job;
  selected: boolean;
  quality: Quality;
  onSelect: (job: Job) => void;
}) {
  const { gl } = useThree();
  const sector = careerSectors[job.category];
  const height = 0.7 + job.heat / 85;
  const body =
    job.category === "ai"
      ? "lab"
      : job.category === "web3"
        ? "vault"
        : job.category === "frontend"
          ? "gallery"
          : "server";
  const color = sector.color;
  return (
    <group
      position={stationPosition(job)}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(job);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        gl.domElement.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        gl.domElement.style.cursor = "";
      }}
    >
      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.15, 1.25, 0.4, 6]} />
        <meshStandardMaterial
          color={selected ? "#c1ddd0" : "#a0b5bd"}
          metalness={0.25}
          roughness={0.4}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[1.06, 1.1, 48]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {body === "lab" && (
        <>
          <Box position={[0, height / 2, 0]} scale={[1.12, height, 0.75]} />
          {[-0.35, 0, 0.35].map((x) => (
            <Box
              key={x}
              position={[x, height / 2, 0.39]}
              scale={[0.14, height * 0.75, 0.04]}
              color={color}
              glow
            />
          ))}
          <Box
            position={[0, height + 0.1, 0]}
            scale={[1.5, 0.15, 1]}
              color="#e5eff0"
          />
          <mesh position={[0, height + 0.38, 0]}>
            <icosahedronGeometry args={[0.25, 0]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.4}
              wireframe
            />
          </mesh>
        </>
      )}
      {body === "vault" && (
        <>
          <mesh position={[0, 0.8, 0]} rotation={[0, Math.PI / 4, 0]}>
            <octahedronGeometry args={[0.84, 0]} />
            <meshStandardMaterial
              color={color}
              metalness={0.25}
              roughness={0.2}
              emissive={color}
              emissiveIntensity={0.14}
            />
          </mesh>
          {[-1, 1].map((sign) => (
            <Box
              key={sign}
              position={[sign * 0.72, 0.7, 0]}
              scale={[0.18, 1.4, 0.28]}
              color="#a7b8c2"
            />
          ))}
          <Box
            position={[0, 1.5, 0]}
            scale={[1.8, 0.12, 0.35]}
            color={color}
            glow
          />
        </>
      )}
      {body === "gallery" && (
        <>
          <Box position={[0, 0.15, 0]} scale={[1.65, 0.3, 1.05]} />
          <Box position={[0, 0.7, 0]} scale={[0.18, 1, 0.18]} color="#a5b8c0" />
          <Box
            position={[0, 1.25, 0]}
            scale={[1.65, 0.85, 0.12]}
            color="#dce6e5"
          />
          <Box
            position={[0, 1.25, 0.07]}
            scale={[1.48, 0.68, 0.025]}
            color={color}
            glow
          />
          <Box
            position={[0.45, 1.25, 0.1]}
            scale={[0.08, 0.4, 0.025]}
            color="#edf8ff"
          />
          <Box
            position={[-0.38, 1.25, 0.1]}
            scale={[0.55, 0.06, 0.025]}
            color="#edf8ff"
          />
        </>
      )}
      {body === "server" && (
        <>
          {[-0.45, 0.1, 0.58].map((x, index) => (
            <group key={x}>
              <Box
                position={[x, height / 2, 0]}
                scale={[0.4, height - index * 0.17, 0.62]}
                color="#d2e1e5"
              />
              {[0.35, 0.7, 1.05, 1.4].map((y) => (
                <Box
                  key={y}
                  position={[x, Math.min(y, height - 0.12), 0.32]}
                  scale={[0.24, 0.035, 0.025]}
                  color={color}
                  glow
                />
              ))}
            </group>
          ))}
        </>
      )}
      {quality !== "low" &&
        [-0.65, 0.65].map((x) => (
          <Box
            key={x}
            position={[x, 0.055, -0.7]}
            scale={[0.35, 0.025, 0.28]}
            color={color}
            glow
          />
        ))}
      {selected && (
        <>
          <mesh position={[0, -0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.28, 1.4, 48]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <Label
            text={job.title}
            color={color}
            position={[0, 2.55, 0]}
            size={4.8}
          />
        </>
      )}
    </group>
  );
}

function Shuttle({ index, paused }: { index: number; paused: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const elapsed = useRef(index * 10);
  useFrame((_, delta) => {
    if (!ref.current || paused) return;
    elapsed.current += Math.min(delta, 0.05);
    const t = elapsed.current * 0.11;
    ref.current.position.set(
      Math.sin(t) * (index % 2 ? 10 : 7),
      2.5 + index * 0.3,
      Math.cos(t) * (index % 2 ? 7 : 10),
    );
    ref.current.rotation.y = Math.atan2(
      Math.cos(t) * (index % 2 ? 10 : 7),
      -Math.sin(t) * (index % 2 ? 7 : 10),
    );
  });
  return (
    <group ref={ref} position={[index * 2, 2.5, 7]} scale={0.55}>
      <Box position={[0, 0, 0]} scale={[0.5, 0.28, 1.25]} color="#e5edf0" />
      <Box
        position={[0, 0.15, 0.15]}
        scale={[0.36, 0.16, 0.52]}
        color="#29bcc3"
        glow
      />
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.74]}>
        <coneGeometry args={[0.29, 0.55, 4]} />
        <meshStandardMaterial color="#adc4ca" />
      </mesh>
      <Box
        position={[0, -0.035, -0.24]}
        scale={[1.3, 0.09, 0.48]}
        color="#819ba8"
      />
      {[-0.22, 0.22].map((x) => (
        <mesh key={x} position={[x, 0, -0.82]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.08, 0.45, 8]} />
          <meshBasicMaterial color="#71f4df" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Habitat({ paused, quality }: { paused: boolean; quality: Quality }) {
  const rotor = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (rotor.current && !paused)
      rotor.current.rotation.y += Math.min(delta, 0.05) * 0.13;
  });
  const stars = useMemo(() => {
    const array = new Float32Array(quality === "low" ? 300 : 1800);
    for (let i = 0; i < array.length / 3; i++) {
      const a = i * 2.399963;
      const r = 28 + (i % 13) * 1.1;
      array.set([Math.cos(a) * r, 5 + (i % 19) * 1.3, Math.sin(a) * r], i * 3);
    }
    return array;
  }, [quality]);
  return (
    <>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={stars.length / 3}
            array={stars}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#c0dce1" size={0.09} sizeAttenuation />
      </points>
      <mesh position={[20, -6, -36]}>
        <sphereGeometry args={[4.4, 32, 24]} />
        <meshStandardMaterial color="#82a5b0" roughness={1} />
      </mesh>
      <mesh position={[20, -6, -36]} rotation={[0.4, 0.1, 0.15]}>
        <torusGeometry args={[6, 0.045, 8, 120]} />
        <meshBasicMaterial color="#8babb0" />
      </mesh>
      <mesh position={[0, -0.9, 0]} receiveShadow>
        <cylinderGeometry args={[13.8, 12.6, 0.65, 12]} />
        <meshStandardMaterial
          color="#456671"
          roughness={0.64}
          metalness={0.16}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <ringGeometry args={[13.2, 13.35, 120]} />
        <meshBasicMaterial color="#829c98" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.56, 0]}>
        <ringGeometry args={[3.3, 3.45, 64]} />
        <meshBasicMaterial color="#64e8ce" />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.7, 1.35, 2.1, 8]} />
        <meshStandardMaterial color="#dce8eb" metalness={0.3} roughness={0.3} />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[1.8, 1.2, 1, 8]} />
        <meshStandardMaterial color="#eef5f3" metalness={0.3} roughness={0.3} />
      </mesh>
      <mesh position={[0, 2.65, 0]}>
        <cylinderGeometry args={[1.65, 1.65, 0.08, 8]} />
        <meshBasicMaterial color="#94f4e2" />
      </mesh>
      <group ref={rotor} position={[0, 4.1, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2, 0.12, 10, 64]} />
          <meshStandardMaterial
            color="#b2c9cc"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle) => (
          <group key={angle} rotation={[0, angle, 0]}>
            <Box position={[1.35, 0, 0]} scale={[1.3, 0.12, 0.17]} />
            <Box
              position={[2.1, 0, 0]}
              scale={[0.38, 0.2, 0.7]}
              color="#66cabd"
              glow
            />
          </group>
        ))}
      </group>
      {Object.entries(careerSectors).map(([key, sector]) => (
        <group key={key}>
          <group
            rotation={[0, Math.atan2(sector.center[0], sector.center[2]), 0]}
          >
            <Box
              position={[
                0,
                -0.46,
                Math.hypot(sector.center[0], sector.center[2]) / 2,
              ]}
              scale={[0.85, 0.1, 8.4]}
              color="#40535a"
            />
          </group>
          <mesh position={[sector.center[0], -0.45, sector.center[2]]} receiveShadow>
            <cylinderGeometry args={[4.8, 4.8, 0.2, 8]} />
            <meshStandardMaterial
              color="#6d8993"
              metalness={0.2}
              roughness={0.5}
            />
          </mesh>
          <mesh position={[sector.center[0], -0.33, sector.center[2]]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[4.55, 4.7, 64]} /><meshBasicMaterial color={sector.color} /></mesh>
        </group>
      ))}
      {quality !== "low" &&
        Array.from({ length: 24 }, (_, i) => (
          <group key={i} rotation={[0, (i * Math.PI) / 12, 0]}>
            <Box
              position={[13, -0.1, 0]}
              scale={[0.35, 0.9, 0.4]}
              color="#71848d"
            />
            <Box
              position={[13, 0.38, 0]}
              scale={[0.25, 0.06, 0.3]}
              color="#f4cb7a"
              glow
            />
          </group>
        ))}
      {Array.from(
        { length: quality === "high" ? 5 : quality === "balanced" ? 3 : 1 },
        (_, i) => (
          <Shuttle key={i} index={i} paused={paused} />
        ),
      )}
    </>
  );
}

function CameraRig({
  command,
  selected,
  paused,
  touchCamera,
}: Pick<SceneProps, "command" | "selected" | "paused" | "touchCamera">) {
  const controls = useRef<any>(null);
  const { camera, invalidate, size } = useThree();
  const destination = useRef<THREE.Vector3 | null>(null);
  const target = useRef(new THREE.Vector3());
  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    if (command.action === "in" || command.action === "out") {
      destination.current = camera.position
        .clone()
        .sub(c.target)
        .multiplyScalar(command.action === "in" ? 0.8 : 1.25)
        .add(c.target);
      target.current.copy(c.target);
    } else {
      const focus = command.action === "focus";
      target.current.set(
        ...(focus
          ? stationPosition(selected)
          : ([0, 0.65, 0] as [number, number, number])),
      );
      destination.current = focus
        ? target.current.clone().add(new THREE.Vector3(5, 5, 7))
        : new THREE.Vector3(size.width < 600 ? -16.5 : -14.5, size.width < 600 ? 19 : 17, size.width < 600 ? 27 : 18);
    }
    if (paused) {
      camera.position.copy(destination.current);
      c.target.copy(target.current);
      c.update();
      destination.current = null;
    }
    invalidate();
  }, [command, selected.id, paused, camera, invalidate, size.width]);
  useFrame((_, delta) => {
    if (!destination.current || !controls.current) return;
    const factor = 1 - Math.exp(-Math.min(delta, 0.05) * 5);
    camera.position.lerp(destination.current, factor);
    controls.current.target.lerp(target.current, factor);
    controls.current.update();
    if (camera.position.distanceTo(destination.current) < 0.03)
      destination.current = null;
  });
  return (
    <OrbitControls
      ref={controls}
      enabled={touchCamera}
      enablePan
      enableDamping={!paused}
      dampingFactor={0.1}
      minDistance={4}
      maxDistance={48}
      maxPolarAngle={Math.PI / 2.05}
      autoRotate={!paused && command.action === "overview"}
      autoRotateSpeed={0.2}
      onStart={() => {
        destination.current = null;
      }}
    />
  );
}

function UniverseScene({
  jobs,
  selected,
  quality,
  paused,
  command,
  onSelect,
  onFailure,
  touchCamera,
}: SceneProps) {
  const { gl } = useThree();
  useEffect(() => {
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  return (
    <>
      <color attach="background" args={["#78979d"]} />
      <fog attach="fog" args={["#78979d", 42, 95]} />
      <ambientLight intensity={0.85} />
      <hemisphereLight args={["#f4fbff", "#46666f", 1.55]} />
      <directionalLight
        position={[-8, 20, 12]}
        intensity={3.1}
        color="#f6eee0"
        castShadow={quality !== 'low'}
        shadow-mapSize={[quality === 'high' ? 2048 : 1024, quality === 'high' ? 2048 : 1024]}
        shadow-camera-left={-18} shadow-camera-right={18} shadow-camera-top={18} shadow-camera-bottom={-18}
        shadow-normalBias={0.045}
      />
      <pointLight
        position={[0, 5, 0]}
        intensity={14}
        distance={16}
        color="#67e6d3"
      />
      <Habitat paused={paused} quality={quality} />
      {jobs.map((job) => (
        <Station
          key={job.id}
          job={job}
          selected={job.id === selected.id}
          quality={quality}
          onSelect={onSelect}
        />
      ))}
      <CameraRig selected={selected} command={command} paused={paused} touchCamera={touchCamera} />
    </>
  );
}

export function CareerUniverseExplorer({
  jobs,
  selectedId,
  onSelect,
}: {
  jobs: Job[];
  selectedId: string;
  onSelect: (job: Job) => void;
}) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const narrow = useMediaQuery("(max-width: 600px)");
  const [quality, setQuality] = useState<Quality>(narrow ? "low" : "balanced");
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const [command, setCommand] = useState<CameraCommand>({
    action: "overview",
    sequence: 0,
  });
  const [expanded, setExpanded] = useState(false);
  const [touchCamera, setTouchCamera] = useState(false);
  const [visible, setVisible] = useState(true);
  const container = useRef<HTMLDivElement>(null);
  const selected = jobs.find((job) => job.id === selectedId) || jobs[0];
  const previousId = useRef(selected?.id);
  const issue = (action: CameraCommand["action"]) =>
    setCommand((previous) => ({ action, sequence: previous.sequence + 1 }));
  const choose = (job: Job) => {
    onSelect(job);
    issue("focus");
  };
  useEffect(() => {
    if (previousId.current !== selected?.id) {
      previousId.current = selected?.id;
      issue("focus");
    }
  }, [selected?.id]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (container.current) observer.observe(container.current);
    const hidden = () =>
      setVisible(
        document.visibilityState === "visible" &&
          Boolean(
            container.current &&
            container.current.getBoundingClientRect().bottom > 0 &&
            container.current.getBoundingClientRect().top < window.innerHeight,
          ),
      );
    document.addEventListener("visibilitychange", hidden);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", hidden);
    };
  }, []);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    try {
      const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!context) setFailed(true);
      (context as WebGLRenderingContext | null)
        ?.getExtension("WEBGL_lose_context")
        ?.loseContext();
    } catch {
      setFailed(true);
    }
  }, []);
  useEffect(() => {
    if (!expanded) return;
    const previous = document.activeElement as HTMLElement | null;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
      if (event.key === "Tab") {
        const items = container.current?.querySelectorAll<HTMLElement>(
          "button:not(:disabled), a, select",
        );
        if (!items?.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    container.current
      ?.querySelector<HTMLElement>("button:not(:disabled)")
      ?.focus();
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", close);
      previous?.focus();
    };
  }, [expanded]);
  if (!selected) return null;
  const stopped = paused || reducedMotion || !visible;
  const fallback = (
    <div className="universe-fallback" role="status">
      <Focus size={32} />
      <h3>当前设备无法启用 3D</h3>
      <p>{jobs.length} 个匹配岗位仍可继续浏览。</p>
      <button
        onClick={() => {
          setFailed(false);
          setQuality("low");
          setRetry((count) => count + 1);
        }}
      >
        重试 3D
      </button>
    </div>
  );
  return (
    <div
      ref={container}
      className={`career-universe ${expanded ? "is-expanded" : ""} ${narrow && !touchCamera && !expanded ? "touch-scroll" : ""}`}
      role={expanded ? "dialog" : undefined}
      aria-modal={expanded || undefined}
      aria-label="Career orbital station"
    >
      <div className="universe-toolbar">
        <div>
          <h3>职业观测台 <span> / 轨道空间站</span></h3>
        </div>
        <div className="universe-tools">
          <label>
            画质{" "}
            <select
              aria-label="Scene quality"
              value={quality}
              onChange={(event) => setQuality(event.target.value as Quality)}
            >
              <option value="high">精细</option>
              <option value="balanced">标准</option>
              <option value="low">流畅</option>
            </select>
          </label>
          <button
            title={stopped ? "继续运动" : "暂停运动"}
            aria-label={stopped ? "Resume motion" : "Pause motion"}
            disabled={reducedMotion}
            aria-pressed={stopped}
            onClick={() => setPaused(!paused)}
          >
            {stopped ? <Play size={17} /> : <Pause size={17} />}
          </button>
          <button
            title="全景复位"
            aria-label="Reset camera"
            onClick={() => issue("overview")}
          >
            <RotateCcw size={17} />
          </button>
          <button
            title={expanded ? "退出全屏" : "展开场景"}
            aria-label={expanded ? "Close expanded view" : "Expand scene"}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>
        </div>
      </div>
      <div className="universe-content">
        <div className="universe-scene" data-selected={selected.id}>
          {failed ? (
            fallback
          ) : (
            <SceneBoundary key={retry} fallback={fallback}>
              <Suspense
                fallback={
                  <div className="career-universe-loading">
                    正在载入职业空间站…
                  </div>
                }
              >
                <Canvas
                  key={quality === "low" ? "low" : "standard"}
                  aria-label="3D career stations"
                  shadows={quality !== 'low'}
                  camera={{ position: [narrow ? -16.5 : -14.5, narrow ? 19 : 17, narrow ? 27 : 18], fov: 45 }}
                  frameloop={stopped ? "demand" : "always"}
                  dpr={
                    quality === "high"
                      ? [1, 1.75]
                      : quality === "balanced"
                        ? [1, 1.25]
                        : [0.8, 1]
                  }
                  gl={{
                    antialias: quality !== "low",
                    powerPreference:
                      quality === "high" ? "high-performance" : "low-power",
                  }}
                  style={{ touchAction: narrow && !touchCamera && !expanded ? "pan-y" : "none" }}
                >
                  <UniverseScene
                    jobs={jobs}
                    selected={selected}
                    quality={quality}
                    paused={stopped}
                    command={command}
                    onSelect={choose}
                    onFailure={() => setFailed(true)}
                    touchCamera={!narrow || touchCamera || expanded}
                  />
                </Canvas>
              </Suspense>
            </SceneBoundary>
          )}
          <div className="universe-coordinate" aria-hidden="true"><span>职业轨道 / {jobs.length} 个岗位</span></div>
          <div className="universe-legend" aria-label="职业分区">{Object.entries(careerSectors).map(([key, sector]) => <span key={key}><i style={{background:sector.color}} />{key === 'frontend' ? '前端' : key === 'backend' ? '后端' : key.toUpperCase()}</span>)}</div>
          <div className="universe-mobile-readout"><span style={{color: careerSectors[selected.category].color}}>{selected.category === 'frontend' ? '前端' : selected.category === 'backend' ? '后端' : selected.category.toUpperCase()}</span><strong>{selected.title}</strong><small>{selected.salary}</small></div>
          {!failed && (
            <div className="universe-zoom">
              <button
                title="放大"
                aria-label="Zoom in"
                onClick={() => issue("in")}
              >
                <ZoomIn size={18} />
              </button>
              <button
                title="缩小"
                aria-label="Zoom out"
                onClick={() => issue("out")}
              >
                <ZoomOut size={18} />
              </button>
              {narrow && !expanded && <button title={touchCamera ? '返回页面滚动' : '操控镜头'} aria-label="Toggle touch camera" aria-pressed={touchCamera} onClick={() => setTouchCamera(!touchCamera)}><Hand size={18} /></button>}
            </div>
          )}
        </div>
        <aside className="universe-inspector" aria-label="Focused career">
          <label className="universe-role-select">
            当前岗位{" "}
            <select
              aria-label="Focus career"
              value={selected.id}
              onChange={(event) => {
                const job = jobs.find((item) => item.id === event.target.value);
                if (job) choose(job);
              }}
            >
              {jobs.map((job) => (
                <option value={job.id} key={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </label>
          <span
            className="universe-sector"
            style={{ color: careerSectors[selected.category].color }}
          >
            {selected.category.toUpperCase()} /{" "}
            {String(jobs.indexOf(selected) + 1).padStart(2, "0")}
          </span>
          <h3>{selected.title}</h3>
          <strong className="universe-salary">{selected.salary}</strong>
          <p className="universe-description">{selected.description.split('. ')[0]}.</p>
          <dl className="universe-metrics">
            {[
              { label: "热度", value: selected.heat },
              { label: "需求", value: selected.demand },
              { label: "潜力", value: selected.future },
            ].map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>
                  {stat.value}
                  <span>/100</span>
                </dd>
                <i
                  style={{
                    width: `${stat.value}%`,
                    background: careerSectors[selected.category].color,
                  }}
                />
              </div>
            ))}
          </dl>
          <div className="universe-skills">
            {selected.skills.slice(0, 3).map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
          <div className="universe-actions">
            <Link to={`/job/${selected.id}`}>
              查看岗位 <ArrowUpRight size={16} />
            </Link>
            <button
              aria-label="Focus camera on career"
              title="聚焦岗位"
              onClick={() => issue("focus")}
            >
              <Focus size={18} />
            </button>
          </div>
        </aside>
      </div>
      <div className="universe-status">
        <span>
          <i />
          {jobs.length} 个职业节点
        </span>
        <span>
          {reducedMotion
            ? "减少动效"
            : paused
              ? "运动已暂停"
              : "轨道运行中"}
        </span>
        <span>
          远程 {selected.marketData.remotePercentage}% / 增长 +
          {selected.marketData.growthRate}%
        </span>
      </div>
    </div>
  );
}
