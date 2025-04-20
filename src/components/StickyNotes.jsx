import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './StickyNotes.css';

const StickyNotes = () => {
  const stickyContainerRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation class when component enters viewport
          entry.target.classList.add('animate-stickies');
        } else {
          // Remove animation class when component leaves viewport
          entry.target.classList.remove('animate-stickies');
        }
      });
    }, { 
      threshold: 0.3, // Trigger when 30% visible
      rootMargin: '0px' // Consider viewport edges
    });
    
    if (stickyContainerRef.current) {
      observer.observe(stickyContainerRef.current);
    }
    
    return () => {
      if (stickyContainerRef.current) {
        observer.unobserve(stickyContainerRef.current);
      }
    };
  }, []);
  
  return (
    <section className="sticky-notes-section">
      <Container>
        <div className="sticky-notes-container" ref={stickyContainerRef}>
          <div className="sticky-note note-left">
            <div className="sticky-content">
              <h3>Mission</h3>
              <p>Our corporate objective is to provide reliable, independent, and high-quality services while ensuring real-time project delivery through continuous improvement.</p>
            </div>
          </div>
          
          <div className="sticky-note note-center">
            <div className="sticky-content">
              <h3>Vision</h3>
              <p>We provide a comprehensive support system of consulting, training, and lending to help clients successfully strengthen and grow their businesses through sustainable sales, financial knowledge, and job creation.</p>
            </div>
          </div>
          
          <div className="sticky-note note-right">
            <div className="sticky-content">
              <h3>Goals</h3>
              <p>We aim to assist business owners and entrepreneurs in defining their objectives to achieve service excellence, social impact, profitability, and sustainable growth. This is accomplished by engaging with key organizational leaders to develop and refine their strategic goals.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StickyNotes; 