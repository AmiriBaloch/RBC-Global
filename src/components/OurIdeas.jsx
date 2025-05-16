import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaLightbulb, FaBrain, FaChartLine, FaHandshake, FaUsers, FaGlobe, FaLaptopCode, FaHeartbeat } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const OurIdeas = () => {
  useEffect(() => {
    document.title = "RBC | IDEAS";
    // Force scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  // Featured ideas data
  const featuredIdeas = [
    {
      id: 1,
      title: "Integrating Health Tech in Rural Healthcare",
      category: "Healthcare",
      icon: <FaHeartbeat />,
      description: "Our innovative approach to bringing accessible healthcare technology to underserved rural communities, focusing on telemedicine and mobile health units.",
      tags: ["Healthcare", "Technology", "Rural Development"],
      color: "#e74c3c"
    },
    {
      id: 2,
      title: "Sustainable IT Infrastructure for SMEs",
      category: "Technology",
      icon: <FaLaptopCode />,
      description: "Cost-effective and environmentally sustainable IT solutions designed specifically for small and medium enterprises with limited resources.",
      tags: ["IT Solutions", "Sustainability", "SME"],
      color: "#3498db"
    },
    {
      id: 3,
      title: "Public Health Policy Frameworks",
      category: "Public Health",
      icon: <FaUsers />,
      description: "Comprehensive policy frameworks that help government agencies develop effective public health strategies addressing modern challenges.",
      tags: ["Policy", "Public Health", "Governance"],
      color: "#27ae60"
    }
  ];
  
  // Thought leadership articles
  const thoughtLeadership = [
    {
      id: 1,
      title: "The Future of Integrated Healthcare Systems",
      author: "Dr. Ume Farwa",
      date: "October 2023",
      excerpt: "Exploring how integrated healthcare systems can improve patient outcomes while reducing operational costs and administrative burdens.",
      category: "Healthcare"
    },
    {
      id: 2,
      title: "Digital Transformation Strategies for Traditional Businesses",
      author: "Muhammad Amir",
      date: "September 2023",
      excerpt: "A practical guide for traditional businesses looking to embrace digital transformation without disrupting their core operations.",
      category: "Technology"
    },
    {
      id: 3,
      title: "Research Methodologies for Evidence-Based Policy Making",
      author: "S.F. Butt",
      date: "August 2023",
      excerpt: "How policy makers can leverage modern research methodologies to develop more effective, evidence-based policies and regulations.",
      category: "Research"
    },
    {
      id: 4,
      title: "Building Resilient Public Health Infrastructure",
      author: "Dr. Naveed Haider",
      date: "July 2023",
      excerpt: "Lessons learned from recent global health challenges and strategies for creating more resilient public health systems.",
      category: "Public Health"
    }
  ];
  
  // Innovation initiatives
  const innovations = [
    {
      title: "Community Health Monitoring System",
      description: "A cloud-based platform for real-time monitoring of community health indicators, enabling early intervention and resource allocation.",
      status: "Development"
    },
    {
      title: "AI-Powered Research Assistant",
      description: "An artificial intelligence tool designed to help researchers analyze complex datasets and identify patterns more efficiently.",
      status: "Pilot"
    },
    {
      title: "Sustainable Consulting Framework",
      description: "A comprehensive methodology for integrating sustainability principles into all aspects of consulting engagements and deliverables.",
      status: "Implemented"
    }
  ];

  return (
    <div className="our-ideas-page">
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">Our <span style={{ color: '#f59e0b' }}>Ideas</span></h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                Innovative thinking that transforms challenges into opportunities
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {/* Ideas Overview Section */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Innovation</span> Philosophy
            </h2>
          </div>
          <Row>
            <Col lg={12}>
              <div className="about-content p-4 rounded-3 text-dark" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
                <p>
                  At RoseBelt Consultants, we believe that the most powerful ideas emerge at the intersection of diverse disciplines and perspectives. Our innovation philosophy is built on the premise that sustainable solutions require holistic thinking that integrates expertise from multiple domains.
                </p>
                <p>
                  We foster a culture of continuous learning and creative problem-solving, encouraging our team members to challenge conventional wisdom and explore new approaches. By combining rigorous analysis with imaginative thinking, we develop ideas that not only address immediate challenges but also create lasting value for our clients and communities.
                </p>
                <p>
                  This page showcases some of our latest thinking across healthcare, technology, research, and public policy – areas where we believe our unique perspective can make a meaningful difference.
                </p>
              </div>
            </Col>
          </Row>
        </section>

        {/* Featured Ideas Section */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Featured</span> Ideas
            </h2>
          </div>
          <Row className="g-4">
            {featuredIdeas.map(idea => (
              <Col key={idea.id} md={4}>
                <Card className="h-100" style={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  border: '1px solid #e0e0e0',
                  borderTop: `4px solid ${idea.color}`
                }}>
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Badge pill bg="light" text="dark" className="category-badge">
                        {idea.category}
                      </Badge>
                      <span style={{ color: idea.color, fontSize: '1.5rem' }}>
                        {idea.icon}
                      </span>
                    </div>
                    <Card.Title className="mb-3">{idea.title}</Card.Title>
                    <Card.Text>
                      {idea.description}
                    </Card.Text>
                    <div className="mt-auto">
                      {idea.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          pill 
                          bg="secondary" 
                          className="me-2 mb-2"
                          style={{ opacity: 0.7 }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
        
        {/* Thought Leadership Section */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Thought</span> Leadership
            </h2>
          </div>
          <Row className="g-4">
            {thoughtLeadership.map(article => (
              <Col key={article.id} md={6} lg={3}>
                <Card className="h-100" style={{ 
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e0e0e0',
                  transition: 'transform 0.3s ease'
                }}>
                  <Card.Body>
                    <div className="mb-2">
                      <Badge pill bg="light" text="dark" className="category-badge">
                        {article.category}
                      </Badge>
                    </div>
                    <Card.Title style={{ fontSize: '1.1rem' }}>{article.title}</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted" style={{ fontSize: '0.9rem' }}>
                      By {article.author} | {article.date}
                    </Card.Subtitle>
                    <Card.Text style={{ fontSize: '0.95rem' }}>
                      {article.excerpt}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
        
        {/* Innovation Lab Section */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Innovation</span> Lab
            </h2>
          </div>
          <Row>
            <Col lg={12}>
              <div className="p-4 rounded-3 text-dark" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
                <p className="lead">
                  Our Innovation Lab is where ideas are transformed into practical solutions. Here's a glimpse of what we're currently working on:
                </p>
                
                <div className="innovation-initiatives mt-4">
                  {innovations.map((innovation, index) => (
                    <div 
                      key={index}
                      className="d-flex align-items-start mb-4 p-3 rounded"
                      style={{ backgroundColor: '#f8f9fa', borderLeft: '4px solid #f59e0b' }}
                    >
                      <div className="me-3 mt-1">
                        <FaLightbulb size={24} color="#f59e0b" />
                      </div>
                      <div>
                        <h5 className="mb-1">{innovation.title}</h5>
                        <p className="mb-2">{innovation.description}</p>
                        <Badge 
                          bg={
                            innovation.status === 'Implemented' ? 'success' : 
                            innovation.status === 'Pilot' ? 'warning' : 'info'
                          }
                        >
                          {innovation.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </section>
        
        {/* Collaboration CTA Section */}
        <section className="about-section py-5 mb-0 text-white" style={{ backgroundColor: '#333333', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
          <Container>
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                <h2 className="mb-3">Collaborate on <span style={{ color: '#f59e0b' }}>Innovations</span></h2>
                <p className="lead mb-4">
                  We believe in the power of collaborative innovation. If you have a challenge that requires fresh thinking or want to explore partnership opportunities, we'd love to hear from you.
                </p>
                <div>
                  <Button 
                    variant="outline-light"
                    size="lg" 
                    as={Link}
                    to="/contact"
                    className="contact-btn"
                    style={{
                      backgroundColor: 'transparent', 
                      borderColor: '#f59e0b',
                      color: '#f59e0b',
                      padding: '10px 25px',
                      borderRadius: '30px'
                    }}
                  >
                    Start a Conversation
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
      
      {/* Additional CSS for the page */}
      <style>{`
        .category-badge {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .contact-btn:hover {
          background-color: #f59e0b !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default OurIdeas; 