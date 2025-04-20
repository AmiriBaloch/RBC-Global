import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button, Image, NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import logo from '../assets/logo2.png';

const Header = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Update active link based on current path
    const path = location.pathname;
    if (path === '/') setActiveLink('home');
    else if (path === '/projects') setActiveLink('projects');
    else if (path === '/about') setActiveLink('about-us');
    else if (path === '/team') setActiveLink('team');
    else if (path === '/contact') setActiveLink('contact');
    // Add more conditions for other routes as needed
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Navbar expand="lg" className={`navbar-light shadow-sm ${scrolled ? 'scrolled' : ''}`} sticky="top">
      <Container>
        <Link 
          to="/" 
          className="navbar-brand brand-logo"
          onClick={() => handleNavClick('home')}
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
              <Link 
                to="/" 
                className={`nav-link fw-bold ${activeLink === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                HOME
              </Link>
              <Link 
                to="/about" 
                className={`nav-link fw-bold ${activeLink === 'about-us' ? 'active' : ''}`}
                onClick={() => handleNavClick('about-us')}
              >
                ABOUT US
              </Link>
              <NavDropdown 
                title="OUR TEAM"
                id="team-dropdown"
                className={`fw-bold ${activeLink === 'team' ? 'active' : ''}`}
              >
                <NavDropdown.Item 
                  as={Link} 
                  to="/team"
                  onClick={() => handleNavClick('team')}
                >
                  All Team Members
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item 
                  as={Link} 
                  to="/team/board"
                  onClick={() => handleNavClick('team-board')}
                >
                  Board of Directors
                </NavDropdown.Item>
                <NavDropdown.Item 
                  as={Link} 
                  to="/team/consultants"
                  onClick={() => handleNavClick('team-consultants')}
                >
                  Consultants
                </NavDropdown.Item>
                <NavDropdown.Item 
                  as={Link} 
                  to="/team/health"
                  onClick={() => handleNavClick('team-health')}
                >
                  Health Experts
                </NavDropdown.Item>
                <NavDropdown.Item 
                  as={Link} 
                  to="/team/it"
                  onClick={() => handleNavClick('team-it')}
                >
                  IT Experts
                </NavDropdown.Item>
                <NavDropdown.Item 
                  as={Link} 
                  to="/team/researchers"
                  onClick={() => handleNavClick('team-researchers')}
                >
                  Researchers
                </NavDropdown.Item>
              </NavDropdown>
              <Link 
                to="/projects" 
                className={`nav-link fw-bold ${activeLink === 'projects' ? 'active' : ''}`}
                onClick={() => handleNavClick('projects')}
              >
                PROJECTS
              </Link>
              <Link 
                to="/careers" 
                className={`nav-link fw-bold ${activeLink === 'careers' ? 'active' : ''}`}
                onClick={() => handleNavClick('careers')}
              >
                CAREERS
              </Link>
              <Button 
                variant="link"
                as={Link}
                to="/contact"
                className={`nav-link fw-bold connect-button ${activeLink === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
              >
                Connect Us
              </Button>
              
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
                onClick={() => handleNavClick('admin')}
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
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 