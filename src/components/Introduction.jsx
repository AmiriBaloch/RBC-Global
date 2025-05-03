import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Introduction.css';

const Introduction = () => {
  return (
    <section className="introduction-section" style={{ backgroundColor: '#E3EBF2' }}>
      <div className="section-heading-container bg-success" style={{ backgroundColor: '#2AA96B !important' }}>
        <Container>
          <h2 className="section-heading text-white py-2">Our Story</h2>
        </Container>
      </div>
      <Container>
        <div className="mb-5 p-4 border rounded" style={{ backgroundColor: '#ffffff' }}>
          <p className="responsive-text-align">
            ROSEBELT CONSULTANTS GLOBAL is a dynamic consultancy firm dedicated to delivering innovative and impactful solutions. 
            We specialize in strategic planning, project management, institutional development, and capacity building for government 
            entities, international institutions, NGOs, and private organizations.
          </p>
          <p className="responsive-text-align">
            With a team of experienced professionals, we transform challenges into opportunities, helping clients achieve their goals 
            with tailored strategies and actionable insights. At ROSEBELT CONSULTANTS, we pride ourselves on excellence, integrity, 
            and a client-centric approach, driving growth and success for those we serve.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Introduction; 