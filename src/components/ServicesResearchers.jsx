import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './AboutUs.css';

// Import researcher images
import sfButt from '../assets/8.png';
import nasikBangash from '../assets/7.png';
import mudassirAli from '../assets/4.png';
import sunirAshnae from '../assets/6.png';
import muhammadShahroze from '../assets/14.png';

const ServicesResearchers = () => {
  // Researchers data from Team.jsx
  const researchers = [
    {
      id: 8,
      name: "S.F. Butt",
      role: "Lead Researcher",
      image: sfButt,
      description: "A researcher driven by a deep commitment to advancing knowledge through rigorous investigation and thoughtful reflection.",
      linkedin: "#",
      twitter: "#",
      email: "sfbutt@rosebeltconsultants.com"
    },
    {
      id: 9,
      name: "Nasik Bangash",
      role: "Research Analyst",
      image: nasikBangash,
      description: "Skilled in research, monitoring, and evaluation, with a focus on translating complex field realities into strategic insights that inform effective interventions and public policy.",
      linkedin: "#",
      twitter: "#",
      email: "nasik@rosebeltconsultants.com"
    },
    {
      id: 10,
      name: "Mudassir Ali",
      role: "Research Associate",
      image: mudassirAli,
      description: "Dedicated to uncovering innovative solutions through meticulous research and data analysis. Specializes in developing evidence-based strategies that drive organizational growth and efficiency.",
      linkedin: "#",
      twitter: "#",
      email: "mudassir@rosebeltconsultants.com"
    },
    {
      id: 11,
      name: "Sunir Ashnae",
      role: "Research Specialist",
      image: sunirAshnae,
      description: "Passionate about exploring new frontiers in research methodology. Combines analytical expertise with creative thinking to identify opportunities for improvement and innovation in various sectors.",
      linkedin: "#",
      twitter: "#",
      email: "sunir@rosebeltconsultants.com"
    },
    {
      id: 12,
      name: "Muhammad Shahroze Iqbal",
      role: "Research Associate",
      image: muhammadShahroze,
      description: "An MPhil scholar in Sociology with a strong focus on security strategies and strategic counseling. Contributes to projects centered around sustainable development with a passion for community engagement and social impact initiatives. Leverages strong problem-solving and leadership skills to address complex challenges effectively.",
      linkedin: "#",
      twitter: "#",
      email: "shahroze@rosebeltconsultants.com"
    }
  ];

  useEffect(() => {
    document.title = "RoseBelt Researchers | Rosebelt Consultants";
    // Force scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="researchers-service-page">
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">RoseBelt <span style={{ color: '#f59e0b' }}>Researchers</span></h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                Evidence-based insights to drive informed decision-making
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
                  RoseBelt Researchers provides comprehensive research and analysis services that deliver actionable insights for decision-makers. Our team of experienced research professionals specializes in collecting, analyzing, and interpreting data across various domains to inform strategy development, policy formulation, and program design.
                </p>
                <p>
                  We employ a rigorous, methodical approach to research that combines both quantitative and qualitative methodologies, ensuring that our findings are robust, reliable, and relevant to your specific context. Our interdisciplinary expertise allows us to tackle complex research questions from multiple perspectives, providing holistic solutions to multifaceted challenges.
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
                <h4 className="mb-3">Market Research</h4>
                <p>Comprehensive market analysis to identify opportunities, understand consumer behavior, and inform business strategy development.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Policy Research</h4>
                <p>Analysis of existing policies and development of evidence-based recommendations for policy formulation and improvement.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Impact Assessment</h4>
                <p>Evaluation of program outcomes and impacts to measure effectiveness and identify areas for improvement.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Data Analysis</h4>
                <p>Advanced statistical analysis and data interpretation to extract meaningful insights from complex datasets.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Needs Assessment</h4>
                <p>Identification of community or organizational needs through systematic research and stakeholder engagement.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Research Training</h4>
                <p>Capacity building programs to enhance research skills within organizations and institutions.</p>
              </div>
            </Col>
          </Row>
        </section>

        {/* Meet Our Researchers Section */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Meet Our</span> Researchers
            </h2>
          </div>
          <Row className="g-4">
            {researchers.map((researcher) => (
              <Col key={researcher.id} lg={4} md={6}>
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
                      src={researcher.image} 
                      alt={researcher.name} 
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
                      {researcher.name}
                    </Card.Title>
                    <Card.Subtitle 
                      style={{ 
                        color: '#f59e0b', 
                        fontSize: '1.1rem',
                        marginBottom: '15px'
                      }}
                    >
                      {researcher.role}
                    </Card.Subtitle>
                    <Card.Text 
                      style={{ 
                        color: '#555', 
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        marginBottom: '20px' 
                      }}
                    >
                      {researcher.description}
                    </Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                      <a 
                        href={researcher.linkedin} 
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
                        href={researcher.twitter} 
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
                        href={`mailto:${researcher.email}`} 
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
                <h2 className="mb-3">Need <span style={{ color: '#f59e0b' }}>Research</span> Insights?</h2>
                <p className="lead mb-4">
                  Contact our research team to discuss how we can help you gather the evidence and insights needed for informed decision-making.
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
                    Start Your Research Project
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

export default ServicesResearchers; 