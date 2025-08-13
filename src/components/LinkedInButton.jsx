import React, { useEffect } from 'react';

const LinkedInButton = () => {
  // LinkedIn company page URL
  const linkedinUrl = 'https://www.linkedin.com/company/rosebelt/posts/?feedView=all';

  useEffect(() => {
    // Add CSS for the LinkedIn button when component mounts
    const buttonStyle = document.createElement('style');
    buttonStyle.innerHTML = `
      .linkedin-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 12px rgba(0,0,0,0.4) !important;
      }
      
      /* Add animation for better visibility */
      @keyframes pulse-li {
        0% { box-shadow: 0 0 0 0 rgba(0, 119, 181, 0.5); }
        70% { box-shadow: 0 0 0 10px rgba(0, 119, 181, 0); }
        100% { box-shadow: 0 0 0 0 rgba(0, 119, 181, 0); }
      }
      
      .linkedin-btn {
        animation: pulse-li 2s infinite;
      }
      
      /* Responsive styles for mobile */
      @media (max-width: 576px) {
        .linkedin-btn {
          width: 35px !important;
          height: 35px !important;
          right: 15px !important;
          bottom: 140px !important;
        }
        
        .linkedin-btn svg {
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
      href={linkedinUrl}
      className="linkedin-btn"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit our LinkedIn company page"
      style={{
        position: 'fixed',
        bottom: '140px', // Positioned above Instagram button
        right: '20px',
        backgroundColor: '#0077B5', // LinkedIn blue
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
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
      </svg>
    </a>
  );
};

export default LinkedInButton;
