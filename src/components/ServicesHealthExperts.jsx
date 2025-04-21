import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './AboutUs.css';

// Import health expert images
import image2 from '../assets/2.png';
import drNaveedHaider from '../assets/10.png';
import drTariqSaif from '../assets/13.png';

const ServicesHealthExperts = () => {
  // Health Experts data from Team.jsx
  const healthExperts = [
    {
      id: 1,
      name: "Dr. Ume Farwa",
      role: "Clinical Dietitian & Nutritionist",
      image: image2,
      description: "A qualified clinical dietitian specialized in medical nutrition therapy. Experienced in treating nutrient deficiencies and diseases through therapeutic diets. Currently works at OBGY hospital with Prof. M. Saeed and as Consultant Dietitian at Halcyon Medical Centre.",
      linkedin: "#",
      twitter: "#",
      email: "dr.umefarwa@rosebeltconsultants.com"
    },
    {
      id: 3,
      name: "Dr. Naveed Haider",
      role: "Health Expert",
      image: drNaveedHaider,
      description: "MBBS, FCPS Paediatric Surgery, FACS (USA), Diploma in laparoscopic surgery (Germany), Mphil Public Health, PhD Public Health. Specialized in pediatric surgical care and public health management.",
      linkedin: "#",
      twitter: "#",
      email: "dr.naveed@rosebeltconsultants.com"
    },
    {
      id: 4,
      name: "Dr. Muhammad Tariq Saif",
      role: "Health Expert",
      image: drTariqSaif,
      description: "MBBS, FCPS (Paeds medicine), KEMU, M.Phil Public Health-PU. Specialized in pediatric medicine and public health management.",
      linkedin: "#",
      twitter: "#",
      email: "dr.tariq@rosebeltconsultants.com"
    }
  ];

  useEffect(() => {
    document.title = "RoseBelt Health Experts | Rosebelt Consultants";
    // Force scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="health-experts-service-page">
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">RoseBelt <span style={{ color: '#f59e0b' }}>Health Experts</span></h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                Specialized healthcare expertise to improve health outcomes and systems
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
                  RoseBelt Health Experts provides specialized healthcare consulting services, bringing together a team of experienced medical professionals with diverse expertise in nutrition, pediatric care, surgery, and public health management. We work with healthcare organizations, public health agencies, and institutions to improve health outcomes and strengthen healthcare systems.
                </p>
                <p>
                  Our multidisciplinary approach enables us to address complex health challenges from multiple perspectives, developing comprehensive solutions that consider clinical, operational, and policy dimensions. We are committed to evidence-based practices and patient-centered care in all our consulting engagements.
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
                <h4 className="mb-3">Medical Nutrition Therapy</h4>
                <p>Specialized nutritional consulting for healthcare facilities and individual patients, focusing on therapeutic diets and nutritional health improvement.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Pediatric Care Consulting</h4>
                <p>Expert guidance on pediatric healthcare services, including surgical care, medical management, and facility optimization.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Public Health Program Design</h4>
                <p>Development of comprehensive public health initiatives that address community needs and improve population health outcomes.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Healthcare Facility Optimization</h4>
                <p>Analysis and improvement of healthcare facility operations, workflows, and patient care processes to enhance efficiency and quality.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Clinical Training Programs</h4>
                <p>Development and delivery of specialized training programs for healthcare professionals in various clinical disciplines.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Health Policy Advisory</h4>
                <p>Strategic guidance on health policy development, implementation, and evaluation to maximize public health impact.</p>
              </div>
            </Col>
          </Row>
        </section>

        {/* Meet Our Health Experts Section */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Meet Our</span> Health Experts
            </h2>
          </div>
          <Row className="g-4">
            {healthExperts.map((expert) => (
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
                  <div className="text-center p-4" style={{ height: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Card.Title 
                      style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '600', 
                        color: '#333',
                        marginBottom: '5px'
                      }}
                    >
                      {expert.name}
                    </Card.Title>
                    <Card.Subtitle 
                      style={{ 
                        color: '#f59e0b', 
                        fontSize: '1.1rem',
                        marginBottom: '15px'
                      }}
                    >
                      {expert.role}
                    </Card.Subtitle>
                    <Card.Text 
                      style={{ 
                        color: '#555', 
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        marginBottom: '20px' 
                      }}
                    >
                      {expert.description}
                    </Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                      <a 
                        href={expert.linkedin} 
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
                        href={expert.twitter} 
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
                        href={`mailto:${expert.email}`} 
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
                <h2 className="mb-3">Need <span style={{ color: '#f59e0b' }}>Healthcare</span> Expertise?</h2>
                <p className="lead mb-4">
                  Contact our health experts to discuss how we can help improve health outcomes for your organization or community.
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
                    Consult Our Experts
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

export default ServicesHealthExperts; 