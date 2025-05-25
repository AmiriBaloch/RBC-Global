import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './AboutUs.css';

// Import consultant images
import drHafizImran from '../assets/5.png';
import nabghaHashmi from "../assets/9.png";
import drRubeenaZakar from "../assets/18.png";
import wakarKhan from "../assets/24.png";
import ahtshamKhan from "../assets/35.png";

const ServicesConsultants = () => {
  // Consultants data from Team.jsx
  const consultants = [
    {
      id: 1,
      name: "Dr. Rubeena Zakar",
      role: "Senior Public Health Consultant",
      image: drRubeenaZakar,
      description: "Dr. Rubeena Zakar is currently professor of Public Health at University of the Punjab. She also served as Director of the Institute of Social and Cultural Studies, University of the Punjab, Lahore, Pakistan from Aug 2018 to Dec 2024 and incharge Dean, Faculty of Health Sciences. She was also associated as researcher in the Department of Public Health Medicine, Bielefeld University, Germany from 2006 to 2012 to investigate violence against women as a challenge for global women rights.\nShe earned her Bachelor of Medicine and Bachelor of Surgery (MBBS) from Sindh Medical College, Karachi University with distinction, Master's in Population Sciences from Punjab University with gold medal, and Ph.D in Public Health from Bielefeld University, Germany with distinction (Summa cum laude). In 2022, she was selected for 2-year prestigious fellowship from International Foundation for Advancement of Medical Education and  Research (FAIMER Institute), Philadelphia, USA. She has established the Department of Public Health at University of the Punjab in 2013 and pioneer of community based education in maternal and child health.\n\nHer research interests include gender-based violence, women's health in developing countries, childhood immunization, malnutrition among children, maternal and child health, inequalities in health care utilization, health and human rights, and gender and development.\n\nShe has published more than 165 research papers in international peer reviewed journals. She is also a reviewer of Impact factor journals like Canadian Journal of Behavioural Sciences, Journal of Family Violence, Frontiers in Public Health and British Journal of Gynaecology and Obstetrics. Currently, she is in the editorial board of many Internation flagship journals such as she is working as Section Editor PLOS One, Associate Editor BMC Public Health, and Academic Editor PLOS Global Health and Frontiers in Global Women's Health. Dr. Rubeena Zakar has also various operational research projects in her credit funded by different international and national organizations like USAID, OPM, Thresher Fund USA, UNICEF and OXFAM etc. She frequently appears on national TV channels to spread health awareness messages among masses.",
      linkedin: "#",
      twitter: "#",
      email: "dr.rubeena@rosebeltconsultants.com"
    },
    {
      id: 2,
      name: "Dr. Hafiz Muhammad Imran",
      role: "Public Health Consultant",
      image: drHafizImran,
      description: "Dr. Hafiz Muhammad Imran is a highly qualified Public Health Consultant with PhD and M.Phil degrees from Punjab University, an MS in Public Policy, and an MBA. He specializes in health policy development and implementation, leveraging his extensive background to analyze challenges and design strategic public health interventions for various organizations. His work focuses on evidence-based policy to improve population health and well-being.",
      linkedin: "#",
      twitter: "#",
      email: "dr.imran@rosebeltconsultants.com"
    },
    {
      id: 27,
      name: "Nabgha Najeeb Hashmi",
      role: "Education Consultant",
      image: nabghaHashmi,
      description: "Nabgha Najeeb Hashmi is an experienced Education Consultant who has partnered with UNICEF, JICA, WHO, and UNWOMEN. She excels in coordinating multi-stakeholder initiatives and international development projects in education. Nabgha is skilled in fostering partnerships and developing effective policy frameworks to enhance educational outcomes and empower communities through quality education initiatives.",
      linkedin: "#",
      twitter: "#",
      email: "nabgha@rosebeltconsultants.com"
    },
    {
      id: 3,
      name: "Wakar Khan",
      role: "Lead Development Expert",
      image: wakarKhan,
      description: "Wakar Khan is a seasoned Development Professional with over 21 years of experience in implementing Development and Emergency Projects. He specializes in Monitoring & Evaluation, Communications, Capacity Building, and Trainings. Wakar has a proven track record of managing complex initiatives and building strategic partnerships to drive sustainable change and deliver impactful results in challenging environments.",
      linkedin: "#",
      twitter: "#",
      email: "wakar@rosebeltconsultants.com"
    },
    {
      id: 35,
      name: "Ahtsham Ahmad Khan",
      role: "Agrologist | RBC-GLOBAL representative in Europe",
      image: ahtshamKhan,
      description: "A dedicated Agrology professional with expertise in data analysis, program management, and community engagement. Specializes in monitoring intra-campaign activities and developing evidence-based agri programs. Combines research methodologies with practical approaches to inform policy and drive agri initiatives. Committed to advancing health equity through strategic interventions and community-driven research approaches.",
      linkedin: "#",
      twitter: "#",
      email: "kahtsham@gmail.com"
    }
  ];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    document.title = "RoseBelt Consultants | Rosebelt Consultants";
    // Force scroll to top on page load
    window.scrollTo(0, 0);

    // Add window resize listener
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        {/* Meet Our Consultants Section - Moved above Service Overview */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Meet Our</span> Consultants
            </h2>
          </div>
          <Row className="g-4 justify-content-center">
            {consultants.map((consultant) => (
              <Col key={consultant.id} lg={consultant.id === 1 ? 12 : 4} md={consultant.id === 1 ? 12 : 6}>
                <Card className="h-100" style={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  border: '1px solid #e0e0e0',
                  display: 'flex',
                  flexDirection: consultant.id === 1 && !isMobile ? 'row' : 'column',
                  minHeight: consultant.id === 1 && !isMobile ? '350px' : '700px'
                }}>
                  {consultant.id === 1 ? (
                    // Horizontal layout for Dr. Rubeena Zakar
                    <>
                      <div style={{ 
                        width: isMobile ? '100%' : '25%', 
                        height: isMobile ? '300px' : 'auto',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: '#f8f8f8'
                      }}>
                        <Card.Img 
                          src={consultant.image} 
                          alt={consultant.name} 
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            objectPosition: 'center top'
                          }}
                        />
                      </div>
                      <div style={{ width: isMobile ? '100%' : '75%' }}>
                        <div className="p-4" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <Card.Title 
                              style={{ 
                                fontSize: '1.6rem', 
                                fontWeight: '700', 
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
                                marginBottom: '10px'
                              }}
                            >
                              {consultant.role}
                            </Card.Subtitle>
                            <Card.Text 
                              style={{ 
                                color: '#555', 
                                fontSize: '0.9rem',
                                lineHeight: '1.5',
                                marginBottom: '15px',
                                whiteSpace: 'pre-line',
                                textAlign: 'justify',
                                maxHeight: isMobile ? '200px' : '250px',
                                overflowY: 'auto',
                                WebkitOverflowScrolling: 'touch',
                                padding: '0 5px'
                              }}
                              className="biography-scroll"
                            >
                              {consultant.description}
                            </Card.Text>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Vertical layout for other consultants
                    <>
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
                  </div>
                    </>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </section>
        
        {/* Service Overview Section - Now below Meet Our Consultants */}
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
                <h4 className="mb-3">Monitoring & Evaluation & Research</h4>
                <p>Rigorous assessment of program effectiveness, identifying strengths, areas for improvement, and strategies for enhancing impact.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Education Advisory</h4>
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