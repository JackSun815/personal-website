import React, { useEffect, useRef } from 'react';
import { TweenLite, Circ } from 'gsap'; // Import TweenLite and Circ from GSAP
import './ParticleAnimation.css';

const ParticleAnimation = () => {
  const canvasRef = useRef(null);
  const ripplesRef = useRef([]); // Store click ripple effects
  const permanentShapesRef = useRef([]); // Store permanent shapes left by clicks
  let width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

  const initAnimation = () => {
    // Loop through each point and draw it on the canvas
    for (let i = 0; i < points.length; i++) {
      const closest = points[i].closest;
      for (let j = 0; j < closest.length; j++) {
        TweenLite.fromTo(closest[j], 1 + Math.random(), { opacity: 0 }, { opacity: 1, ease: Circ.easeOut });
      }
    }
    animate();
    for (let i in points) {
      shiftPoint(points[i]);
    }
  };

  const animate = () => {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      
      // Draw static constellations first (background)
      drawConstellations();
      
      for (let i in points) {
        if (Math.abs(getDistance(target, points[i])) < 4000) {
          points[i].active = 0.3;
          points[i].circle.active = 0.6;
        } else if (Math.abs(getDistance(target, points[i])) < 20000) {
          points[i].active = 0.1;
          points[i].circle.active = 0.3;
        } else if (Math.abs(getDistance(target, points[i])) < 40000) {
          points[i].active = 0.02;
          points[i].circle.active = 0.1;
        } else {
          points[i].active = 0;
          points[i].circle.active = 0;
        }

        drawLines(points[i]);
        points[i].circle.draw();
      }
      
      // Draw permanent shapes left by clicks
      drawPermanentShapes();
      
      // Draw click ripple effects on top
      drawRipples();
    }
    requestAnimationFrame(animate);
  };

  const shiftPoint = (p) => {
    // Natural wave-like movement
    const duration = 1.5 + Math.random() * 1.5;
    const time = Date.now() * 0.0001;
    
    // Use sine waves for smooth, natural motion
    const waveX = Math.sin(time + p.originX * 0.01) * 25;
    const waveY = Math.cos(time + p.originY * 0.01) * 25;
    
    TweenLite.to(p, duration, {
      x: p.originX + waveX + (Math.random() - 0.5) * 15,
      y: p.originY + waveY + (Math.random() - 0.5) * 15,
      ease: Circ.easeInOut,
      onComplete: () => shiftPoint(p)
    });
  };

  const drawLines = (p) => {
    if (!p.active) return;
    for (let i in p.closest) {
      const distanceSquared = getDistance(p, p.closest[i]);
      const maxDistanceSquared = 40000; // 200px squared
      
      if (distanceSquared < maxDistanceSquared) {
        // Create gradient based on distance
        const gradient = ctx.createLinearGradient(p.x, p.y, p.closest[i].x, p.closest[i].y);
        const opacity = p.active * (1 - distanceSquared / maxDistanceSquared);
        
        // Add color variation based on position
        const hue1 = (p.x / width) * 60 + 180; // Blue to cyan range
        const hue2 = (p.closest[i].x / width) * 60 + 180;
        
        gradient.addColorStop(0, `hsla(${hue1}, 70%, 75%, ${opacity})`);
        gradient.addColorStop(1, `hsla(${hue2}, 70%, 75%, ${opacity})`);
        
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1 + (1 - distanceSquared / maxDistanceSquared) * 0.5;
        ctx.stroke();
      }
    }
  };

  const drawPermanentShapes = () => {
    permanentShapesRef.current = permanentShapesRef.current.filter(shape => {
      // Fade out animation
      if (!shape.fadeStartTime) {
        shape.fadeStartTime = Date.now();
      }
      
      const elapsed = Date.now() - shape.fadeStartTime;
      const displayDuration = 5000; // Stay bright for 3 seconds
      const fadeDuration = 5000; // Then fade for 3 seconds
      const totalDuration = displayDuration + fadeDuration;
      
      if (elapsed >= totalDuration) {
        return false; // Remove shape
      }
      
      // Calculate fade progress - only starts after displayDuration
      let fadeProgress = 0;
      if (elapsed > displayDuration) {
        fadeProgress = (elapsed - displayDuration) / fadeDuration;
      }
      shape.opacity = 0.8 * (1 - fadeProgress);
      
      ctx.save();
      ctx.globalAlpha = shape.opacity;
      
      const scale = 50; // Increased spacing even more
      let stars = [];
      let color = { r: 255, g: 255, b: 255 }; // Default white
      
      // Define constellation patterns and colors
      if (shape.type === 'leo') {
        // Leo the Lion - golden/amber
        color = { r: 255, g: 200, b: 100 };
        stars = [
          [0, 0], [0.5, -0.8], [1, -1.3], [1.5, -1], [1.7, -0.3],
          [1.3, 0.5], [2, 0.8], [2.5, 0.6], [3, 1]
        ];
      } else if (shape.type === 'sagittarius') {
        // Sagittarius - purple/violet
        color = { r: 200, g: 150, b: 255 };
        stars = [
          [0, 0], [0.7, 0.3], [1.3, 0], [2, -0.5],
          [1.3, -1], [0.7, -0.7], [0, -1], [0.7, -1.3]
        ];
      } else if (shape.type === 'orion') {
        // Orion - blue/cyan
        color = { r: 100, g: 200, b: 255 };
        stars = [
          [0, 0], [0.8, 0.5], [1.6, 0], // shoulders
          [0.5, 1.3], [0.8, 1.5], [1.1, 1.3], // belt (3 stars)
          [0.3, 2.3], [1.3, 2.3] // feet
        ];
      } else if (shape.type === 'cassiopeia') {
        // Cassiopeia - pink/rose
        color = { r: 255, g: 150, b: 200 };
        stars = [
          [0, 0], [0.7, 0.8], [1.3, 0.3], [2, 1], [2.7, 0.5]
        ];
      } else if (shape.type === 'ursa-major') {
        // Ursa Major - teal/turquoise
        color = { r: 100, g: 255, b: 200 };
        stars = [
          [0, 0], [0.5, 0.15], [1, 0.25], [1.5, 0.15], // bowl
          [1.5, -0.5], [1.8, -1], [2.2, -1.5] // handle
        ];
      } else if (shape.type === 'gemini') {
        // Gemini - orange/coral
        color = { r: 255, g: 180, b: 120 };
        stars = [
          [0, 0], [0.3, 0.8], [0.5, 1.6], // left twin
          [1.2, 0], [1.5, 0.8], [1.7, 1.6], // right twin
          [0.3, 0.8], [1.5, 0.8] // connecting line
        ];
      }
      
      // Animate stars with random drift
      if (!shape.starOffsets) {
        shape.starOffsets = stars.map(() => ({
          x: 0,
          y: 0,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3
        }));
      }
      
      // Update star positions with drift
      shape.starOffsets.forEach(offset => {
        offset.x += offset.vx;
        offset.y += offset.vy;
      });
      
      // Draw constellation stars with animation
      stars.forEach((star, index) => {
        const offset = shape.starOffsets[index];
        const x = shape.x + (star[0] * scale) + offset.x;
        const y = shape.y + (star[1] * scale) + offset.y;
        
        // Pulsing effect
        const pulse = 1 + Math.sin(elapsed * 0.003 + index) * 0.2;
        
        ctx.beginPath();
        ctx.arc(x, y, 2 * pulse, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${shape.opacity})`;
        ctx.fill();
        
        // Add glow
        ctx.beginPath();
        ctx.arc(x, y, 4 * pulse, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${shape.opacity * 0.2})`;
        ctx.fill();
      });
      
      // Draw constellation lines
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${shape.opacity * 0.4})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      for (let i = 0; i < stars.length - 1; i++) {
        const offset1 = shape.starOffsets[i];
        const offset2 = shape.starOffsets[i + 1];
        const x1 = shape.x + (stars[i][0] * scale) + offset1.x;
        const y1 = shape.y + (stars[i][1] * scale) + offset1.y;
        const x2 = shape.x + (stars[i + 1][0] * scale) + offset2.x;
        const y2 = shape.y + (stars[i + 1][1] * scale) + offset2.y;
        
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();
      
      ctx.restore();
      return true; // Keep shape
    });
  };

  const drawRipples = () => {
    ripplesRef.current = ripplesRef.current.filter(ripple => {
      // Ripple has finished - leave a constellation behind
      if (!ripple.drawn) {
        const constellationTypes = ['leo', 'sagittarius', 'orion', 'cassiopeia', 'ursa-major', 'gemini'];
        permanentShapesRef.current.push({
          x: ripple.x,
          y: ripple.y,
          type: constellationTypes[permanentShapesRef.current.length % constellationTypes.length],
          opacity: 0.7
        });
        ripple.drawn = true;
      }
      return false;
    });
  };

  const drawConstellations = () => {
    // Draw subtle static constellation patterns
    const constellations = [
      // Big Dipper
      [[0.15, 0.2], [0.18, 0.22], [0.21, 0.23], [0.24, 0.22], [0.26, 0.24], [0.28, 0.26], [0.27, 0.29]],
      // Small triangle constellation
      [[0.75, 0.15], [0.78, 0.18], [0.72, 0.19]],
      // W-shaped constellation
      [[0.85, 0.3], [0.87, 0.33], [0.89, 0.31], [0.91, 0.34], [0.93, 0.32]],
      // Small cross
      [[0.6, 0.7], [0.62, 0.72], [0.64, 0.7], [0.62, 0.68]],
    ];

    ctx.strokeStyle = 'rgba(200, 220, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';

    constellations.forEach(constellation => {
      // Draw lines
      ctx.beginPath();
      constellation.forEach((star, index) => {
        const x = star[0] * width;
        const y = star[1] * height;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw stars
      constellation.forEach(star => {
        const x = star[0] * width;
        const y = star[1] * height;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
      });
    });
  };

  const Circle = function(pos, rad, color) {
    const _this = this;

    // constructor
    (function() {
      _this.pos = pos || null;
      _this.radius = rad || null;
      _this.color = color || null;
      _this.pulseOffset = Math.random() * Math.PI * 2;
    })();

    this.draw = function() {
      if (!_this.active) return;
      
      // Pulsing animation
      const time = Date.now() * 0.001;
      const pulse = 1 + Math.sin(time * 2 + _this.pulseOffset) * 0.15;
      const currentRadius = _this.radius * pulse;
      
      // Color variation based on position
      const hue = (_this.pos.x / width) * 60 + 180; // Blue to cyan
      
      // Outer glow
      const gradient = ctx.createRadialGradient(
        _this.pos.x, _this.pos.y, 0,
        _this.pos.x, _this.pos.y, currentRadius * 3
      );
      gradient.addColorStop(0, `hsla(${hue}, 70%, 85%, ${_this.active * 0.8})`);
      gradient.addColorStop(0.3, `hsla(${hue}, 70%, 75%, ${_this.active * 0.4})`);
      gradient.addColorStop(1, `hsla(${hue}, 70%, 65%, 0)`);
      
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, currentRadius * 3, 0, 2 * Math.PI, false);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Core star
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, currentRadius, 0, 2 * Math.PI, false);
      ctx.fillStyle = `hsla(${hue}, 80%, 95%, ${_this.active})`;
      ctx.fill();
    };
  };

  const getDistance = (p1, p2) => {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  };

  useEffect(() => {
    width = window.innerWidth;
    height = window.innerHeight;
    target = { x: width / 2, y: height / 2 };

    largeHeader = document.getElementById('large-header');
    largeHeader.style.height = height + 'px';

    canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    // Create points - reduce density on mobile
    const isMobile = width < 768;
    const gridDensity = isMobile ? 10 : 15;
    
    points = [];
    for (let x = 0; x < width; x = x + width / gridDensity) {
      for (let y = 0; y < height; y = y + height / gridDensity) {
        const px = x + Math.random() * width / gridDensity;
        const py = y + Math.random() * height / gridDensity;
        const p = { x: px, originX: px, y: py, originY: py };
        points.push(p);
      }
    }

    // For each point find the 3 closest points
    for (let i = 0; i < points.length; i++) {
      const closest = [];
      const p1 = points[i];
      for (let j = 0; j < points.length; j++) {
        const p2 = points[j];
        if (!(p1 === p2)) {
          let placed = false;
          for (let k = 0; k < 3; k++) {
            if (!placed) {
              if (closest[k] === undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (let k = 0; k < 3; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // Assign a circle to each point
    for (let i in points) {
      const c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(200,220,255,0.3)');
      points[i].circle = c;
    }

    // Event handling
    const mouseMove = (e) => {
      target.x = e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      target.y = e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    };

    const scrollCheck = () => {
      animateHeader = document.body.scrollTop <= height;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      largeHeader.style.height = height + 'px';
      canvas.width = width;
      canvas.height = height;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      
      // Create ripple effect
      ripplesRef.current.push({
        x: clickX,
        y: clickY,
        radius: 0,
        opacity: 1
      });
      
      // Burst nearby particles outward
      points.forEach(point => {
        const distance = Math.sqrt(
          Math.pow(point.x - clickX, 2) + Math.pow(point.y - clickY, 2)
        );
        
        if (distance < 150) {
          const angle = Math.atan2(point.y - clickY, point.x - clickX);
          const force = (150 - distance) / 150;
          const pushX = Math.cos(angle) * force * 100;
          const pushY = Math.sin(angle) * force * 100;
          console.log('💥 Bursting particle at distance:', distance);
          
          TweenLite.to(point, 0.6, {
            x: point.x + pushX,
            y: point.y + pushY,
            ease: Circ.easeOut,
            onComplete: () => {
              TweenLite.to(point, 1, {
                x: point.originX,
                y: point.originY,
                ease: Circ.easeInOut
              });
            }
          });
        }
      });
    };

    const addListeners = () => {
      if (!('ontouchstart' in window)) {
        window.addEventListener('mousemove', mouseMove);
      }
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
    canvas.addEventListener('click', handleClick);
    console.log('✅ Click event listener attached to canvas');
    console.log('🎨 Canvas element:', canvas);
    console.log('📏 Canvas dimensions:', { width: canvas.width, height: canvas.height });
      canvas.style.cursor = 'pointer';
    };

    addListeners();

    initAnimation();
    animate();

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('scroll', scrollCheck);
      window.removeEventListener('resize', resize);
      if (canvas) {
        canvas.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <div id="large-header" className="large-header">
      <canvas id="demo-canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default ParticleAnimation;
