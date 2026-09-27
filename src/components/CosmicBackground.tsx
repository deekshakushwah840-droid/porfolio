import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CosmicBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Deep cosmic blue scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.0016);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;
    camera.position.y = 20;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x020617, 1);
    container.appendChild(renderer.domElement);

    // 1. Distant Background Starfield (Deep Stellar Blue & Silver Starlight)
    const distantCount = prefersReducedMotion ? 1200 : 4000;
    const distantGeo = new THREE.BufferGeometry();
    const distantPos = new Float32Array(distantCount * 3);
    const distantColors = new Float32Array(distantCount * 3);

    for (let i = 0; i < distantCount; i++) {
      const x = (Math.random() - 0.5) * 650;
      const y = (Math.random() - 0.5) * 650;
      const z = (Math.random() - 0.5) * 650 - 50;
      distantPos[i * 3] = x;
      distantPos[i * 3 + 1] = y;
      distantPos[i * 3 + 2] = z;

      const colorType = Math.random();
      if (colorType < 0.5) {
        // Crisp starlight silver-white
        distantColors[i * 3] = 0.95;
        distantColors[i * 3 + 1] = 0.97;
        distantColors[i * 3 + 2] = 1.0;
      } else if (colorType < 0.8) {
        // Ethereal soft glowing blue (#38BDF8 / #60A5FA)
        distantColors[i * 3] = 0.22;
        distantColors[i * 3 + 1] = 0.74;
        distantColors[i * 3 + 2] = 0.97;
      } else {
        // Deep stellar blue (#1E3A8A / #2563EB)
        distantColors[i * 3] = 0.12;
        distantColors[i * 3 + 1] = 0.35;
        distantColors[i * 3 + 2] = 0.95;
      }
    }
    distantGeo.setAttribute('position', new THREE.BufferAttribute(distantPos, 3));
    distantGeo.setAttribute('color', new THREE.BufferAttribute(distantColors, 3));

    const distantMat = new THREE.PointsMaterial({
      size: 0.88,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const distantStars = new THREE.Points(distantGeo, distantMat);
    scene.add(distantStars);

    // 2. Spiral Galaxy in Deep Cosmic Blue (#38BDF8 to #1E3A8A)
    const galaxyParams = {
      count: prefersReducedMotion ? 6000 : 20000,
      size: 0.45,
      radius: 48,
      branches: 3,
      spin: 1.25,
      randomness: 0.45,
      power: 3.2,
      insideColor: 0x38bdf8, // Ethereal glowing blue
      outsideColor: 0x1e3a8a  // Deep stellar blue
    };

    const galaxyGeo = new THREE.BufferGeometry();
    const galaxyPositions = new Float32Array(galaxyParams.count * 3);
    const galaxyColors = new Float32Array(galaxyParams.count * 3);

    const colorInside = new THREE.Color(galaxyParams.insideColor);
    const colorOutside = new THREE.Color(galaxyParams.outsideColor);

    for (let i = 0; i < galaxyParams.count; i++) {
      const r = Math.random() * galaxyParams.radius;
      const spinAngle = r * galaxyParams.spin;
      const branchAngle = ((i % galaxyParams.branches) * (2 * Math.PI)) / galaxyParams.branches;

      const randomX = Math.pow(Math.random(), galaxyParams.power) * (Math.random() < 0.5 ? 1 : -1) * galaxyParams.randomness * r;
      const randomY = Math.pow(Math.random(), galaxyParams.power) * (Math.random() < 0.5 ? 1 : -1) * galaxyParams.randomness * r;
      const randomZ = Math.pow(Math.random(), galaxyParams.power) * (Math.random() < 0.5 ? 1 : -1) * galaxyParams.randomness * r;

      galaxyPositions[i * 3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      galaxyPositions[i * 3 + 1] = randomY * 0.48;
      galaxyPositions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, r / galaxyParams.radius);

      // Core stars have pure starlight focus
      if (r < 6) {
        mixedColor.lerp(new THREE.Color(0xf8fafc), 0.75);
      }

      galaxyColors[i * 3] = mixedColor.r;
      galaxyColors[i * 3 + 1] = mixedColor.g;
      galaxyColors[i * 3 + 2] = mixedColor.b;
    }

    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(galaxyPositions, 3));
    galaxyGeo.setAttribute('color', new THREE.BufferAttribute(galaxyColors, 3));

    const galaxyMat = new THREE.PointsMaterial({
      size: galaxyParams.size,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const galaxy = new THREE.Points(galaxyGeo, galaxyMat);
    galaxy.rotation.x = 0.55;
    galaxy.position.set(0, -10, -25);
    scene.add(galaxy);

    // 3. Central Luminous Core in Cosmic Blue
    const coreGeo = new THREE.SphereGeometry(2.6, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    coreSphere.position.copy(galaxy.position);
    scene.add(coreSphere);

    // 4. Subtle Orbital Planetary Ring in Deep Cosmic Indigo
    const ringGeo = new THREE.RingGeometry(22, 22.3, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI / 2.2;
    orbitalRing.position.set(0, -5, -15);
    scene.add(orbitalRing);

    // 5. Mouse Parallax & Scroll Integration
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY || document.documentElement.scrollTop;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        galaxy.rotation.y = elapsedTime * 0.042;
        distantStars.rotation.y = elapsedTime * 0.007;
        orbitalRing.rotation.z = elapsedTime * 0.028;

        targetX += (mouseX * 4 - targetX) * 0.03;
        targetY += (-mouseY * 3 - targetY) * 0.03;

        camera.position.x = targetX;
        camera.position.y = 20 + targetY - (scrollY * 0.015);
        camera.lookAt(0, -scrollY * 0.01, 0);

        const pulse = 1 + Math.sin(elapsedTime * 1.5) * 0.12;
        coreSphere.scale.set(pulse, pulse, pulse);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      distantGeo.dispose();
      distantMat.dispose();
      galaxyGeo.dispose();
      galaxyMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 15%, #0a152e 0%, #080e1a 35%, #030712 70%, #020617 100%)'
      }}
      aria-hidden="true"
    />
  );
};
