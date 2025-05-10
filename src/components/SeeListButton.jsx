import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const shortlistedApplicants = [
  { no: 1, name: 'Anees', email: 'anisiyousaf4@gmail.com' },
  { no: 2, name: 'Niaz Muhammad', email: 'niazmuhammad15602@gmail.com' },
  { no: 3, name: 'Awais Akhtar', email: 'awaisakhtar364@gmail.com' },
  { no: 4, name: 'Muhammad Haider', email: 'haidermuhammad110@gmail.com' },
  { no: 5, name: 'Nazar Abbas', email: 'Naxarunhar321@gmail.com' },
  { no: 6, name: 'Faraz', email: 'muhammadfaraz2941@gmail.com' },
  { no: 7, name: 'Abdul Basit', email: 'haiderzam56@gmail.com' },
  { no: 8, name: 'Rahmida Wazir', email: 'rahmidawazir1@gmail.com' },
  { no: 9, name: 'Rabia', email: 'rabialiaqatmbs@gmail.com' },
  { no: 10, name: 'Syeda Maryam Zahra Zaidi', email: 'zahrasyedab2002@gmail.com' },
  { no: 11, name: 'Muhammad Faizan Saeed Malik', email: 'faizanmalik5555@icloud.com' },
  { no: 12, name: 'Aqsa', email: 'itsaqsa3579@gmail.com' },
  { no: 13, name: 'Usama Rafiq', email: 'usamarafiq178@gmail.com' },
  { no: 14, name: 'Rashid Ali', email: 'rashidali65372@gmail.com' },
  { no: 15, name: 'Jahangir Kakar', email: 'kakarjahangir58@gmail.com' },
  { no: 16, name: 'Adnan Javid', email: 'adnan_javed75@yahoo.com' },
  { no: 17, name: 'Muhammad Asif', email: 'asifilquast560@gmail.com' },
  { no: 18, name: 'Ifa Iqbal', email: 'ifaiqbal2@gmail.com' },
  { no: 19, name: 'Adila Tareen', email: 'adilatareen764@gmail.com' },
  { no: 20, name: 'Zaufishan Ahmad', email: 'zaufishanahmad623@gmail.com' },
  { no: 21, name: 'Dr Mahum Baloch', email: 'mahumbaloch95@gmail.com' },
  { no: 22, name: 'Meerab Ansari', email: 'Meerabansari2313@gmail.com' },
  { no: 23, name: 'Mujahid Awais', email: 'mujahidawais9879@gmail.com' },
  { no: 24, name: 'Muhammad Haroon Yousaf', email: 'asapharoon@gmail.com' },
  { no: 25, name: 'Sajida', email: 'saimafarooqubtsd@gmail.com' },
  { no: 26, name: 'Ahmad Raza', email: 'ahmadmustafa1741@gmail.com' },
  { no: 27, name: 'Muhammad Aqib', email: 'maqib2554@gmail.com' },
  { no: 28, name: 'Ubaid-ur-Rehman Ul Haq', email: 'unitisham258@gmail.com' },
  { no: 29, name: 'Noshin', email: 'inoshin900@gmail.com' },
  { no: 30, name: 'Hidayat Ullah', email: 'hidayatjan6464@gmail.com' },
  { no: 31, name: 'Nori Naz', email: 'sidra.batool912@gmail.com' },
  { no: 32, name: 'Arooj Shahzad', email: 'aroojshahzad039@gmail.com' },
  { no: 33, name: 'Sidra Rasheed', email: 'sidrarasheed036@gmail.com' },
  { no: 34, name: 'Nasir Abbas', email: 'nasirabbas1992@gmail.com' },
  { no: 35, name: 'Dr. Bushra Maryam', email: 'maryam.bushra14@gmail.com' },
  { no: 36, name: 'Areej Fatima', email: 'fatimareej272@gmail.com' },
  { no: 37, name: 'Sami Ullah', email: 'samiullah090191@gmail.com' },
  { no: 38, name: 'Muhammad Ali Bhutta', email: 'alibhutta4901@gmail.com' },
  { no: 39, name: 'Yousaf', email: 'muhammadabraheemyousafch@gmail.com' },
  { no: 40, name: 'Hiranayab Ali', email: 'hiranayab841@gmail.com' },
  { no: 41, name: 'Israr', email: 'israr89652@gmail.com' },
  { no: 42, name: 'Kashan Munib', email: 'kashanmunib23@gmail.com' },
  { no: 43, name: 'Hamza Amir', email: 'hamzaamir99@hotmail.com' },
];

const SeeListButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault(); // Prevent navigation
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    // Add CSS for the See List button when component mounts
    const buttonStyle = document.createElement('style');
    buttonStyle.innerHTML = `
      .see-list-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2) !important;
      }
      
      /* Add animation for better visibility */
      @keyframes pulse-sl {
        0% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.4); }
        70% { box-shadow: 0 0 0 6px rgba(0, 123, 255, 0); }
        100% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
      }
      
      .see-list-btn {
        animation: pulse-sl 2s infinite;
      }
      
      /* Responsive styles for mobile */
      @media (max-width: 576px) {
        .see-list-btn {
          padding: 8px 12px !important;
          right: 15px !important;
          bottom: 145px !important;
        }
      }

      /* Custom modal styles */
      .shortlist-modal .modal-content {
        border-radius: 15px;
        border: none;
        max-width: 90vw;
        max-height: 90vh;
        width: 100%;
        height: 100%;
        overflow: auto;
      }

      .shortlist-modal .modal-header {
        background-color: #4285f4;
        color: white;
        border-radius: 15px 15px 0 0;
        padding: 1rem 1.5rem;
      }

      .shortlist-modal .modal-title {
        font-weight: 500;
      }

      .shortlist-modal .modal-body {
        padding: 1.5rem;
        overflow-x: auto;
      }

      .shortlist-modal .modal-footer {
        border-top: none;
        padding: 1rem 1.5rem;
      }

      .shortlist-modal .btn-primary {
        background-color: #4285f4;
        border-color: #4285f4;
        padding: 0.5rem 1.5rem;
      }

      .shortlist-modal .btn-primary:hover {
        background-color: #3367d6;
        border-color: #3367d6;
      }

      .shortlist-modal .shortlist-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.95rem;
        background: white;
      }

      .shortlist-modal .shortlist-table th, .shortlist-modal .shortlist-table td {
        border: 1px solid #e0e0e0;
        padding: 6px 10px;
        text-align: left;
      }

      .shortlist-modal .shortlist-table th {
        background: #f3f6fa;
        font-weight: 600;
      }

      .shortlist-modal .shortlist-table tbody tr:nth-child(even) {
        background: #f9fbfd;
      }

      /* Force modal to center of viewport and take 90% of screen */
      .shortlist-modal .modal-dialog {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        margin: 0 !important;
        z-index: 1050 !important;
        width: 90vw !important;
        height: 90vh !important;
        max-width: 90vw !important;
        max-height: 90vh !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
    document.head.appendChild(buttonStyle);

    // Clean up when component unmounts
    return () => {
      document.head.removeChild(buttonStyle);
    };
  }, []);

  return (
    <>
      <Link 
        to="/list"
        className="see-list-btn"
        aria-label="Shortlisted District Manager Applicants for Interviews"
        onClick={handleClick}
        style={{
          position: 'fixed',
          bottom: '145px',
          right: '20px',
          backgroundColor: '#4285f4', // Google blue color
          color: 'white',
          borderRadius: '25px',
          padding: '10px 15px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500',
          textTransform: 'none'
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
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
        <span>Shortlisted Applicants</span>
      </Link>

      <Modal 
        show={showModal} 
        onHide={handleClose}
        className="shortlist-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Shortlisted District Manager Applicants for Interviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <table className="shortlist-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Full Name</th>
                  <th>Email Address</th>
                </tr>
              </thead>
              <tbody>
                {shortlistedApplicants.map(applicant => (
                  <tr key={applicant.no}>
                    <td>{applicant.no}</td>
                    <td>{applicant.name}</td>
                    <td>{applicant.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SeeListButton; 