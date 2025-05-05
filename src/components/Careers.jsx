import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaBriefcase } from 'react-icons/fa';
import { collection, addDoc, query, orderBy, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';
// MobileApplicationForm component has been removed
import './Careers.css';
import './shared.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import handleApplyNow from '../utils/applyNowHandler';

// Application Form component
const ApplicationForm = ({ position = '', onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    cnic: '',
    email: '',
    position: '',
    qualification: '',
    experience: '',
    address: '',
    district: '',
    tehsil: '',
    unionCouncil: '',
    coverLetter: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    // Update position if it changes
    if (position) {
      setFormData(prev => ({ ...prev, position }));
    }
  }, [position]);
  
  const positions = [
    'District Manager',
    'Trainer',
    'Supervisor',
    'Surveyor'
  ];
  
  const experiences = ['0', '1', '2', '3', '4', '5'];
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.fatherName.trim()) newErrors.fatherName = 'Father name is required';
    if (!formData.cnic.trim()) newErrors.cnic = 'CNIC is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.tehsil.trim()) newErrors.tehsil = 'Tehsil is required';
    if (!formData.unionCouncil.trim()) newErrors.unionCouncil = 'Union Council is required';
    if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
    
    // Note: Duplicate application validation is performed in handleInputChange and handleSubmit
    // We don't need to check it again here as it's already being checked when fields change
    // and will be confirmed again during submission
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
    
    // Check for duplicate application when CNIC or position changes and both have values
    if ((name === 'cnic' || name === 'position') && formData.cnic && formData.position) {
      const checkForDuplicateApplication = async () => {
        try {
          // Use the position that was just selected if that's what changed, otherwise use the existing one
          const positionToCheck = name === 'position' ? value : formData.position;
          // Use the CNIC that was just entered if that's what changed, otherwise use the existing one
          const cnicToCheck = name === 'cnic' ? value : formData.cnic;
          
          // Only perform check if both values exist
          if (positionToCheck && cnicToCheck) {
            const collectionName = positionToCheck.replace(/\s+/g, '');
            const existingApplicationsQuery = query(
              collection(db, collectionName),
              where("cnic", "==", cnicToCheck)
            );
            
            const existingApplicationsSnapshot = await getDocs(existingApplicationsQuery);
            
            if (!existingApplicationsSnapshot.empty) {
              // Add error for position field
              setErrors(prev => ({
                ...prev,
                position: 'You have already applied for this position with this CNIC'
              }));
            }
          }
        } catch (error) {
          console.error("Error checking for duplicate application:", error);
        }
      };
      
      // Execute the check
      checkForDuplicateApplication();
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = document.querySelector('.is-invalid');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Determine which collection to use based on position
      const collectionName = formData.position.replace(/\s+/g, '');
      
      // Check if the person has already applied for this position
      const existingApplicationsQuery = query(
        collection(db, collectionName),
        where("cnic", "==", formData.cnic)
      );
      
      const existingApplicationsSnapshot = await getDocs(existingApplicationsQuery);
      
      if (!existingApplicationsSnapshot.empty) {
        setIsSubmitting(false);
        Swal.fire({
          icon: 'warning',
          title: 'Application Already Exists',
          text: 'You have already applied for this position. You can apply for different positions.',
          confirmButtonColor: '#f59e0b'
        });
        return;
      }
      
      await addDoc(collection(db, collectionName), {
        ...formData,
        createdAt: new Date()
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Application Submitted!',
        text: 'Thank you for your application. We will get back to you soon.',
        confirmButtonColor: '#2AA96B'
      });
      
      // Reset form
      resetForm();
      
      // Close form if callback exists
      if (onClose) onClose();
      
    } catch (error) {
      console.error("Error submitting application:", error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an error submitting your application. Please try again.',
        confirmButtonColor: '#dc3545'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      fullName: '',
      fatherName: '',
      cnic: '',
      email: '',
      position: '',
      qualification: '',
      experience: '',
      address: '',
      district: '',
      tehsil: '',
      unionCouncil: '',
      coverLetter: ''
    });
  };
  
  // Label with red star
  const FormLabel = ({ children }) => (
    <Form.Label style={{ color: '#000000', fontWeight: '500', marginBottom: '8px' }}>
      {children} <span style={{ color: 'red' }}>*</span>
    </Form.Label>
  );
  
  return (
    <div className="application-form-container" style={{ marginTop: 0 }}>
      <Card className="application-form-card" style={{ border: '1px solid #dee2e6', backgroundColor: '#e4ebf2' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <FormLabel>Full Name</FormLabel>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.fullName}
                    placeholder="Enter your full name"
                  />
                  <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <FormLabel>Father Name</FormLabel>
                  <Form.Control
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.fatherName}
                    placeholder="Enter your father's name"
                  />
                  <Form.Control.Feedback type="invalid">{errors.fatherName}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <FormLabel>CNIC</FormLabel>
                  <Form.Control
                    type="text"
                    name="cnic"
                    value={formData.cnic}
                    onChange={handleInputChange}
                    isInvalid={!!errors.cnic}
                    placeholder="00000-0000000-0"
                  />
                  <Form.Control.Feedback type="invalid">{errors.cnic}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <FormLabel>Email</FormLabel>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    isInvalid={!!errors.email}
                    placeholder="Enter your email address"
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <FormLabel>Position</FormLabel>
                  <Form.Select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    isInvalid={!!errors.position}
                  >
                    <option value="">Select your position</option>
                    {positions.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.position}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <FormLabel>Qualification</FormLabel>
                  <Form.Control
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    isInvalid={!!errors.qualification}
                    placeholder="Enter your qualification"
                  />
                  <Form.Control.Feedback type="invalid">{errors.qualification}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <FormLabel>Experience (Years)</FormLabel>
                  <Form.Select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    isInvalid={!!errors.experience}
                  >
                    <option value="">Select years of experience</option>
                    {experiences.map(exp => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.experience}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <FormLabel>Address</FormLabel>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    isInvalid={!!errors.address}
                    placeholder="Enter your address"
                  />
                  <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <FormLabel>District</FormLabel>
                  <Form.Control
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    isInvalid={!!errors.district}
                    placeholder="Enter your district"
                  />
                  <Form.Control.Feedback type="invalid">{errors.district}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <FormLabel>Tehsil</FormLabel>
                  <Form.Control
                    type="text"
                    name="tehsil"
                    value={formData.tehsil}
                    onChange={handleInputChange}
                    isInvalid={!!errors.tehsil}
                    placeholder="Enter your tehsil"
                  />
                  <Form.Control.Feedback type="invalid">{errors.tehsil}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <FormLabel>Union Council</FormLabel>
                  <Form.Control
                    type="text"
                    name="unionCouncil"
                    value={formData.unionCouncil}
                    onChange={handleInputChange}
                    isInvalid={!!errors.unionCouncil}
                    placeholder="Enter your union council"
                  />
                  <Form.Control.Feedback type="invalid">{errors.unionCouncil}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <FormLabel>Cover Letter</FormLabel>
              <Form.Control
                as="textarea"
                rows={4}
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                isInvalid={!!errors.coverLetter}
                placeholder="Tell us why you are interested in this position and why you would be a good fit..."
              />
              <Form.Control.Feedback type="invalid">{errors.coverLetter}</Form.Control.Feedback>
            </Form.Group>
            
            <div className="d-flex justify-content-end mt-4">
              {onClose && (
                <Button 
                  variant="outline-secondary" 
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="me-2"
                  size="sm"
                  style={{ width: 'auto', padding: '8px 16px', fontSize: '0.9rem' }}
                >
                  Cancel
                </Button>
              )}
              <Button 
                variant="success" 
                type="submit" 
                style={{ backgroundColor: '#2AA96B', borderColor: '#2AA96B', width: 'auto', padding: '8px 16px', fontSize: '0.9rem' }}
                disabled={isSubmitting}
                size="sm"
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : "Submit Application"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

const Careers = () => {
  // Removed form data state
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [permanentlyShowForm, setPermanentlyShowForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    
    // Check if we need to show the application form
    const shouldShowForm = location.hash === '#application-form-section';
    
    // Check for position in URL parameters
    const params = new URLSearchParams(location.search);
    const positionParam = params.get('position');
    
    // If we have a position or hash, show the form
    if (positionParam || shouldShowForm) {
      if (positionParam) {
        setSelectedPosition(positionParam);
      }
      
      setShowApplicationForm(true);
      setPermanentlyShowForm(true);
      
      // Wait for form to be ready then scroll to it
      setTimeout(() => {
        const formElement = document.getElementById('application-form-section');
        if (formElement) {
          // Use window.scrollTo with offset to account for potential fixed headers
          window.scrollTo({
            top: formElement.offsetTop - 50,
            behavior: 'smooth'
          });
        }
      }, 500);
    }
    
    // Save in sessionStorage to persist across page refreshes
    if (shouldShowForm || positionParam) {
      sessionStorage.setItem('showApplicationForm', 'true');
    }

    // Check sessionStorage when component mounts
    const savedShowForm = sessionStorage.getItem('showApplicationForm');
    if (savedShowForm === 'true') {
      setPermanentlyShowForm(true);
      setShowApplicationForm(true);
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [location.search, location.hash]);

  const fetchJobs = async () => {
    try {
      // Use a single orderBy to avoid requiring a composite index
      const jobsQuery = query(
        collection(db, 'jobs'), 
        orderBy('createdAt', 'desc')
      );
      const jobsSnapshot = await getDocs(jobsQuery);
      
      const jobsList = jobsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
        id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt || Date.now()),
          timestamp: data.timestamp?.toDate?.() || new Date(data.timestamp || Date.now())
        };
      });
      
      // Sort in memory by createdAt first, then by timestamp
      const sortedJobs = jobsList.sort((a, b) => {
        // Convert to Date objects if they aren't already
        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt || 0);
        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt || 0);
        
        if (dateA.getTime() !== dateB.getTime()) {
          return dateB - dateA; // Descending order
        }
        
        // If createdAt dates are the same, sort by timestamp
        const timestampA = a.timestamp instanceof Date ? a.timestamp : new Date(a.timestamp || 0);
        const timestampB = b.timestamp instanceof Date ? b.timestamp : new Date(b.timestamp || 0);
        return timestampB - timestampA;
      });
      
      setJobs(sortedJobs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  const handleCloseMobileForm = () => {
    if (!permanentlyShowForm) {
    setShowMobileForm(false);
    document.body.classList.remove('form-open');
    }
  };

  const handleShowApplicationForm = (jobTitle = '') => {
    setSelectedPosition(jobTitle || '');
    setShowApplicationForm(true);
    
    if (isMobileView) {
      // For mobile, show the mobile form instead
      setShowMobileForm(true);
      document.body.classList.add('form-open');
      return;
    }
    
    // Scroll to application form
    setTimeout(() => {
      const formElement = document.getElementById('application-form-section');
      if (formElement) {
        // Use window.scrollTo with offset to account for potential fixed headers
        window.scrollTo({
          top: formElement.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Single click/touch handler for buttons with improved mobile support
  const handleButtonClick = (e, jobTitle = '') => {
    e.preventDefault(); // Prevent default link behavior
    
    // We're already on the Careers page, so use local navigation
    setSelectedPosition(jobTitle || '');
    setPermanentlyShowForm(true);
    setShowApplicationForm(true);
    
    // Save in sessionStorage
    sessionStorage.setItem('showApplicationForm', 'true');
    
    // More reliable scrolling technique for all devices
    setTimeout(() => {
      try {
        const formElement = document.getElementById('application-form-section');
        if (formElement) {
          // First approach: smooth scroll with offset
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // As a backup, also use window.scrollTo
          setTimeout(() => {
            const yOffset = -50;
            const y = formElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }, 100);
        }
      } catch (error) {
        console.error("Error scrolling to form:", error);
        // Fallback method
        const formY = document.getElementById('application-form-section')?.offsetTop || 1000;
        window.scrollTo({ top: formY - 50, behavior: 'smooth' });
      }
    }, 200);
  };

  // Benefits array removed

  // Form-related functions have been removed

  // Update renderButton - make mobile view use the same approach
  const renderButton = (type, text = '', jobTitle = '') => {
    if (type === 'apply') {
      // Use the same button type for all devices
      return (
        <Button 
          variant="success" 
          className="mt-3 apply-now-btn"
          size="sm"
          style={{ 
            backgroundColor: '#2AA96B', 
            borderColor: '#2AA96B',
            width: 'auto',
            padding: '8px 16px',
            fontSize: '0.9rem'
          }}
          onClick={(e) => handleButtonClick(e, jobTitle)}
        >
          {text || 'Apply Now'}
        </Button>
      );
    } else if (type === 'contact') {
      // For mobile view, create a direct link to contact page
      if (isMobileView) {
        return (
          <a 
            href="/contact"
            className="contact-btn"
            style={{
              display: 'inline-block',
              backgroundColor: 'transparent',
              color: '#f59e0b',
              padding: '8px 16px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
              margin: '10px 0',
              fontSize: '0.9rem',
              border: '1px solid #f59e0b'
            }}
          >
            Contact Us
          </a>
        );
      }
      
      // For desktop view
      return (
        <Link
          to="/contact"
          className="btn contact-btn"
          style={{
            color: '#f59e0b',
            backgroundColor: 'transparent',
            borderColor: '#f59e0b',
            padding: '8px 16px',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}
        >
          Contact Us
        </Link>
      );
    }
    
    return null;
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
                        <p className="job-description" style={{ whiteSpace: 'pre-line' }}>{job.description}</p>
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
          </div>
        </Container>
      </section>

      {/* Application Form Section - Make sure it's always visible */}
      <section id="application-form-section" className="application-form-section py-5" style={{ 
        backgroundColor: '#e4ebf2', 
        paddingTop: 0, 
        marginTop: '-100px',
        display: 'block', // Ensure it's always visible
        opacity: 1,
        visibility: 'visible'
      }}>
        <div className="section-heading-container mb-4" style={{ backgroundColor: '#333333', borderRadius: '4px' }}>
          <Container>
            <h2 className="section-heading text-white py-2 px-3">
              <span style={{ color: '#f59e0b' }}>Application</span> Form
            </h2>
          </Container>
        </div>
        <Container>
          <div className="p-4 border rounded mb-4" style={{ backgroundColor: '#ffffff' }}>
            <ApplicationForm 
              position={selectedPosition} 
              onClose={permanentlyShowForm ? undefined : () => setShowApplicationForm(false)} 
            />
          </div>
        </Container>
      </section>

      {/* Mobile Application Form Modal */}
      {showMobileForm && (
        <div className="mobile-form-overlay">
          <div className="mobile-form-container modern-mobile-container" style={{ backgroundColor: '#e4ebf2' }}>
            <Button 
              variant="light" 
              className="close-mobile-form" 
              onClick={handleCloseMobileForm}
              aria-label="Close form"
              size="sm"
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 1050,
                fontSize: '1.2rem',
                lineHeight: 1,
                padding: '4px 8px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: 'none'
              }}
            >
              ×
              </Button>
            <ApplicationForm 
              position={selectedPosition} 
              onClose={handleCloseMobileForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers; 