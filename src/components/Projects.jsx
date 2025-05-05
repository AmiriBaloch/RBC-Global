import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Modal } from 'react-bootstrap';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase';
import './shared.css';

// Only log in development mode
const isDev = process.env.NODE_ENV === 'development';
const logDebug = (message, data) => {
  if (isDev && false) { // Set to true to enable debug logs in development
    if (data) {
      console.debug('[Projects]', message, data);
    } else {
      console.debug('[Projects]', message);
    }
  }
};

const Projects = ({ limitCount = 0, showViewAllButton = false }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugMode, setDebugMode] = useState(false); // Set to false to hide debug buttons
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = "Our Projects | Rosebelt Consultants";
    fetchProjects();
  }, [limitCount]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      // Create query for projects, using the posts collection
      let projectsQuery;
      
      if (limitCount > 0) {
        projectsQuery = query(
          collection(db, 'posts'),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );
      } else {
        projectsQuery = query(
          collection(db, 'posts'),
          orderBy('createdAt', 'desc')
        );
      }
      
      logDebug("Attempting to fetch projects...");
      const querySnapshot = await getDocs(projectsQuery);
      logDebug("Query completed, documents:", querySnapshot.size);
      
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt || Date.now())
      }));
      
      logDebug("Projects data processed:", projectsData.length);
      setProjects(projectsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const getProjects = () => {
    return projects;
  };
  
  // Function to truncate description to show more text
  const truncateDescription = (text, maxLength = 160) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Handle opening the modal with selected project
  const handleShowDetails = (project, event) => {
    // Prevent any default behavior or event bubbling
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Small delay to ensure click is processed properly on mobile
    setTimeout(() => {
      setSelectedProject(project);
      setShowModal(true);
    }, 10);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="projects-page" style={{ backgroundColor: 'var(--page-bg)' }}>
      {!limitCount && (
        // Only show hero section on full page view
        <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
          <Container>
            <Row className="justify-content-center text-center">
              <Col md={8}>
                <h1 className="display-4 mb-3">Our <span style={{ color: '#f59e0b' }}>Projects</span></h1>
                <p className="lead fw-bold" style={{ color: 'white' }}>
                  Discover our portfolio of impactful projects and successful collaborations
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      )}

      {/* Main Content */}
      <Container className={limitCount ? "" : "py-5"}>
        {/* Section Heading - Only shown when in Featured mode */}
        {limitCount > 0 && (
          <div className="section-heading-container bg-success" style={{ 
            backgroundColor: '#2AA96B !important',
            width: 'calc(100vw - 30px)',
            marginLeft: 'calc(-50vw + 50% + 15px)',
            marginRight: 'calc(-50vw + 50% + 15px)',
            position: 'relative',
            left: '0',
            right: '0'
          }}>
            <Container>
              <h2 className="section-heading text-white py-2">
                Featured Projects
              </h2>
            </Container>
          </div>
        )}
      
        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" style={{ color: '#2AA96B' }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Loading projects...</p>
          </div>
        ) : (
          <>
            {getProjects().length > 0 ? (
              <>
                <Row xs={1} md={2} lg={3} className="g-4">
                  {getProjects().map((project) => (
                    <Col key={project.id}>
                      <Card 
                        className="h-100 project-card"
                        style={{ 
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                          border: 'none',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          position: 'relative'
                        }}
                      >
                        {project.imageUrl && (
                          <div className="project-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                            <Card.Img 
                              variant="top" 
                              src={project.imageUrl} 
                              className="project-img"
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
                              {formatDate(project.createdAt)}
                            </small>
                          </div>
                          <Card.Title style={{ color: '#2AA96B' }}>{project.title}</Card.Title>
                          <Card.Text className="flex-grow-1" style={{ textAlign: 'justify' }}>
                            {truncateDescription(project.body || project.description, 160)}
                          </Card.Text>
                          
                          {/* Read More Button with Arrow - Hidden when modal is open */}
                          <div className={`read-more-container ${showModal ? 'hidden' : ''}`}>
                            <Button 
                              variant="outline-success" 
                              className="read-more-btn mt-3 d-flex align-items-center justify-content-center"
                              onClick={(e) => handleShowDetails(project, e)}
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
                                handleShowDetails(project, e);
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
                
                {/* View All Projects Button - Only shown in Featured mode */}
                {showViewAllButton && (
                  <div className="text-center mt-5 mb-5" style={{ marginBottom: '40px' }}>
                    <Button 
                      variant="primary" 
                      href="/projects"
                      size="lg"
                      style={{ 
                        backgroundColor: '#2AA96B', 
                        borderColor: '#2AA96B',
                        padding: '0.75rem 2rem',
                        borderRadius: '30px'
                      }}
                    >
                      View All Projects
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-5">
                <p>No projects found. Check back soon!</p>
              </div>
            )}
          </>
        )}
      </Container>

      {/* Project Details Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        scrollable
        size="md"
        aria-labelledby="project-details-modal"
        className="activity-details-modal better-positioned-modal"
        backdrop={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="project-details-modal" style={{ color: '#2AA96B' }}>
            {selectedProject?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProject?.imageUrl && (
            <div className="mb-4 text-center">
              <img 
                src={selectedProject.imageUrl} 
                alt={selectedProject.title}
                className="img-fluid rounded"
                style={{ maxHeight: '250px', objectFit: 'cover' }}
              />
            </div>
          )}
          <div className="mb-3">
            <small className="text-muted">
              {selectedProject && formatDate(selectedProject.createdAt)}
            </small>
          </div>
          <div className="project-content">
            {selectedProject?.body && (
              <div className="mb-4">
                <p style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>{selectedProject.body}</p>
              </div>
            )}
            {selectedProject?.description && !selectedProject?.body && (
              <div className="mb-4">
                <p style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>{selectedProject.description}</p>
              </div>
            )}
            {selectedProject?.conclusion && (
              <div className="mt-4">
                <h5 style={{ fontWeight: 700 }}>Conclusion</h5>
                <p style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>{selectedProject.conclusion}</p>
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
        
        /* Project/Card Styles */
        .project-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          background-color: white;
          margin-bottom: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.15);
        }
        
        .project-card .card-body {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        /* Section Heading Styles */
        .section-heading-container {
          margin-bottom: 2rem;
          position: relative;
          border-left: 4px solid #f59e0b;
          padding-left: 1rem;
        }

        .section-heading {
          font-weight: 600;
          margin-bottom: 0;
          color: #333;
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

export default Projects; 