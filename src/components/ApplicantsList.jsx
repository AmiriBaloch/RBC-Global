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
    // Set page title
    document.title = "RBC | APPLICANTS LIST";
    
    // Push pageview event to dataLayer for GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      // Clear existing data first
      window.dataLayer.push({
        'page.path': undefined,
        'page.title': undefined,
        'virtualPageURL': undefined, 
        'virtualPageTitle': undefined
      });
      
      // Push pageview event
      window.dataLayer.push({
        event: 'page_view',
        page_location: window.location.href,
        page_path: window.location.pathname,
        page_title: 'RBC | APPLICANTS LIST',
        page_type: 'applicants_list',
        send_to: 'GTM-MLHJMJ7M'
      });
      
      // Push custom event for applicants list view
      window.dataLayer.push({
        event: 'view_applicants_list',
        eventCategory: 'content',
        eventAction: 'view',
        eventLabel: 'applicants_list'
      });
    }
    
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
      
      // Track successful data load
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'applicants_data_loaded',
          applicantsCount: sortedApplicants.length,
          selectedCount: sortedApplicants.filter(a => a.selected).length,
          shortlistedCount: sortedApplicants.filter(a => a.shortlisted && !a.selected).length
        });
      }
    } catch (error) {
      console.error('Error fetching applicants:', error);
      setError('Failed to load applicants. Please try again later.');
      
      // Track error
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'applicants_data_error',
          errorMessage: error.message
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Track when user clicks "Try Again" button
  const handleTryAgain = () => {
    // Track button click
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'button_click',
        eventCategory: 'error_handling',
        eventAction: 'click',
        eventLabel: 'try_again',
        buttonName: 'try_again'
      });
    }
    
    fetchApplicants();
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

  // Group applicants by position
  const groupApplicantsByPosition = () => {
    const grouped = {};
    
    applicants.forEach(applicant => {
      const position = applicant.position || 'Unknown Position';
      if (!grouped[position]) {
        grouped[position] = {
          selected: [],
          shortlisted: []
        };
      }
      
      if (applicant.selected) {
        grouped[position].selected.push(applicant);
      } else if (applicant.shortlisted) {
        grouped[position].shortlisted.push(applicant);
      }
    });
    
    return grouped;
  };

  // Render applicant card
  const renderApplicantCard = (applicant) => (
    <Col md={6} lg={4} key={applicant.id} className="mb-4">
      <Card className="h-100 shadow-sm hover-card compact-card">
        <Card.Body className="py-3">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title className="mb-1">{applicant.fullName || 'Unnamed Applicant'}</Card.Title>
            <Badge bg={applicant.selected ? "success" : "primary"} pill>
              {applicant.selected ? 'Selected' : 'Shortlisted'}
            </Badge>
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
  );

  // Render position sections
  const renderPositionSections = () => {
    const groupedApplicants = groupApplicantsByPosition();
    const positions = Object.keys(groupedApplicants);
    
    if (positions.length === 0) {
      return (
        <Alert variant="info" className="text-center">
          <p className="mb-0">No applicants found in the database.</p>
        </Alert>
      );
    }

    return positions.map(position => {
      const { selected, shortlisted } = groupedApplicants[position];
      const hasSelected = selected.length > 0;
      const hasShortlisted = shortlisted.length > 0;
      
      if (!hasSelected && !hasShortlisted) return null;
      
      return (
        <div key={position} className="section-container mb-5">
          {/* Selected Applicants Section for this position */}
          {hasSelected && (
            <>
              <div className="modern-heading success">
                <span className="heading-icon"><FaUserCheck size={22} /></span>
                <h2>Selected Applicants for {position}</h2>
              </div>
              
              <Row>
                {selected.map(renderApplicantCard)}
              </Row>
            </>
          )}
          
          {/* Shortlisted Applicants Section for this position */}
          {hasShortlisted && (
            <>
              <div className={`modern-heading primary ${hasSelected ? 'mt-4' : ''}`}>
                <span className="heading-icon"><FaUserClock size={22} /></span>
                <h2>Applicants were Shortlisted for {position}</h2>
              </div>
              
              <Row>
                {shortlisted.map(renderApplicantCard)}
              </Row>
            </>
          )}
        </div>
      );
    });
  };

  return (
    <div className="applicants-list-page">
      <Container>
        {/* Header Section */}
        <div className="applicants-header text-center">
          <h1>Applicants List</h1>
          <p className="text-muted">
            View and manage all applicants and their current status
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" size="lg" />
            <p className="mt-3 text-muted">Loading applicants...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            <p className="mb-3">{error}</p>
            <button 
              className="btn btn-primary"
              onClick={handleTryAgain}
            >
              Try Again
            </button>
          </Alert>
        ) : (
          renderPositionSections()
        )}
      </Container>
    </div>
  );
};

export default ApplicantsList; 