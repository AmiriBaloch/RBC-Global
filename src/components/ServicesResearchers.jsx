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
import farhatAbbas from '../assets/15.png';
import maheenNisar from '../assets/16.png';
import mishaShahbaz from '../assets/17.png';
import ridaBatool from '../assets/19.png';
import muskanFatima from '../assets/20.png';
import fizaIjaz from '../assets/21.png';
import rameenSahar from '../assets/22.png';
import bushraMaqsood from '../assets/23.png';

const ServicesResearchers = () => {
  // Researchers data from Team.jsx
  const researchers = [
    {
      id: 8,
      name: "S.F. Butt",
      role: "Lead Researcher",
      image: sfButt,
      description: "A passionate senior researcher committed to driving evidence-based decision making through methodical investigation. Experienced in leading complex research projects across multiple sectors. Dedicated to creating knowledge that transforms organizations and communities for the better.",
      linkedin: "#",
      twitter: "#",
      email: "sfbutt@rosebeltconsultants.com"
    },
    {
      id: 9,
      name: "Nasik Bangash",
      role: "Research Analyst",
      image: nasikBangash,
      description: "A dedicated research analyst focused on translating complex data into actionable insights. Experienced in monitoring and evaluation of public policy interventions. Committed to bridging the gap between research findings and practical implementation for sustainable impact.",
      linkedin: "#",
      twitter: "#",
      email: "nasik@rosebeltconsultants.com"
    },
    {
      id: 10,
      name: "Mudassir Ali Watto",
      role: "Research Associate",
      image: mudassirAli,
      description: "A methodical research associate passionate about uncovering innovative solutions to complex challenges. Experienced in data analysis and strategic development. Driven to create practical frameworks that enhance organizational effectiveness and community wellbeing.",
      linkedin: "#",
      twitter: "#",
      email: "mudassir@rosebeltconsultants.com"
    },
    {
      id: 11,
      name: "Sunir Ashnae",
      role: "Research Specialist",
      image: sunirAshnae,
      description: "A creative research specialist dedicated to exploring new methodological frontiers. Experienced in developing multidisciplinary research designs and analytical frameworks. Committed to generating insights that inspire innovation and drive meaningful change.",
      linkedin: "#",
      twitter: "#",
      email: "sunir@rosebeltconsultants.com"
    },
    {
      id: 12,
      name: "Muhammad Shahroze Iqbal",
      role: "Research Associate",
      image: muhammadShahroze,
      description: "A passionate sociologist committed to understanding security strategies and community dynamics. Experienced in sustainable development research and strategic counseling. Driven to apply sociological insights to create effective solutions for complex social challenges.",
      linkedin: "#",
      twitter: "#",
      email: "shahroze@rosebeltconsultants.com"
    },
    {
      id: 13,
      name: "Farhat Abbas",
      role: "Young Researcher",
      image: farhatAbbas,
      description: "A dynamic young researcher dedicated to data-driven insights and modern research approaches. Experienced in analyzing complex social issues through innovative methods. Passionate about bringing fresh perspectives that lead to creative solutions for contemporary challenges.",
      linkedin: "#",
      twitter: "#",
      email: "farhat@rosebeltconsultants.com"
    },
    {
      id: 14,
      name: "Maheen Nisar Khan",
      role: "Young Researcher",
      image: maheenNisar,
      description: "A committed qualitative researcher focused on social development and public policy. Experienced in field research and stakeholder engagement across diverse communities. Driven to ensure research translates into meaningful improvements in people's everyday lives.",
      linkedin: "#",
      twitter: "#",
      email: "maheen@rosebeltconsultants.com"
    },
    {
      id: 15,
      name: "Misha Shahbaz",
      role: "Young Researcher",
      image: mishaShahbaz,
      description: "A dedicated data analyst passionate about socioeconomic research and community dynamics. Experienced in translating complex findings into practical recommendations. Committed to using research as a tool for positive change and sustainable development.",
      linkedin: "#",
      twitter: "#",
      email: "misha@rosebeltconsultants.com"
    },
    {
      id: 16,
      name: "Rida Batool",
      role: "Young Researcher",
      image: ridaBatool,
      description: "A passionate educational researcher committed to improving learning outcomes through evidence-based approaches. Experienced in curriculum development and educational policy analysis. Dedicated to creating inclusive educational environments that empower learners of all backgrounds.",
      linkedin: "#",
      twitter: "#",
      email: "rida@rosebeltconsultants.com"
    },
    {
      id: 17,
      name: "Muskan Fatima",
      role: "Young Researcher",
      image: muskanFatima,
      description: "A passionate public health researcher committed to fostering healthier communities through sustainable and evidence-based strategies. Experienced in designing health promotion initiatives, research and community engagement. Driven to make health a fundamental right for everyone.",
      linkedin: "#",
      twitter: "#",
      email: "muskan@rosebeltconsultants.com"
    },
    {
      id: 18,
      name: "Fiza Ijaz",
      role: "Young Researcher",
      image: fizaIjaz,
      description: "A dedicated environmental researcher committed to sustainable development and climate action. Experienced in evaluating environmental policies and their community impact. Passionate about creating research-based solutions that balance ecological preservation with human needs.",
      linkedin: "#",
      twitter: "#",
      email: "fiza@rosebeltconsultants.com"
    },
    {
      id: 19,
      name: "Rameen Sahar",
      role: "Young Researcher",
      image: rameenSahar,
      description: "A forward-thinking researcher passionate about digital transformation and technological innovation. Experienced in studying adoption patterns across traditional sectors. Committed to harnessing technology's potential to solve pressing social and economic challenges.",
      linkedin: "#",
      twitter: "#",
      email: "rameen@rosebeltconsultants.com"
    },
    {
      id: 20,
      name: "Bushra Maqsood",
      role: "Young Researcher",
      image: bushraMaqsood,
      description: "A passionate advocate and researcher dedicated to gender equality and social inclusion. Experienced in participatory methodologies that amplify marginalized voices. Driven to create research that catalyzes meaningful policy change and promotes a more equitable society.",
      linkedin: "#",
      twitter: "#",
      email: "bushra@rosebeltconsultants.com"
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
              <span style={{ color: '#f59e0b' }}>Meet Our</span> Young Researchers
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