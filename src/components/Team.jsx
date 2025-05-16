import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import './Team.css';
import './shared.css';
import image2 from '../assets/2.png';
import drHafizImran from '../assets/5.png';
import drNaveedHaider from '../assets/10.png';
import muhammadAmir from '../assets/1.png';
import drTariqSaif from '../assets/13.png';
import muneebRehman from '../assets/12.png';
import sfButt from '../assets/8.png';
import nasikBangash from '../assets/7.png';
import mudassirAli from '../assets/4.png';
import sunirAshnae from '../assets/6.png';
import Imran from "../assets/3.png";
import shaguftaShaheen from "../assets/11.png";
import nabghaHashmi from "../assets/9.png";
import muhammadShahroze from "../assets/14.png";
import faheemManzoor from "../assets/25.png";

const Team = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('all');
  const [sectionTitle, setSectionTitle] = useState({ main: 'Meet Our', accent: 'Team' });

  useEffect(() => {
    // Set the active section based on the URL path
    const path = location.pathname;
    if (path.includes('/team/board')) {
      setActiveSection('board');
      setSectionTitle({ main: 'Board of', accent: 'Directors' });
      document.title = "RBC | LEADERSHIP";
    } else if (path.includes('/team/consultants')) {
      setActiveSection('consultants');
      setSectionTitle({ main: 'Our', accent: 'Consultants' });
      document.title = "RBC | CONSULTANTS";
    } else if (path.includes('/team/health')) {
      setActiveSection('health');
      setSectionTitle({ main: 'Health', accent: 'Experts' });
      document.title = "RBC | HEALTH EXPERTS";
    } else if (path.includes('/team/it')) {
      setActiveSection('it');
      setSectionTitle({ main: 'IT', accent: 'Experts' });
      document.title = "RBC | IT EXPERTS";
    } else if (path.includes('/team/researchers')) {
      setActiveSection('researchers');
      setSectionTitle({ main: 'Our', accent: 'Researchers' });
      document.title = "RBC | YOUNG RESEARCHERS";
    } else {
      setActiveSection('all');
      setSectionTitle({ main: 'Meet Our', accent: 'Team' });
      document.title = "RBC | LEADERSHIP";
    }
  }, [location]);

  // Health Experts
  const healthExperts = [
    {
      id: 1,
      name: "Dr. Ume Farwa",
      role: "Clinical Dietitian & Nutritionist",
      image: image2,
      description: "A qualified clinical dietitian specialized in medical nutrition therapy. Experienced in treating nutrient deficiencies and diseases through therapeutic diets. Currently works at OBGY hospital with Prof. M. Saeed and as Consultant Dietitian at Halcyon Medical Centre.",
      linkedin: "#",
      twitter: "#",
      email: "dr.umefarwa@rosebeltconsultants.com"
    },
    {
      id: 3,
      name: "Dr. Naveed Haider",
      role: "Health Expert",
      image: drNaveedHaider,
      description: "MBBS, FCPS Paediatric Surgery, FACS (USA), Diploma in laparoscopic surgery (Germany), Mphil Public Health, PhD Public Health. Specialized in pediatric surgical care and public health management.",
      linkedin: "#",
      twitter: "#",
      email: "dr.naveed@rosebeltconsultants.com"
    },
    {
      id: 4,
      name: "Dr. Muhammad Tariq Saif",
      role: "Health Expert",
      image: drTariqSaif,
      description: "MBBS, FCPS (Paeds medicine), KEMU, M.Phil Public Health-PU. Specialized in pediatric medicine and public health management.",
      linkedin: "#",
      twitter: "#",
      email: "dr.tariq@rosebeltconsultants.com"
    }
  ];

  // Consultants
  const consultants = [
    {
      id: 2,
      name: "Dr. Hafiz Muhammad Imran",
      role: "Public Health Consultant",
      image: drHafizImran,
      description: "PhD Public Health-PU, M.Phil Public Health-PU, MS Public Policy-UMT, MBA-IBA. Experienced public health consultant with expertise in health policy development and implementation.",
      linkedin: "#",
      twitter: "#",
      email: "dr.imran@rosebeltconsultants.com"
    },
    {
      id: 27,
      name: "Nabgha Najeeb Hashmi",
      role: "Education Consultant",
      image: nabghaHashmi,
      description: "Consultant- Education (UNICEF, JICA, WHO, UNWOMEN). An experienced education specialist with expertise in coordinating multi-stakeholder initiatives and international development projects. Skilled in fostering partnerships between government agencies and global organizations to enhance educational outcomes and implement effective policy frameworks.",
      linkedin: "#",
      twitter: "#",
      email: "nabgha@rosebeltconsultants.com"
    }
  ];

  // Board of Directors
  const boardOfDirectors = [
    {
      id: 26,
      name: "Amin Ul Haq Ch",
      role: "CEO RBC- Global",
      image: Imran,
      description: "Advocate High Court, Chairman Punjab Bar council (kSR) 2020, Member Managing Committee 2022. Dr. Imran is an experienced legal professional and business leader with a strong background in advocacy and management.",
      linkedIn: "https://www.linkedin.com/in/dr-hafiz-muhammad-imran/",
      twitter: "https://twitter.com/dr_hafiz_imran",
      email: "ceo@rosebeltconsultantsglobal.com"
    },
    {
      id: 25,
      name: "Dr. Shagufta Shaheen",
      role: "Managing Director RBC-Global",
      image: shaguftaShaheen,
      description: "Member PH initiatives. A dedicated professional with extensive experience in healthcare management and public health initiatives. Passionate about implementing sustainable healthcare solutions and driving organizational excellence through strategic leadership and collaborative approaches.",
      linkedin: "#",
      twitter: "#",
      email: "shagufta@rosebeltconsultantsglobal.com"
    }
  ];

  // IT Experts
  const itExperts = [
    {
      id: 5,
      name: "Muhammad Amir",
      role: "IT Solutions Specialist",
      image: muhammadAmir,
      description: "An innovative technology professional specializing in comprehensive IT solutions for businesses. With a strategic approach to digital transformation, he designs and implements customized systems that streamline operations and enhance productivity. As Admin Event Organizer at NAVTTC, he bridges technology education and practical application to solve complex business challenges. Committed to delivering scalable, secure, and user-friendly IT solutions tailored to each client's unique needs.",
      linkedin: "#",
      twitter: "#",
      email: "amir@rosebeltconsultants.com"
    },
    {
      id: 6,
      name: "Muhammad Muneeb ur Rehman",
      role: "Design Expert",
      image: muneebRehman,
      description: "With a passion for creativity and a keen eye for detail, I craft innovative designs that inspire and elevate. As a design expert, I bring visions to life through thoughtful and precise solutions, blending art and functionality to deliver exceptional results.",
      linkedin: "#",
      twitter: "#",
      email: "muneeb@rosebeltconsultants.com"
    }
  ];

  // Researchers
  const researchers = [
    {
      id: 8,
      name: "S.F. Butt",
      role: "Lead Researcher",
      image: sfButt,
      description: "A researcher driven by a deep commitment to advancing knowledge through rigorous investigation and thoughtful reflection.",
      linkedin: "#",
      twitter: "#",
      email: "sfbutt@rosebeltconsultants.com"
    },
    {
      id: 9,
      name: "Nasik Bangash",
      role: "Research Analyst",
      image: nasikBangash,
      description: "Skilled in research, monitoring, and evaluation, with a focus on translating complex field realities into strategic insights that inform effective interventions and public policy.",
      linkedin: "#",
      twitter: "#",
      email: "nasik@rosebeltconsultants.com"
    },
    {
      id: 10,
      name: "Mudassir Ali",
      role: "Research Associate",
      image: mudassirAli,
      description: "Dedicated to uncovering innovative solutions through meticulous research and data analysis. Specializes in developing evidence-based strategies that drive organizational growth and efficiency.",
      linkedin: "#",
      twitter: "#",
      email: "mudassir@rosebeltconsultants.com"
    },
    {
      id: 11,
      name: "Sunir Ashnae",
      role: "Research Specialist",
      image: sunirAshnae,
      description: "Passionate about exploring new frontiers in research methodology. Combines analytical expertise with creative thinking to identify opportunities for improvement and innovation in various sectors.",
      linkedin: "#",
      twitter: "#",
      email: "sunir@rosebeltconsultants.com"
    },
    {
      id: 12,
      name: "Muhammad Shahroze Iqbal",
      role: "Research Associate",
      image: muhammadShahroze,
      description: "An MPhil scholar in Sociology with a strong focus on security strategies and strategic counseling. Contributes to projects centered around sustainable development with a passion for community engagement and social impact initiatives. Leverages strong problem-solving and leadership skills to address complex challenges effectively.",
      linkedin: "#",
      twitter: "#",
      email: "shahroze@rosebeltconsultants.com"
    },
    {
      id: 13,
      name: "Faheem Manzoor",
      role: "Young Researcher",
      image: faheemManzoor,
      description: "An emerging scholar specializing in data-driven socioeconomic research with expertise in quantitative analysis methodologies. Combines academic rigor with innovative approaches to address complex social challenges. Passionate about leveraging research to influence evidence-based policy making and sustainable development initiatives across diverse communities.",
      linkedin: "#",
      twitter: "#",
      email: "faheem@rosebeltconsultants.com"
    }
  ];

  // Render team member cards
  const renderTeamMembers = (members) => {
    return members.map((member) => (
      <Col key={member.id} lg={4} md={6}>
        <Card className="team-card h-100">
          <div className="card-img-wrapper">
            <Card.Img variant="top" src={member.image} alt={member.name} />
          </div>
          <Card.Body>
            <Card.Title className="mb-1">{member.name}</Card.Title>
            <Card.Subtitle className="mb-3" style={{ color: '#f59e0b' }}>{member.role}</Card.Subtitle>
            <Card.Text>{member.description}</Card.Text>
            <div className="social-links">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedin />
              </a>
              <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTwitter />
              </a>
              <a href={`mailto:${member.email}`} className="social-icon">
                <FaEnvelope />
              </a>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <div className="team-page" style={{ backgroundColor: 'var(--page-bg)' }}>
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">{sectionTitle.main} <span style={{ color: '#f59e0b' }}>{sectionTitle.accent}</span></h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                Dedicated professionals committed to delivering excellence in consulting services
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Team Grid */}
      <Container className="py-5">
        {/* Board of Directors Section */}
        {(activeSection === 'all' || activeSection === 'board') && (
          <div className="team-section mb-5">
            <div className="section-heading-container bg-dark mb-4">
              <h2 className="section-heading text-white py-2 px-3" style={{ backgroundColor: '#333333' }}>
                <span style={{ color: '#f59e0b' }}>Board of</span> Directors
              </h2>
            </div>
            <Row className="g-4">
              {renderTeamMembers(boardOfDirectors)}
            </Row>
          </div>
        )}

        {/* Consultants Section */}
        {(activeSection === 'all' || activeSection === 'consultants') && (
          <div className="team-section mb-5">
            <div className="section-heading-container bg-dark mb-4">
              <h2 className="section-heading text-white py-2 px-3" style={{ backgroundColor: '#333333' }}>
                <span style={{ color: '#f59e0b' }}>Our</span> Consultants
              </h2>
            </div>
            <Row className="g-4">
              {renderTeamMembers(consultants)}
            </Row>
          </div>
        )}

        {/* Health Experts Section */}
        {(activeSection === 'all' || activeSection === 'health') && (
          <div className="team-section mb-5">
            <div className="section-heading-container bg-dark mb-4">
              <h2 className="section-heading text-white py-2 px-3" style={{ backgroundColor: '#333333' }}>
                <span style={{ color: '#f59e0b' }}>Health</span> Experts
              </h2>
            </div>
            <Row className="g-4">
              {renderTeamMembers(healthExperts)}
            </Row>
          </div>
        )}

        {/* IT Experts Section */}
        {(activeSection === 'all' || activeSection === 'it') && (
          <div className="team-section mb-5">
            <div className="section-heading-container bg-dark mb-4">
              <h2 className="section-heading text-white py-2 px-3" style={{ backgroundColor: '#333333' }}>
                <span style={{ color: '#f59e0b' }}>IT</span> Experts
              </h2>
            </div>
            <Row className="g-4">
              {renderTeamMembers(itExperts)}
            </Row>
          </div>
        )}

        {/* Researchers Section */}
        {(activeSection === 'all' || activeSection === 'researchers') && (
          <div className="team-section mb-5">
            <div className="section-heading-container bg-dark mb-4">
              <h2 className="section-heading text-white py-2 px-3" style={{ backgroundColor: '#333333' }}>
                <span style={{ color: '#f59e0b' }}>Our</span> Researchers
              </h2>
            </div>
            <Row className="g-4">
              {renderTeamMembers(researchers)}
            </Row>
          </div>
        )}

        {/* Team Values Section */}
        {activeSection === 'all' && (
          <div className="team-values mt-5 pt-5">
            <div className="section-heading-container bg-dark mb-4">
              <h2 className="section-heading text-white py-2 px-3" style={{ backgroundColor: '#333333' }}>
                <span style={{ color: '#f59e0b' }}>Our</span> Values
              </h2>
            </div>
            <Row className="g-4">
              <Col md={4}>
                <div className="value-card">
                  <h3>Integrity</h3>
                  <p>We conduct our business with the highest ethical standards, transparency, and accountability in all our actions and decisions.</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="value-card">
                  <h3>Excellence</h3>
                  <p>We strive for excellence in everything we do, delivering solutions that exceed expectations and create lasting value for our clients.</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="value-card">
                  <h3>Innovation</h3>
                  <p>We encourage creative thinking and embrace innovative approaches to solve complex challenges and drive positive change.</p>
                </div>
              </Col>
            </Row>
          </div>
        )}
        
        {/* CTA Section */}
        <section className="about-section py-5 mb-0 text-white" style={{ backgroundColor: '#333333', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
          <Container>
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                <h2 className="mb-3">Join Our <span style={{ color: '#f59e0b' }}>Team</span></h2>
                <p className="lead mb-4">
                  Interested in becoming part of our exceptional team? Explore our current openings and apply today.
                </p>
                <div>
                  <Button 
                    variant="outline-light"
                    size="lg" 
                    href="/careers"
                    className="contact-btn"
                    style={{
                      backgroundColor: 'transparent', 
                      borderColor: '#f59e0b',
                      color: '#f59e0b',
                      padding: '10px 25px',
                      borderRadius: '30px'
                    }}
                  >
                    View Open Positions
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
    </div>
  );
};

export default Team;

// Add CSS for the contact button
const buttonStyle = document.createElement('style');
buttonStyle.innerHTML = `
  .contact-btn:hover {
    background-color: #f59e0b !important;
    color: #333333 !important;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);
  }
  
  .contact-btn {
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(buttonStyle); 