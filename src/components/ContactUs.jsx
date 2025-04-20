import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    projectType: '',
    budget: '',
    timeframe: '',
    description: '',
    preferredContact: 'email',
    howDidYouHear: '',
    newsletter: false
  });

  const [status, setStatus] = useState({ message: '', type: '' });
  const [submitting, setSubmitting] = useState(false);

  const projectTypes = [
    'Consulting',
    'Development',
    'Design',
    'Marketing',
    'Training',
    'Other'
  ];

  const timeframes = [
    'Immediate',
    'Within 1 month',
    '1-3 months',
    '3-6 months',
    'More than 6 months'
  ];

  const budgetRanges = [
    'Less than $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const sendEmailNotification = async (contactData) => {
    try {
      // EmailJS credentials
      const serviceId = 'service_r8zpq1p';
      const templateId = 'template_as41l6z';
      const publicKey = 'B96Mh1pKN_0DbW0kh';
      
      // 1. Send notification to admin
      const adminTemplateParams = {
        from_name: `${contactData.firstName} ${contactData.lastName}`,
        from_email: contactData.email,
        phone: contactData.phone || 'Not provided',
        company: contactData.company || 'Not provided',
        job_title: contactData.jobTitle || 'Not provided',
        project_type: contactData.projectType || 'Not provided',
        budget: contactData.budget || 'Not provided',
        timeframe: contactData.timeframe || 'Not provided',
        description: contactData.description,
        contact_preference: contactData.preferredContact,
        message: `New contact from ${contactData.firstName} ${contactData.lastName} (${contactData.email}).
                  Project type: ${contactData.projectType || 'Not specified'}
                  Budget: ${contactData.budget || 'Not specified'}
                  Description: ${contactData.description}`,
        subject: `New Contact Form Submission: ${contactData.firstName} ${contactData.lastName}`,
      };
      
      await emailjs.send(serviceId, templateId, adminTemplateParams, publicKey);
      console.log('Admin notification email sent successfully');
      
      // 2. Send confirmation to the client
      const clientTemplateParams = {
        to_name: `${contactData.firstName} ${contactData.lastName}`,
        to_email: contactData.email,
        from_name: 'RoseBelt Consultants',
        message: `Dear ${contactData.firstName},

Thank you for contacting RoseBelt Consultants. We have received your message regarding:
${contactData.projectType ? `Project Type: ${contactData.projectType}` : ''}
${contactData.budget ? `Budget: ${contactData.budget}` : ''}

We appreciate your interest in our services and will review your inquiry promptly. A member of our team will be in touch with you shortly.

Best regards,
The RoseBelt Consultants Team`,
        subject: 'Thank you for contacting RoseBelt Consultants',
        reply_to: 'no-reply@rosebeltconsultants.com'
      };
      
      await emailjs.send(serviceId, templateId, clientTemplateParams, publicKey);
      console.log('Client confirmation email sent successfully');
    } catch (error) {
      console.error('Failed to send email notification:', error);
      // Don't throw the error so the form submission still completes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ message: '', type: '' });

    try {
      // Basic validation
      const requiredFields = ['firstName', 'lastName', 'email', 'description'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        throw new Error('Please fill in all required fields');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Phone validation (if provided)
      if (formData.phone) {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(formData.phone)) {
          throw new Error('Please enter a valid phone number');
        }
      }

      const contactData = {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'New'
      };

      // Add to Firestore
      await addDoc(collection(db, 'contacts'), contactData);
      
      // Send email notification
      await sendEmailNotification(contactData);
      
      setStatus({
        message: 'Thank you for your message! We will get back to you soon.',
        type: 'success'
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        projectType: '',
        budget: '',
        timeframe: '',
        description: '',
        preferredContact: 'email',
        howDidYouHear: '',
        newsletter: false
      });

    } catch (error) {
      setStatus({
        message: error.message || 'Something went wrong. Please try again.',
        type: 'danger'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">Get In <span style={{ color: '#f59e0b' }}>Touch</span></h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                We're here to help with your business needs
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="contact-container py-5">
        <div className="section-heading-container mb-4" style={{ backgroundColor: '#333333', borderRadius: '4px' }}>
          <Container>
            <h2 className="section-heading text-white py-2 px-3">
              <span style={{ color: '#f59e0b' }}>Contact</span> Us
            </h2>
          </Container>
        </div>

        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            {status.message && (
              <Alert 
                variant={status.type} 
                dismissible 
                onClose={() => setStatus({ message: '', type: '' })}
              >
                {status.message}
              </Alert>
            )}

            <Form onSubmit={handleSubmit} className="contact-form">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Optional"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Project Type</Form.Label>
                    <Form.Select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                    >
                      <option value="">Select Project Type</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Budget Range</Form.Label>
                    <Form.Select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value="">Select Budget Range</option>
                      {budgetRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Timeframe</Form.Label>
                    <Form.Select
                      name="timeframe"
                      value={formData.timeframe}
                      onChange={handleChange}
                    >
                      <option value="">Select Timeframe</option>
                      {timeframes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Preferred Contact Method</Form.Label>
                    <Form.Select
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleChange}
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Project Description <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Please describe your project, requirements, and any specific questions you have..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>How did you hear about us?</Form.Label>
                <Form.Control
                  type="text"
                  name="howDidYouHear"
                  value={formData.howDidYouHear}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Check
                  type="checkbox"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  label="Subscribe to our newsletter for updates and insights"
                />
              </Form.Group>

              <div className="text-center">
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={submitting}
                  className="submit-btn"
                  style={{ 
                    backgroundColor: '#2AA96B', 
                    borderColor: '#2AA96B',
                    transition: 'all 0.3s ease',
                    padding: '10px 30px'
                  }}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs; 