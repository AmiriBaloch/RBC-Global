import React, { useState, useEffect } from 'react';
import { Carousel, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CarouselSlider.css';

// Import images
import gif1 from '../assets/gif1.gif';
import gif2 from '../assets/gif2.gif';
import mbgif from '../assets/mbgif.gif';
import mbgif1 from '../assets/mbgif1.gif';

const CarouselSlider = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Add event listener for window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="carousel-container" style={{ backgroundColor: '#E3EBF2' }}>
      <Carousel 
        fade 
        interval={5000} 
        controls={true} 
        indicators={true}
        style={{ backgroundColor: '#E3EBF2' }}
      >
        <Carousel.Item style={{ backgroundColor: '#E3EBF2' }}>
          {isMobile ? (
            <>
              {/* First slide for mobile - mbgif.gif */}
              <div className="mobile-image-container">
                <img
                  className="mobile-carousel-media"
                  src={mbgif}
                  alt="Mobile Animation GIF"
                />
              </div>
            </>
          ) : (
            <img
              className="d-block w-100 carousel-image"
              src={gif1}
              alt="Animation 1"
            />
          )}
        </Carousel.Item>
        
        <Carousel.Item style={{ backgroundColor: '#E3EBF2' }}>
          {isMobile ? (
            <div className="mobile-image-container">
              <img
                className="mobile-carousel-media"
                src={mbgif1}
                alt="Mobile Animation"
              />
            </div>
          ) : (
            <img
              className="d-block w-100 carousel-image"
              src={gif2}
              alt="Animation 2"
            />
          )}
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselSlider; 