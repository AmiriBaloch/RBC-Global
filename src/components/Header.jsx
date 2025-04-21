import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button, Image, NavDropdown, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import logo from '../assets/logo2.png';

const Header = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const location = useLocation();

  useEffect(() => {
    // Update active link based on current path
    const path = location.pathname;
    if (path === '/' || path === '/about/overview') setActiveLink('who-we-are');
    else if (path === '/projects') setActiveLink('projects');
    else if (path === '/about') setActiveLink('about-us');
    else if (path === '/team') setActiveLink('team');
    else if (path === '/contact') setActiveLink('contact');
    else if (path.startsWith('/about/')) setActiveLink('about-us');
    else if (path.startsWith('/services/')) setActiveLink('services');
    else if (path === '/ideas') setActiveLink('ideas');
    else if (path === '/careers') setActiveLink('careers');
    else if (path.startsWith('/admin/')) setActiveLink('admin');
    // Remove experience and press
    // Add more conditions for other routes as needed
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Set scrolled state for styling
      if (currentScrollPos > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Handle header visibility based on scroll direction
      if (currentScrollPos <= 20) {
        // Always show header at top of page
        setVisible(true);
      } else if (prevScrollPos > currentScrollPos) {
        // Scrolling UP - show header
        setVisible(true);
      } else {
        // Scrolling DOWN - hide header
        setVisible(false);
      }
      
      // Save current position for next comparison
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  // Handle window resize to detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (link) => {
    setActiveLink(link);
    setExpanded(false);
  };

  // Custom dropdown hover handlers
  const handleDropdownMouseEnter = (id) => {
    if (!isMobile) {
      setHoveredDropdown(id);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (!isMobile) {
      setHoveredDropdown(null);
    }
  };

  // Toggle dropdown for mobile
  const handleDropdownToggle = (id) => {
    if (isMobile) {
      setHoveredDropdown(hoveredDropdown === id ? null : id);
    }
  };

  return (
    <Navbar 
      expand="lg" 
      className={`navbar-light shadow-sm ${scrolled ? 'scrolled' : ''} ${visible ? 'navbar-visible' : 'navbar-hidden'}`} 
      sticky="top"
      expanded={expanded}
      onToggle={(isExpanded) => setExpanded(isExpanded)}
    >
      <Container>
        <Link 
          to="/" 
          className="navbar-brand brand-logo"
          onClick={() => handleNavClick('who-we-are')}
        >
          <Image 
            src={logo} 
            alt="RoseBelt Consultants" 
            className="logo-image" 
          />
        </Link>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <div className="nav-container">
            <Nav className="ms-auto">
              {/* HOME link (formerly WHO WE ARE dropdown) */}
              <Link
                to="/"
                className={`nav-link fw-bold ${activeLink === 'who-we-are' ? 'active' : ''}`}
                onClick={() => handleNavClick('who-we-are')}
              >
                WHO WE ARE
              </Link>
              
              {/* ABOUT US dropdown (new dropdown with former WHO WE ARE items) */}
              <div 
                className="custom-dropdown-wrapper"
                onMouseEnter={() => handleDropdownMouseEnter('about-us')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown 
                  title="OUR WORKPLACE"
                  id="about-us-dropdown"
                  className={`fw-bold main-dropdown ${activeLink === 'about-us' ? 'active' : ''}`}
                  show={hoveredDropdown === 'about-us'}
                  onClick={() => handleDropdownToggle('about-us')}
                >
                  <div className="mega-menu-content">
                    <Container>
                      <Row>
                        <Col xs={12}>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/about/overview"
                            onClick={() => handleNavClick('about-us')}
                            className="mega-menu-item"
                          >
                            Our Offices
                          </NavDropdown.Item>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/about/trust"
                            onClick={() => handleNavClick('about-us')}
                            className="mega-menu-item"
                          >
                            The RoseBelt Accredited
                          </NavDropdown.Item>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/about/values"
                            onClick={() => handleNavClick('about-us')}
                            className="mega-menu-item"
                          >
                            Our Values & Commitments
                          </NavDropdown.Item>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </NavDropdown>
              </div>
              
              {/* What We Do dropdown */}
              <div 
                className="custom-dropdown-wrapper"
                onMouseEnter={() => handleDropdownMouseEnter('services')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown 
                  title="WHAT WE DO"
                  id="what-we-do-dropdown"
                  className={`fw-bold main-dropdown ${activeLink === 'services' ? 'active' : ''}`}
                  show={hoveredDropdown === 'services'}
                  onClick={() => handleDropdownToggle('services')}
                >
                  <div className="mega-menu-content">
                    <Container>
                      <Row>
                        <Col xs={12}>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/services/overview"
                            onClick={() => handleNavClick('services-overview')}
                            className="mega-menu-item"
                          >
                            Overview
                          </NavDropdown.Item>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/services/consultants"
                            onClick={() => handleNavClick('services-consultants')}
                            className="mega-menu-item"
                          >
                            RoseBelt Consultants
                          </NavDropdown.Item>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/services/health-experts"
                            onClick={() => handleNavClick('services-health')}
                            className="mega-menu-item"
                          >
                            RoseBelt Health Experts
                          </NavDropdown.Item>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/services/it-experts"
                            onClick={() => handleNavClick('services-it')}
                            className="mega-menu-item"
                          >
                            RoseBelt IT Experts
                          </NavDropdown.Item>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/services/researchers"
                            onClick={() => handleNavClick('services-researchers')}
                            className="mega-menu-item"
                          >
                            RoseBelt Researchers
                          </NavDropdown.Item>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </NavDropdown>
              </div>
              
              {/* Our Ideas */}
              <Link 
                to="/ideas" 
                className={`nav-link fw-bold ${activeLink === 'ideas' ? 'active' : ''}`}
                onClick={() => handleNavClick('ideas')}
              >
                OUR IDEAS
              </Link>
              
              {/* Join Our Team */}
              <Link 
                to="/careers" 
                className={`nav-link fw-bold ${activeLink === 'careers' ? 'active' : ''}`}
                onClick={() => handleNavClick('careers')}
              >
                JOIN OUR TEAM
              </Link>
              
              {/* Contact - as a button */}
              <Button 
                variant="link"
                as={Link}
                to="/contact"
                className={`nav-link fw-bold connect-button ${activeLink === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                Contact
              </Button>
              
              {/* Admin dropdown - restored as requested */}
              <div 
                className="custom-dropdown-wrapper"
                onMouseEnter={() => handleDropdownMouseEnter('admin')}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <NavDropdown 
                  title={
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shield-lock me-1" viewBox="0 0 16 16">
                        <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                        <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
                      </svg>
                      Admin
                    </span>
                  }
                  id="admin-dropdown"
                  className="ms-lg-2 mt-2 mt-lg-0"
                  variant="outline-secondary"
                  show={hoveredDropdown === 'admin'}
                  onClick={() => handleDropdownToggle('admin')}
                >
                  <NavDropdown.Item 
                    as={Link} 
                    to="/admin/contacts"
                    onClick={() => handleNavClick('admin')}
                  >
                    Contact Requests
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    as={Link} 
                    to="/admin/projects"
                    onClick={() => handleNavClick('admin')}
                  >
                    Projects Management
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 