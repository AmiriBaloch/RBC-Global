import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MobileNavSlider.css';

const MobileNavSlider = ({ 
  expanded, 
  setExpanded, 
  activeLink, 
  handleNavClick, 
  handleDropdownItemClick 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    workplace: false,
    services: false
  });

  // Close all sections when mobile menu is closed
  useEffect(() => {
    console.log("MobileNavSlider expanded state:", expanded);
    
    if (!expanded) {
      setExpandedSections({
        workplace: false,
        services: false
      });
    }
  }, [expanded]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Backdrop clicked, directly closing menu");
    setExpanded(false);
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

  console.log("Rendering MobileNavSlider with expanded:", expanded);

  return (
    <>
      {/* Mobile menu backdrop - always render but control visibility with CSS */}
      <div 
        className={`mobile-menu-backdrop ${expanded ? 'show' : ''}`}
        onClick={handleBackdropClick}
        style={{
          position: 'fixed',
          top: '60px', // Start below the header
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
          cursor: 'pointer',
          visibility: expanded ? 'visible' : 'hidden',
          opacity: expanded ? 1 : 0,
          transition: 'visibility 0.3s, opacity 0.3s',
          pointerEvents: expanded ? 'auto' : 'none'
        }}
      />
      
      {/* Mobile Menu Content - always render but control position with CSS */}
      <div 
        className={`mobile-nav-slider ${expanded ? 'show' : ''}`}
        style={{ display: 'block' }}
      >
        <div className="mobile-nav-container">
          <Link
            to="/"
            className={`nav-link ${activeLink === 'who-we-are' ? 'active' : ''}`}
            onClick={() => handleNavClick('who-we-are')}
            style={{ '--item-index': 0 }}
          >
            WHO WE ARE
          </Link>
          
          {/* OUR WORKPLACE Section */}
          <div className="mobile-section" style={{ '--item-index': 1 }}>
            <div 
              className="mobile-section-header"
              onClick={(e) => toggleSection('workplace', e)}
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                width: '100%',
                backgroundColor: '#E4EBF2'
              }}
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

          {/* WHAT WE DO Section */}
          <div className="mobile-section" style={{ '--item-index': 2 }}>
            <div 
              className="mobile-section-header"
              onClick={(e) => toggleSection('services', e)}
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                width: '100%',
                backgroundColor: '#E4EBF2'
              }}
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
          
          {/* Our Ideas */}
          <Link 
            to="/our-ideas" 
            className={`nav-link ${activeLink === 'ideas' ? 'active' : ''}`}
            onClick={() => handleNavClick('ideas')}
            style={{ '--item-index': 3 }}
          >
            OUR IDEAS
          </Link>
          
          {/* Join Our Team */}
          <Link 
            to="/join-our-team" 
            className={`nav-link ${activeLink === 'careers' ? 'active' : ''}`}
            onClick={() => handleNavClick('careers')}
            style={{ '--item-index': 4 }}
          >
            JOIN OUR TEAM
          </Link>
          
          {/* Contact */}
          <Link 
            to="/contact"
            className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
            onClick={() => handleNavClick('contact')}
            style={{ '--item-index': 5 }}
          >
            CONTACT
          </Link>
          
          {/* Social Media Icons */}
          <div className="mobile-nav-social-icons" style={{ '--item-index': 6 }}>
            <div className="social-icons-container">
              <a href="https://www.instagram.com/rosebeltconsultantsglobal/" target="_blank" rel="noopener noreferrer" className="nav-social-icon instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://www.facebook.com/share/16QfztW6BQ/" target="_blank" rel="noopener noreferrer" className="nav-social-icon facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://wa.me/923051564945" target="_blank" rel="noopener noreferrer" className="nav-social-icon whatsapp">
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavSlider; 