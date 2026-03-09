import React, { useEffect, useRef } from 'react';
import './FloatingConstellations.css';

const FloatingConstellations = () => {
  const canvasRef = useRef(null);
  const constellationsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Constellation types and colors
    const constellationTypes = [
      { type: 'leo', color: { r: 255, g: 200, b: 100 } },
      { type: 'sagittarius', color: { r: 200, g: 150, b: 255 } },
      { type: 'orion', color: { r: 100, g: 200, b: 255 } },
      { type: 'cassiopeia', color: { r: 255, g: 150, b: 200 } },
      { type: 'ursa-major', color: { r: 100, g: 255, b: 200 } },
      { type: 'gemini', color: { r: 255, g: 180, b: 120 } }
    ];

    // Create initial constellations
    const createConstellation = (position) => {
      const typeData = constellationTypes[Math.floor(Math.random() * constellationTypes.length)];
      const scale = 35 + Math.random() * 25;
      
      let stars = [];
      if (typeData.type === 'leo') {
        stars = [
          [0, 0], [0.5, -0.8], [1, -1.3], [1.5, -1], [1.7, -0.3],
          [1.3, 0.5], [2, 0.8], [2.5, 0.6], [3, 1]
        ];
      } else if (typeData.type === 'sagittarius') {
        stars = [
          [0, 0], [0.7, 0.3], [1.3, 0], [2, -0.5],
          [1.3, -1], [0.7, -0.7], [0, -1], [0.7, -1.3]
        ];
      } else if (typeData.type === 'orion') {
        stars = [
          [0, 0], [0.8, 0.5], [1.6, 0],
          [0.5, 1.3], [0.8, 1.5], [1.1, 1.3],
          [0.3, 2.3], [1.3, 2.3]
        ];
      } else if (typeData.type === 'cassiopeia') {
        stars = [
          [0, 0], [0.7, 0.8], [1.3, 0.3], [2, 1], [2.7, 0.5]
        ];
      } else if (typeData.type === 'ursa-major') {
        stars = [
          [0, 0], [0.5, 0.15], [1, 0.25], [1.5, 0.15],
          [1.5, -0.5], [1.8, -1], [2.2, -1.5]
        ];
      } else if (typeData.type === 'gemini') {
        stars = [
          [0, 0], [0.3, 0.8], [0.5, 1.6],
          [1.2, 0], [1.5, 0.8], [1.7, 1.6],
          [0.3, 0.8], [1.5, 0.8]
        ];
      }

      // Position constellations along borders
      let x, y, vx, vy;
      const borderMargin = 150;
      
      if (position === 'top-left') {
        x = Math.random() * borderMargin;
        y = Math.random() * borderMargin;
        vx = Math.random() * 0.3;
        vy = Math.random() * 0.3;
      } else if (position === 'top-right') {
        x = canvas.width - Math.random() * borderMargin;
        y = Math.random() * borderMargin;
        vx = -Math.random() * 0.3;
        vy = Math.random() * 0.3;
      } else if (position === 'bottom-left') {
        x = Math.random() * borderMargin;
        y = canvas.height - Math.random() * borderMargin;
        vx = Math.random() * 0.3;
        vy = -Math.random() * 0.3;
      } else if (position === 'bottom-right') {
        x = canvas.width - Math.random() * borderMargin;
        y = canvas.height - Math.random() * borderMargin;
        vx = -Math.random() * 0.3;
        vy = -Math.random() * 0.3;
      } else if (position === 'left') {
        x = Math.random() * borderMargin;
        y = borderMargin + Math.random() * (canvas.height - borderMargin * 2);
        vx = Math.random() * 0.3;
        vy = (Math.random() - 0.5) * 0.3;
      } else { // 'right'
        x = canvas.width - Math.random() * borderMargin;
        y = borderMargin + Math.random() * (canvas.height - borderMargin * 2);
        vx = -Math.random() * 0.3;
        vy = (Math.random() - 0.5) * 0.3;
      }

      return {
        x,
        y,
        vx,
        vy,
        type: typeData.type,
        color: typeData.color,
        stars,
        scale,
        opacity: 0.6 + Math.random() * 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.001
      };
    };

    // Initialize constellations in border positions
    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'left', 'right', 'top-left', 'bottom-right'];
    for (let i = 0; i < positions.length; i++) {
      constellationsRef.current.push(createConstellation(positions[i]));
    }

    const drawConstellation = (constellation) => {
      ctx.save();
      ctx.globalAlpha = constellation.opacity;
      ctx.translate(constellation.x, constellation.y);
      ctx.rotate(constellation.rotation);

      const { stars, scale, color } = constellation;

      // Draw stars
      stars.forEach((star, index) => {
        const x = star[0] * scale;
        const y = star[1] * scale;
        
        const time = Date.now() * 0.001;
        const pulse = 1 + Math.sin(time * 2 + index) * 0.1;

        // Glow
        ctx.beginPath();
        ctx.arc(x, y, 4 * pulse, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${constellation.opacity * 0.4})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(x, y, 2 * pulse, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${constellation.opacity})`;
        ctx.fill();
      });

      // Draw lines
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${constellation.opacity * 0.5})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      
      for (let i = 0; i < stars.length - 1; i++) {
        const x1 = stars[i][0] * scale;
        const y1 = stars[i][1] * scale;
        const x2 = stars[i + 1][0] * scale;
        const y2 = stars[i + 1][1] * scale;
        
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      constellationsRef.current.forEach(constellation => {
        // Update position
        constellation.x += constellation.vx;
        constellation.y += constellation.vy;
        constellation.rotation += constellation.rotationSpeed;

        // Wrap around edges
        if (constellation.x < -100) constellation.x = canvas.width + 100;
        if (constellation.x > canvas.width + 100) constellation.x = -100;
        if (constellation.y < -100) constellation.y = canvas.height + 100;
        if (constellation.y > canvas.height + 100) constellation.y = -100;

        drawConstellation(constellation);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="floating-constellations" />;
};

export default FloatingConstellations;
