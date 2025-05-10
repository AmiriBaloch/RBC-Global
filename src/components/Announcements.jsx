import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { 
  FaBullhorn, 
  FaAngleDown, 
  FaAngleUp, 
  FaTimes, 
  FaComment, 
  FaBell, 
  FaExternalLinkAlt, 
  FaRegClock, 
  FaEye,
  FaArrowRight,
  FaCalendarAlt,
  FaFireAlt
} from 'react-icons/fa';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './Announcements.css';
import { formatDistanceToNow } from 'date-fns';
import handleApplyNow from '../utils/applyNowHandler';

const Announcements = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(true);
  const [showComponent, setShowComponent] = useState(false);
  const [activeAnnouncement, setActiveAnnouncement] = useState(null);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const announcementRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  
  // Create and manage backdrop
  useEffect(() => {
    // Create backdrop element if it doesn't exist
    if (!document.querySelector('.announcements-backdrop')) {
      const backdropElement = document.createElement('div');
      backdropElement.className = 'announcements-backdrop';
      document.body.appendChild(backdropElement);
      
      // Add click event to close announcements when clicking backdrop
      backdropElement.addEventListener('click', () => {
        setIsOpen(false);
        backdropElement.classList.remove('active');
      });
    }
    
    // Cleanup on unmount
    return () => {
      const backdrop = document.querySelector('.announcements-backdrop');
      if (backdrop) {
        document.body.removeChild(backdrop);
      }
    };
  }, []);
  
  // Update backdrop when opening/closing announcements
  useEffect(() => {
    const backdrop = document.querySelector('.announcements-backdrop');
    if (backdrop) {
      if (isOpen) {
        backdrop.classList.add('active');
      } else {
        backdrop.classList.remove('active');
      }
    }
  }, [isOpen]);
  
  // Check if it's the user's first visit
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore && isHomePage) {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisitedBefore', 'true');
      
      // Auto-open announcements and activate backdrop on first visit
      setIsOpen(true);
      const backdrop = document.querySelector('.announcements-backdrop');
      if (backdrop) {
        backdrop.classList.add('active');
      }
    }
  }, [isHomePage]);
  
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
      }, isFirstVisit ? 1000 : 7000); // Show immediately on first visit, otherwise wait 7 seconds
      
      return () => clearTimeout(timer);
    } else {
      // Reset state when not on home page
      setShowComponent(false);
      setIsHidden(true);
    }
  }, [isHomePage, isFirstVisit]);
  
  // Fetch announcements from Firestore
  useEffect(() => {
    // Only fetch if we're on the home page to save resources
    if (!isHomePage) return;
    
    // Use a simpler query with just one orderBy to avoid needing a composite index
    const announcementsQuery = query(
      collection(db, 'announcements'), 
      orderBy('date', 'desc'),
      limit(10) // Increased limit to ensure we get enough data to sort
    );
    
    const unsubscribe = onSnapshot(announcementsQuery, (snapshot) => {
      const announcementsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate?.() || new Date(doc.data().date || Date.now()),
        timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp || Date.now()),
        isNew: new Date(doc.data().date?.toDate?.() || doc.data().date) > new Date(Date.now() - 86400000 * 2) // Mark as new if less than 2 days old
      }));
      
      // Sort in memory by date first, then by timestamp if dates are equal
      const sortedData = announcementsData.sort((a, b) => {
        // First compare by date
        const dateA = a.date instanceof Date ? a.date : new Date(a.date || 0);
        const dateB = b.date instanceof Date ? b.date : new Date(b.date || 0);
        
        if (dateA.getTime() !== dateB.getTime()) {
          return dateB - dateA; // Descending by date
        }
        
        // If dates are equal, compare by timestamp
        const timestampA = a.timestamp instanceof Date ? a.timestamp : new Date(a.timestamp || 0);
        const timestampB = b.timestamp instanceof Date ? b.timestamp : new Date(b.timestamp || 0);
        return timestampB - timestampA; // Descending by timestamp
      });
      
      // Limit to 5 after sorting
      const limitedData = sortedData.slice(0, 5);
      
      setAnnouncements(limitedData);
      
      // Set the latest announcement (first in the array) for display in closed state
      if (limitedData.length > 0) {
        setLatestAnnouncement(limitedData[0]);
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
    setActiveAnnouncement(null);
    
    // Hide backdrop when route changes
    const backdrop = document.querySelector('.announcements-backdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
    }
  }, [location]);

  // Add scroll event listener to close announcements when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
        setActiveAnnouncement(null);
        
        // Hide backdrop when scrolling
        const backdrop = document.querySelector('.announcements-backdrop');
        if (backdrop) {
          backdrop.classList.remove('active');
        }
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

  // Add intersection observer to play animation when component is visible
  useEffect(() => {
    if (!announcementRef.current || animationPlayed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationPlayed) {
          setAnimationPlayed(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(announcementRef.current);
    return () => observer.disconnect();
  }, [announcementRef, animationPlayed, showComponent]);

  // Toggle announcements box
  const toggleAnnouncements = () => {
    setIsOpen(!isOpen);
    
    // Toggle backdrop visibility
    const backdrop = document.querySelector('.announcements-backdrop');
    if (backdrop) {
      if (!isOpen) {
        backdrop.classList.add('active');
      } else {
        backdrop.classList.remove('active');
      }
    }
    
    if (activeAnnouncement) {
      setActiveAnnouncement(null);
    }
  };

  // Dismiss announcements completely
  const dismissAnnouncements = (e) => {
    e.stopPropagation(); // Prevent the click from toggling the box
    setShowComponent(false);
    
    // Hide backdrop when dismissing
    const backdrop = document.querySelector('.announcements-backdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
    }
  };

  // Format date to readable string
  const formatDate = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const announcementDate = new Date(date?.toDate?.() || date);
    
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

  // View announcement details
  const viewAnnouncementDetails = (announcement) => {
    setActiveAnnouncement(announcement);
  };

  // Close announcement details
  const closeAnnouncementDetails = (e) => {
    if (e) e.stopPropagation();
    setActiveAnnouncement(null);
  };

  // Get time ago string
  const getTimeAgo = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const announcementDate = new Date(date?.toDate?.() || date);
    const diffInSeconds = Math.floor((now - announcementDate) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return formatDate(date);
    }
  };

  // Get the class names for the announcements box
  const getAnnouncementsClasses = () => {
    let classes = 'announcements-box modern-style';
    
    if (isOpen) classes += ' open';
    else classes += ' closed';
    
    if (isHidden) classes += ' hidden';
    if (animationPlayed) classes += ' animation-played';
    if (isFirstVisit) classes += ' first-visit';
    
    return classes;
  };

  // Handler for Apply Now buttons
  const handleApplyClick = (e) => {
    handleApplyNow(e, '', navigate);
  };

  // If not on home page, or no announcements and not loading, or component is dismissed, don't render anything
  if (!isHomePage || (!loading && !latestAnnouncement) || !showComponent) return null;

  return (
    <div 
      ref={announcementRef}
      className={getAnnouncementsClasses()}
    >
      <div className="announcements-header" onClick={toggleAnnouncements}>
        <div className="header-content">
          <div className="header-icon-container">
            <FaBullhorn className="header-icon" />
          </div>
          <div className="header-text">
            <span className="announcement-title-text">Announcements</span>
            {announcements.length > 0 && 
              <span className="announcement-count">{announcements.length}</span>
            }
          </div>
        </div>
        <div className="header-actions">
          <Button 
            variant="link" 
            className="dismiss-button"
            onClick={dismissAnnouncements}
            aria-label="Dismiss announcements"
          >
            <FaTimes />
          </Button>
          {isOpen ? <FaAngleDown className="toggle-icon" /> : <FaAngleUp className="toggle-icon" />}
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
          {!isOpen && latestAnnouncement && !activeAnnouncement && (
            <div className="latest-announcement" onClick={toggleAnnouncements}>
              {latestAnnouncement.isNew && <div className="announcement-badge"></div>}
              <h6 className="announcement-title">
                {latestAnnouncement.isNew && (
                  <span className="new-label">New</span>
                )}
                {latestAnnouncement.title}
              </h6>
              <p className="announcement-preview" style={{ whiteSpace: 'pre-line' }}>
                {latestAnnouncement.content}
              </p>
              <div className="announcement-meta">
                <FaRegClock className="meta-icon" />
                <span className="meta-text">{getTimeAgo(latestAnnouncement.date)}</span>
                <span className="view-more">
                  View details <FaArrowRight className="arrow-icon" />
                </span>
              </div>
            </div>
          )}
          
          {isOpen && !activeAnnouncement && (
            <div className="announcements-content">
              {announcements.length > 0 ? (
                announcements.map((announcement, index) => (
                  <div 
                    key={announcement.id} 
                    className={`announcement-item ${announcement.isNew ? 'new-announcement' : ''}`}
                    onClick={() => viewAnnouncementDetails(announcement)}
                  >
                    <div className="announcement-content">
                      <div className="announcement-header">
                        <h6 className="announcement-title">
                          {announcement.isNew && (
                            <span className="new-label">New</span>
                          )}
                          {announcement.title}
                        </h6>
                        {announcement.isNew && <FaFireAlt className="hot-icon" />}
                      </div>
                      <p className="announcement-text" style={{ whiteSpace: 'pre-line' }}>
                        {announcement.content.length > 120 
                          ? `${announcement.content.substring(0, 120)}...` 
                          : announcement.content
                        }
                      </p>
                      <div className="announcement-item-footer">
                        <div className="announcement-meta">
                          <FaCalendarAlt className="meta-icon" />
                          <span className="meta-text">{getTimeAgo(announcement.date)}</span>
                        </div>
                        <div className="announcement-actions">
                          {announcement.content.length > 120 && (
                            <Button 
                              variant="link" 
                              className="view-details-button"
                              onClick={(e) => {
                                e.stopPropagation();
                                viewAnnouncementDetails(announcement);
                              }}
                            >
                              <FaEye className="button-icon" />
                              <span>View</span>
                            </Button>
                          )}
                          {index === 0 ? (
                            <Link to="/newsroom">
                              <Button 
                                variant="primary" 
                                size="sm"
                                className="apply-now-button"
                              >
                                See List
                              </Button>
                            </Link>
                          ) : (
                            <Link 
                              to="/join-our-team"
                              onClick={handleApplyClick}
                            >
                              <Button 
                                variant="primary" 
                                size="sm"
                                className="apply-now-button"
                              >
                                Apply Now
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-announcements">
                  <div className="no-data-icon">
                    <FaBell />
                  </div>
                  <p>No announcements available</p>
                </div>
              )}
            </div>
          )}

          {activeAnnouncement && (
            <div className="announcement-detail-view">
              <div className="detail-header">
                <h5 className="detail-title">
                  {activeAnnouncement.isNew && (
                    <span className="new-label-detail">New</span>
                  )}
                  {activeAnnouncement.title}
                </h5>
                <Button 
                  variant="link" 
                  className="close-detail-button"
                  onClick={closeAnnouncementDetails}
                >
                  <FaTimes />
                </Button>
              </div>
              <div className="detail-content">
                <p className="detail-text" style={{ whiteSpace: 'pre-line' }}>{activeAnnouncement.content}</p>
                <div className="detail-meta">
                  <FaCalendarAlt className="meta-icon" />
                  <span className="meta-text">{formatDate(activeAnnouncement.date)}</span>
                  <span className="detail-time-ago">({getTimeAgo(activeAnnouncement.date)})</span>
                </div>
                <div className="detail-actions">
                  <Link to="/join-our-team" onClick={handleApplyClick}>
                    <Button 
                      variant="primary" 
                      className="apply-now-button-large"
                    >
                      <span className="button-text">Apply Now</span>
                      <FaArrowRight className="button-icon-right" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Announcements; 