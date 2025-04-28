import React, { useState, useEffect, useRef } from 'react';
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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const dropdownRefs = useRef({});
  const location = useLocation();
  const [allDropdownsOpen, setAllDropdownsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    workplace: false,
    services: false
  });

  // Use a ref to track if we're handling our own click
  const handleOurClick = useRef(false);

  // Close dropdowns when route changes
  useEffect(() => {
    setActiveDropdown(null);
  }, [location]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 992;
      setIsMobile(newIsMobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll events
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

      // Close dropdowns when scrolling
      if (currentScrollPos > 0) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

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

  const handleNavClick = (link) => {
    setActiveLink(link);
    setExpanded(false);
    setActiveDropdown(null);
  };

  const handleDropdownClick = (dropdownName, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Reset all dropdowns state when clicking individual dropdowns
    setAllDropdownsOpen(false);
    
    // If clicking the same dropdown that's already open, close it
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      // If clicking a different dropdown, close the current one and open the new one
      setActiveDropdown(dropdownName);
    }
  };

  const handleDropdownItemClick = (linkName) => {
    // Close the dropdown when an item is clicked
    setActiveDropdown(null);
    setExpanded(false);
    handleNavClick(linkName);
  };

  const handleMobileDropdownClick = (dropdownName, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Toggle the dropdown - if it's already open, close it; otherwise open it
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  // Prevent Bootstrap's built-in toggle
  const handleDropdownSelect = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside any dropdown
      const isOutsideDropdown = !event.target.closest('.dropdown');
      if (isOutsideDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleAllDropdowns = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Toggle all dropdowns
    if (allDropdownsOpen) {
      // Close all dropdowns
      setActiveDropdown(null);
      setAllDropdownsOpen(false);
    } else {
      // Open all dropdowns
      setAllDropdownsOpen(true);
      setActiveDropdown('all');
    }
  };

  const toggleSection = (sectionName, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Close all sections first, then open the clicked one if it wasn't already open
    setExpandedSections(prev => {
      const wasOpen = prev[sectionName];
      return {
        workplace: false,
        services: false,
        [sectionName]: !wasOpen
      };
    });
  };

  return (
    <Navbar 
      expand="lg" 
      className={`navbar-light shadow-sm ${scrolled ? 'scrolled' : ''} ${visible ? 'navbar-visible' : 'navbar-hidden'}`} 
      sticky="top"
      expanded={expanded}
      onToggle={(isExpanded) => {
        setExpanded(isExpanded);
        if (!isExpanded) {
          setActiveDropdown(null);
          setAllDropdownsOpen(false);
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
              {!isMobile ? (
                <div 
                  className="custom-dropdown-wrapper"
                  ref={el => dropdownRefs.current['about-us'] = el}
                >
                  <NavDropdown 
                    title={
                      <span className="d-flex justify-content-between align-items-center w-100">
                        OUR WORKPLACE
                      </span>
                    }
                    id="about-us-dropdown"
                    className={`fw-bold main-dropdown ${activeLink === 'about-us' ? 'active' : ''}`}
                    show={activeDropdown === 'about-us'}
                    onSelect={handleDropdownSelect}
                    onClick={(e) => handleDropdownClick('about-us', e)}
                  >
                    <div className="mega-menu-content">
                      <Container>
                        <Row>
                          <Col xs={12}>
                            <NavDropdown.Item 
                              as={Link} 
                              to="/our-workplace/offices"
                              onClick={() => handleDropdownItemClick('about-us')}
                              className="mega-menu-item"
                            >
                              Our Offices
                            </NavDropdown.Item>
                            <NavDropdown.Item 
                              as={Link} 
                              to="/our-workplace/accredited"
                              onClick={() => handleDropdownItemClick('about-us')}
                              className="mega-menu-item"
                            >
                              The RoseBelt Accredited
                            </NavDropdown.Item>
                            <NavDropdown.Item 
                              as={Link} 
                              to="/our-workplace/values"
                              onClick={() => handleDropdownItemClick('about-us')}
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
              ) : (
                <div className="mobile-section">
                  <div 
                    className="d-flex justify-content-between align-items-center w-100 mobile-section-header"
                    onClick={(e) => toggleSection('workplace', e)}
                  >
                    <span>OUR WORKPLACE</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      fill="currentColor" 
                      className={`bi bi-chevron-down ${expandedSections.workplace ? 'rotate' : ''}`} 
                      viewBox="0 0 16 16"
                    >
                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </div>
                  <div className={`mobile-section-content ${expandedSections.workplace ? 'show' : ''}`}>
                    <Link 
                      to="/our-workplace/offices"
                      className="mobile-submenu-item"
                      onClick={() => handleDropdownItemClick('about-us')}
                    >
                      Our Offices
                    </Link>
                    <Link 
                      to="/our-workplace/accredited"
                      className="mobile-submenu-item"
                      onClick={() => handleDropdownItemClick('about-us')}
                    >
                      The RoseBelt Accredited
                    </Link>
                    <Link 
                      to="/our-workplace/values"
                      className="mobile-submenu-item"
                      onClick={() => handleDropdownItemClick('about-us')}
                    >
                      Our Values & Commitments
                    </Link>
                  </div>
                </div>
              )}

              {/* WHAT WE DO section */}
              {!isMobile ? (
                <NavDropdown 
                  title={
                    <span className="d-flex justify-content-between align-items-center w-100">
                      WHAT WE DO
                      {isMobile && (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          fill="currentColor" 
                          className={`bi bi-chevron-down ${(activeDropdown === 'services' || activeDropdown === 'all') ? 'rotate' : ''}`} 
                          viewBox="0 0 16 16"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAllDropdowns(e);
                          }}
                        >
                          <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                      )}
                    </span>
                  }
                  id="services-dropdown"
                  className={`fw-bold ${isMobile ? 'mobile-menu-item' : 'main-dropdown'} ${activeLink === 'services' ? 'active' : ''}`}
                  onClick={(e) => handleDropdownClick('services', e)}
                  show={activeDropdown === 'services' || activeDropdown === 'all'}
                  ref={el => dropdownRefs.current['services'] = el}
                >
                  <NavDropdown.Item 
                    as={Link} 
                    to="/what-we-do/overview"
                    onClick={() => handleDropdownItemClick('services-overview')}
                    className={isMobile ? "mobile-submenu-item" : "mega-menu-item"}
                  >
                    Overview
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    as={Link} 
                    to="/what-we-do/consultants"
                    onClick={() => handleDropdownItemClick('services-consultants')}
                    className={isMobile ? "mobile-submenu-item" : "mega-menu-item"}
                  >
                    RoseBelt Consultants
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    as={Link} 
                    to="/what-we-do/health-experts"
                    onClick={() => handleDropdownItemClick('services-health')}
                    className={isMobile ? "mobile-submenu-item" : "mega-menu-item"}
                  >
                    RoseBelt Health Experts
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    as={Link} 
                    to="/what-we-do/it-experts"
                    onClick={() => handleDropdownItemClick('services-it')}
                    className={isMobile ? "mobile-submenu-item" : "mega-menu-item"}
                  >
                    RoseBelt IT Experts
                  </NavDropdown.Item>
                  <NavDropdown.Item 
                    as={Link} 
                    to="/what-we-do/researchers"
                    onClick={() => handleDropdownItemClick('services-researchers')}
                    className={isMobile ? "mobile-submenu-item" : "mega-menu-item"}
                  >
                    RoseBelt Researchers
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <div className="mobile-section">
                  <div 
                    className="d-flex justify-content-between align-items-center w-100 mobile-section-header"
                    onClick={(e) => toggleSection('services', e)}
                  >
                    <span>WHAT WE DO</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      fill="currentColor" 
                      className={`bi bi-chevron-down ${expandedSections.services ? 'rotate' : ''}`} 
                      viewBox="0 0 16 16"
                    >
                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </div>
                  <div className={`mobile-section-content ${expandedSections.services ? 'show' : ''}`}>
                    <Link 
                      to="/what-we-do/overview"
                      className="mobile-submenu-item"
                      onClick={() => handleDropdownItemClick('services-overview')}
                    >
                      Overview
                    </Link>
                    <Link 
                      to="/what-we-do/consultants"
                      className="mobile-submenu-item"
                      onClick={() => handleDropdownItemClick('services-consultants')}
                    >
                      RoseBelt Consultants
                    </Link>
                    <Link 
                      to="/what-we-do/health-experts"
                      className="mobile-submenu-item"
                      onClick={() => handleDropdownItemClick('services-health')}
                    >
                      RoseBelt Health Experts
                    </Link>
                    <Link 
                      to="/what-we-do/it-experts"
                      className="mobile-submenu-item"
                      onClick={() => handleDropdownItemClick('services-it')}
                    >
                      RoseBelt IT Experts
                    </Link>
                    <Link 
                      to="/what-we-do/researchers"
                      className="mobile-submenu-item"
                      onClick={() => handleDropdownItemClick('services-researchers')}
                    >
                      RoseBelt Researchers
                    </Link>
                  </div>
                </div>
              )}
              
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