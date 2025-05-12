import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Card, Badge } from 'react-bootstrap';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { FaUserCheck, FaUserClock } from 'react-icons/fa';
import './Footer.css'; // Reusing existing styles
import '../styles/ApplicantsList.css'; // New component-specific styles

const ApplicantsList = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch from the applicantsStatus collection
      const applicantsQuery = query(
        collection(db, 'applicantsStatus')
      );
      
      const querySnapshot = await getDocs(applicantsQuery);
      
      const applicantsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Handle Firestore timestamp conversion
        timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp)
      }));
      
      // Sort with selected applicants at top, then shortlisted
      const sortedApplicants = [...applicantsData].sort((a, b) => {
        if (a.selected && !b.selected) return -1;
        if (!a.selected && b.selected) return 1;
        if (a.shortlisted && !b.shortlisted) return -1;
        if (!a.shortlisted && b.shortlisted) return 1;
        return 0;
      });
      
      setApplicants(sortedApplicants);
    } catch (error) {
      console.error('Error fetching applicants:', error);
      setError('Failed to load applicants. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Format date to a readable string
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get badge color based on status
  const getBadgeColor = (applicant) => {
    if (applicant.selected) {
      return 'success';
    } else if (applicant.shortlisted) {
      return 'primary';
    } else {
      return 'secondary';
    }
  };

  // Get status text
  const getStatusText = (applicant) => {
    if (applicant.selected) {
      return 'Selected';
    } else if (applicant.shortlisted) {
      return 'Shortlisted';
    } else {
      return 'Pending';
    }
  };

  return (
    <div className="applicants-list-page">
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">Applicants <span style={{ color: '#f59e0b' }}>List</span></h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
              Discover top-tier professionals advancing through our selection process.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Loading applicants data...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            <Alert.Heading>Error Loading Data</Alert.Heading>
            <p>{error}</p>
            <div className="d-flex justify-content-center">
              <button 
                className="btn btn-outline-danger"
                onClick={fetchApplicants}
              >
                Try Again
              </button>
            </div>
          </Alert>
        ) : applicants.length === 0 ? (
          <Alert variant="info" className="text-center">
            <p className="mb-0">No applicants found in the database.</p>
          </Alert>
        ) : (
          <>
            {/* Selected Applicants Section */}
            <div className="section-container mb-5">
              <div className="modern-heading success">
                <span className="heading-icon"><FaUserCheck size={22} /></span>
                <h2>Selected Applicants for District Manager</h2>
              </div>
              
              {applicants.filter(a => a.selected).length === 0 ? (
                <Alert variant="light" className="text-center">
                  <p className="mb-0">No selected applicants found.</p>
                </Alert>
              ) : (
                <Row>
                  {applicants
                    .filter(applicant => applicant.selected)
                    .map(applicant => (
                      <Col md={6} lg={4} key={applicant.id} className="mb-4">
                        <Card className="h-100 shadow-sm hover-card compact-card">
                          <Card.Body className="py-3">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <Card.Title className="mb-1">{applicant.fullName || 'Unnamed Applicant'}</Card.Title>
                              <Badge bg="success" pill>Selected</Badge>
                            </div>
                            
                            <Card.Subtitle className="mb-2 text-muted">
                              {applicant.position || 'Position not specified'}
                            </Card.Subtitle>
                            
                            <div className="mb-2">
                              <strong>Email: </strong>
                              <a href={`mailto:${applicant.email}`}>{applicant.email}</a>
                            </div>
                            
                            {applicant.cnic && (
                              <div className="mb-2">
                                <strong>CNIC: </strong>
                                {applicant.cnic}
                              </div>
                            )}
                            
                            {applicant.postLocation && (
                              <div className="mb-2">
                                <strong>Location: </strong>
                                {applicant.postLocation}
                              </div>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
              )}
            </div>
            
            {/* Shortlisted Applicants Section */}
            <div className="section-container">
              <div className="modern-heading primary">
                <span className="heading-icon"><FaUserClock size={22} /></span>
                <h2>Applicants were Shortlisted for District Manager</h2>
              </div>
              
              {applicants.filter(a => a.shortlisted && !a.selected).length === 0 ? (
                <Alert variant="light" className="text-center">
                  <p className="mb-0">No shortlisted applicants found.</p>
                </Alert>
              ) : (
                <Row>
                  {applicants
                    .filter(applicant => applicant.shortlisted && !applicant.selected)
                    .map(applicant => (
                      <Col md={6} lg={4} key={applicant.id} className="mb-4">
                        <Card className="h-100 shadow-sm hover-card compact-card">
                          <Card.Body className="py-3">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <Card.Title className="mb-1">{applicant.fullName || 'Unnamed Applicant'}</Card.Title>
                              <Badge bg="primary" pill>Shortlisted</Badge>
                            </div>
                            
                            <Card.Subtitle className="mb-2 text-muted">
                              {applicant.position || 'Position not specified'}
                            </Card.Subtitle>
                            
                            <div className="mb-2">
                              <strong>Email: </strong>
                              <a href={`mailto:${applicant.email}`}>{applicant.email}</a>
                            </div>
                            
                            {applicant.cnic && (
                              <div className="mb-2">
                                <strong>CNIC: </strong>
                                {applicant.cnic}
                              </div>
                            )}
                            
                            {applicant.postLocation && (
                              <div className="mb-2">
                                <strong>Location: </strong>
                                {applicant.postLocation}
                              </div>
                            )}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
              )}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default ApplicantsList; 