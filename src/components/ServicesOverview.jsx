import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUsers, FaHeartbeat, FaLaptopCode, FaSearch } from 'react-icons/fa';
import './AboutUs.css';

// Import CEO and Managing Director images
import Imran from "../assets/3.png";
import shaguftaShaheen from "../assets/11.png";

const ServicesOverview = () => {
  useEffect(() => {
    document.title = "Our Services | Rosebelt Consultants";
    // Force scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="services-overview-page">
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">Our <span style={{ color: '#f59e0b' }}>Leadership</span></h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                Comprehensive consulting solutions tailored to your unique challenges
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {/* Leadership Section */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Our</span> Leadership
            </h2>
          </div>
          
          {/* CEO Row */}
          <Row className="mb-5">
            <Col lg={4} md={5}>
              <div className="leadership-image-container p-3" style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '8px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                border: '1px solid #e0e0e0',
                height: '100%'
              }}>
                <img 
                  src={Imran} 
                  alt="Amin Ul Haq Ch - CEO RBC-Global" 
                  className="img-fluid rounded" 
                  style={{ width: '100%' }} 
                />
                <div className="text-center mt-3">
                  <h4>Amin Ul Haq Ch</h4>
                  <p style={{ color: '#f59e0b', fontWeight: 'bold' }}>CEO RBC-Global</p>
                </div>
              </div>
            </Col>
            <Col lg={8} md={7}>
              <div className="leadership-message p-4 rounded-3 h-100" style={{ 
                backgroundColor: '#ffffff', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                border: '1px solid #e0e0e0',
                position: 'relative'
              }}>
                <div style={{ 
                  position: 'absolute', 
                  top: '20px', 
                  left: '20px', 
                  fontSize: '4rem', 
                  color: '#f5f5f5', 
                  fontFamily: 'Georgia, serif',
                  zIndex: '0'
                }}>❝</div>
                <div style={{ position: 'relative', zIndex: '1' }}>
                  <h3 className="mb-4">CEO's Message</h3>
                  <p>
                    "As the CEO of RoseBelt Consultants Global, I am committed to leading an organization that stands at the forefront of innovation and excellence in consulting services. Our journey has been defined by a steadfast commitment to integrity, collaboration, and delivering tangible results for our clients.
                  </p>
                  <p>
                    We have assembled an exceptional team of experts across various domains, united by a shared vision to transform challenges into opportunities. I invite you to experience the RoseBelt difference – where strategic insights meet practical solutions, and where your success becomes our mission."
                  </p>
                  <div className="text-end mt-4">
                    <span style={{ fontWeight: 'bold' }}>Amin Ul Haq Ch</span><br />
                    <span style={{ fontSize: '0.9rem' }}>Advocate High Court, Chairman Punjab Bar council (kSR) 2020</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          
          {/* Managing Director Row */}
          <Row className="justify-content-center mb-5">
            <Col lg={8} md={7}>
              <div className="leadership-message p-4 rounded-3 h-100" style={{ 
                backgroundColor: '#ffffff', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                border: '1px solid #e0e0e0',
                position: 'relative'
              }}>
                <div style={{ 
                  position: 'absolute', 
                  top: '20px', 
                  left: '20px', 
                  fontSize: '4rem', 
                  color: '#f5f5f5', 
                  fontFamily: 'Georgia, serif',
                  zIndex: '0'
                }}>❝</div>
                <div style={{ position: 'relative', zIndex: '1' }}>
                  <h3 className="mb-4">Managing Director's Message</h3>
                  <p>
                    "At the heart of RoseBelt Consultants Global is our unwavering dedication to operational excellence and client-centered service. As Managing Director, I focus on translating our strategic vision into actionable plans that deliver measurable impact for our clients.
                  </p>
                  <p>
                    Our multidisciplinary approach allows us to address complex challenges from multiple perspectives, providing integrated solutions that stand the test of time. We believe that true partnership means understanding your unique context, adapting to your evolving needs, and celebrating your successes as our own."
                  </p>
                  <div className="text-end mt-4">
                    <span style={{ fontWeight: 'bold' }}>Ms. S.Shaheen</span><br />
                    <span style={{ fontSize: '0.9rem' }}>Member PH initiatives</span><br />
                    <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>Managing Director RBC-Global</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4} md={5}>
              <div className="leadership-image-container p-3" style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: '8px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                border: '1px solid #e0e0e0',
                height: '100%'
              }}>
                <img 
                  src={shaguftaShaheen} 
                  alt="Ms. S.Shaheen - Managing Director RBC-Global" 
                  className="img-fluid rounded" 
                  style={{ width: '100%' }} 
                />
                <div className="text-center mt-3">
                  <h4>Ms. S.Shaheen</h4>
                  <p style={{ color: '#f59e0b', fontWeight: 'bold' }}>Managing Director RBC-Global</p>
                </div>
              </div>
            </Col>
          </Row>
        </section>
        
        {/* Service Categories Section */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Our</span> Service Categories
            </h2>
          </div>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className="h-100 service-card" style={{ 
                borderRadius: '8px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                border: '1px solid #e0e0e0',
                borderLeft: '4px solid #f59e0b'
              }}>
                <Card.Body className="d-flex flex-column">
                  <div className="text-center mb-3">
                    <FaUsers size={48} color="#f59e0b" />
                  </div>
                  <Card.Title className="text-center mb-3">RoseBelt Consultants</Card.Title>
                  <Card.Text className="flex-grow-1">
                    Our core consulting team delivers strategic insights and solutions across sectors, helping organizations navigate complex challenges and achieve sustainable growth.
                  </Card.Text>
                  <div className="text-center mt-3">
                    <Button 
                      as={Link} 
                      to="/services/consultants" 
                      variant="outline-dark" 
                      className="rounded-pill px-4"
                      style={{ borderColor: '#f59e0b', color: '#333' }}
                    >
                      Learn More
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 service-card" style={{ 
                borderRadius: '8px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                border: '1px solid #e0e0e0',
                borderLeft: '4px solid #f59e0b'
              }}>
                <Card.Body className="d-flex flex-column">
                  <div className="text-center mb-3">
                    <FaHeartbeat size={48} color="#f59e0b" />
                  </div>
                  <Card.Title className="text-center mb-3">Health Experts</Card.Title>
                  <Card.Text className="flex-grow-1">
                    Our healthcare professionals provide specialized consulting services in medical nutrition, pediatric care, and public health management to improve health outcomes.
                  </Card.Text>
                  <div className="text-center mt-3">
                    <Button 
                      as={Link} 
                      to="/services/health-experts" 
                      variant="outline-dark" 
                      className="rounded-pill px-4"
                      style={{ borderColor: '#f59e0b', color: '#333' }}
                    >
                      Learn More
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 service-card" style={{ 
                borderRadius: '8px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                border: '1px solid #e0e0e0',
                borderLeft: '4px solid #f59e0b'
              }}>
                <Card.Body className="d-flex flex-column">
                  <div className="text-center mb-3">
                    <FaLaptopCode size={48} color="#f59e0b" />
                  </div>
                  <Card.Title className="text-center mb-3">IT Experts</Card.Title>
                  <Card.Text className="flex-grow-1">
                    Our technology specialists deliver innovative IT solutions and digital strategies that enhance operations, improve efficiency, and drive digital transformation.
                  </Card.Text>
                  <div className="text-center mt-3">
                    <Button 
                      as={Link} 
                      to="/services/it-experts" 
                      variant="outline-dark" 
                      className="rounded-pill px-4"
                      style={{ borderColor: '#f59e0b', color: '#333' }}
                    >
                      Learn More
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="h-100 service-card" style={{ 
                borderRadius: '8px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                border: '1px solid #e0e0e0',
                borderLeft: '4px solid #f59e0b'
              }}>
                <Card.Body className="d-flex flex-column">
                  <div className="text-center mb-3">
                    <FaSearch size={48} color="#f59e0b" />
                  </div>
                  <Card.Title className="text-center mb-3">Researchers</Card.Title>
                  <Card.Text className="flex-grow-1">
                    Our research team conducts rigorous analysis and investigation to provide evidence-based insights that inform strategy development and decision-making.
                  </Card.Text>
                  <div className="text-center mt-3">
                    <Button 
                      as={Link} 
                      to="/services/researchers" 
                      variant="outline-dark" 
                      className="rounded-pill px-4"
                      style={{ borderColor: '#f59e0b', color: '#333' }}
                    >
                      Learn More
                    </Button>
                  </div>
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
                <h2 className="mb-3">Ready to <span style={{ color: '#f59e0b' }}>Transform</span> Your Business?</h2>
                <p className="lead mb-4">
                  Let's discuss how our expertise can address your unique challenges and opportunities.
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
    </div>
  );
};

export default ServicesOverview; 