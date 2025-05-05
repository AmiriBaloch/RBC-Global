import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaPhone, FaSearch, FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For a real implementation, navigate to a search results page with the query
      console.log('Searching for:', searchQuery);
      // Example: navigate to a search page with the query as a parameter
      // navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      
      // For now, just clear the search input
      setSearchQuery('');
    }
  };

  return (
    <footer className="footer">
      <Container>
        <Row className="py-4">
          {/* Company Info */}
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="footer-heading">About Us</h5>
            <p className="company-description">
              Rosebelt Consultants Global provides innovative solutions and strategic consulting services to help businesses thrive in today's competitive landscape.
            </p>
          </Col>

          {/* Quick Links */}
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/our-company/locations">Our Company</Link></li>
              <li><Link to="/meet-our-experts/leadership">Meet Our Experts</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/join-our-team">Join Our Team</Link></li>
              <li><Link to="/newsroom">Newsroom</Link></li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="footer-heading">Contact Us</h5>
            <ul className="footer-contact">
              <li>
                <FaEnvelope className="contact-icon" style={{ color: '#f59e0b' }} />
                <a href="mailto:admin@rbcglobal.org" style={{ marginLeft: '8px' }}>admin@rbcglobal.org</a>
              </li>
            </ul>
            <div className="social-links mt-3">
              <a href="https://www.facebook.com/share/16QfztW6BQ/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/rosebeltconsultantsglobal/" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
              <a href="https://wa.me/923051564945" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaWhatsapp />
              </a>
            </div>
          </Col>

          {/* Search */}
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h5 className="footer-heading">Search</h5>
            <Form onSubmit={handleSearch} className="footer-search">
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  aria-label="Search the website"
                  style={{ borderRadius: '20px' }}
                />
              </div>
            </Form>
            <div className="newsletter mt-4">
              <h6 className="footer-subheading">Newsletter</h6>
              <p>Subscribe to our newsletter for updates</p>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  className="newsletter-input"
                />
                <Button style={{ backgroundColor: '#f59e0b', borderColor: '#f59e0b' }} className="w-100 mt-2">
                  Subscribe
                </Button>
              </Form.Group>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="copyright-row">
          <Col className="text-center py-3 border-top">
            <p className="mb-0">
              © {new Date().getFullYear()} Rosebelt Consultants Global. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 