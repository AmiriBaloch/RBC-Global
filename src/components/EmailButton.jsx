import React, { useEffect } from 'react';

const EmailButton = () => {
  // Email address
  const emailAddress = 'rosebeltconsultantsglobal@gmail.com';
  const emailSubject = 'Inquiry about Consulting Services';

  useEffect(() => {
    // Add CSS for the Email button when component mounts
    const buttonStyle = document.createElement('style');
    buttonStyle.innerHTML = `
      .email-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 12px rgba(0,0,0,0.4) !important;
      }
      
      /* Add animation for better visibility */
      @keyframes pulse-email {
        0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.5); }
        70% { box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
        100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
      }
      
      .email-btn {
        animation: pulse-email 2s infinite;
      }
      
      /* Responsive styles for mobile */
      @media (max-width: 576px) {
        .email-btn {
          width: 35px !important;
          height: 35px !important;
          right: 15px !important;
          bottom: 105px !important;
        }
        
        .email-btn svg {
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
      href={`mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}`}
      className="email-btn"
      aria-label="Email us"
      style={{
        position: 'fixed',
        bottom: '130px', // Position above Facebook button
        right: '20px',
        backgroundColor: '#dc3545', // Bootstrap red
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
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/>
      </svg>
    </a>
  );
};

export default EmailButton; 