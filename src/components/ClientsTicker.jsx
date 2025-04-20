import React from 'react';
import { Container } from 'react-bootstrap';
import clientsData from '../data/clients';
import './ClientsTicker.css';

const ClientsTicker = ({ title = "Our Valuable Clients" }) => {
  // Duplicate the logos to create a seamless loop
  const allLogos = [...clientsData, ...clientsData];

  return (
    <div className="clients-ticker-section">
      <div className="section-heading-container bg-success" style={{ backgroundColor: '#2AA96B !important' }}>
        <Container>
          <h2 className="section-heading text-white py-2">{title}</h2>
        </Container>
      </div>
      
      <Container fluid>
        <div className="ticker-container">
          <div className="ticker">
            {allLogos.map((client, index) => (
              <div className="ticker-item" key={`${client.id}-${index}`}>
                <img 
                  src={client.imageUrl} 
                  alt={client.alt} 
                  className="client-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ClientsTicker; 