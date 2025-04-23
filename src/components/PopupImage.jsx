import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import dummyImage from '../assets/logo2.png'; // Using existing logo as dummy image - replace with your actual image

const PopupImage = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only show popup on the homepage
    if (location.pathname === '/') {
      const timer = setTimeout(() => {
        setShow(true);
      }, 4000); // 4 seconds delay

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleClose = () => setShow(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      aria-labelledby="popup-image-modal"
      className="popup-image-modal"
    >
      <button 
        className="popup-close-button" 
        onClick={handleClose}
        aria-label="Close"
      >
        ×
      </button>
      
      <Modal.Body className="text-center">
        <img 
          src={dummyImage} 
          alt="RoseBelt Consultants Promotion" 
          className="img-fluid popup-image" 
          style={{ maxHeight: '60vh' }}
        />
        <h4 className="mt-4 mb-3">Welcome to RoseBelt Consultants</h4>
        <p>Thank you for visiting our website!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupImage; 