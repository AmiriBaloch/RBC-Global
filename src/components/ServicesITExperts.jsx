import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './AboutUs.css';

// Import IT expert images
import muhammadAmir from '../assets/1.png';
import muneebRehman from '../assets/12.png';
import danyalZakar from '../assets/37.jpg';

const ServicesITExperts = () => {
  // IT Experts data from Team.jsx
  const itExperts = [
    {
      id: 7,
      name: "Danyal Zakar",
      role: "Software Developer",
      image: danyalZakar,
      description: "A software developer with experience in application development, web development, database management, and systems integration. Skilled in Python, Flutter, and SQL, Danyal contributes to the design and implementation of digital solutions that enhance efficiency and support project delivery. At RoseBelt Consultants Global, he assists in building and maintaining technology systems that strengthen organizational performance.",
      linkedin: "#",
      twitter: "#",
      email: "danyal@rosebeltconsultants.com"
    },
    {
      id: 5,
      name: "Muhammad Amir",
      role: "IT Solutions Specialist",
      image: muhammadAmir,
      description: "A seasoned IT professional with comprehensive expertise in digital transformation and enterprise solutions development. Specializes in designing and implementing scalable systems that optimize business operations and enhance user experience. Combines technical knowledge with strategic thinking to deliver innovative technology solutions. Committed to driving organizational success through cutting-edge digital solutions and robust system architecture.",
      linkedin: "#",
      twitter: "#",
      email: "amir@rosebeltconsultants.com"
    },
    {
      id: 6,
      name: "Muhammad Muneeb ur Rehman",
      role: "Design Expert",
      image: muneebRehman,
      description: "A creative design expert with extensive expertise in user interface and experience design. Specializes in crafting innovative visual solutions that enhance digital product usability and engagement. Combines artistic vision with technical proficiency to create compelling user experiences. Dedicated to delivering exceptional design solutions that bridge the gap between aesthetics and functionality.",
      linkedin: "#",
      twitter: "#",
      email: "muneeb@rosebeltconsultants.com"
    }
  ];

  useEffect(() => {
    document.title = "RoseBelt IT Experts | Rosebelt Consultants";
    // Force scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="it-experts-service-page">
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">RoseBelt <span style={{ color: '#f59e0b' }}>IT Experts</span></h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                Innovative technology solutions to transform your digital presence
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {/* Meet Our IT Experts Section - Moved to top */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Meet Our</span> IT Experts
            </h2>
          </div>
          <Row className="g-4">
            {itExperts.map((expert) => (
              <Col key={expert.id} lg={4} md={6}>
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
                      src={expert.image} 
                      alt={expert.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div className="p-4" style={{ height: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <Card.Title 
                      style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '600', 
                        color: '#333',
                        marginBottom: '5px',
                        textAlign: 'left'
                      }}
                    >
                      {expert.name}
                    </Card.Title>
                    <Card.Subtitle 
                      style={{ 
                        color: '#f59e0b', 
                        fontSize: '1.1rem',
                        marginBottom: '8px',
                        textAlign: 'left'
                      }}
                    >
                      {expert.role}
                    </Card.Subtitle>
                    <Card.Text 
                      style={{ 
                        color: '#555', 
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        marginBottom: '0px',
                        textAlign: 'left',
                        flex: 1
                      }}
                    >
                      {expert.description}
                    </Card.Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Service Overview Section - Moved down */}
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
                  RoseBelt IT Experts delivers innovative technology solutions that enable organizations to thrive in the digital era. Our team of skilled IT professionals specializes in developing customized systems, implementing digital strategies, and creating compelling designs that enhance user experience and drive business growth.
                </p>
                <p>
                  We approach each project with a deep understanding of both technology and business objectives, ensuring that our solutions not only address immediate technical needs but also contribute to long-term organizational success. Our expertise spans across system development, UX/UI design, digital transformation, and technology integration.
                </p>
              </div>
            </Col>
          </Row>
        </section>

        {/* Key Services Section - Moved down */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Key</span> Services
            </h2>
          </div>
          <Row className="mb-4">
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Custom Software Solutions</h4>
                <p>Development of tailored software applications and systems that address specific business needs and streamline operations.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">UX/UI Design</h4>
                <p>Creation of intuitive and engaging user interfaces that enhance user experience and improve digital product adoption.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Digital Transformation</h4>
                <p>Strategic guidance and implementation support for organizations looking to evolve their digital capabilities and processes.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Web & Mobile Development</h4>
                <p>Development of responsive websites and mobile applications that deliver seamless experiences across all devices.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Technology Integration</h4>
                <p>Implementation of solutions that connect disparate systems and enable seamless data flow across the organization.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">IT Strategy Consulting</h4>
                <p>Strategic advice on technology investments, digital roadmaps, and IT infrastructure optimization.</p>
              </div>
            </Col>
          </Row>
        </section>
        
        {/* CTA Section */}
        <section className="about-section py-5 mb-0 text-white" style={{ backgroundColor: '#333333', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
          <Container>
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                <h2 className="mb-3">Need <span style={{ color: '#f59e0b' }}>Technology</span> Solutions?</h2>
                <p className="lead mb-4">
                  Contact our IT experts to discuss how we can help transform your digital presence and optimize your technology infrastructure.
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
                    Get Technology Support
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

export default ServicesITExperts; 