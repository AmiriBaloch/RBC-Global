import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { FaBriefcase } from 'react-icons/fa';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Careers.css';
import './shared.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import handleApplyNow from '../utils/applyNowHandler';

const COUNTRY_LIST = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina',
  'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh',
  'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
  'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
  'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros',
  'Congo (Congo-Brazzaville)', 'Costa Rica', 'Côte d’Ivoire', 'Croatia', 'Cuba', 'Cyprus',
  'Czechia (Czech Republic)', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica',
  'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia',
  'Eswatini (fmr. "Swaziland")', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia',
  'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti',
  'Holy See', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
  'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait',
  'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
  'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
  'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco',
  'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (formerly Burma)', 'Namibia', 'Nauru',
  'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea',
  'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine State', 'Panama',
  'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
  'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
  'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
  'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
  'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
  'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago',
  'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
  'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela',
  'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    fathersName: '',
    dob: '',
    gender: '',
    nationality: '',
    maritalStatus: '',
    email: '',
    phone: '',
    address: '',
    // Position Details
    position: '',
    preferredLocation: '',
    expectedSalary: '',
    // Education Details
    educationDegree: '',
    educationInstitution: '',
    educationMajor: '',
    // Documents
    cvFile: null,
    profilePhotoFile: null
  });
  const formRef = useRef(null);
  const cvInputRef = useRef(null);
  const photoInputRef = useRef(null);

  // Cloudinary client-only configuration (requires an unsigned upload preset)
  // Create an unsigned preset in Cloudinary console and set its name below or in env as VITE_CLOUDINARY_UPLOAD_PRESET
  const CLOUDINARY_CLOUD_NAME = 'dxaommd67';
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'cv_unsigned';
  const CLOUDINARY_IMAGE_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_IMAGE_UPLOAD_PRESET || 'profile_unsigned';
  const CLOUDINARY_FOLDER = 'cvs';
  const CLOUDINARY_PHOTO_FOLDER = 'profile-photoes';

  useEffect(() => {
    document.title = "RBC | JOIN OUR TEAM";
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
      
      const sortedJobs = jobsList.sort((a, b) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt || 0);
        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt || 0);
        
        if (dateA.getTime() !== dateB.getTime()) {
          return dateB - dateA;
        }
        
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

  const renderButton = (type, text = '') => {
    if (type === 'apply') {
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
          onClick={(e) => handleApplyNow(e, text === 'Apply Now' ? '' : text)}
        >
          {text || 'Apply Now'}
        </Button>
      );
    } else if (type === 'contact') {
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

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cvFile') {
      const selectedFile = files && files[0] ? files[0] : null;
      if (selectedFile) {
        const isPdf = selectedFile.type === 'application/pdf' ||
                      selectedFile.name.toLowerCase().endsWith('.pdf');
        if (!isPdf) {
          if (e.target) {
            e.target.value = '';
          }
          Swal.fire({
            title: 'Invalid file type',
            text: 'Please upload a PDF file only.',
            icon: 'warning',
            confirmButtonColor: '#2AA96B'
          });
          setFormData(prev => ({ ...prev, cvFile: null }));
          return;
        }
        const maxBytes = 1024 * 1024; // 1 MB
        if (selectedFile.size > maxBytes) {
          if (e.target) {
            e.target.value = '';
          }
          Swal.fire({
            title: 'File too large',
            text: 'CV must be smaller than 1 MB.',
            icon: 'warning',
            confirmButtonColor: '#2AA96B'
          });
          setFormData(prev => ({ ...prev, cvFile: null }));
          return;
        }
      }
      setFormData(prev => ({ ...prev, cvFile: selectedFile }));
    } else if (name === 'profilePhotoFile') {
      const selectedPhoto = files && files[0] ? files[0] : null;
      if (selectedPhoto) {
        const isImage = selectedPhoto.type.startsWith('image/') || /\.(jpg|jpeg|png|webp)$/i.test(selectedPhoto.name);
        if (!isImage) {
          if (e.target) e.target.value = '';
          Swal.fire({
            title: 'Invalid file type',
            text: 'Profile photo must be an image (JPG, PNG, WEBP).',
            icon: 'warning',
            confirmButtonColor: '#2AA96B'
          });
          setFormData(prev => ({ ...prev, profilePhotoFile: null }));
          return;
        }
        const maxBytes = 1024 * 1024; // 1 MB
        if (selectedPhoto.size > maxBytes) {
          if (e.target) e.target.value = '';
          Swal.fire({
            title: 'File too large',
            text: 'Profile photo must be smaller than 1 MB.',
            icon: 'warning',
            confirmButtonColor: '#2AA96B'
          });
          setFormData(prev => ({ ...prev, profilePhotoFile: null }));
          return;
        }
      }
      setFormData(prev => ({ ...prev, profilePhotoFile: selectedPhoto }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setErrorMessage('');
    
    if (!formData.cvFile) {
      setSubmitStatus('error');
      setErrorMessage('Please attach your CV (PDF).');
      return;
    }
    if (!formData.profilePhotoFile) {
      setSubmitStatus('error');
      setErrorMessage('Please attach your profile photo.');
      return;
    }
    
    if (!CLOUDINARY_UPLOAD_PRESET) {
      setSubmitStatus('error');
      setErrorMessage('Upload preset is not configured.');
      return;
    }
    if (!CLOUDINARY_IMAGE_UPLOAD_PRESET) {
      setSubmitStatus('error');
      setErrorMessage('Image upload preset is not configured.');
      return;
    }

    try {
      setIsSubmitting(true);
      // Upload Profile Photo first (image)
      const photoUploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
      const photoData = new FormData();
      photoData.append('file', formData.profilePhotoFile);
      photoData.append('upload_preset', CLOUDINARY_IMAGE_UPLOAD_PRESET);
      photoData.append('folder', CLOUDINARY_PHOTO_FOLDER);
      photoData.append('tags', 'applications,profile-photo');
      const photoPublicId = `${(formData.fullName || 'applicant')}_photo_${Date.now()}`.replace(/[^a-zA-Z0-9_-]/g, '_');
      photoData.append('public_id', photoPublicId);
      const photoResp = await fetch(photoUploadUrl, { method: 'POST', body: photoData });
      if (!photoResp.ok) {
        throw new Error('Failed to upload profile photo to Cloudinary');
      }
      const photoResult = await photoResp.json();

      // Upload CV to Cloudinary (use resource_type raw for PDFs)
      const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`;
      const data = new FormData();
      data.append('file', formData.cvFile);
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      data.append('folder', CLOUDINARY_FOLDER);
      // Tag for unsigned listing in admin (requires 'Resource lists' enabled in Cloudinary settings)
      data.append('tags', 'applications,cv');
      // Enrich with context/metadata
      data.append('context', `full_name=${formData.fullName}|email=${formData.email}|phone=${formData.phone}|position=${formData.position}`);
      const publicIdSafe = `${formData.fullName || 'applicant'}_${Date.now()}`.replace(/[^a-zA-Z0-9_-]/g, '_');
      data.append('public_id', publicIdSafe);

      const resp = await fetch(uploadUrl, { method: 'POST', body: data });
      if (!resp.ok) {
        throw new Error('Failed to upload CV to Cloudinary');
      }
      const result = await resp.json();

      await Swal.fire({
        title: 'Application submitted',
        html: 'Thank you for applying. Your CV has been uploaded successfully.',
        icon: 'success',
        confirmButtonColor: '#2AA96B',
        confirmButtonText: 'OK'
      });

      setFormData({
        fullName: '',
        fathersName: '',
        dob: '',
        gender: '',
        nationality: '',
        maritalStatus: '',
        email: '',
        phone: '',
        address: '',
        position: '',
        preferredLocation: '',
        expectedSalary: '',
        educationDegree: '',
        educationInstitution: '',
        educationMajor: '',
        cvFile: null,
        profilePhotoFile: null
      });
      if (formRef.current) {
        formRef.current.reset();
      }
      if (cvInputRef.current) {
        cvInputRef.current.value = '';
      }
      if (photoInputRef.current) {
        photoInputRef.current.value = '';
      }
      setSubmitStatus('success');
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage('Something went wrong while uploading your CV. Please try again.');
    }
    finally {
      setIsSubmitting(false);
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

          {/* Application Form Section */}
          <div id="application-form-section" className="p-4 border rounded mb-4" style={{ backgroundColor: '#ffffff' }}>
            <h3 className="mb-3" style={{ color: '#2AA96B' }}>Apply Now</h3>
            <p className="text-muted" style={{ marginTop: '-8px' }}>Fill out the form below to apply for a position.</p>

            {submitStatus === 'error' && (
              <Alert variant="danger" onClose={() => setSubmitStatus(null)} dismissible>
                {errorMessage || 'Something went wrong. Please try again.'}
              </Alert>
            )}

            <Form onSubmit={handleSubmit} ref={formRef}>
              <h4 className="mb-3 mt-4" style={{ color: '#2AA96B', fontWeight: 'bold', borderBottom: '2px solid #2AA96B', paddingBottom: '8px' }}>Personal Information</h4>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="applyFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="applyEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="applyFathersName">
                    <Form.Label>Father’s Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter father’s name"
                      name="fathersName"
                      value={formData.fathersName}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3} className="mb-3">
                  <Form.Group controlId="applyDob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={3} className="mb-3">
                  <Form.Group controlId="applyGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleFormChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="applyNationality">
                    <Form.Label>Nationality</Form.Label>
                    <Form.Select
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleFormChange}
                    >
                      <option value="">Select Nationality</option>
                      {COUNTRY_LIST.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="applyMarital">
                    <Form.Label>Marital Status</Form.Label>
                    <Form.Select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleFormChange}
                    >
                      <option value="">Select Marital Status</option>
                      <option value="Married">Married</option>
                      <option value="Single">Single</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="applyPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your phone number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="applyAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      size="sm"
                      placeholder="Enter your current address"
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      style={{ height: '48px', minHeight: '48px', paddingTop: '6px', paddingBottom: '6px' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h4 className="mb-3 mt-4" style={{ color: '#2AA96B', fontWeight: 'bold', borderBottom: '2px solid #2AA96B', paddingBottom: '8px' }}>Position Details</h4>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="applyPosition">
                    <Form.Label>Position</Form.Label>
                    <Form.Select
                      name="position"
                      value={formData.position}
                      onChange={handleFormChange}
                      required
                    >
                      <option value="">Select Position</option>
                      <option value="Divisional Coordinator for Monitoring and Evaluation of Vaccination Campaign">Divisional Coordinator for Monitoring and Evaluation of Vaccination Campaign</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="applyPreferredLocation">
                    <Form.Label>Preferred Work Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City / Region"
                      name="preferredLocation"
                      value={formData.preferredLocation}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="applyExpectedSalary">
                    <Form.Label>Expected Salary</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. 100,000 PKR"
                      name="expectedSalary"
                      value={formData.expectedSalary}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h4 className="mb-3 mt-4" style={{ color: '#2AA96B', fontWeight: 'bold', borderBottom: '2px solid #2AA96B', paddingBottom: '8px' }}>Education Details</h4>
              <Row>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="applyEduDegree">
                    <Form.Label>Degree / Qualification</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. BSc, MSc"
                      name="educationDegree"
                      value={formData.educationDegree}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="applyEduInstitution">
                    <Form.Label>Institution Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="University / College"
                      name="educationInstitution"
                      value={formData.educationInstitution}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="mb-3">
                  <Form.Group controlId="applyEduMajor">
                    <Form.Label>Major / Field of Study</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Computer Science"
                      name="educationMajor"
                      value={formData.educationMajor}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h4 className="mb-3 mt-4" style={{ color: '#2AA96B', fontWeight: 'bold', borderBottom: '2px solid #2AA96B', paddingBottom: '8px' }}>Documents Upload</h4>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="applyCv">
                    <Form.Label>Upload CV</Form.Label>
                    <Form.Control
                      type="file"
                      size="sm"
                      name="cvFile"
                      accept=".pdf,application/pdf"
                      onChange={handleFormChange}
                      ref={cvInputRef}
                    />
                    <Form.Text muted>Accepted: PDF only, max size 1 MB</Form.Text>
                  </Form.Group>
                  </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="applyProfilePhoto">
                    <Form.Label>Profile Photo</Form.Label>
                    <Form.Control
                      type="file"
                      size="sm"
                      name="profilePhotoFile"
                      accept="image/*,.jpg,.jpeg,.png,.webp"
                      onChange={handleFormChange}
                      ref={photoInputRef}
                    />
                    <Form.Text muted>Accepted: JPG/PNG/WEBP, max size 1 MB</Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit" variant="primary" style={{ backgroundColor: '#2AA96B', borderColor: '#2AA96B' }} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </Form>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Careers; 