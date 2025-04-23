import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaBriefcase } from 'react-icons/fa';
import { collection, addDoc, query, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';
import './Careers.css';
import './shared.css';

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

  useEffect(() => {
    document.title = "Careers | Rosebelt Consultants";
    fetchJobs();
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

  const handleShowApplicationForm = () => {
    setShowApplicationForm(true);
    setTimeout(() => {
      document.getElementById('applicationForm').scrollIntoView({ behavior: 'smooth' });
    }, 100);
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

      // Check if CNIC already exists in the database
      const talentPoolRef = collection(db, 'talentPool');
      const q = query(talentPoolRef, where("cnic", "==", formData.cnic));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        throw new Error('An application with this CNIC already exists. You cannot apply twice with the same CNIC.');
      }

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
                        <Button
                          style={{ 
                            backgroundColor: '#2AA96B', 
                            borderColor: '#2AA96B',
                            transition: 'all 0.3s ease'
                          }}
                          onClick={handleShowApplicationForm}
                        >
                          Apply Now
                        </Button>
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
                        We currently don't have any open positions. Please check back later or subscribe to our newsletter to be notified of future opportunities.
                      </p>
                      <div className="d-grid gap-2 col-md-8 mx-auto">
                        <Button 
                          style={{ 
                            backgroundColor: '#2AA96B', 
                            borderColor: '#2AA96B',
                            transition: 'all 0.3s ease'
                          }} 
                          onClick={handleShowApplicationForm}
                        >
                          Join Our Talent Pool
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </div>
        </Container>
      </section>

      {/* Application Form Section */}
      {showApplicationForm && (
        <section id="applicationForm" className="application-form-section py-5" style={{ backgroundColor: '#E3EBF2' }}>
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
                          <Form.Label style={{ fontWeight: 'bold', color: '#000' }}>Desired Position</Form.Label>
                            <Form.Control
                              type="text"
                              name="position"
                              value={formData.position}
                              onChange={handleInputChange}
                            required
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
                        />
                      </Form.Group>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Button 
                        type="submit" 
                        style={{ 
                          backgroundColor: '#2AA96B', 
                          borderColor: '#2AA96B',
                          transition: 'all 0.3s ease',
                          padding: '10px 30px'
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
                <Button 
                  variant="outline-light"
                  size="lg" 
                  href="/contact"
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
              </div>
            </Col>
          </Row>
        </Container>
      </section>

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