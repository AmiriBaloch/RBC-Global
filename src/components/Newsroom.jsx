import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Modal } from 'react-bootstrap';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './shared.css';

// Only log in development mode
const isDev = process.env.NODE_ENV === 'development';
const logDebug = (message, data) => {
  if (isDev && false) { // Set to true to enable debug logs in development
    if (data) {
      console.debug('[Newsroom]', message, data);
    } else {
      console.debug('[Newsroom]', message);
    }
  }
};

const Newsroom = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugMode, setDebugMode] = useState(false); // Set to false to hide debug buttons
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = "RBC | NEWSROOM";
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      
      // Try to get all activities without ordering first
      let activitiesQuery = query(
        collection(db, 'activities')
      );
      
      logDebug("Attempting to fetch all activities...");
      let querySnapshot = await getDocs(activitiesQuery);
      logDebug("Query completed, documents:", querySnapshot.size);
      
      // If no documents found, try with ordering
      if (querySnapshot.empty) {
        logDebug("No documents found without ordering, trying with createdAt ordering...");
        activitiesQuery = query(
          collection(db, 'activities'),
          orderBy('createdAt', 'desc')
        );
        querySnapshot = await getDocs(activitiesQuery);
      }
      
      const activitiesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt || Date.now())
      }));
      
      // Sort the activities by date in memory
      activitiesData.sort((a, b) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt || 0);
        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt || 0);
        return dateB - dateA; // Descending order (newest first)
      });
      
      logDebug("Activities data processed:", activitiesData.length);
      setActivities(activitiesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const getActivities = () => {
    return activities;
  };
  
  // Function to truncate description to show more text
  const truncateDescription = (text, maxLength = 160) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Handle opening the modal with selected activity
  const handleShowDetails = (activity, event) => {
    // Prevent any default behavior or event bubbling
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Small delay to ensure click is processed properly on mobile
    setTimeout(() => {
      setSelectedActivity(activity);
      setShowModal(true);
    }, 10);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="activities-page" style={{ backgroundColor: 'var(--page-bg)' }}>
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">News<span style={{ color: '#f59e0b' }}>room</span></h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                Be part of our informative platform that's shaping the future of business consulting
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-5">
        {/* Activities Grid */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" style={{ color: '#2AA96B' }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Loading content...</p>
          </div>
        ) : (
          <>
            {getActivities().length > 0 ? (
              <Row xs={1} md={2} lg={3} className="g-4">
                {getActivities().map((activity) => (
                  <Col key={activity.id}>
                    <Card 
                      className="h-100 activity-card"
                      style={{ 
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                        border: 'none',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        position: 'relative'
                      }}
                    >
                      {activity.imageUrl && (
                        <div className="activity-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                          <Card.Img 
                            variant="top" 
                            src={activity.imageUrl} 
                            className="activity-img"
                            style={{ 
                              objectFit: 'cover',
                              height: '100%',
                              width: '100%'
                            }}
                          />
                        </div>
                      )}
                      <Card.Body className="d-flex flex-column">
                        <div className="mb-2">
                          <small className="text-muted">
                            {formatDate(activity.createdAt)}
                          </small>
                        </div>
                        <Card.Title style={{ color: '#2AA96B' }}>{activity.title}</Card.Title>
                        <Card.Text className="flex-grow-1" style={{ textAlign: 'justify', whiteSpace: 'pre-line' }}>
                          {truncateDescription(activity.description, 160)}
                        </Card.Text>
                        
                        {/* Read More Button with Arrow - Hidden when modal is open */}
                        <div className={`read-more-container ${showModal ? 'hidden' : ''}`}>
                          <Button 
                            variant="outline-success" 
                            className="read-more-btn mt-3 d-flex align-items-center justify-content-center"
                            onClick={(e) => handleShowDetails(activity, e)}
                            style={{ 
                              borderColor: 'transparent', 
                              color: '#2AA96B',
                              fontWeight: '500',
                              marginTop: 'auto',
                              WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Improve mobile tap response
                              cursor: 'pointer',
                              touchAction: 'manipulation' // Optimize for touch
                            }}
                            onTouchStart={(e) => {
                              // Additional touch handler for mobile
                              e.currentTarget.style.opacity = '0.8';
                            }}
                            onTouchEnd={(e) => {
                              e.currentTarget.style.opacity = '1';
                              handleShowDetails(activity, e);
                            }}
                          >
                            Read More 
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              fill="currentColor" 
                              className="bi bi-arrow-right ms-2" 
                              viewBox="0 0 16 16"
                            >
                              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center py-5">
                <p>No content found. Check back soon!</p>
              </div>
            )}
          </>
        )}
      </Container>

      {/* Activity Details Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        scrollable
        size="md"
        aria-labelledby="activity-details-modal"
        className="activity-details-modal better-positioned-modal"
        backdrop={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="activity-details-modal" style={{ color: '#2AA96B' }}>
            {selectedActivity?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedActivity?.imageUrl && (
            <div className="mb-4 text-center">
              <img 
                src={selectedActivity.imageUrl} 
                alt={selectedActivity.title}
                className="img-fluid rounded"
                style={{ maxHeight: '250px', objectFit: 'cover' }}
              />
            </div>
          )}
          <div className="mb-3">
            <small className="text-muted">
              {selectedActivity && formatDate(selectedActivity.createdAt)}
            </small>
          </div>
          <div className="activity-content">
            {selectedActivity?.description && (
              <div className="mb-4">
                <p style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>{selectedActivity.description}</p>
              </div>
            )}
            {selectedActivity?.content && (
              <div className="mb-4">
                <p style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>{selectedActivity.content}</p>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Custom Styling */}
      <style>{`
        /* Hide Read More buttons when modal is open */
        .read-more-container.hidden {
          display: none !important;
        }
        
        /* Modal Styles */
        .activity-details-modal .modal-content {
          border-radius: 10px;
          border: none;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          max-height: 80vh;
        }
        
        .activity-details-modal .modal-dialog {
          max-width: 80%;
          width: 80%;
          height: 80%;
          margin: 2rem auto;
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
        }
        
        /* Adjust position for mobile */
        @media (max-width: 992px) {
          .activity-details-modal .modal-dialog {
            max-width: 90%;
            width: 500px;
            top: 55% !important;
            transform: translate(-50%, -40%) !important;
          }
        }
        
        @media (max-width: 576px) {
          .activity-details-modal .modal-dialog {
            top: 45% !important;
            width: 95%;
            margin: 0 auto;
          }
        }
        
        /* Semi-transparent backdrop */
        .modal-backdrop.show {
          opacity: 0.7;
        }
        
        .activity-details-modal .modal-header {
          border-bottom: 1px solid #e9ecef;
          padding: 1.25rem 1.5rem;
        }
        
        .activity-details-modal .modal-body {
          padding: 1.5rem;
        }
        
        .activity-details-modal .modal-body h5 {
          font-weight: 700;
        }
        
        .activity-details-modal .modal-footer {
          border-top: 1px solid #e9ecef;
          padding: 1rem 1.5rem;
        }

        /* Mobile test button - only visible on mobile */
        .mobile-test-button-container {
          display: none;
        }

        /* Project/Activity Card Styles */
        .activity-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          background-color: white;
          margin-bottom: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .activity-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.15);
        }
        
        .activity-card .card-body {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        /* Section Heading Styles */
        .section-heading-container {
          width: calc(100vw - 20px);
          margin-left: calc(-50vw + 50% + 10px);
          margin-right: calc(-50vw + 50% + 10px);
          position: relative;
          left: 0;
          right: 0;
          background-color: #333333;
          border-radius: 4px;
          margin-bottom: 2rem;
        }

        .section-heading {
          color: white;
          font-weight: 600;
          margin-bottom: 0;
          padding: 1rem 2rem;
          text-align: left;
        }

        /* Read More Button Styles */
        .read-more-btn {
          margin-top: auto;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .read-more-btn:hover {
          background-color: transparent !important;
          color: #2AA96B !important;
          border-color: transparent !important;
        }
        
        .read-more-btn:hover svg {
          transform: translateX(4px);
        }
        
        .read-more-btn svg {
          transition: transform 0.3s ease;
        }

        /* Media Queries */
        @media (max-width: 768px) {
          .read-more-btn {
            padding: 14px !important;
            font-size: 16px !important;
            margin-bottom: 5px !important;
            min-height: 48px !important;
            z-index: 9999 !important;
            position: relative !important;
            display: flex !important;
            width: 100% !important;
            border-width: 2px !important;
          }
          
          .activity-card {
            margin-top: 20px;
          }
        }

        @media (max-width: 576px) {
          .read-more-btn {
            min-height: 52px !important;
            font-size: 17px !important;
            padding: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Newsroom; 