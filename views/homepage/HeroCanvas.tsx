"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OLIVE = 0x6b7245;
const OLIVE_LIGHT = 0x9aa06b;
const OLIVE_DEEP = 0x4a5230;

/**
 * WebGL hero: an organic, vertex-displaced icosahedron wrapped in a
 * wireframe shell, orbited by floating geometry and a particle field.
 * Rotation, scale, displacement amplitude, and camera depth all react
 * to scroll progress; the whole scene parallaxes with the cursor.
 */
export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(OLIVE_LIGHT, 1.1);
    rimLight.position.set(-5, -3, -4);
    scene.add(rimLight);

    // --- Core morphing geometry -------------------------------------
    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.IcosahedronGeometry(1.7, 24);
    const basePositions = coreGeometry.attributes.position.array.slice();
    // const coreMaterial = new THREE.MeshStandardMaterial({
    //   color: "#000000",
    //   roughness: 0.35,
    //   metalness: 0.25,
    //   flatShading: false,
    // });
    // const core = new THREE.Mesh(coreGeometry, coreMaterial);
    // group.add(core);

    const shellGeometry = new THREE.IcosahedronGeometry(2.35, 1);
    const shell = new THREE.LineSegments(
      new THREE.WireframeGeometry(shellGeometry),
      new THREE.LineBasicMaterial({
        color: OLIVE,
        transparent: true,
        opacity: 0.32,
      }),
    );
    group.add(shell);

    // --- Floating orbiters ------------------------------------------
    const orbiters: {
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      offset: number;
      yAmp: number;
    }[] = [];
    const orbiterGeometries = [
      new THREE.OctahedronGeometry(0.16),
      new THREE.TetrahedronGeometry(0.18),
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      new THREE.TorusGeometry(0.16, 0.055, 12, 32),
      new THREE.OctahedronGeometry(0.12),
    ];
    orbiterGeometries.forEach((geometry, i) => {
      const material = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? OLIVE_LIGHT : "#ffffff",
        roughness: 0.4,
        metalness: 0.3,
      });
      const mesh = new THREE.Mesh(geometry, material);
      const radius = 3.1 + (i % 3) * 0.55;
      scene.add(mesh);
      orbiters.push({
        mesh,
        radius,
        speed: 0.25 + i * 0.07,
        offset: (i / orbiterGeometries.length) * Math.PI * 2,
        yAmp: 0.5 + (i % 3) * 0.35,
      });
    });

    // --- Particle field ----------------------------------------------
    const particleCount = 220;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi) - 2;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: "#000000",
        size: 0.035,
        transparent: true,
        opacity: 0.55,
      }),
    );
    scene.add(particles);

    // --- Scroll + pointer state ---------------------------------------
    const state = { scroll: 0, mouseX: 0, mouseY: 0 };

    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "max",
      scrub: true,
      onUpdate: (self) => {
        state.scroll = self.progress;
      },
    });

    const handlePointerMove = (event: PointerEvent) => {
      state.mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      state.mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove);

    // --- Animation loop ------------------------------------------------
    const startTime = performance.now();
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = (performance.now() - startTime) / 1000;
      const s = state.scroll;

      // Organic vertex displacement — amplitude grows with scroll
      const amp = 0.18 + s * 0.55;
      const positions = coreGeometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const ix = i * 3;
        const ox = basePositions[ix];
        const oy = basePositions[ix + 1];
        const oz = basePositions[ix + 2];
        const noise =
          Math.sin(ox * 2.1 + t * 0.9) *
          Math.sin(oy * 2.4 + t * 0.7) *
          Math.sin(oz * 1.8 + t * 1.1);
        const scaleFactor = 1 + noise * amp * 0.28;
        positions.setXYZ(
          i,
          ox * scaleFactor,
          oy * scaleFactor,
          oz * scaleFactor,
        );
      }
      positions.needsUpdate = true;
      coreGeometry.computeVertexNormals();

      // Scroll-reactive transforms — geometry persists across the full page
      group.rotation.y = t * 0.18 + s * Math.PI * 2.4;
      group.rotation.x = s * Math.PI * 0.6 + Math.sin(t * 0.3) * 0.06;
      const groupScale = 1 - s * 0.22;
      group.scale.setScalar(Math.max(groupScale, 0.65));
      // Drift gently to the right and float as the user travels down the page
      group.position.x = s * 2.6;
      group.position.y = Math.sin(s * Math.PI * 2) * 0.9;

      shell.rotation.y = -t * 0.1 - s * Math.PI;
      shell.rotation.z = s * Math.PI * 0.4;

      // Orbiters drift and expand outward on scroll
      orbiters.forEach(({ mesh, radius, speed, offset, yAmp }) => {
        const angle = t * speed + offset + s * Math.PI * 2;
        const r = radius + s * 1.6;
        mesh.position.set(
          Math.cos(angle) * r,
          Math.sin(t * speed * 0.8 + offset) * yAmp + s * 1.2,
          Math.sin(angle) * r * 0.55 - 1,
        );
        mesh.rotation.x = t * speed * 1.4;
        mesh.rotation.y = t * speed;
      });

      particles.rotation.y = t * 0.02 + s * 0.5;

      // Camera: cursor parallax + scroll dolly
      camera.position.x += (state.mouseX * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (-state.mouseY * 0.4 - camera.position.y) * 0.04;
      camera.position.z = 7 + s * 1.5;
      camera.lookAt(group.position.x * 0.5, group.position.y * 0.4, 0);

      renderer.render(scene, camera);
    };
    animate();

    // --- Resize ---------------------------------------------------------
    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      scrollTrigger.kill();
      coreGeometry.dispose();
      // coreMaterial.dispose();
      shellGeometry.dispose();
      shell.geometry.dispose();
      (shell.material as THREE.Material).dispose();
      orbiterGeometries.forEach((g) => g.dispose());
      orbiters.forEach(({ mesh }) =>
        (mesh.material as THREE.Material).dispose(),
      );
      particleGeometry.dispose();
      (particles.material as THREE.Material).dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 left-100"
      aria-hidden="true"
    />
  );
}
