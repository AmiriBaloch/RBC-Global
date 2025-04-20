import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CarouselSlider.css';

// Import images
import gif1 from '../assets/gif1.gif';
import gif2 from '../assets/gif2.gif';

const CarouselSlider = () => {
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
          <img
            className="d-block w-100 carousel-image"
            src={gif1}
            alt="Animation 1"
          />
        </Carousel.Item>
        
        <Carousel.Item style={{ backgroundColor: '#E3EBF2' }}>
          <img
            className="d-block w-100 carousel-image"
            src={gif2}
            alt="Animation 2"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselSlider; 