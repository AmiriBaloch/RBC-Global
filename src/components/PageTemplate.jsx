import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './PageTemplate.css';

const PageTemplate = ({ title, subtitle, content, imageSrc, imageAlt, additionalComponents }) => {
  return (
    <div className="page-template">
      {/* Hero Section */}
      <div className="page-hero">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">{title}</h1>
              <p className="lead fw-bold">{subtitle}</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-5">
        <Row className="align-items-center mb-5">
          <Col lg={7} className="mb-4 mb-lg-0">
            <div className="page-content">
              {content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Col>
          <Col lg={5}>
            {imageSrc && (
              <div className="page-image-container">
                <img src={imageSrc} alt={imageAlt || title} className="img-fluid rounded shadow" />
              </div>
            )}
          </Col>
        </Row>
        
        {/* Additional Components */}
        {additionalComponents && additionalComponents}
      </Container>
    </div>
  );
};

export default PageTemplate; 