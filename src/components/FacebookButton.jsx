import React, { useEffect } from 'react';

const FacebookButton = () => {
  // Facebook page URL
  const facebookPageUrl = 'https://www.facebook.com/share/16QfztW6BQ/';

  useEffect(() => {
    // Add CSS for the Facebook button when component mounts
    const buttonStyle = document.createElement('style');
    buttonStyle.innerHTML = `
      .facebook-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 12px rgba(0,0,0,0.4) !important;
      }
      
      /* Add animation for better visibility */
      @keyframes pulse-fb {
        0% { box-shadow: 0 0 0 0 rgba(66, 103, 178, 0.5); }
        70% { box-shadow: 0 0 0 10px rgba(66, 103, 178, 0); }
        100% { box-shadow: 0 0 0 0 rgba(66, 103, 178, 0); }
      }
      
      .facebook-btn {
        animation: pulse-fb 2s infinite;
      }
      
      /* Responsive styles for mobile */
      @media (max-width: 576px) {
        .facebook-btn {
          width: 35px !important;
          height: 35px !important;
          right: 15px !important;
          bottom: 55px !important;
        }
        
        .facebook-btn svg {
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
    <a 
      href={facebookPageUrl}
      className="facebook-btn"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit our Facebook page"
      style={{
        position: 'fixed',
        bottom: '60px', // Reduced from 75px to be closer to WhatsApp
        right: '20px',
        backgroundColor: '#4267B2', // Facebook blue
        color: 'white',
        borderRadius: '50%',
        width: '45px',
        height: '45px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
      </svg>
    </a>
  );
};

export default FacebookButton; 