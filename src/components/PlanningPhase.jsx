import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import './PlanningPhase.css';

const PlanningPhase = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });
  const finalCount = 20;

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  useEffect(() => {
    if (isVisible && count < finalCount) {
      const timer = setTimeout(() => {
        setCount(prev => Math.min(prev + 1, finalCount));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [count, isVisible, finalCount]);

  return (
    <div 
      ref={ref}
      className={`planning-phase-container ${isVisible ? 'animate-planning' : ''}`}
    >
      <div className="planning-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="planning-content">
        <div className="planning-count">{count}</div>
        <div className="planning-label">Projects in Planning</div>
      </div>
    </div>
  );
};

export default PlanningPhase; 