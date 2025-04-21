import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaBullhorn, FaAngleDown, FaAngleUp, FaTimes } from 'react-icons/fa';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation } from 'react-router-dom';
import './Announcements.css';

const Announcements = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [latestAnnouncement, setLatestAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  // Fetch announcements from Firestore
  useEffect(() => {
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
  }, []);

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

  // Format date to readable string
  const formatDate = (date) => {
    if (!date) return '';
    
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // If no announcements and not loading, don't render anything
  if (!loading && !latestAnnouncement) return null;

  return (
    <div className={`announcements-box ${isOpen ? 'open' : 'closed'}`}>
      <div className="announcements-header" onClick={toggleAnnouncements}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaBullhorn style={{ marginRight: '8px' }} />
          <span>Announcements</span>
        </div>
        <div>
          {isOpen ? <FaAngleDown /> : <FaAngleUp />}
        </div>
      </div>
      
      {loading ? (
        <div className="latest-announcement">
          <p className="text-center my-2">Loading...</p>
        </div>
      ) : (
        <>
          {!isOpen && latestAnnouncement && (
            <div className="latest-announcement" onClick={toggleAnnouncements}>
              <h6 style={{ 
                color: '#2AA96B', 
                fontWeight: 600, 
                fontSize: '0.85rem', 
                margin: '0 0 2px 0',
                width: '100%', 
                boxSizing: 'border-box',
                wordBreak: 'break-word'
              }}>
                {latestAnnouncement.title}
              </h6>
              <p className="announcement-preview">
                {latestAnnouncement.content}
              </p>
            </div>
          )}
          
          {isOpen && (
            <>
              <div className="announcements-content">
                {announcements.length > 0 ? (
                  announcements.map(announcement => (
                    <div key={announcement.id} className="announcement-item">
                      <h6 style={{ 
                        color: '#2AA96B', 
                        fontWeight: 600,
                        wordBreak: 'break-word',
                        width: '100%'
                      }}>
                        {announcement.title}
                      </h6>
                      <p style={{
                        wordBreak: 'break-word',
                        width: '100%'
                      }}>
                        {announcement.content}
                      </p>
                      <small className="text-muted">{formatDate(announcement.date)}</small>
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
                  style={{ 
                    color: '#2AA96B', 
                    textDecoration: 'none', 
                    padding: '4px 8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = '#1e7b4d';
                    e.target.style.textDecoration = 'underline';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = '#2AA96B';
                    e.target.style.textDecoration = 'none';
                  }}
                >
                  View All
                </Button>
                <Button 
                  size="sm" 
                  variant="link" 
                  onClick={toggleAnnouncements}
                  style={{ 
                    color: '#6c757d', 
                    textDecoration: 'none',
                    padding: '4px 8px',
                    marginLeft: '5px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = '#495057';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = '#6c757d';
                  }}
                >
                  <FaTimes />
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