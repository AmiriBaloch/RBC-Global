import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SeeListButton = () => {
  useEffect(() => {
    // Add CSS for the See List button when component mounts
    const buttonStyle = document.createElement('style');
    buttonStyle.innerHTML = `
      .see-list-btn {
        transition: all 0.3s ease;
        animation: float 2s infinite alternate;
      }
      
      .see-list-btn:hover {
        transform: scale(1.1) rotate(5deg);
        box-shadow: 0 6px 12px rgba(0,0,0,0.2) !important;
        background-color: #1a73e8 !important;
      }
      
      /* Floating animation */
      @keyframes float {
        0% { transform: translateY(0); }
        100% { transform: translateY(-5px); }
      }
      
      /* Responsive styles for mobile */
      @media (max-width: 576px) {
        .see-list-btn {
          right: 15px !important;
          bottom: 145px !important;
        }
      }
      
      /* Desktop alignment with other social buttons */
      @media (min-width: 992px) {
        .see-list-btn {
          bottom: 146px !important;
          width: 32px !important;
          height: 32px !important;
        }
        
        .see-list-btn svg {
          width: 16px !important;
          height: 16px !important;
        }
      }
    `;
    document.head.appendChild(buttonStyle);

    // Clean up when component unmounts
    return () => {
      document.head.removeChild(buttonStyle);
    };
  }, []);

  return (
    <Link 
      to="/applicants-list"
      className="see-list-btn"
      aria-label="View Applicants List"
      style={{
        position: 'fixed',
        bottom: '140px',
        right: '20px',
        backgroundColor: '#4285f4', // Google blue color
        color: 'white',
        borderRadius: '50%', // Make it circular
        width: '45px',
        height: '45px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        zIndex: 1000,
        cursor: 'pointer',
        textDecoration: 'none'
      }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="22" 
        height="22" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    </Link>
  );
};

export default SeeListButton; 