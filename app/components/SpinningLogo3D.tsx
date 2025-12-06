import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * Logo mesh component with drag interaction and physics
 */
function LogoMesh() {
  const meshRef = useRef<THREE.Group>(null!);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastDrag = useRef({ x: 0, y: 0, time: 0 });

  const logoTexture = useTexture("/logo.svg");

  // Configure texture to fill properly and cleanup
  useEffect(() => {
    if (logoTexture) {
      logoTexture.needsUpdate = true;
    }
    return () => {
      if (logoTexture) {
        logoTexture.dispose();
      }
    };
  }, [logoTexture]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkReducedMotion = () => {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener("resize", checkMobile);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", checkReducedMotion);

    return () => {
      window.removeEventListener("resize", checkMobile);
      motionQuery.removeEventListener("change", checkReducedMotion);
    };
  }, []);

  // Animation loop: idle rotation and momentum physics
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (isDragging) {
      // Reset velocity while dragging
      velocity.current = { x: 0, y: 0 };
    } else {
      // Apply momentum decay
      if (Math.abs(velocity.current.x) > 0.01 || Math.abs(velocity.current.y) > 0.01) {
        meshRef.current.rotation.y += velocity.current.x;
        meshRef.current.rotation.x += velocity.current.y;

        // Decay velocity (95% per frame)
        velocity.current.x *= 0.95;
        velocity.current.y *= 0.95;
      } else if (!prefersReducedMotion) {
        // Idle rotation when not dragging and no momentum - rotate on all axes
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.3;
        meshRef.current.rotation.z += delta * 0.15;
      }
    }
  });

  // Pointer down handler
  const handlePointerDown = (event: any) => {
    event.stopPropagation();
    setIsDragging(true);
    dragStart.current = {
      x: event.clientX || event.touches?.[0]?.clientX || 0,
      y: event.clientY || event.touches?.[0]?.clientY || 0,
    };
    lastDrag.current = { x: dragStart.current.x, y: dragStart.current.y, time: Date.now() };
  };

  // Pointer move handler
  const handlePointerMove = (event: any) => {
    if (!isDragging || !meshRef.current) return;

    const clientX = event.clientX || event.touches?.[0]?.clientX || 0;
    const clientY = event.clientY || event.touches?.[0]?.clientY || 0;

    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;

    // Sensitivity: 1:1 on desktop, 0.5x on mobile
    const sensitivity = isMobile ? 0.005 : 0.01;

    // Apply rotation: horizontal drag → Y-axis, vertical drag → X-axis
    meshRef.current.rotation.y += deltaX * sensitivity;
    meshRef.current.rotation.x += deltaY * sensitivity;

    // Update drag start for next frame
    dragStart.current = { x: clientX, y: clientY };

    // Track velocity for momentum
    const now = Date.now();
    const timeDelta = now - lastDrag.current.time;
    if (timeDelta > 0) {
      const velX = (clientX - lastDrag.current.x) * sensitivity;
      const velY = (clientY - lastDrag.current.y) * sensitivity;
      velocity.current = { x: velX, y: velY };
    }
    lastDrag.current = { x: clientX, y: clientY, time: now };
  };

  // Pointer up handler
  const handlePointerUp = () => {
    setIsDragging(false);
    // Velocity is already set from last move, will decay naturally
  };

  // Create rounded box geometry with cleanup
  const geometry = useMemo(
    () => new RoundedBoxGeometry(2, 2, 2, 3, 0.2),
    []
  );

  // Cleanup geometry on unmount
  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <group
      ref={meshRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Card with rounded edges and logo on both sides */}
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          map={logoTexture}
          transparent={true}
          roughness={0.25}        // Slightly lower for more shine
          metalness={0.1}         // Higher metalness for brighter highlights
          color="#ffffff"         // Pure white for maximum base brightness
          emissive="#5C33FF"      // Add a gentle light emission
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
}

/**
 * Main 3D spinning logo component
 */
export default function SpinningLogo3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setIsClient(true);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle WebGL context loss/restore
  useEffect(() => {
    const handleContextLost = (event: Event) => {
      console.log("WebGL context lost - will remount canvas");
      // Don't prevent default - let the browser handle it naturally
      // Just force a remount to get a fresh canvas
      setTimeout(() => {
        setCanvasKey((prev) => prev + 1);
      }, 100);
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored");
    };

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.addEventListener("webglcontextlost", handleContextLost);
      canvas.addEventListener("webglcontextrestored", handleContextRestored);

      return () => {
        canvas.removeEventListener("webglcontextlost", handleContextLost);
        canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      };
    }
  }, [canvasKey]); // Re-attach listeners when canvas remounts

  // Don't render Three.js Canvas during SSR
  if (!isClient) {
    return null;
  }

  return (
    <div
      className="w-full h-full relative"
      aria-label="Interactive 3D Internkit logo"
    >
      <Canvas
        key={canvasKey}
        style={{ width: "100%", height: "250px" }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={isMobile ? 1 : [1, 2]}
        onCreated={({ gl }) => {
          // Store canvas reference for context event listeners
          canvasRef.current = gl.domElement;
        }}
      >
        {/* Ambient light for base visibility */}
        <ambientLight intensity={isMobile ? 0.5 : 0.6} />

        {/* Directional light from top-right for depth */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={isMobile ? 0.3 : 0.5}
        />

        <LogoMesh />
      </Canvas>
    </div>
  );
}
