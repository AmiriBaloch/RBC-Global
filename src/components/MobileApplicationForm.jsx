import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';
import './MobileApplicationForm.css';

const MobileApplicationForm = ({ onClose, prefilledPosition = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cnic: '',
    position: prefilledPosition,
    qualification: '',
    experience: '',
    address: '',
    district: '',
    tehsil: '',
    uc: '',
    coverLetter: '',
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Lock body scroll when form is open
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';

    // Ensure form is visible with high z-index
    const formContainer = document.querySelector('.mobile-form-overlay');
    if (formContainer) {
      formContainer.style.zIndex = '99999';
    }

    // Add a brief delay before showing to ensure proper rendering
    setTimeout(() => {
      const container = document.querySelector('.mobile-form-container');
      if (container) {
        container.style.opacity = '1';
      }
    }, 50);

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
      document.body.style.height = 'auto';
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate CNIC format
      const cnicRegex = /^\d{5}-\d{7}-\d{1}$|^\d{13}$/;
      if (!cnicRegex.test(formData.cnic)) {
        throw new Error('Please enter a valid CNIC number (13 digits or in format 12345-1234567-1)');
      }

      // Add submission timestamp and source
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString(),
        source: 'mobile'
      };

      // Add to talent pool collection
      await addDoc(collection(db, 'talentPool'), submissionData);

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Application Submitted!',
        text: 'Your application has been submitted successfully. We will contact you when relevant opportunities arise.',
        confirmButtonColor: '#2AA96B',
        timer: 3000
      });

      // Close form
      onClose();

    } catch (error) {
      console.error('Error submitting application:', error);
      
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error.message || 'We couldn\'t submit your application. Please try again later.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mobile-form-overlay" style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="mobile-form-container" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#E3EBF2',
        padding: '20px',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        opacity: 0,
        transition: 'opacity 0.3s ease'
      }}>
        <button 
          className="mobile-form-close" 
          onClick={onClose}
          aria-label="Close form"
        >
          ×
        </button>

        <h2 className="mobile-form-title">
          <span className="highlight">Application</span> Form
        </h2>

        <Form onSubmit={handleSubmit} className="mobile-application-form">
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="Enter your phone number"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>CNIC Number</Form.Label>
            <Form.Control
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleInputChange}
              required
              placeholder="12345-1234567-1"
            />
            <Form.Text className="text-muted">
              Format: 12345-1234567-1 or 1234512345671
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              required
              placeholder="Enter desired position"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Qualification</Form.Label>
            <Form.Control
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              required
              placeholder="Enter your qualification"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Experience (Years)</Form.Label>
            <Form.Control
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              required
              placeholder="Enter years of experience"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="Enter your address"
            />
          </Form.Group>

          <div className="location-fields">
            <Form.Group className="mb-3">
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                required
                placeholder="District"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tehsil</Form.Label>
              <Form.Control
                type="text"
                name="tehsil"
                value={formData.tehsil}
                onChange={handleInputChange}
                required
                placeholder="Tehsil"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>UC</Form.Label>
              <Form.Control
                type="text"
                name="uc"
                value={formData.uc}
                onChange={handleInputChange}
                required
                placeholder="Union Council"
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Cover Letter</Form.Label>
            <Form.Control
              as="textarea"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              required
              placeholder="Tell us about yourself and why you're interested in this position"
              rows={4}
            />
          </Form.Group>

          <Button
            type="submit"
            className={`submit-button ${submitting ? 'loading' : ''}`}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default MobileApplicationForm; 