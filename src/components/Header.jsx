import React, { useState, useEffect, useRef } from 'react';
import { Container, Nav, Navbar, Button, Image, NavDropdown, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import logo from '../assets/logo2.png';

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRefs = useRef({});
  const location = useLocation();

  // Close dropdowns when route changes
  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 992;
      setIsMobile(newIsMobile);
      if (!newIsMobile) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      if (scrolled) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && dropdownRefs.current[activeDropdown]) {
        const dropdownElement = dropdownRefs.current[activeDropdown];
        if (!dropdownElement.contains(event.target)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const handleDropdownClick = (dropdownName, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  const handleMobileDropdownClick = (dropdownName, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  const toggleNavbar = () => {
    setIsNavCollapsed(!isNavCollapsed);
    if (!isNavCollapsed) {
      setActiveDropdown(null);
    }
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <Navbar 
        expand="lg" 
        className="navbar-custom"
        expanded={!isNavCollapsed}
        onToggle={toggleNavbar}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand">
            <img src={logo} alt="Rosebelt Logo" className="logo" />
          </Navbar.Brand>

          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={toggleNavbar}
            className="custom-toggler"
          >
            <span className={`navbar-toggler-icon ${!isNavCollapsed ? 'open' : ''}`}></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav" className={isNavCollapsed ? '' : 'show'}>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active' : ''}>
                Home
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                to="/about" 
                className={location.pathname === '/about' ? 'active' : ''}
              >
                About Us
              </Nav.Link>

              <NavDropdown 
                title="Services" 
                id="services-dropdown"
                active={activeDropdown === 'services'}
                onClick={(e) => handleDropdownClick('services', e)}
                ref={el => dropdownRefs.current['services'] = el}
              >
                <NavDropdown.Item as={Link} to="/services/consulting" onClick={closeAllDropdowns}>
                  Consulting
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/services/recruitment" onClick={closeAllDropdowns}>
                  Recruitment
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/services/training" onClick={closeAllDropdowns}>
                  Training
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown 
                title="Resources" 
                id="resources-dropdown"
                active={activeDropdown === 'resources'}
                onClick={(e) => handleDropdownClick('resources', e)}
                ref={el => dropdownRefs.current['resources'] = el}
              >
                <NavDropdown.Item as={Link} to="/resources/blog" onClick={closeAllDropdowns}>
                  Blog
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/resources/case-studies" onClick={closeAllDropdowns}>
                  Case Studies
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/resources/whitepapers" onClick={closeAllDropdowns}>
                  Whitepapers
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link 
                as={Link} 
                to="/contact" 
                className={location.pathname === '/contact' ? 'active' : ''}
              >
                Contact
              </Nav.Link>

              <Nav.Link 
                as={Link} 
                to="/join-our-team" 
                className={`join-button ${location.pathname === '/join-our-team' ? 'active' : ''}`}
              >
                Join Our Team
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header; 