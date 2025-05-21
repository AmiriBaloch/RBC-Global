import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaBriefcase } from 'react-icons/fa';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Careers.css';
import './shared.css';
import { Link } from 'react-router-dom';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

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
          as={Link}
          to="/contact"
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
                        {renderButton('apply', 'Apply Now')}
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
                        We currently don't have any open positions. Please check back later or contact us to learn more about future opportunities.
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
    </div>
  );
};

export default Careers; 