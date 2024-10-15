import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const Shape = ({ mousePos }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: Math.random() * 100, y: Math.random() * 100 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const shapes = ['circle', 'square', 'triangle'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const size = Math.random() * 20 + 10;

  useEffect(() => {
    const animate = () => {
      if (ref.current) {
        const dx = mousePos.x - position.x;
        const dy = mousePos.y - position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Update velocity (reduced strength for slower movement)
        velocityRef.current.x += (dx / distance) * 0.005;
        velocityRef.current.y += (dy / distance) * 0.005;
        
        // Apply stronger friction for smoother, slower movement
        velocityRef.current.x *= 0.95;
        velocityRef.current.y *= 0.95;
        
        // Reduce randomness for smoother movement
        velocityRef.current.x += (Math.random() - 0.5) * 0.02;
        velocityRef.current.y += (Math.random() - 0.5) * 0.02;
        
        // Update position
        setPosition(prev => ({
          x: (prev.x + velocityRef.current.x + 100) % 100,
          y: (prev.y + velocityRef.current.y + 100) % 100
        }));
      }
    };

    const intervalId = setInterval(animate, 33); // Reduced to 30 FPS for smoother appearance
    return () => clearInterval(intervalId);
  }, [mousePos]);

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    left: `${position.x}%`,
    top: `${position.y}%`,
  };

  return <div ref={ref} className={`shape ${shape}`} style={style}></div>;
};

function App() {
  const [shapes, setShapes] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setShapes(Array(100).fill(null));
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100
    });
  };

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      {shapes.map((_, index) => (
        <Shape key={index} mousePos={mousePos} />
      ))}
    </div>
  );
}

export default App;