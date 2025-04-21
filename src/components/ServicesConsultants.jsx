import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './AboutUs.css';

// Import consultant images
import drHafizImran from '../assets/5.png';
import nabghaHashmi from "../assets/9.png";

const ServicesConsultants = () => {
  // Consultants data from Team.jsx
  const consultants = [
    {
      id: 2,
      name: "Dr. Hafiz Muhammad Imran",
      role: "Public Health Consultant",
      image: drHafizImran,
      description: "PhD Public Health-PU, M.Phil Public Health-PU, MS Public Policy-UMT, MBA-IBA. Experienced public health consultant with expertise in health policy development and implementation.",
      linkedin: "#",
      twitter: "#",
      email: "dr.imran@rosebeltconsultants.com"
    },
    {
      id: 27,
      name: "Nabgha Najeeb Hashmi",
      role: "Education Consultant",
      image: nabghaHashmi,
      description: "Consultant- Education (UNICEF, JICA, WHO, UNWOMEN). An experienced education specialist with expertise in coordinating multi-stakeholder initiatives and international development projects. Skilled in fostering partnerships between government agencies and global organizations to enhance educational outcomes and implement effective policy frameworks.",
      linkedin: "#",
      twitter: "#",
      email: "nabgha@rosebeltconsultants.com"
    }
  ];

  useEffect(() => {
    document.title = "RoseBelt Consultants | Rosebelt Consultants";
    // Force scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="consultants-service-page">
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">RoseBelt <span style={{ color: '#f59e0b' }}>Consultants</span></h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                Strategic expertise to navigate complex challenges and drive sustainable growth
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {/* Service Overview Section */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Service</span> Overview
            </h2>
          </div>
          <Row>
            <Col lg={12}>
              <div className="about-content p-4 rounded-3 text-dark" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
                <p>
                  RoseBelt Consultants offers strategic advisory services across multiple sectors, helping organizations navigate complex challenges, identify growth opportunities, and implement effective solutions. Our team of experienced consultants brings deep expertise in public health, education, policy development, and organizational management.
                </p>
                <p>
                  We partner with clients to understand their unique needs and develop tailored approaches that deliver tangible results. Our collaborative methodology ensures that solutions are not only effective but sustainable, empowering organizations to achieve their long-term objectives and maximize their impact.
                </p>
              </div>
            </Col>
          </Row>
        </section>

        {/* Key Services Section */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Key</span> Services
            </h2>
          </div>
          <Row className="mb-4">
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Strategic Planning</h4>
                <p>Comprehensive strategic planning services to help organizations define their vision, set clear objectives, and develop roadmaps for achieving their goals.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Policy Development</h4>
                <p>Expert guidance in creating and implementing effective policies that align with organizational objectives and industry best practices.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Program Evaluation</h4>
                <p>Rigorous assessment of program effectiveness, identifying strengths, areas for improvement, and strategies for enhancing impact.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Educational Consulting</h4>
                <p>Specialized consulting for educational institutions, focusing on curriculum development, teacher training, and learning outcomes improvement.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Stakeholder Engagement</h4>
                <p>Development and implementation of effective strategies for engaging stakeholders and building strong, collaborative partnerships.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Public Health Advisory</h4>
                <p>Expert guidance on public health initiatives, policy development, and program implementation to improve health outcomes.</p>
              </div>
            </Col>
          </Row>
        </section>

        {/* Meet Our Consultants Section */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Meet Our</span> Consultants
            </h2>
          </div>
          <Row className="g-4">
            {consultants.map((consultant) => (
              <Col key={consultant.id} lg={4} md={6}>
                <Card className="h-100" style={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  border: '1px solid #e0e0e0',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '700px'
                }}>
                  <div 
                    style={{ 
                      height: '55%', 
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#f8f8f8'
                    }}
                  >
                        <Card.Img 
                          src={consultant.image} 
                          alt={consultant.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                      }}
                        />
                      </div>
                  <div className="text-center p-4" style={{ height: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Card.Title 
                      style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '600', 
                        color: '#333',
                        marginBottom: '5px'
                      }}
                    >
                      {consultant.name}
                    </Card.Title>
                    <Card.Subtitle 
                      style={{ 
                        color: '#f59e0b', 
                        fontSize: '1.1rem',
                        marginBottom: '15px'
                      }}
                    >
                      {consultant.role}
                    </Card.Subtitle>
                    <Card.Text 
                      style={{ 
                        color: '#555', 
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        marginBottom: '20px' 
                      }}
                    >
                      {consultant.description}
                    </Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                      <a 
                        href={consultant.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ 
                          background: '#0077B5', 
                          color: 'white',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem'
                        }}
                      >
                            <FaLinkedin />
                          </a>
                      <a 
                        href={consultant.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ 
                          background: '#1DA1F2', 
                          color: 'white',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem'
                        }}
                      >
                            <FaTwitter />
                          </a>
                      <a 
                        href={`mailto:${consultant.email}`} 
                        style={{ 
                          background: '#EA4335', 
                          color: 'white',
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem'
                        }}
                      >
                            <FaEnvelope />
                          </a>
                        </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
        
        {/* CTA Section */}
        <section className="about-section py-5 mb-0 text-white" style={{ backgroundColor: '#333333', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
          <Container>
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                <h2 className="mb-3">Ready to <span style={{ color: '#f59e0b' }}>Partner</span> with Our Consultants?</h2>
                <p className="lead mb-4">
                  Contact us today to discuss how our consulting expertise can help your organization achieve its goals.
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
                    Get in Touch
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

export default ServicesConsultants; 