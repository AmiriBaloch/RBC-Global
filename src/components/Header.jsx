import React, { useState, useEffect, useRef } from 'react';
import { Container, Nav, Navbar, Button, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import logo from '../assets/logo2.png';
import MobileNavSlider from './MobileNavSlider';

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
  const togglerRef = useRef(null);
  const burgerButtonRef = useRef(null);

  // Close dropdowns when route changes
  useEffect(() => {
    setActiveDropdown(null);
  }, [location]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newIsMobile = windowWidth < 992;
      
      setIsMobile(newIsMobile);
      
      // Close mobile menu when resizing to desktop
      if (!newIsMobile && expanded) {
        setExpanded(false);
      }
      
      
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
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

  // Add event listener to close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close all dropdowns if user clicks outside of any dropdown
      const isClickInsideDropdown = event.target.closest('.dropdown-menu') || 
                                   event.target.closest('.custom-dropdown-wrapper') ||
                                   event.target.closest('.dropdown-toggle');
      
      if (!isClickInsideDropdown) {
        setActiveDropdown(null);
      }
    };

    // Add the event listener to the document
    document.addEventListener('click', handleClickOutside);
    
    // Remove the listener when component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
      handleNavClick(linkName);
      
      // Remove the closing class after animation completes
      dropdownMenus.forEach(menu => {
        menu.classList.remove('closing');
      });
    }, 200); // Match this with the CSS transition duration
  };

  // Remove the useEffect for the burger button click since we now use onClick directly
  useEffect(() => {
    
    
    // Toggle body scroll lock when mobile menu is expanded
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

  // Replace the toggleMobileMenu function with a simpler direct approach
  const openMobileMenu = () => {
    
    document.body.style.overflow = "hidden"; // Prevent background scrolling
    setExpanded(true);
  };

  const closeMobileMenu = () => {
    
    document.body.style.overflow = ""; // Restore scrolling
    setExpanded(false);
  };

  return (
    <>
      {/* Mobile Navigation Slider - only on mobile */}
      {isMobile && (
        <MobileNavSlider 
          expanded={expanded}
          setExpanded={setExpanded}
          activeLink={activeLink}
          handleNavClick={handleNavClick}
          handleDropdownItemClick={handleDropdownItemClick}
        />
      )}
      
      <Navbar 
        expand="lg" 
        className={`navbar-light shadow-sm ${scrolled ? 'scrolled' : ''} ${visible ? 'navbar-visible' : 'navbar-hidden'}`} 
        sticky="top"
        expanded={expanded}
        onToggle={(isExpanded) => {
          
          // Don't use this to set expanded state since we're managing it ourselves
          // Only handle collapse state if needed
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
            />
          </Link>

          {/* Burger button - only show on mobile */}
          {isMobile && (
            <button 
              ref={burgerButtonRef}
              className={`custom-toggler ${expanded ? 'open' : ''}`}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '45px',
                height: '40px',
                position: 'relative',
                zIndex: 10001, // Increased z-index to be higher than any other element
                transition: 'transform 0.3s ease',
                transform: expanded ? 'scale(1.1)' : 'scale(1)',
                marginRight: '5px',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                pointerEvents: 'auto' // Ensure clicks are captured
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                
                // Toggle between states
                if (expanded) {
                  closeMobileMenu();
                } else {
                  openMobileMenu();
                }
              }}
              aria-label="Toggle navigation menu"
            >
              <div className="hamburger-icon">
                <span className={`line line-1 ${expanded ? 'open' : ''}`}></span>
                <span className={`line line-2 ${expanded ? 'open' : ''}`}></span>
                <span className={`line line-3 ${expanded ? 'open' : ''}`}></span>
              </div>
            </button>
          )}

          {/* Hidden original toggle - used for Bootstrap's internal handling */}
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            className="d-none"
            ref={togglerRef}
          />

          {/* Desktop Navigation - only shown on desktop */}
          {!isMobile && (
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
                  
                  {/* OUR WORKPLACE dropdown */}
                  <div className="custom-dropdown-wrapper">
                    <Link to="#" className="nav-link dropdown-toggle fw-bold">
                      OUR COMPANY
                      <i className="bi bi-chevron-down ms-1"></i>
                    </Link>
                    <div className="dropdown-menu">
                      <Link 
                        to="/our-company/locations"
                        onClick={() => handleDropdownItemClick('about-us')}
                        className="dropdown-item"
                      >
                        OUR OFFICES
                      </Link>
                      <Link 
                        to="/our-company/who-trusts-us"
                        onClick={() => handleDropdownItemClick('about-us')}
                        className="dropdown-item"
                      >
                        OUR PARTNERS
                      </Link>
                      <Link 
                        to="/our-company/what-we-believe"
                        onClick={() => handleDropdownItemClick('about-us')}
                        className="dropdown-item"
                      >
                        WHAT WE BELIEVE
                      </Link>
                    </div>
                  </div>

                  {/* WHAT WE DO section */}
                  <div className="custom-dropdown-wrapper">
                    <Link to="#" className="nav-link dropdown-toggle fw-bold">
                      MEET OUR EXPERTS
                      <i className="bi bi-chevron-down ms-1"></i>
                    </Link>
                    <div className="dropdown-menu">
                      <Link 
                        to="/meet-our-experts/leadership"
                        onClick={() => handleDropdownItemClick('services-overview')}
                        className="dropdown-item"
                      >
                        OUR LEADERSHIP
                      </Link>
                      <Link 
                        to="/meet-our-experts/consultants"
                        onClick={() => handleDropdownItemClick('services-consultants')}
                        className="dropdown-item"
                      >
                        OUR CONSULTANTS
                      </Link>
                      <Link 
                        to="/meet-our-experts/health-experts"
                        onClick={() => handleDropdownItemClick('services-health')}
                        className="dropdown-item"
                      >
                        OUR HEALTH EXPERTS
                      </Link>
                      <Link 
                        to="/meet-our-experts/it-experts"
                        onClick={() => handleDropdownItemClick('services-it')}
                        className="dropdown-item"
                      >
                        OUR IT EXPERTS
                      </Link>
                      <Link 
                        to="/meet-our-experts/researchers"
                        onClick={() => handleDropdownItemClick('services-researchers')}
                        className="dropdown-item"
                      >
                        OUR RESEARCHERS
                      </Link>
                    </div>
                  </div>
                  
                  {/* Our Works Dropdown */}
                  <div className="custom-dropdown-wrapper">
                    <Link to="#" className="nav-link dropdown-toggle fw-bold">
                      OUR WORKS
                      <i className="bi bi-chevron-down ms-1"></i>
                    </Link>
                    <div className="dropdown-menu">
                      <Link 
                        to="/our-ideas"
                        onClick={() => handleDropdownItemClick('ideas')}
                        className="dropdown-item"
                      >
                        OUR IDEAS
                      </Link>
                      <Link 
                        to="/projects"
                        onClick={() => handleDropdownItemClick('projects')}
                        className="dropdown-item"
                      >
                        OUR PROJECTS
                      </Link>
                      <Link 
                        to="/newsroom"
                        onClick={() => handleDropdownItemClick('press')}
                        className="dropdown-item"
                      >
                        NEWSROOM
                      </Link>
                    </div>
                  </div>
                  
                  {/* Join Our Team */}
                  <Link 
                    to="/join-our-team" 
                    className={`nav-link fw-bold ${activeLink === 'join-our-team' ? 'active' : ''}`}
                    onClick={() => handleNavClick('join-our-team')}
                  >
                    JOIN OUR TEAM
                  </Link>

                  {/* Contact Us Button */}
                  <Button
                    as={Link}
                    to="/contact-us"
                    variant="outline-success"
                    className="fw-bold ms-lg-3"
                  >
                    CONTACT US
                  </Button>
                </Nav>
              </div>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;