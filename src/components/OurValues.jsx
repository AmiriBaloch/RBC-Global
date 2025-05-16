import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faGlobe, faLightbulb, faUsers, faHeart, faHandHoldingHeart, faSeedling, faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import './AboutUs.css';

const OurValues = () => {
  useEffect(() => {
    document.title = "RBC | OUR VALUES & COMMITMENTS";
    // Force scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Core values data
  const coreValues = [
    {
      title: "Integrity",
      icon: faHandshake,
      description: "We uphold the highest ethical standards in all our work, ensuring transparency and trustworthiness."
    },
    {
      title: "Innovation",
      icon: faLightbulb,
      description: "We constantly seek creative solutions and embrace new ideas to tackle complex challenges."
    },
    {
      title: "Global Perspective",
      icon: faGlobe,
      description: "We bring diverse viewpoints and cross-cultural understanding to every engagement."
    },
    {
      title: "Collaboration",
      icon: faUsers,
      description: "We work as partners with our clients, fostering relationships built on mutual respect and shared goals."
    }
  ];

  // Commitments data
  const commitments = [
    {
      title: "Client Success",
      icon: faHeart,
      description: "We are dedicated to our clients' success, measuring our achievements by the tangible value we deliver to their organizations."
    },
    {
      title: "Community Impact",
      icon: faHandHoldingHeart,
      description: "We are committed to making a positive impact in the communities where we work through pro bono services and volunteer initiatives."
    },
    {
      title: "Sustainability",
      icon: faSeedling,
      description: "We strive to conduct our business in environmentally responsible ways and help our clients do the same."
    },
    {
      title: "Ethical Practice",
      icon: faBalanceScale,
      description: "We adhere to the highest standards of professional ethics, ensuring objectivity and confidentiality in all our client relationships."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">Our Values & Commitments</h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                The principles that guide our work and define who we are
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Core Values Section */}
      <Container className="py-5">
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Our</span> Core Values
            </h2>
          </div>
          
          <Row className="mb-5">
            <Col>
              <p className="text-center mb-5">
                These values guide our approach to every client engagement and define how we work together as a team.
              </p>
            </Col>
          </Row>
          
          <Row className="mb-5">
            {coreValues.map((value, index) => (
              <Col md={3} className="mb-4" key={index}>
                <Card className="h-100 shadow-sm border-0 value-card">
                  <Card.Body className="text-center p-4">
                    <div className="icon-container mb-3">
                      <FontAwesomeIcon icon={value.icon} size="2x" className="text-primary" />
                    </div>
                    <Card.Title>{value.title}</Card.Title>
                    <Card.Text>
                      {value.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          
          <Row>
            <Col className="text-center">
              <p className="fw-bold mb-4">
                Since our founding, RoseBelt Consultants has partnered with over 500 organizations worldwide, 
                helping them achieve measurable results and sustainable growth.
              </p>
            </Col>
          </Row>
        </section>

        {/* Our Commitments Section */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Our</span> Commitments
            </h2>
          </div>
          
          <Row className="mb-5">
            <Col lg={12}>
              <div className="about-content p-4 rounded-3 text-dark" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
                <p>Beyond our core values, we make specific commitments to our clients, our team members, and the communities we serve. These commitments represent our ongoing pledge to operate with integrity and purpose.</p>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            {commitments.map((commitment, index) => (
              <Col md={6} className="mb-4" key={index}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3" style={{ color: '#f59e0b' }}>
                        <FontAwesomeIcon icon={commitment.icon} size="2x" />
                      </div>
                      <Card.Title className="mb-0" style={{ color: '#333333' }}>{commitment.title}</Card.Title>
                    </div>
                    <Card.Text>
                      {commitment.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Our Code of Conduct */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Our</span> Code of Conduct
            </h2>
          </div>
          
          <Row className="mb-4">
            <Col lg={12}>
              <div className="about-content p-4 rounded-3 text-dark" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
                <p>Our Code of Conduct translates our values into specific behaviors and standards we expect from every member of the RoseBelt team. It guides us in making ethical decisions and maintaining the highest professional standards in all our work.</p>
                <h5 className="mt-4 mb-3" style={{ color: '#333333' }}>Key Principles:</h5>
                <ul>
                  <li><strong>Honesty and Transparency:</strong> We communicate openly and truthfully with our clients, colleagues, and stakeholders.</li>
                  <li><strong>Confidentiality:</strong> We protect sensitive information and respect the privacy of our clients and team members.</li>
                  <li><strong>Objectivity:</strong> We provide impartial advice based on thorough analysis, not influenced by personal biases or external pressures.</li>
                  <li><strong>Respect:</strong> We treat everyone with dignity and respect, embracing diversity and fostering an inclusive environment.</li>
                  <li><strong>Accountability:</strong> We take responsibility for our actions and decisions, learning from our mistakes and continuously improving.</li>
                </ul>
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  );
};

export default OurValues; 