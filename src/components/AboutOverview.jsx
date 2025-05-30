import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faGlobe, faLightbulb, faUsers } from '@fortawesome/free-solid-svg-icons';
import teamImage from '../assets/team.png';
import './AboutUs.css';

const AboutOverview = () => {
  const [selectedOffice, setSelectedOffice] = useState('Lahore');
  
  useEffect(() => {
    document.title = "RBC | OUR OFFICES";
  }, []);

  // Office locations data
  const offices = [
    {
      city: "Lahore",
      address: "5A, 1st Floor, Commercial Area, PIA Housing Society, Lahore.",
      isPrimary: true,
      mapUrl: "https://maps.app.goo.gl/sjiwkdsBvuN4aSxt5?g_st=aw",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108796.46626906144!2d74.25605614325706!3d31.491441916252946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904f31f7bbc63%3A0xab566c07b81cf59a!2sPIA%20Housing%20Scheme%20Phase%201%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1716390578600!5m2!1sen!2s"
    },
    {
      city: "Peshawar",
      address: "Office #29, Near Khyber Teaching Hospital, Opp. University, Peshawar.",
      isPrimary: true,
      mapUrl: "https://maps.app.goo.gl/FDQQm2HnY8kCsdWRA?g_st=aw",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.4082471316835!2d71.49142627631553!3d34.00546132113016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d917b75dad865d%3A0x2c8fbf0ed53e9e98!2sKhyber%20Teaching%20Hospital!5e0!3m2!1sen!2s!4v1716390855042!5m2!1sen!2s"
    },
    {
      city: "Karachi",
      address: "Office #200 sector 4H Saeed Abad Baldia town Karachi.",
      isPrimary: true,
      mapUrl: "https://maps.app.goo.gl/J52y7orwEWsWcVT79?g_st=aw",
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57908.76967302843!2d67.01247761433072!3d24.892290947954358!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f90157042d3%3A0x93d609e8bec9a880!2sBALDIA%20TOWN%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1716390910209!5m2!1sen!2s"
    },
    {
      city: "Ishøj, Denmark",
      address: "Østergården 15. DK - 2635. Ishøj. Denmark",
      isPrimary: true,
      mapUrl: "https://maps.google.com/?q=%C3%98sterg%C3%A5rden%2015.%20DK%20-%202635.%20Ish%C3%B8j.%20Denmark",
      embedUrl: "https://www.google.com/maps/embed/v1/place?q=%C3%98sterg%C3%A5rden%2015.%20DK%20-%202635.%20Ish%C3%B8j.%20Denmark"
    }
  ];

  const getEmbedUrl = (city) => {
    const office = offices.find(o => o.city === city);
    return office ? office.embedUrl : offices[0].embedUrl;
  };

  const handleOfficeClick = (city) => {
    setSelectedOffice(city);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">Our Offices</h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                Serving clients with a global perspective from our strategically located offices
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Our Story Section */}
      <Container className="py-5">
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Our</span> Story
            </h2>
          </div>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="about-content p-4 rounded-3 text-dark" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
                <p>Rosebelt Consultants was founded in 2010 with a clear mission - to help businesses navigate complex challenges and achieve sustainable growth through strategic guidance and innovative solutions.</p>
                <p>Over the years, we've grown from a small team of dedicated consultants to a comprehensive business advisory firm serving clients across multiple industries and regions. Our journey has been marked by a steadfast commitment to excellence, integrity, and client success.</p>
                <p>What sets us apart is our personalized approach to consulting. We don't believe in one-size-fits-all solutions. Instead, we take the time to deeply understand each client's unique challenges, aspirations, and market context before developing tailored strategies that drive meaningful results.</p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about-image-container">
                <img src={teamImage} alt="Rosebelt Consultants Team" className="img-fluid about-image" />
              </div>
            </Col>
          </Row>
        </section>

        {/* Our Offices Section */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Our</span> Offices
            </h2>
          </div>
          
          <Row className="mb-4">
            <Col lg={12}>
              <div className="about-content p-4 rounded-3 text-dark" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
                <p>Rosebelt Consultants maintains a growing network of offices across Pakistan, enabling us to serve clients nationwide with localized expertise and rapid response times.</p>
              </div>
            </Col>
          </Row>

          {/* Primary offices with map */}
          <Row className="mb-4">
            <Col lg={6}>
              <div className="p-4 rounded-3 text-dark" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
                <h3 className="mb-3" style={{ color: '#333333', borderBottom: '2px solid #f59e0b', paddingBottom: '10px' }}>Primary Locations</h3>
                {offices.filter(office => office.isPrimary).map((office, index) => (
                  <Card 
                    key={index} 
                    className={`office-card ${selectedOffice === office.city ? 'selected-office' : ''}`}
                    onClick={() => handleOfficeClick(office.city)}
                  >
                    <Card.Body>
                      <Card.Title>{office.city}</Card.Title>
                      <Card.Text>{office.address}</Card.Text>
                      <div className="text-end">
                        <small style={{ color: '#f59e0b' }}>Click to view on map</small>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Col>
            <Col lg={6}>
              <div className="map-container rounded-3">
                <iframe 
                  src={getEmbedUrl(selectedOffice)}
                  width="100%" 
                  height="400" 
                  style={{border: 0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${selectedOffice} Office Location`}
                ></iframe>
              </div>
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
                  Partner with Rosebelt Consultants and unlock your organization's full potential.
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

export default AboutOverview; 