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
      // Use custom color if temporary point, otherwise default blue
      if (p.color) {
        ctx.strokeStyle = p.color + p.active + ')';
      } else {
        ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
      }
      ctx.stroke();
    }
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
      // Use the circle's color if it starts with 'rgba(' but doesn't end with ')'
      if (_this.color && _this.color.startsWith('rgba(') && !_this.color.endsWith(')')) {
        ctx.fillStyle = _this.color + _this.active + ')';
      } else {
        ctx.fillStyle = `rgba(156,217,249,${_this.active})`;
      }
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
      const c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(156,217,249,0.3)');
      points[i].circle = c;
    }

    // Event handling
    const mouseMove = (e) => {
      target.x = e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      target.y = e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    };

    const handleClick = (e) => {
      const clickX = e.pageX || e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      const clickY = e.pageY || e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      
      // Array of colors to cycle through
      const colors = [
        'rgba(255, 107, 107, ', // red
        'rgba(255, 195, 113, ', // orange
        'rgba(255, 234, 167, ', // yellow
        'rgba(132, 250, 176, ', // green
        'rgba(123, 237, 255, ', // cyan
        'rgba(162, 155, 254, ', // purple
        'rgba(255, 118, 217, ', // pink
        'rgba(253, 203, 110, ', // gold
      ];
      
      // Pick one random color for this entire pattern
      const selectedColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Create cluster of connected points
      const numPoints = Math.floor(Math.random() * 5) + 6; // 6-10 points
      const tempPoints = [];
      const radius = 120; // cluster radius
      
      // Create points in a semi-random pattern around click
      for (let i = 0; i < numPoints; i++) {
        const angle = (Math.PI * 2 * i) / numPoints + (Math.random() - 0.5) * 0.8;
        const distance = Math.random() * radius + 30;
        const x = clickX + Math.cos(angle) * distance;
        const y = clickY + Math.sin(angle) * distance;
        
        const tempPoint = { 
          x, y, 
          originX: x, 
          originY: y,
          active: 0,
          closest: [],
          isTemp: true,
          color: selectedColor
        };
        
        const tempCircle = new Circle(tempPoint, 2 + Math.random() * 2, selectedColor);
        tempCircle.active = 0;
        tempPoint.circle = tempCircle;
        tempPoints.push(tempPoint);
      }
      
      // Find closest points for each temp point (to draw lines between them)
      for (let i = 0; i < tempPoints.length; i++) {
        const closest = [];
        const p1 = tempPoints[i];
        for (let j = 0; j < tempPoints.length; j++) {
          if (i !== j) {
            const p2 = tempPoints[j];
            let placed = false;
            for (let k = 0; k < 3; k++) { // Find 3 closest
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
      
      // Add temp points to main points array
      tempPoints.forEach(tp => points.push(tp));
      
      // Fade in animation
      tempPoints.forEach((tp, index) => {
        TweenLite.to(tp, 0.5, {
          delay: index * 0.05,
          onUpdate: () => {
            tp.active = Math.min(0.3, tp.active + 0.02);
            tp.circle.active = Math.min(0.8, tp.circle.active + 0.05);
          },
          onComplete: () => {
            // Fade out after 1.5 seconds
            TweenLite.to(tp, 1, {
              delay: 1.5,
              onUpdate: () => {
                tp.active = Math.max(0, tp.active - 0.02);
                tp.circle.active = Math.max(0, tp.circle.active - 0.05);
              },
              onComplete: () => {
                // Remove from points array
                const idx = points.indexOf(tp);
                if (idx > -1) {
                  points.splice(idx, 1);
                }
              }
            });
          }
        });
      });
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
        window.addEventListener('click', handleClick);
      }
      window.addEventListener('scroll', scrollCheck);
      window.addEventListener('resize', resize);
    };

    addListeners();

    initAnimation();
    animate();

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('click', handleClick);
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
