import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './Team.css';
import './shared.css';

// Import images
import image2 from '../assets/2.png';
import muhammadAmir from '../assets/1.png';
import drSfButt from '../assets/8.png';

const CoreContributors = () => {
  // Core contributors - first member from each category
  const coreContributors = [
    {
      id: 1,
      name: "Dr. Ume Farwa",
      role: "Clinical Dietitian & Nutritionist",
      category: "Health Expert",
      image: image2,
      description: "A qualified clinical dietitian specialized in medical nutrition therapy. Experienced in treating nutrient deficiencies and diseases through therapeutic diets. Currently works at OBGY hospital with Prof. M. Saeed and as Consultant Dietitian at Halcyon Medical Centre.",
      linkedin: "#",
      twitter: "#",
      email: "dr.umefarwa@rosebeltconsultants.com"
    },
    {
      id: 2,
      name: "Muhammad Amir",
      role: "IT Solutions Specialist",
      category: "IT Expert",
      image: muhammadAmir,
      description: "An innovative technology professional specializing in comprehensive IT solutions for businesses. With a strategic approach to digital transformation, he designs and implements customized systems that streamline operations and enhance productivity.",
      linkedin: "#",
      twitter: "#",
      email: "amir@rosebeltconsultants.com"
    },
    {
      id: 3,
      name: "Dr. S.F.Butt",
      role: "Lead Researcher",
      category: "Researcher",
      image: drSfButt,
      description: "A researcher driven by a deep commitment to advancing knowledge through rigorous investigation and thoughtful reflection.",
      linkedin: "#",
      twitter: "#",
      email: "dr.sfbutt@rosebeltconsultants.com"
    }
  ];

  return (
    <section className="core-contributors-section" style={{ backgroundColor: '#E3EBF2' }}>
      <div className="section-heading-container bg-success" style={{ backgroundColor: '#2AA96B !important' }}>
        <Container>
          <h2 className="section-heading text-white py-2">Our Core Contributors</h2>
        </Container>
      </div>
      <Container>
        <div className="p-4 border rounded mb-4" style={{ backgroundColor: '#ffffff' }}>
          <Row className="g-4">
            {coreContributors.map(contributor => (
              <Col key={contributor.id} md={4}>
                <Card className="team-card h-100" style={{ border: '1px solid #dee2e6' }}>
                  <div className="card-img-wrapper">
                    <Card.Img variant="top" src={contributor.image} alt={contributor.name} />
                  </div>
                  <Card.Body>
                    <Card.Title className="mb-1" style={{ color: '#2AA96B' }}>{contributor.name}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Card.Subtitle style={{ color: '#6c757d' }}>{contributor.role}</Card.Subtitle>
                      <span className="badge bg-light text-dark">{contributor.category}</span>
                    </div>
                    <Card.Text>{contributor.description}</Card.Text>
                    <div className="social-links">
                      <a href={contributor.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaLinkedin />
                      </a>
                      <a href={contributor.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaTwitter />
                      </a>
                      <a href={`mailto:${contributor.email}`} className="social-icon">
                        <FaEnvelope />
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default CoreContributors; 