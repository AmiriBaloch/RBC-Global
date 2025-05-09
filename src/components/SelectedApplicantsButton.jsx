import React, { useState } from 'react';
import SelectedApplicants from './SelectedApplicants';

const SelectedApplicantsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          bottom: '200px',
          right: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 999
        }}
      >
        <div 
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
            marginBottom: '5px'
          }}
        >
          <button 
            onClick={openModal}
            aria-label="View selected applicants"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#4A9FF9',
              border: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              color: 'white'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
            </svg>
          </button>
        </div>
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '3px 8px',
            borderRadius: '12px',
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#4A9FF9',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            maxWidth: '80px',
            lineHeight: '1.2'
          }}
        >
          Shortlisted Applicants
        </div>
      </div>
      
      <SelectedApplicants 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
};

export default SelectedApplicantsButton; 