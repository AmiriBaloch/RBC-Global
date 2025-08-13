import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setSearchQuery('');
    }
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log('Newsletter subscription:', email);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <Container>
          <Row className="g-4">
            {/* Company Info */}
            <Col lg={4} md={6}>
              <div className="footer-widget">
                <h5 className="footer-heading">About Us</h5>
                <p className="company-description">
                  Rosebelt Consultants Global provides innovative solutions and strategic consulting services to help businesses thrive in today's competitive landscape.
                </p>
                <div className="social-links">
                  <a href="https://www.facebook.com/share/16QfztW6BQ/" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaFacebook />
                  </a>
                  <a href="https://www.instagram.com/rosebeltconsultantsglobal/" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaInstagram />
                  </a>
                  <a href="https://wa.me/923051564945" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaWhatsapp />
                  </a>
                  <a href="https://www.linkedin.com/company/rosebelt/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg={2} md={6}>
              <div className="footer-widget">
                <h5 className="footer-heading">Quick Links</h5>
                <ul className="footer-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/our-company/locations">Our Company</Link></li>
                  <li><Link to="/meet-our-experts/leadership">Meet Our Experts</Link></li>
                  <li><Link to="/projects">Projects</Link></li>
                  <li><Link to="/join-our-team">Join Our Team</Link></li>
                  <li><Link to="/newsroom">Newsroom</Link></li>
                </ul>
              </div>
            </Col>

            {/* Contact Info */}
            <Col lg={3} md={6}>
              <div className="footer-widget">
                <h5 className="footer-heading">Contact Us</h5>
                <ul className="footer-contact">
                  <li>
                    <FaEnvelope className="contact-icon" />
                    <a href="mailto:admin@rbcglobal.org">admin@rbcglobal.org</a>
                  </li>
                  <li>
                    <FaMapMarkerAlt className="contact-icon" />
                    <span>Lahore, Pakistan</span>
                  </li>
                </ul>
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Location_Map_Asia.svg" alt="Map of Asia" className="asia-map" />
              </div>
            </Col>

            {/* Newsletter */}
            <Col lg={3} md={6}>
              <div className="footer-widget">
                <h5 className="footer-heading">Newsletter</h5>
                <p className="newsletter-text">Subscribe to our newsletter for updates and insights.</p>
                <Form onSubmit={handleNewsletter} className="newsletter-form">
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="newsletter-input"
                    />
                  </Form.Group>
                  <Button type="submit" className="newsletter-btn">
                    Subscribe
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <Container>
          <Row>
            <Col className="text-center py-3">
              <p className="mb-0">
                © {new Date().getFullYear()} Rosebelt Consultants Global. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer; 