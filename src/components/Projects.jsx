import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col, Modal, Badge } from 'react-bootstrap';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Swal from 'sweetalert2';
import './Projects.css';
import './shared.css';

const Projects = () => {
  console.log('Component rendering');

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    sector: '',
    description: '',
    conclusion: ''
  });
  const [status, setStatus] = useState({ message: '', type: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({
    email: '',
    passcode: ''
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    document.title = "Our Projects | Rosebelt Consultants";
    
    console.log('Effect running');
    let unsubscribe;

    try {
      const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      
      unsubscribe = onSnapshot(postsQuery, (snapshot) => {
        console.log('Snapshot received');
        const postsData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || '',
            type: data.type || '',
            sector: data.sector || '',
            description: data.description || '',
            conclusion: data.conclusion || '',
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: data.updatedAt || new Date().toISOString()
          };
        });
        console.log('Posts data:', postsData);
        setPosts(postsData);
        setFilteredPosts(postsData);
        setLoading(false);
      });

    } catch (error) {
      console.error('Firebase setup error:', error);
      setStatus({
        message: 'Failed to load projects. Please try again later.',
        type: 'danger'
      });
      setLoading(false);
    }

    return () => {
      console.log('Cleanup running');
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Filter posts when selected tags change
  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => {
        const postTags = [post.type, post.sector].filter(tag => tag !== '');
        return selectedTags.some(tag => postTags.includes(tag));
      });
      setFilteredPosts(filtered);
    }
  }, [selectedTags, posts]);

  // Extract all unique tags from posts
  const getAllTags = () => {
    const typeTags = [...new Set(posts.map(post => post.type).filter(type => type !== ''))];
    const sectorTags = [...new Set(posts.map(post => post.sector).filter(sector => sector !== ''))];
    return [...new Set([...typeTags, ...sectorTags])];
  };

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAdminCredentialsChange = (e) => {
    const { name, value } = e.target;
    setAdminCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminCredentials.email === 'mamiribaloch@gmail.com' && adminCredentials.passcode === 'xyz.com') {
      setShowAddForm(true);
      setShowAdminModal(false);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Admin authentication successful',
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Failed',
        text: 'Invalid email or passcode',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ message: '', type: '' });

    try {
      if (!formData.title.trim() || !formData.description.trim() || !formData.type.trim() || !formData.sector.trim()) {
        throw new Error('Title, Type, Sector, and Description are required');
      }

      const postData = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'posts'), postData);
      
      setFormData({
        title: '',
        type: '',
        sector: '',
        description: '',
        conclusion: ''
      });
      
      setShowAddForm(false);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Project added successfully!',
        timer: 1500
      });
    } catch (error) {
      console.error('Submit error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to add project. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReadMore = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
    setFormData({
      title: '',
      type: '',
      sector: '',
      description: '',
      conclusion: ''
    });
  };

  console.log('Current state:', { loading, posts, status });

  // Render loading state
  if (loading) {
    return (
      <div className="projects-page" style={{ backgroundColor: 'var(--page-bg)' }}>
        {/* Hero Section */}
        <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
          <Container>
            <Row className="justify-content-center text-center">
              <Col md={8}>
                <h1 className="display-4 mb-3">Our <span style={{ color: '#f59e0b' }}>Projects</span></h1>
                <p className="lead fw-bold" style={{ color: 'white' }}>
                  Discover how we've helped businesses transform and succeed through strategic consulting
                </p>
              </Col>
            </Row>
          </Container>
        </div>
        
        <Container className="py-5">
          <div className="text-center">
            <p className="loading-text">Loading projects...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="projects-page" style={{ backgroundColor: 'var(--page-bg)' }}>
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">Our <span style={{ color: '#f59e0b' }}>Projects</span></h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                Discover how we've helped businesses transform and succeed through strategic consulting
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Projects Content */}
      <Container className="py-5">
        <section className="projects-section">
          {/* Tags Slider */}
          <div className="tags-slider-container mb-4" style={{ border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div className="tags-slider">
              {getAllTags().map((tag) => (
                <Badge
                  key={tag}
                  bg={selectedTags.includes(tag) ? 'secondary' : 'light'}
                  text={selectedTags.includes(tag) ? 'white' : 'dark'}
                  className="tag-badge"
                  style={{ 
                    backgroundColor: selectedTags.includes(tag) ? '#f59e0b' : '#f8f9fa', 
                    color: selectedTags.includes(tag) ? 'white' : '#333333',
                    border: '1px solid #dee2e6'
                  }}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                  {selectedTags.includes(tag) && (
                    <span className="tag-selected-indicator">✓</span>
                  )}
                </Badge>
              ))}
              {selectedTags.length > 0 && (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="clear-tags-btn"
                  onClick={() => setSelectedTags([])}
                  style={{ borderColor: '#f59e0b', color: '#333333' }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {status.message && (
            <Alert 
              variant={status.type} 
              className="mb-4"
              dismissible
              onClose={() => setStatus({ message: '', type: '' })}
            >
              {status.message}
            </Alert>
          )}

          {/* Projects Grid */}
          <div className="section-heading-container mb-4" style={{ backgroundColor: '#333333', borderRadius: '4px' }}>
            <h2 className="section-heading text-white py-2 px-3">
              <span style={{ color: '#f59e0b' }}>All</span> Projects
            </h2>
          </div>
          
          <Row xs={1} md={2} lg={3} className="g-4 mb-5">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <Col key={post.id}>
                  <Card className="project-card h-100" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none' }}>
                    <Card.Body>
                      <Card.Title className="project-title" style={{ color: '#f59e0b' }}>{post.title || 'Untitled Project'}</Card.Title>
                      <div className="project-metadata">
                        {post.type && (
                          <span className="project-type" style={{ backgroundColor: '#f8f9fa', color: '#333333' }}>{post.type}</span>
                        )}
                        {post.sector && (
                          <span className="project-sector" style={{ backgroundColor: '#f8f9fa', color: '#333333' }}>{post.sector}</span>
                        )}
                      </div>
                      <Card.Text className="project-description">
                        {post.description && post.description.length > 150 
                          ? `${post.description.substring(0, 150)}...` 
                          : post.description || 'No description available'}
                      </Card.Text>
                      <Button 
                        variant="outline-secondary" 
                        className="read-more-btn"
                        onClick={() => handleReadMore(post)}
                        style={{ 
                          borderColor: '#f59e0b', 
                          color: '#f59e0b',
                          marginTop: '15px' 
                        }}
                      >
                        Read More
                      </Button>
                    </Card.Body>
                    <Card.Footer className="text-muted d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
                      <small>Posted on: {new Date(post.createdAt).toLocaleDateString()}</small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            ) : (
              <Col xs={12}>
                <div className="empty-text">
                  {selectedTags.length > 0 
                    ? 'No projects found matching the selected filters.' 
                    : 'No projects available at the moment.'}
                </div>
              </Col>
            )}
          </Row>
        </section>

        {/* Call to Action */}
        <section className="py-5 mb-0 text-white" style={{ backgroundColor: '#333333', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
          <Container>
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                <h2 className="mb-3">Need Our <span style={{ color: '#f59e0b' }}>Consulting Services?</span></h2>
                <p className="lead mb-4">
                  Reach out to discuss how we can tailor our expertise to your specific business challenges.
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
      </Container>

      {/* Project Detail Modal */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        size="lg" 
        centered
      >
        {selectedProject && (
          <>
            <Modal.Header closeButton style={{ backgroundColor: '#333333', color: 'white' }}>
              <Modal.Title>{selectedProject.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#ffffff' }}>
              <div className="project-detail-metadata mb-4">
                <h5 style={{ color: '#f59e0b' }}>Project Details:</h5>
                <p>
                  <strong>Type:</strong> {selectedProject.type || 'Not specified'}<br />
                  <strong>Sector:</strong> {selectedProject.sector || 'Not specified'}
                </p>
              </div>
              <div className="project-detail-description">
                <h5 style={{ color: '#f59e0b' }}>Description:</h5>
                <p>{selectedProject.description || 'No description available.'}</p>
                
                {selectedProject.conclusion && (
                  <>
                    <h5 style={{ color: '#f59e0b' }}>Conclusion:</h5>
                    <p>{selectedProject.conclusion}</p>
                  </>
                )}
              </div>
              <div className="text-muted mt-4">
                <small>Posted: {new Date(selectedProject.createdAt).toLocaleDateString()}</small>
                {selectedProject.updatedAt !== selectedProject.createdAt && (
                  <small className="ms-3">Last updated: {new Date(selectedProject.updatedAt).toLocaleDateString()}</small>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#f8f9fa' }}>
              <Button 
                variant="secondary" 
                onClick={handleCloseModal}
                style={{ backgroundColor: '#333333', borderColor: '#333333' }}
              >
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* Admin Login Modal */}
      <Modal 
        show={showAdminModal} 
        onHide={() => setShowAdminModal(false)} 
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: '#333333', color: 'white' }}>
          <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#ffffff' }}>
          <Form onSubmit={handleAdminLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                value={adminCredentials.email}
                onChange={handleAdminCredentialsChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Passcode</Form.Label>
              <Form.Control 
                type="password" 
                name="passcode"
                value={adminCredentials.passcode}
                onChange={handleAdminCredentialsChange}
                required
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                type="submit"
                style={{ backgroundColor: '#f59e0b', borderColor: '#f59e0b' }}
              >
                Login
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Project Add Form */}
      {showAddForm && (
        <Container className="mt-4">
          <div className="form-container" style={{ backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
            <h2 style={{ color: '#f59e0b' }}>Add New Project</h2>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Project Title</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Project Type</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Project Sector</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Project Description</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Project Conclusion (Optional)</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3}
                  name="conclusion"
                  value={formData.conclusion}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-flex justify-content-end gap-2">
                <Button 
                  variant="secondary" 
                  onClick={handleCloseAddForm}
                  disabled={submitting}
                  style={{ backgroundColor: '#333333', borderColor: '#333333' }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  type="submit"
                  disabled={submitting}
                  style={{ backgroundColor: '#f59e0b', borderColor: '#f59e0b' }}
                >
                  {submitting ? 'Submitting...' : 'Add Project'}
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      )}
      
      {/* Add CSS for the contact button */}
      <style>{`
        .contact-btn:hover {
          background-color: #f59e0b !important;
          color: #333333 !important;
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);
        }
        
        .admin-button:hover {
          background-color: #f59e0b !important;
          color: white !important;
          transform: translateY(-2px);
        }
        
        .read-more-btn:hover {
          background-color: #f59e0b !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default Projects; 