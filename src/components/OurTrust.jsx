import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaShieldAlt, FaHandshake, FaCertificate, FaAward } from 'react-icons/fa';
import clientsData from '../data/clients';
import './OurTrust.css';
import './AboutUs.css';

const OurTrust = () => {
  // Show all accredited clients from the existing clients data
  const trustedClientsList = clientsData;
  
  useEffect(() => {
    document.title = "RBC | OUR CLIENTS";
  }, []);
  
  return (
    <>
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">The RoseBelt Accredited</h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                For over two decades, businesses and organizations have trusted RoseBelt Consultants
                to deliver exceptional results.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      
      <Container className="py-5">
        {/* Accredited Clients Section */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Our</span> Accredited Clients
            </h2>
          </div>
          
          <Row className="mb-4">
            <Col lg={12}>
              <div className="about-content p-4 rounded-3 text-dark" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
                <p>RoseBelt Consultants is proud to partner with leading organizations across multiple industries. Our accreditation process ensures that we maintain the highest standards of service and excellence.</p>
              </div>
            </Col>
          </Row>
          
          <Row>
            {trustedClientsList.map((client, index) => (
              <Col key={index} xs={6} md={4} lg={3} className="mb-4">
                <Card className="h-100 client-card" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <img 
                      src={client.imageUrl} 
                      alt={client.alt}
                      className="client-logo"
                    />
                    <div className="client-name mt-3">{client.name}</div>
                    {index < 4 && (
                      <div className="client-badge mt-2">Long-term Partner</div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Why</span> Choose RoseBelt Consultants
            </h2>
          </div>
          
          <Row className="mb-4">
            <Col lg={12}>
              <div className="about-content p-4 rounded-3 text-dark" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
                <p>We are committed to excellence in every aspect of our service. Our accreditation standards ensure that we deliver the highest quality of consulting services to our clients.</p>
              </div>
            </Col>
          </Row>
          
          <Row>
            <Col md={6} lg={3} className="mb-4">
              <Card className="h-100" style={{ borderLeft: '3px solid #f59e0b', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body className="text-center">
                  <div className="mb-3" style={{ color: '#f59e0b', fontSize: '2.5rem' }}><FaShieldAlt /></div>
                  <Card.Title style={{ color: '#333333', fontWeight: '600' }}>Accredited Experience</Card.Title>
                  <Card.Text>Over 20 years of industry expertise and proven results across multiple sectors.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <Card className="h-100" style={{ borderLeft: '3px solid #f59e0b', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body className="text-center">
                  <div className="mb-3" style={{ color: '#f59e0b', fontSize: '2.5rem' }}><FaHandshake /></div>
                  <Card.Title style={{ color: '#333333', fontWeight: '600' }}>Long-term Partners</Card.Title>
                  <Card.Text>Building lasting relationships through trust, integrity, and consistent value delivery.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <Card className="h-100" style={{ borderLeft: '3px solid #f59e0b', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body className="text-center">
                  <div className="mb-3" style={{ color: '#f59e0b', fontSize: '2.5rem' }}><FaCertificate /></div>
                  <Card.Title style={{ color: '#333333', fontWeight: '600' }}>Certified Experts</Card.Title>
                  <Card.Text>Our team consists of certified professionals with advanced qualifications in their fields.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <Card className="h-100" style={{ borderLeft: '3px solid #f59e0b', backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Card.Body className="text-center">
                  <div className="mb-3" style={{ color: '#f59e0b', fontSize: '2.5rem' }}><FaAward /></div>
                  <Card.Title style={{ color: '#333333', fontWeight: '600' }}>Award-Winning</Card.Title>
                  <Card.Text>Recognized for excellence in consulting services and innovative solutions.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
        
        {/* CTA Section */}
        <section className="about-section py-5 mb-0 text-white" style={{ backgroundColor: '#333333', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
          <Container>
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                <h2 className="mb-3">Ready to <span style={{ color: '#f59e0b' }}>Partner</span> with an Accredited Advisor?</h2>
                <p className="lead mb-4">
                  Let's work together to achieve your business goals with proven expertise and unwavering commitment.
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
                      borderRadius: '30px'
                    }}
                  >
                    Contact Us Today
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
    </>
  );
};

export default OurTrust; 