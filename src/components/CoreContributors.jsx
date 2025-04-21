import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './Team.css';
import './shared.css';
import './ExpertTicker.css';

// Import images
import image2 from '../assets/2.png';
import muhammadAmir from '../assets/1.png';
import sfButt from '../assets/8.png';
import drNaveedHaider from '../assets/10.png';
import drTariqSaif from '../assets/13.png';
import drHafizImran from '../assets/5.png';
import muneebRehman from '../assets/12.png';
import nasikBangash from '../assets/7.png';
import mudassirAli from '../assets/4.png';
import sunirAshnae from '../assets/6.png';
import Imran from "../assets/3.png";
import shaguftaShaheen from "../assets/11.png";
import nabghaHashmi from "../assets/9.png";
import muhammadShahroze from "../assets/14.png";

const CoreContributors = () => {
  // All team members from different categories
  const allExperts = [
    // Health Experts
    {
      id: 1,
      name: "Dr. Ume Farwa",
      role: "Clinical Dietitian & Nutritionist",
      category: "Health Expert",
      image: image2,
      description: "A qualified clinical dietitian specialized in medical nutrition therapy.",
      linkedin: "#",
      twitter: "#",
      email: "dr.umefarwa@rosebeltconsultants.com"
    },
    {
      id: 2,
      name: "Dr. Naveed Haider",
      role: "Health Expert",
      category: "Health Expert",
      image: drNaveedHaider,
      description: "MBBS, FCPS Paediatric Surgery, FACS (USA), Diploma in laparoscopic surgery.",
      linkedin: "#",
      twitter: "#",
      email: "dr.naveed@rosebeltconsultants.com"
    },
    {
      id: 3,
      name: "Dr. Muhammad Tariq Saif",
      role: "Health Expert",
      category: "Health Expert",
      image: drTariqSaif,
      description: "MBBS, FCPS (Paeds medicine), KEMU, M.Phil Public Health-PU.",
      linkedin: "#",
      twitter: "#",
      email: "dr.tariq@rosebeltconsultants.com"
    },
    // Consultants
    {
      id: 4,
      name: "Dr. Hafiz Muhammad Imran",
      role: "Public Health Consultant",
      category: "Consultant",
      image: drHafizImran,
      description: "PhD Public Health-PU, M.Phil Public Health-PU, MS Public Policy-UMT.",
      linkedin: "#",
      twitter: "#",
      email: "dr.imran@rosebeltconsultants.com"
    },
    {
      id: 5,
      name: "Nabgha Najeeb Hashmi",
      role: "Education Consultant",
      category: "Consultant",
      image: nabghaHashmi,
      description: "Consultant- Education (UNICEF, JICA, WHO, UNWOMEN).",
      linkedin: "#",
      twitter: "#",
      email: "nabgha@rosebeltconsultants.com"
    },
    // IT Experts
    {
      id: 6,
      name: "Muhammad Amir",
      role: "IT Solutions Specialist",
      category: "IT Expert",
      image: muhammadAmir,
      description: "An innovative technology professional specializing in comprehensive IT solutions.",
      linkedin: "#",
      twitter: "#",
      email: "amir@rosebeltconsultants.com"
    },
    {
      id: 7,
      name: "Muhammad Muneeb ur Rehman",
      role: "Design Expert",
      category: "IT Expert",
      image: muneebRehman,
      description: "With a passion for creativity and a keen eye for detail.",
      linkedin: "#",
      twitter: "#",
      email: "muneeb@rosebeltconsultants.com"
    },
    // Researchers
    {
      id: 8,
      name: "S.F. Butt",
      role: "Lead Researcher",
      category: "Researcher",
      image: sfButt,
      description: "A researcher driven by a deep commitment to advancing knowledge.",
      linkedin: "#",
      twitter: "#",
      email: "sfbutt@rosebeltconsultants.com"
    },
    {
      id: 9,
      name: "Nasik Bangash",
      role: "Research Analyst",
      category: "Researcher",
      image: nasikBangash,
      description: "Skilled in research, monitoring, and evaluation.",
      linkedin: "#",
      twitter: "#",
      email: "nasik@rosebeltconsultants.com"
    },
    {
      id: 10,
      name: "Mudassir Ali",
      role: "Research Associate",
      category: "Researcher",
      image: mudassirAli,
      description: "Dedicated to uncovering innovative solutions through meticulous research.",
      linkedin: "#",
      twitter: "#",
      email: "mudassir@rosebeltconsultants.com"
    },
    {
      id: 11,
      name: "Sunir Ashnae",
      role: "Research Specialist",
      category: "Researcher",
      image: sunirAshnae,
      description: "Passionate about exploring new frontiers in research methodology.",
      linkedin: "#",
      twitter: "#",
      email: "sunir@rosebeltconsultants.com"
    },
    {
      id: 12,
      name: "Muhammad Shahroze Iqbal",
      role: "Research Associate",
      category: "Researcher",
      image: muhammadShahroze,
      description: "MPhil scholar in Sociology focused on security strategies and sustainable development.",
      linkedin: "#",
      twitter: "#",
      email: "shahroze@rosebeltconsultants.com"
    }
    // Board members removed as requested
  ];

  // Filter out Board members and duplicate the remaining experts to create a seamless loop
  const filteredExperts = allExperts.filter(expert => expert.category !== "Board");
  const duplicatedExperts = [...filteredExperts, ...filteredExperts];

  return (
    <section className="core-contributors-section" style={{ backgroundColor: '#E3EBF2' }}>
      <div className="section-heading-container bg-success" style={{ backgroundColor: '#2AA96B !important' }}>
        <Container>
          <h2 className="section-heading text-white py-2">Our Core Contributors</h2>
        </Container>
      </div>
      
      <Container fluid>
        <div className="expert-ticker-container">
          <div className="expert-ticker">
            {duplicatedExperts.map((expert, index) => (
              <div className="expert-ticker-item" key={`${expert.id}-${index}`}>
                <Card className="expert-card">
                  <div className="card-img-container">
                    <Card.Img variant="top" src={expert.image} alt={expert.name} />
                  </div>
                  <Card.Body>
                    <Card.Title className="card-title">{expert.name}</Card.Title>
                    <Card.Subtitle className="card-subtitle">{expert.role}</Card.Subtitle>
                    <span className="category-badge">{expert.category}</span>
                    <div className="social-links">
                      <a href={expert.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                        <FaLinkedin />
                      </a>
                      <a href={expert.twitter} target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                        <FaTwitter />
                      </a>
                      <a href={`mailto:${expert.email}`} className="social-icon email">
                        <FaEnvelope />
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CoreContributors; 