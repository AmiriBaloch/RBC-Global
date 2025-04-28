import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaBullhorn, FaAngleDown, FaAngleUp, FaTimes, FaComment, FaBell, FaExternalLinkAlt, FaRegClock } from 'react-icons/fa';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation, Link } from 'react-router-dom';
import './Announcements.css';

const Announcements = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(true);
  const [showComponent, setShowComponent] = useState(false);
  const location = useLocation();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  
  // Show component after 7 seconds, but only on the home page
  useEffect(() => {
    // Only initialize the timer if we're on the home page
    if (isHomePage) {
      const timer = setTimeout(() => {
        setShowComponent(true);
        
        // Add a small delay before starting the slide-in animation for smoother appearance
        setTimeout(() => {
          setIsHidden(false);
        }, 200);
      }, 7000); // 7 seconds delay
      
      return () => clearTimeout(timer);
    } else {
      // Reset state when not on home page
      setShowComponent(false);
      setIsHidden(true);
    }
  }, [isHomePage]);
  
  // Fetch announcements from Firestore
  useEffect(() => {
    // Only fetch if we're on the home page to save resources
    if (!isHomePage) return;
    
    const announcementsQuery = query(
      collection(db, 'announcements'), 
      orderBy('date', 'desc'),
      limit(5)
    );
    
    const unsubscribe = onSnapshot(announcementsQuery, (snapshot) => {
      const announcementsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setAnnouncements(announcementsData);
      
      // Set the latest announcement (first in the array) for display in closed state
      if (announcementsData.length > 0) {
        setLatestAnnouncement(announcementsData[0]);
      }
      
      setLoading(false);
    }, (error) => {
      console.error("Error fetching announcements:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isHomePage]);

  // Close announcements when page changes
  useEffect(() => {
    // Close the announcements box when the route changes
    setIsOpen(false);
  }, [location]);

  // Add scroll event listener to close announcements when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    // Add scroll event listener with a very short debounce time for immediate response
    let scrollTimer;
    const scrollHandler = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(handleScroll, 50); // Reduced from 200ms to 50ms for faster response
    };

    window.addEventListener('scroll', scrollHandler);

    // Clean up on unmount
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      clearTimeout(scrollTimer);
    };
  }, [isOpen]);

  // Toggle announcements box
  const toggleAnnouncements = () => {
    setIsOpen(!isOpen);
  };

  // Dismiss announcements completely
  const dismissAnnouncements = (e) => {
    e.stopPropagation(); // Prevent the click from toggling the box
    setShowComponent(false);
  };

  // Format date to readable string
  const formatDate = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const announcementDate = new Date(date);
    
    // If it's today, show "Today" instead of the date
    if (announcementDate.toDateString() === now.toDateString()) {
      return 'Today';
    }
    
    // If it's yesterday, show "Yesterday"
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (announcementDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    // Otherwise return the formatted date
    return announcementDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // If not on home page, or no announcements and not loading, or component is dismissed, don't render anything
  if (!isHomePage || (!loading && !latestAnnouncement) || !showComponent) return null;

  return (
    <div className={`announcements-box comment-style ${isOpen ? 'open' : 'closed'} ${isHidden ? 'hidden' : ''}`}>
      <div className="announcements-header" onClick={toggleAnnouncements}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaBell className="bell-icon-animated" style={{ marginRight: '10px' }} />
          <span className="announcement-text-animated">Announcements</span>
          {announcements.length > 0 && 
            <span style={{ 
              fontSize: '0.7rem', 
              background: 'rgba(255,255,255,0.3)', 
              borderRadius: '10px', 
              padding: '2px 6px', 
              marginLeft: '8px' 
            }}>
              {announcements.length}
            </span>
          }
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button 
            variant="link" 
            className="dismiss-button"
            onClick={dismissAnnouncements}
            aria-label="Dismiss announcements"
          >
            <FaTimes />
          </Button>
          {isOpen ? <FaAngleDown style={{ marginLeft: '5px' }} /> : <FaAngleUp style={{ marginLeft: '5px' }} />}
        </div>
      </div>
      
      {loading ? (
        <div className="latest-announcement">
          <div className="loading-animation">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      ) : (
        <>
          {!isOpen && latestAnnouncement && (
            <div className="latest-announcement" onClick={toggleAnnouncements}>
              <h6 className="announcement-title">
                {latestAnnouncement.title}
              </h6>
              <p className="announcement-preview">
                {latestAnnouncement.content}
              </p>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                fontSize: '0.7rem', 
                color: '#9aa0a8',
                marginTop: '4px'
              }}>
                <FaRegClock style={{ marginRight: '4px', fontSize: '0.65rem' }} />
                {formatDate(latestAnnouncement.date)}
              </div>
            </div>
          )}
          
          {isOpen && (
            <>
              <div className="announcements-content">
                {announcements.length > 0 ? (
                  announcements.map(announcement => (
                    <div key={announcement.id} className="announcement-item">
                      <h6 className="announcement-title">
                        {announcement.title}
                      </h6>
                      <p>
                        {announcement.content}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <small className="text-muted">
                          <FaRegClock style={{ marginRight: '4px', fontSize: '0.7rem' }} />
                          {formatDate(announcement.date)}
                        </small>
                        <Link to="/join-our-team">
                          <Button 
                            variant="primary" 
                            size="sm"
                            className="apply-now-button"
                            style={{
                              backgroundColor: '#f59e0b',
                              borderColor: '#f59e0b',
                              color: 'white',
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '0.8rem',
                              fontWeight: '600',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            Apply Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">No announcements available</p>
                )}
              </div>
              
              <div className="announcement-actions">
                <Button 
                  size="sm" 
                  variant="link" 
                  className="view-all-button"
                >
                  View All <FaExternalLinkAlt style={{ fontSize: '0.7rem', marginLeft: '4px' }} />
                </Button>
                <Button 
                  size="sm" 
                  variant="link" 
                  onClick={toggleAnnouncements}
                  className="close-button"
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Announcements; 