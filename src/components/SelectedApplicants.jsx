import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import '../styles/SelectedApplicants.css';

const SelectedApplicants = ({ isOpen, onClose }) => {
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch data when the component is open
    if (isOpen) {
      fetchSelectedApplicants();
    }
  }, [isOpen]);

  const fetchSelectedApplicants = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const applicantsQuery = query(
        collection(db, 'SelectedApplicants'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(applicantsQuery);
      
      const applicantsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt)
      }));
      
      setSelectedApplicants(applicantsData);
    } catch (error) {
      console.error('Error fetching selected applicants:', error);
      setError('Failed to load selected applicants. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Format date to a readable string
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="selected-applicants-overlay">
      <div className="selected-applicants-modal">
        <div className="selected-applicants-header">
          <h2>Selected Applicants</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="selected-applicants-content">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading selected applicants...</p>
            </div>
          ) : error ? (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={fetchSelectedApplicants}>Try Again</button>
            </div>
          ) : selectedApplicants.length === 0 ? (
            <div className="no-applicants-message">
              <p>No selected applicants available at the moment.</p>
            </div>
          ) : (
            <div className="applicants-list">
              {selectedApplicants.map(applicant => (
                <div key={applicant.id} className="applicant-card">
                  <div className="applicant-header">
                    <h3>{applicant.fullName}</h3>
                    <span className="position-badge">{applicant.position}</span>
                  </div>
                  <div className="applicant-details">
                    <p><strong>Email:</strong> {applicant.email}</p>
                    {applicant.phone && <p><strong>Phone:</strong> {applicant.phone}</p>}
                    {applicant.notes && (
                      <div className="notes-section">
                        <p><strong>Notes:</strong></p>
                        <p>{applicant.notes}</p>
                      </div>
                    )}
                    <p className="date-added"><small>Added on {formatDate(applicant.createdAt)}</small></p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedApplicants; 