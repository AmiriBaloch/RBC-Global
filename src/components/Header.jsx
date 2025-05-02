import React, { useState, useEffect, useRef } from 'react';
import { Container, Nav, Navbar, Button, Image } from 'react-bootstrap';
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
  const [expandedSections, setExpandedSections] = useState({
    workplace: false,
    services: false
  });
  const togglerRef = useRef(null);

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

  // Toggle body scroll lock when mobile menu is expanded
  useEffect(() => {
    if (expanded) {
      document.body.classList.add('no-scroll');
      document.body.classList.add('menu-expanded');
    } else {
      document.body.classList.remove('no-scroll');
      document.body.classList.remove('menu-expanded');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('no-scroll');
      document.body.classList.remove('menu-expanded');
    };
  }, [expanded]);

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

  const handleNavClick = (link) => {
    setActiveLink(link);
    setExpanded(false);
    setActiveDropdown(null);
  };

  // For mobile dropdowns we still need click handling
  const handleMobileDropdownClick = (dropdownName, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Toggle the dropdown - if it's already open, close it; otherwise open it
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleDropdownItemClick = (linkName) => {
    // Get all dropdown menus and add the closing animation class
    const dropdownMenus = document.querySelectorAll('.dropdown-menu, .mega-menu-content, .mobile-section-content');
    dropdownMenus.forEach(menu => {
      if (menu.classList.contains('show')) {
        menu.classList.add('closing');
      }
    });
    
    // Use a short timeout to allow the animation to play
    setTimeout(() => {
      // Close the dropdown when an item is clicked
      setActiveDropdown(null);
      setExpanded(false);
      // Close all expanded mobile sections
      setExpandedSections({
        workplace: false,
        services: false
      });
      handleNavClick(linkName);
      
      // Remove the closing class after animation completes
      dropdownMenus.forEach(menu => {
        menu.classList.remove('closing');
      });
    }, 200); // Match this with the CSS transition duration
  };

  const toggleSection = (sectionName, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    // If clicking on a dropdown that's already open, close it with animation
    if (expandedSections[sectionName]) {
      // Get the section content element
      const sectionContent = event.currentTarget.nextElementSibling;
      if (sectionContent) {
        sectionContent.classList.add('closing');
        
        // Use timeout to allow animation to play
        setTimeout(() => {
          setExpandedSections(prev => ({
            ...prev,
            [sectionName]: false
          }));
          sectionContent.classList.remove('closing');
        }, 200);
      }
      return;
    }
    
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

  // Add event listener to close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close all dropdowns if user clicks outside of any dropdown
      const isClickInsideDropdown = event.target.closest('.dropdown-menu') || 
                                   event.target.closest('.mobile-section-header') ||
                                   event.target.closest('.custom-dropdown-wrapper') ||
                                   event.target.closest('.dropdown-toggle');
      
      if (!isClickInsideDropdown) {
        setActiveDropdown(null);
        setExpandedSections({
          workplace: false,
          services: false
        });
      }
    };

    // Add the event listener to the document
    document.addEventListener('click', handleClickOutside);
    
    // Remove the listener when component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
            width={200}
            height="auto"
            loading="eager"
            priority={true}
          />
        </Link>

        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className={`custom-toggler ${expanded ? 'open' : ''}`}
          ref={togglerRef}
        >
          <span className="navbar-toggler-icon">
            <span></span>
          </span>
        </Navbar.Toggle>

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
                <div className="custom-dropdown-wrapper">
                  <Link to="#" className="nav-link dropdown-toggle fw-bold">OUR WORKPLACE</Link>
                  <div className="dropdown-menu">
                    <Link 
                      to="/our-workplace/offices"
                      onClick={() => handleDropdownItemClick('about-us')}
                      className="dropdown-item"
                    >
                      Our Offices
                    </Link>
                    <Link 
                      to="/our-workplace/accredited"
                      onClick={() => handleDropdownItemClick('about-us')}
                      className="dropdown-item"
                    >
                      The RoseBelt Accredited
                    </Link>
                    <Link 
                      to="/our-workplace/values"
                      onClick={() => handleDropdownItemClick('about-us')}
                      className="dropdown-item"
                    >
                      Our Values & Commitments
                    </Link>
                  </div>
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
                <div className="custom-dropdown-wrapper">
                  <Link to="#" className="nav-link dropdown-toggle fw-bold">WHAT WE DO</Link>
                  <div className="dropdown-menu">
                    <Link 
                      to="/what-we-do/overview"
                      onClick={() => handleDropdownItemClick('services-overview')}
                      className="dropdown-item"
                    >
                      Overview
                    </Link>
                    <Link 
                      to="/what-we-do/consultants"
                      onClick={() => handleDropdownItemClick('services-consultants')}
                      className="dropdown-item"
                    >
                      RoseBelt Consultants
                    </Link>
                    <Link 
                      to="/what-we-do/health-experts"
                      onClick={() => handleDropdownItemClick('services-health')}
                      className="dropdown-item"
                    >
                      RoseBelt Health Experts
                    </Link>
                    <Link 
                      to="/what-we-do/it-experts"
                      onClick={() => handleDropdownItemClick('services-it')}
                      className="dropdown-item"
                    >
                      RoseBelt IT Experts
                    </Link>
                    <Link 
                      to="/what-we-do/researchers"
                      onClick={() => handleDropdownItemClick('services-researchers')}
                      className="dropdown-item"
                    >
                      RoseBelt Researchers
                    </Link>
                  </div>
                </div>
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
              
              {/* Social Media Icons - only shown on mobile when menu is expanded */}
              {isMobile && expanded && (
                <div className="mobile-nav-social-icons" style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  justifyContent: 'center', 
                  marginTop: '10px',
                  borderTop: '1px solid #e4ebf2',
                  paddingTop: '10px'
                }}>
                  <div style={{ 
                    display: 'flex',
                    background: '#e4ebf2',
                    borderRadius: '10px',
                    padding: '3px',
                    width: 'fit-content'
                  }}>
                    <a href="https://www.instagram.com/rosebeltconsultantsglobal/" target="_blank" rel="noopener noreferrer" className="nav-social-icon instagram" style={{ margin: '0 -2px' }}>
                      <i className="bi bi-instagram" style={{ fontSize: '24px' }}></i>
                    </a>
                    <a href="https://www.facebook.com/share/16QfztW6BQ/" target="_blank" rel="noopener noreferrer" className="nav-social-icon facebook" style={{ margin: '0 -2px' }}>
                      <i className="bi bi-facebook" style={{ fontSize: '24px' }}></i>
                    </a>
                    <a href="https://wa.me/923051564945" target="_blank" rel="noopener noreferrer" className="nav-social-icon whatsapp" style={{ margin: '0 -2px' }}>
                      <i className="bi bi-whatsapp" style={{ fontSize: '24px' }}></i>
                    </a>
                  </div>
                </div>
              )}
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 