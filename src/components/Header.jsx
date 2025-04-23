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

  // Use a ref to track if we're handling our own click
  const handleOurClick = React.useRef(false);

  // Prevent Bootstrap's built-in toggle
  const handleDropdownSelect = (e) => {
    if (handleOurClick.current) {
      e.preventDefault();
      e.stopPropagation();
      handleOurClick.current = false;
    }
  };

  useEffect(() => {
    // Update active link based on current path
    const path = location.pathname;
    if (path === '/' || path === '/our-workplace/offices') setActiveLink('who-we-are');
    else if (path === '/projects') setActiveLink('projects');
    else if (path.startsWith('/our-workplace')) setActiveLink('about-us');
    else if (path.startsWith('/team')) setActiveLink('team');
    else if (path === '/contact') setActiveLink('contact');
    else if (path.startsWith('/what-we-do')) setActiveLink('services');
    else if (path.startsWith('/our-ideas')) setActiveLink('ideas');
    else if (path === '/join-our-team') setActiveLink('careers');
    else if (path === '/experience') setActiveLink('experience');
    else if (path === '/press') setActiveLink('press');
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

  // More reliable mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 992);
    };
    
    // Check on initial load
    checkMobile();
    
    // Set up event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleNavClick = (link) => {
    setActiveLink(link);
    setExpanded(false);
    // Close any open dropdown when clicking a regular nav item
    if (isMobile) {
      setHoveredDropdown(null);
    }
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

  // Explicit click handler to ensure toggle works consistently
  const handleMobileDropdownClick = (e, id) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      handleOurClick.current = true;
      
      // Toggle the dropdown - explicitly set to null if currently open
      setHoveredDropdown(hoveredDropdown === id ? null : id);
    }
  };

  return (
    <Navbar 
      expand="lg" 
      className={`navbar-light shadow-sm ${scrolled ? 'scrolled' : ''} ${visible ? 'navbar-visible' : 'navbar-hidden'}`} 
      sticky="top"
      expanded={expanded}
      onToggle={(isExpanded) => {
        setExpanded(isExpanded);
        // Close any open dropdown when toggling the navbar
        if (!isExpanded) {
          setHoveredDropdown(null);
        }
      }}
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
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className={`custom-toggler ${expanded ? 'open' : ''}`}
        />
        
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
                onMouseEnter={() => !isMobile && handleDropdownMouseEnter('about-us')}
                onMouseLeave={() => !isMobile && handleDropdownMouseLeave()}
              >
                <NavDropdown 
                  title={
                    <span 
                      className="d-flex justify-content-between align-items-center w-100"
                      onClick={(e) => isMobile && handleMobileDropdownClick(e, 'about-us')}
                    >
                      OUR WORKPLACE
                      {isMobile && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-chevron-${hoveredDropdown === 'about-us' ? 'up' : 'down'}`} viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                      )}
                    </span>
                  }
                  id="about-us-dropdown"
                  className={`fw-bold main-dropdown ${activeLink === 'about-us' ? 'active' : ''}`}
                  show={hoveredDropdown === 'about-us'}
                  onSelect={handleDropdownSelect}
                >
                  <div className="mega-menu-content">
                    <Container>
                      <Row>
                        <Col xs={12}>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/our-workplace/offices"
                            onClick={() => {
                              handleNavClick('about-us');
                              setHoveredDropdown(null);
                              setExpanded(false);
                            }}
                            className="mega-menu-item"
                          >
                            Our Offices
                          </NavDropdown.Item>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/our-workplace/accredited"
                            onClick={() => {
                              handleNavClick('about-us');
                              setHoveredDropdown(null);
                              setExpanded(false);
                            }}
                            className="mega-menu-item"
                          >
                            The RoseBelt Accredited
                          </NavDropdown.Item>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/our-workplace/values"
                            onClick={() => {
                              handleNavClick('about-us');
                              setHoveredDropdown(null);
                              setExpanded(false);
                            }}
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
                onMouseEnter={() => !isMobile && handleDropdownMouseEnter('services')}
                onMouseLeave={() => !isMobile && handleDropdownMouseLeave()}
              >
                <NavDropdown 
                  title={
                    <span 
                      className="d-flex justify-content-between align-items-center w-100"
                      onClick={(e) => isMobile && handleMobileDropdownClick(e, 'services')}
                    >
                      WHAT WE DO
                      {isMobile && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi bi-chevron-${hoveredDropdown === 'services' ? 'up' : 'down'}`} viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                      )}
                    </span>
                  }
                  id="what-we-do-dropdown"
                  className={`fw-bold main-dropdown ${activeLink === 'services' ? 'active' : ''}`}
                  show={hoveredDropdown === 'services'}
                  onSelect={handleDropdownSelect}
                >
                  <div className="mega-menu-content">
                    <Container>
                      <Row>
                        <Col xs={12}>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/what-we-do/overview"
                            onClick={() => {
                              handleNavClick('services-overview');
                              setHoveredDropdown(null);
                              setExpanded(false);
                            }}
                            className="mega-menu-item"
                          >
                            Overview
                          </NavDropdown.Item>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/what-we-do/consultants"
                            onClick={() => {
                              handleNavClick('services-consultants');
                              setHoveredDropdown(null);
                              setExpanded(false);
                            }}
                            className="mega-menu-item"
                          >
                            RoseBelt Consultants
                          </NavDropdown.Item>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/what-we-do/health-experts"
                            onClick={() => {
                              handleNavClick('services-health');
                              setHoveredDropdown(null);
                              setExpanded(false);
                            }}
                            className="mega-menu-item"
                          >
                            RoseBelt Health Experts
                          </NavDropdown.Item>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/what-we-do/it-experts"
                            onClick={() => {
                              handleNavClick('services-it');
                              setHoveredDropdown(null);
                              setExpanded(false);
                            }}
                            className="mega-menu-item"
                          >
                            RoseBelt IT Experts
                          </NavDropdown.Item>
                          <NavDropdown.Item 
                            as={Link} 
                            to="/what-we-do/researchers"
                            onClick={() => {
                              handleNavClick('services-researchers');
                              setHoveredDropdown(null);
                              setExpanded(false);
                            }}
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
                to="/our-ideas" 
                className={`nav-link fw-bold ${activeLink === 'ideas' ? 'active' : ''}`}
                onClick={() => handleNavClick('ideas')}
              >
                OUR IDEAS
              </Link>
              
              {/* Join Our Team */}
              <Link 
                to="/join-our-team" 
                className={`nav-link fw-bold ${activeLink === 'careers' ? 'active' : ''}`}
                onClick={() => handleNavClick('careers')}
              >
                JOIN OUR TEAM
              </Link>
              
              {/* Contact - as a button on desktop, regular link on mobile */}
              {!isMobile ? (
                <Button 
                  variant="link"
                  as={Link}
                  to="/contact"
                  className={`nav-link fw-bold connect-button ${activeLink === 'contact' ? 'active' : ''}`}
                  onClick={() => handleNavClick('contact')}
                >
                  Contact
                </Button>
              ) : (
                <Link 
                  to="/contact"
                  className={`nav-link fw-bold ${activeLink === 'contact' ? 'active' : ''}`}
                  onClick={() => handleNavClick('contact')}
                >
                  CONTACT
                </Link>
              )}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 