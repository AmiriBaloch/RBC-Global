import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaBriefcase } from 'react-icons/fa';
import { collection, addDoc, query, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';
import MobileApplicationForm from './MobileApplicationForm';
import './Careers.css';
import './shared.css';
import { Link } from 'react-router-dom';

const Careers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cnic: '',
    position: '',
    qualification: '',
    address: '',
    district: '',
    tehsil: '',
    experience: '',
    uc: '',
    coverLetter: '',
    submittedAt: ''
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    document.title = "Careers | Rosebelt Consultants";
    fetchJobs();
    
    // Check if mobile on mount and window resize
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth < 768;
      setIsMobileView(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchJobs = async () => {
    try {
      const jobsQuery = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
      const jobsSnapshot = await getDocs(jobsQuery);
      
      const jobsList = jobsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setJobs(jobsList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  const handleShowForm = (position = '') => {
    setFormData(prev => ({ ...prev, position }));
    setShowApplicationForm(true);
    setTimeout(() => {
      const form = document.getElementById('applicationForm');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleCloseMobileForm = () => {
    setShowMobileForm(false);
    document.body.classList.remove('form-open');
  };

  const handleShowApplicationForm = (jobTitle = '') => {
    console.log("handleShowApplicationForm called");
    
    // Update form data first if job title provided
    if (jobTitle) {
      setFormData(prev => ({...prev, position: jobTitle}));
    }
    
    if (isMobileView) {
      // For mobile, show the mobile form instead
      setSelectedPosition(jobTitle || '');
      setShowMobileForm(true);
      document.body.classList.add('form-open');
      return;
    }
    
    // For desktop, continue with normal flow
    // Set form visibility
    setShowApplicationForm(true);
    
    // Force body scroll to work on mobile
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    
    // Simple timeout for state update and scroll
    setTimeout(() => {
      const form = document.getElementById('applicationForm');
      if (form) {
        // Force form visibility
        form.style.display = 'block';
        form.style.visibility = 'visible';
        form.style.opacity = '1';
        form.style.zIndex = '9999';
        
        // Calculate offset based on viewport height
        const viewportHeight = window.innerHeight;
        const offset = viewportHeight < 768 ? 30 : 80;
        
        // Scroll to form with offset
        const formTop = form.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: formTop,
          behavior: 'smooth'
        });
        
        // Focus first input after scroll
        const firstInput = form.querySelector('input');
        if (firstInput) {
          setTimeout(() => {
            firstInput.focus();
          }, 500);
        }
      }
    }, 100);
  };

  const handleCloseForm = () => {
    setShowApplicationForm(false);
    document.body.classList.remove('form-open');
  };

  // Single click/touch handler for buttons with improved mobile support
  const handleButtonClick = (e, jobTitle = '') => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Button clicked/touched");
    
    // Add a small delay to avoid any touch event conflicts
    setTimeout(() => {
      handleShowApplicationForm(jobTitle);
    }, 10);
  };

  const benefits = [
    {
      title: 'Professional Growth',
      description: 'Continuous learning and development opportunities'
    },
    {
      title: 'Work-Life Balance',
      description: 'Flexible working hours and remote work options'
    },
    {
      title: 'Competitive Package',
      description: 'Attractive salary and comprehensive benefits'
    },
    {
      title: 'Global Exposure',
      description: 'Work with international clients and diverse teams'
    }
  ];

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
      // Validate CNIC format (Pakistani CNIC is 13 digits)
      const cnicRegex = /^\d{5}-\d{7}-\d{1}$|^\d{13}$/;
      if (!cnicRegex.test(formData.cnic)) {
        throw new Error('Please enter a valid CNIC number (13 digits or in format 12345-1234567-1)');
      }

      // CNIC duplication check removed to allow users to apply for multiple positions

      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString()
      };

      // Add document to Firebase
      await addDoc(collection(db, 'talentPool'), submissionData);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        cnic: '',
        position: '',
        qualification: '',
        address: '',
        district: '',
        tehsil: '',
        experience: '',
        uc: '',
        coverLetter: '',
        submittedAt: ''
      });
      
      setShowApplicationForm(false);
      
      // Show success message with SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Application Submitted!',
        text: 'Your application has been submitted successfully. We will contact you when relevant opportunities arise.',
        confirmButtonColor: '#2AA96B',
        timer: 3000
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      
      // Show error message with SweetAlert2
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

  // Add a modified render function for buttons based on device type
  const renderButton = (type, title, jobTitle = '') => {
    if (isMobileView) {
      // For mobile, use direct HTML anchor tags
      if (type === 'apply') {
        return (
          <a 
            href="#" 
            className="btn btn-success apply-now-btn"
            style={{
              backgroundColor: '#2AA96B',
              borderColor: '#2AA96B',
              padding: '12px 20px',
              fontSize: '16px',
              fontWeight: '500',
              display: 'inline-block',
              borderRadius: '4px',
              textDecoration: 'none',
              color: 'white',
              marginTop: '10px'
            }}
            onClick={(e) => {
              e.preventDefault();
              setSelectedPosition(jobTitle || '');
              setShowMobileForm(true);
              document.body.classList.add('form-open');
            }}
          >
            {title || 'Apply Now'}
          </a>
        );
      } else if (type === 'contact') {
        return (
          <a 
            href="/contact" 
            className="contact-btn"
            style={{
              backgroundColor: 'transparent',
              borderColor: '#f59e0b',
              borderWidth: '1px',
              borderStyle: 'solid',
              color: '#f59e0b',
              padding: '12px 20px',
              fontWeight: '500',
              fontSize: '16px',
              display: 'inline-block',
              borderRadius: '30px',
              textDecoration: 'none',
              marginTop: '10px'
            }}
          >
            Contact Us
          </a>
        );
      }
    } else {
      // For desktop, use regular Button components
      if (type === 'apply') {
        return (
          <Button
            className="apply-now-btn"
            style={{
              backgroundColor: '#2AA96B',
              borderColor: '#2AA96B',
              transition: 'all 0.3s ease',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: '500',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onClick={(e) => handleButtonClick(e, jobTitle)}
          >
            {title || 'Apply Now'}
          </Button>
        );
      } else if (type === 'contact') {
        return (
          <Button 
            variant="outline-light"
            size="lg" 
            as={Link}
            to="/contact"
            className="contact-btn"
            style={{
              backgroundColor: 'transparent', 
              borderColor: '#f59e0b',
              color: '#f59e0b',
              padding: '10px 25px',
              borderRadius: '30px',
              transition: 'all 0.3s ease'
            }}
          >
            Contact Us
          </Button>
        );
      }
    }
  };

  return (
    <div className="careers-page" style={{ backgroundColor: 'var(--page-bg)' }}>
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">Join Our <span style={{ color: '#f59e0b' }}>Team</span></h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                Be part of a dynamic team that's shaping the future of business consulting
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Benefits Section */}
      <section className="benefits-section py-5" style={{ backgroundColor: '#E3EBF2' }}>
        <div className="section-heading-container mb-4" style={{ backgroundColor: '#333333', borderRadius: '4px' }}>
          <Container>
            <h2 className="section-heading text-white py-2 px-3">
              <span style={{ color: '#f59e0b' }}>Why Choose</span> Rosebelt Consultants?
            </h2>
          </Container>
        </div>
        <Container>
          <div className="p-4 border rounded mb-4" style={{ backgroundColor: '#ffffff' }}>
          <Row>
            {benefits.map((benefit, index) => (
              <Col md={3} key={index} className="mb-4">
                  <Card className="benefit-card h-100" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #dee2e6' }}>
                  <Card.Body>
                      <h3 className="h5 mb-3" style={{ color: '#2AA96B', fontWeight: 600 }}>{benefit.title}</h3>
                    <p className="mb-0">{benefit.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          </div>
        </Container>
      </section>

      {/* Job Listings Section */}
      <section className="job-listings-section py-5" style={{ backgroundColor: '#E3EBF2' }}>
        <div className="section-heading-container mb-4" style={{ backgroundColor: '#333333', borderRadius: '4px' }}>
          <Container>
            <h2 className="section-heading text-white py-2 px-3">
              <span style={{ color: '#f59e0b' }}>Current</span> Openings
            </h2>
          </Container>
        </div>
        <Container>
          <div className="p-4 border rounded mb-4" style={{ backgroundColor: '#ffffff' }}>
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : jobs.length > 0 ? (
              <Row>
                {jobs.map(job => (
                  <Col lg={6} key={job.id} className="mb-4">
                    <Card className="job-card h-100" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #dee2e6' }}>
                      <Card.Header style={{ backgroundColor: '#2AA96B', color: 'white' }}>
                        <h3 className="h5 mb-0">{job.title}</h3>
                      </Card.Header>
                      <Card.Body>
                        <p className="job-description">{job.description}</p>
                        {renderButton('apply', 'Apply Now', job.title)}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Row className="justify-content-center">
                <Col md={8}>
                  <Card className="no-jobs-card text-center p-5" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #dee2e6' }}>
                    <Card.Body>
                      <div className="mb-4">
                        <FaBriefcase className="no-jobs-icon" style={{ fontSize: '4rem', color: '#2AA96B' }} />
                      </div>
                      <h3 className="mb-3" style={{ color: '#2AA96B' }}>No Positions Available</h3>
                      <p className="text-muted mb-4">
                        We currently don't have any open positions. Please check back later or join our talent pool to be notified of future opportunities.
                      </p>
                      <div className="d-grid gap-2 col-md-8 mx-auto">
                        {renderButton('apply', 'Join Our Talent Pool')}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
            
            {/* Quick Application Form under Current Openings (replacing Quick Actions) */}
            {isMobileView && (
              <div className="mt-4 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <h5 className="text-center mb-3" style={{ color: '#000', fontWeight: 'bold' }}>Quick Application Form</h5>
                <p className="text-center" style={{ color: '#666', fontSize: '14px' }}>Please fill out the form below to apply for this position.</p>
                <Form onSubmit={handleSubmit} className="mobile-application-form">
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your full name"
                          style={{ backgroundColor: '#333', color: '#fff', border: 'none' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your email"
                          style={{ backgroundColor: '#333', color: '#fff', border: 'none' }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your phone number"
                          style={{ backgroundColor: '#333', color: '#fff', border: 'none' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>CNIC Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="cnic"
                          value={formData.cnic}
                          onChange={handleInputChange}
                          required
                          placeholder="12345-1234567-1"
                          style={{ backgroundColor: '#333', color: '#fff', border: 'none' }}
                        />
                        <Form.Text style={{ fontSize: '12px', color: '#666' }}>
                          Format: 12345-1234567-1 or 1234512345671
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Position</Form.Label>
                        <Form.Control
                          type="text"
                          name="position"
                          value={formData.position}
                          onChange={handleInputChange}
                          required
                          placeholder="Positions for Trainers"
                          style={{ backgroundColor: '#333', color: '#fff', border: 'none' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Qualification</Form.Label>
                        <Form.Control
                          type="text"
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your qualification"
                          style={{ backgroundColor: '#333', color: '#fff', border: 'none' }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Experience (Years)</Form.Label>
                    <Form.Control
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter years of experience"
                      style={{ backgroundColor: '#333', color: '#fff', border: 'none' }}
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your address"
                      style={{ backgroundColor: '#333', color: '#fff', border: 'none' }}
                    />
                  </Form.Group>
                  
                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>District</Form.Label>
                        <Form.Control
                          type="text"
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          required
                          placeholder="District"
                          style={{ backgroundColor: '#333', color: '#fff', border: 'none' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Tehsil</Form.Label>
                        <Form.Control
                          type="text"
                          name="tehsil"
                          value={formData.tehsil}
                          onChange={handleInputChange}
                          required
                          placeholder="Tehsil"
                          style={{ backgroundColor: '#333', color: '#fff', border: 'none' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>UC (Union Council)</Form.Label>
                        <Form.Control
                          type="text"
                          name="uc"
                          value={formData.uc}
                          onChange={handleInputChange}
                          required
                          placeholder="Union Council"
                          style={{ backgroundColor: '#333', color: '#fff', border: 'none' }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Cover Letter / Additional Information</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us about yourself and why you're interested in this position"
                      style={{ backgroundColor: '#333', color: '#fff', border: 'none' }}
                    />
                  </Form.Group>
                  
                  <div className="d-grid gap-2">
                    <Button 
                      type="submit" 
                      className={`submit-button ${submitting ? 'loading' : ''}`}
                      style={{ 
                        backgroundColor: '#2AA96B', 
                        borderColor: '#2AA96B',
                        transition: 'all 0.3s ease',
                        padding: '12px 30px',
                        fontSize: '16px',
                        fontWeight: '500',
                        borderRadius: '0'
                      }}
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </div>
                  
                  {/* Add a direct contact link below the form */}
                  <div className="text-center mt-3">
                    <a
                      href="/contact"
                      className="btn btn-info"
                      style={{
                        width: '100%',
                        padding: '12px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        color: 'white',
                        textDecoration: 'none',
                        backgroundColor: '#f59e0b',
                        borderColor: '#f59e0b'
                      }}
                    >
                      Navigate to Contact Page
                    </a>
                  </div>
                </Form>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Application Form Section */}
      {showApplicationForm && (
        <section 
          id="applicationForm" 
          className="application-form-section py-5" 
          style={{ 
            backgroundColor: '#E3EBF2',
            opacity: 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          <div className="section-heading-container mb-4" style={{ backgroundColor: '#333333', borderRadius: '4px' }}>
            <Container>
              <h2 className="section-heading text-white py-2 px-3">
                <span style={{ color: '#f59e0b' }}>Application</span> Form
              </h2>
            </Container>
          </div>
          <Container>
            <div className="p-4 border rounded mb-4" style={{ backgroundColor: '#ffffff' }}>
              <Row className="justify-content-center">
                <Col md={10}>
                  <p className="text-center text-muted mb-4">
                    Please fill out the form below to apply for this position.
                  </p>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your full name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your email"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your phone number"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>CNIC Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="cnic"
                            value={formData.cnic}
                            onChange={handleInputChange}
                            placeholder="12345-1234567-1"
                            required
                          />
                          <Form.Text className="text-muted">
                            Format: 12345-1234567-1 or 1234512345671
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Position</Form.Label>
                          <Form.Control
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter desired position"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Qualification</Form.Label>
                          <Form.Control
                            type="text"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your qualification"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Experience (Years)</Form.Label>
                          <Form.Control
                            type="text"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter years of experience"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your address"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>District</Form.Label>
                          <Form.Control
                            type="text"
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            required
                            placeholder="District"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Tehsil</Form.Label>
                          <Form.Control
                            type="text"
                            name="tehsil"
                            value={formData.tehsil}
                            onChange={handleInputChange}
                            required
                            placeholder="Tehsil"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>UC (Union Council)</Form.Label>
                          <Form.Control
                            type="text"
                            name="uc"
                            value={formData.uc}
                            onChange={handleInputChange}
                            required
                            placeholder="Union Council"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Cover Letter / Additional Information</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        required
                        placeholder="Tell us about yourself and why you're interested in this position"
                      />
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button 
                        type="submit" 
                        className={`submit-button ${submitting ? 'loading' : ''}`}
                        style={{ 
                          backgroundColor: '#2AA96B', 
                          borderColor: '#2AA96B',
                          transition: 'all 0.3s ease',
                          padding: '12px 30px',
                          fontSize: '16px',
                          fontWeight: '500'
                        }}
                        disabled={submitting}
                      >
                        {submitting ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      )}

      {/* Mobile Application Form (for small screens) */}
      {showMobileForm && (
        <MobileApplicationForm 
          onClose={handleCloseMobileForm} 
          prefilledPosition={selectedPosition}
        />
      )}

      {/* Call to Action */}
      <section className="py-5 mb-0 text-white" style={{ backgroundColor: '#333333', borderRadius: '0' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h2 className="mb-3">Questions About <span style={{ color: '#f59e0b' }}>Careers?</span></h2>
              <p className="lead mb-4">
                Reach out to our HR team to learn more about working with Rosebelt Consultants
              </p>
              <div>
                {renderButton('contact')}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Add failsafe inline styles for mobile */}
      <style>{`
        /* Guaranteed mobile button styles - applied directly */
        @media (max-width: 767px) {
          a.btn, a.contact-btn, button.btn {
            -webkit-appearance: none !important;
            -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
            display: inline-block !important;
            text-align: center !important;
            touch-action: manipulation !important;
            user-select: none !important;
            border-radius: 8px !important;
            transition: none !important;
            position: relative !important;
            z-index: 9999 !important;
            cursor: pointer !important;
            font-size: 16px !important;
            padding: 12px 20px !important;
            margin: 10px auto !important;
            width: auto !important;
            min-width: 160px !important;
            max-width: 100% !important;
          }
          
          a.contact-btn {
            color: #f59e0b !important;
            background-color: transparent !important;
            border: 1px solid #f59e0b !important;
            text-decoration: none !important;
          }
          
          a.btn-success, button.apply-now-btn {
            background-color: #2AA96B !important;
            border-color: #2AA96B !important;
            color: white !important;
          }
          
          /* Make clickable areas large and obvious */
          a.btn:before, a.contact-btn:before, button.btn:before {
            content: "";
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            z-index: -1;
          }
          
          /* Clear any conflicting styles */
          .mobile-form-overlay, 
          .mobile-form-container {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 99999 !important;
          }
        }
      `}</style>

      {/* Add CSS for the buttons */}
      <style>{`
        .contact-btn:hover {
          background-color: #f59e0b !important;
          color: #333333 !important;
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);
        }
        
        .btn-success,
        button[style*="backgroundColor: '#2AA96B'"] {
          transition: all 0.3s ease;
        }
        
        .btn-success:hover,
        button[style*="backgroundColor: '#2AA96B'"]:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(42, 169, 107, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Careers; 