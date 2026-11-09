'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function BotanicalHero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090c, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    // -----------------------------------------------------------------
    // PROCEDURAL BOTANICAL STEM & LEAF FORMATION (Ayurvedic Plant Morphology)
    // -----------------------------------------------------------------
    const botanicalGroup = new THREE.Group();

    // 1. Organic Medicinal Leaf Form
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, -2.2);
    leafShape.bezierCurveTo(1.2, -1.2, 1.6, 0.6, 0, 2.4);
    leafShape.bezierCurveTo(-1.6, 0.6, -1.2, -1.2, 0, -2.2);

    const extrudeSettings = {
      steps: 16,
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 4,
    };

    const leafGeometry = new THREE.ExtrudeGeometry(leafShape, extrudeSettings);
    // Subtle organic curl
    const pos = leafGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      const curl = Math.sin(y * 1.2) * 0.2 + (x * x) * 0.1;
      pos.setZ(i, pos.getZ(i) + curl);
    }
    leafGeometry.computeVertexNormals();

    const leafMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x6baa83, // Botanical green
      emissive: 0x0a2216,
      roughness: 0.35,
      metalness: 0.1,
      transmission: 0.45, // Subsurface light transmission
      thickness: 0.8,
      ior: 1.45,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide,
    });

    const centralLeaf = new THREE.Mesh(leafGeometry, leafMaterial);
    centralLeaf.scale.set(0.9, 0.9, 0.9);
    botanicalGroup.add(centralLeaf);

    // 2. Secondary Flanking Leaves
    const leftLeaf = centralLeaf.clone();
    leftLeaf.scale.set(0.65, 0.65, 0.65);
    leftLeaf.rotation.z = Math.PI / 6;
    leftLeaf.rotation.y = -0.3;
    leftLeaf.position.set(-1.4, -0.6, -0.3);
    botanicalGroup.add(leftLeaf);

    const rightLeaf = centralLeaf.clone();
    rightLeaf.scale.set(0.65, 0.65, 0.65);
    rightLeaf.rotation.z = -Math.PI / 6;
    rightLeaf.rotation.y = 0.3;
    rightLeaf.position.set(1.4, -0.6, -0.3);
    botanicalGroup.add(rightLeaf);

    // 3. Leaf Veins (Cellular Grid Lines)
    const veinCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -2.1, 0.08),
      new THREE.Vector3(0.05, -0.7, 0.12),
      new THREE.Vector3(-0.02, 0.8, 0.1),
      new THREE.Vector3(0, 2.3, 0.05),
    ]);
    const veinGeom = new THREE.TubeGeometry(veinCurve, 32, 0.03, 8, false);
    const veinMat = new THREE.MeshStandardMaterial({
      color: 0xb5d3bd, // Sage accent
      roughness: 0.2,
      emissive: 0x224430,
    });
    const mainVein = new THREE.Mesh(veinGeom, veinMat);
    botanicalGroup.add(mainVein);

    scene.add(botanicalGroup);

    // -----------------------------------------------------------------
    // ATMOSPHERIC POLLEN / CHLOROPLAST PARTICLES
    // -----------------------------------------------------------------
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
      particleScales[i / 3] = Math.random() * 0.04 + 0.01;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x83c9f5, // Sky blue accent
      size: 0.06,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // -----------------------------------------------------------------
    // CINEMATIC LIGHTING
    // -----------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0x0a1420, 1.2);
    scene.add(ambientLight);

    // Botanical Key Light (Soft Warm Green)
    const keyLight = new THREE.DirectionalLight(0x6baa83, 3.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Rim Light (Sky Blue)
    const rimLight = new THREE.PointLight(0x83c9f5, 4.0, 12);
    rimLight.position.set(-4, -2, -2);
    scene.add(rimLight);

    // Top Atmospheric Light
    const topLight = new THREE.PointLight(0xb5d3bd, 2.0, 10);
    topLight.position.set(0, 4, 2);
    scene.add(topLight);

    // -----------------------------------------------------------------
    // INTERACTION & PARALLAX
    // -----------------------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.6;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize handler
    const onResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      // Gentle floating natural movement
      botanicalGroup.position.y = Math.sin(elapsedTime * 0.6) * 0.15;
      botanicalGroup.rotation.y = elapsedTime * 0.12 + mouseX * 0.7;
      botanicalGroup.rotation.x = Math.cos(elapsedTime * 0.5) * 0.08 - mouseY * 0.5;
      botanicalGroup.rotation.z = Math.sin(elapsedTime * 0.4) * 0.05;

      // Particle subtle swirl
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      leafGeometry.dispose();
      leafMaterial.dispose();
      veinGeom.dispose();
      veinMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[540px] md:h-[680px] overflow-hidden flex items-center justify-center">
      {/* ThreeJS Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 pointer-events-auto cursor-grab active:cursor-grabbing"
      />

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#07090C] via-transparent to-transparent opacity-90 z-10" />
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-[#07090C]/40 to-[#07090C] z-10" />

      {/* WebGL Fallback if device unaccelerated */}
      {!webglSupported && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-[#6BAA83]/20 via-[#101C2A] to-[#83C9F5]/20 blur-3xl animate-pulse" />
          <svg
            className="w-48 h-48 text-[#6BAA83] opacity-60 animate-float-slow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.5 8.4C6.2 19 6 17.5 6 16c0-5 4-9 9-9 1.5 0 3 .2 4.4.5C17.6 3.8 15 2 12 2z" />
            <path d="M12 22s8-4 8-10c0-2.8-1.5-5.3-3.8-6.7" />
          </svg>
        </div>
      )}
    </div>
  );
}
