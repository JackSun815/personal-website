import React, { useEffect, useRef } from 'react';
import { TweenLite, Circ } from 'gsap'; // Import TweenLite and Circ from GSAP
import './ParticleAnimation.css';

const ParticleAnimation = () => {
  const canvasRef = useRef(null);
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
    }
    requestAnimationFrame(animate);
  };

  const shiftPoint = (p) => {
    TweenLite.to(p, 1 + 1 * Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: Circ.easeInOut,
      onComplete: () => shiftPoint(p)
    });
  };

  const drawLines = (p) => {
    if (!p.active) return;
    for (let i in p.closest) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.closest[i].x, p.closest[i].y);
      ctx.strokeStyle = `rgba(200,220,255,${p.active})`;
      ctx.stroke();
    }
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
    })();

    this.draw = function() {
      if (!_this.active) return;
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = `rgba(200,220,255,${_this.active})`;
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

    // Create points
    points = [];
    for (let x = 0; x < width; x = x + width / 20) {
      for (let y = 0; y < height; y = y + height / 20) {
        const px = x + Math.random() * width / 20;
        const py = y + Math.random() * height / 20;
        const p = { x: px, originX: px, y: py, originY: py };
        points.push(p);
      }
    }

    // For each point find the 5 closest points
    for (let i = 0; i < points.length; i++) {
      const closest = [];
      const p1 = points[i];
      for (let j = 0; j < points.length; j++) {
        const p2 = points[j];
        if (!(p1 === p2)) {
          let placed = false;
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] === undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (let k = 0; k < 5; k++) {
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

    const addListeners = () => {
      if (!('ontouchstart' in window)) {
        window.addEventListener('mousemove', mouseMove);
      }
      window.addEventListener('scroll', scrollCheck);
      window.addEventListener('resize', resize);
    };

    addListeners();

    initAnimation();
    animate();

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('scroll', scrollCheck);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div id="large-header" className="large-header">
      <canvas id="demo-canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default ParticleAnimation;
