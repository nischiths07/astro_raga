'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function StarsBackground() {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const starCount = 120;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 0.5}px`,
      duration: `${Math.random() * 4 + 3}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="stars-container">
      <div className="nebula-cloud" />
      <div className="nebula-cloud" style={{ 
        background: 'radial-gradient(circle at 80% 20%, #312e81, transparent 60%)',
        animationDelay: '-5s',
        opacity: 0.15
      }} />
      
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: parseFloat(star.duration),
            repeat: Infinity,
            delay: parseFloat(star.delay),
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            backgroundColor: 'white',
            borderRadius: '50%',
            boxShadow: star.size === '2.5px' ? '0 0 10px white' : 'none'
          }}
        />
      ))}
    </div>
  );
}
