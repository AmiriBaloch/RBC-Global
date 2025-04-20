import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import './Projects.css';
import './shared.css';

const FeaturedProjects = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    try {
      // Get the latest 6 projects for the preview
      const projectsQuery = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        limit(6)  // Changed from 3 to 6
      );
      
      unsubscribe = onSnapshot(projectsQuery, (snapshot) => {
        const projectsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFeaturedProjects(projectsData);
        setLoading(false);
      });

    } catch (error) {
      console.error('Firebase setup error:', error);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  if (loading) {
    return (
      <section className="featured-projects-section" style={{ backgroundColor: '#E3EBF2' }}>
        <div className="section-heading-container bg-success" style={{ backgroundColor: '#2AA96B !important' }}>
          <Container>
            <h2 className="section-heading text-white py-2">Featured Projects</h2>
          </Container>
        </div>
        <Container>
          <div className="text-center p-4 border rounded" style={{ backgroundColor: '#ffffff' }}>
            <p className="loading-text">Loading featured projects...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="featured-projects-section" style={{ backgroundColor: '#E3EBF2' }}>
      <div className="section-heading-container bg-success" style={{ backgroundColor: '#2AA96B !important' }}>
        <Container>
          <h2 className="section-heading text-white py-2">Featured Projects</h2>
        </Container>
      </div>
      <Container>
        <div className="p-4 border rounded mb-4" style={{ backgroundColor: '#ffffff' }}>
          <Row xs={1} md={2} lg={3} className="g-4 mb-4">
            {featuredProjects.map(project => (
              <Col key={project.id}>
                <Card className="project-card h-100" style={{ border: '1px solid #dee2e6' }}>
                  <Card.Body>
                    <Card.Title className="project-title" style={{ color: '#2AA96B', fontWeight: 600 }}>{project.title || 'Untitled Project'}</Card.Title>
                    <div className="project-metadata">
                      <span className="project-type">{project.type || 'No Type'}</span>
                      <span className="project-sector">{project.sector || 'No Sector'}</span>
                    </div>
                    <Card.Text className="project-description">
                      {project.description && project.description.length > 150 
                        ? `${project.description.substring(0, 150)}...` 
                        : project.description || 'No description available'}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
                    <small>Posted on: {new Date(project.createdAt).toLocaleDateString()}</small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center">
            <Button 
              as={Link} 
              to="/projects" 
              variant="outline-success" 
              size="lg"
              className="view-all-btn"
              style={{ 
                borderColor: '#2AA96B', 
                color: '#2AA96B',
                padding: '10px 25px',
                transition: 'all 0.3s ease',
                fontWeight: 500
              }}
            >
              View All Projects
            </Button>
          </div>
        </div>
      </Container>
      <style>{`
        .view-all-btn:hover {
          background-color: #2AA96B !important;
          border-color: #2AA96B !important;
          color: white !important;
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(42, 169, 107, 0.3);
        }
      `}</style>
    </section>
  );
};

export default FeaturedProjects; 