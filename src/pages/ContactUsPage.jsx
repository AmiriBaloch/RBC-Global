import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './ContactUsPage.css';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null); // Reset status on new submission attempt
    setErrorMessage('');

    try {
      // Show success message with SweetAlert
      await Swal.fire({
        title: 'Thank you!',
        text: 'We will get back to you shortly.',
        icon: 'success',
        confirmButtonColor: '#2AA96B',
        confirmButtonText: 'OK'
      });
      
      // Clear the form after showing the message
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonColor: '#2AA96B'
      });
    }
  };

  return (
    <div className="contact-us-page">
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">Contact Us</h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                Get in touch with Rosebelt Consultants Global
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row>
          <Col>
            {/* Social Media and Email Section */}
            <div className="contact-icons d-flex justify-content-center mb-4">
              <a href="https://www.instagram.com/rosebeltconsultantsglobal/" target="_blank" rel="noopener noreferrer" className="contact-icon me-3">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://www.facebook.com/share/16QfztW6BQ/" target="_blank" rel="noopener noreferrer" className="contact-icon me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://wa.me/923051564945" target="_blank" rel="noopener noreferrer" className="contact-icon me-3">
                <i className="bi bi-whatsapp"></i>
              </a>
              <a href="https://www.linkedin.com/company/rosebelt/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="contact-icon me-3">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="mailto:your.email@example.com" className="contact-icon">
                 <i className="bi bi-envelope-fill"></i>
              </a>
            </div>

            {/* Contact Form Section */}
            <div className="contact-form">
              <h2 className="text-center mb-3">Send us a message</h2>
              
              {submitStatus === 'success' && (
                <Alert variant="success" onClose={() => setSubmitStatus(null)} dismissible>
                  <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                    {errorMessage}
                  </pre>
                </Alert>
              )}

              {submitStatus === 'error' && (
                <Alert variant="danger" onClose={() => setSubmitStatus(null)} dismissible>
                  Error: {errorMessage || 'Something went wrong. Please try again.'}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter your full name" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMessage">
                  <Form.Label>Your Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    placeholder="Enter your message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUsPage; 