import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLightbulb, faEye, faHandshake, faUsers, 
  faChartLine, faClipboardCheck, faShieldAlt, 
  faTrophy, faBalanceScale, faPuzzlePiece,
  faSearchDollar, faBuilding, faChartPie, faBriefcase,
  faUserTie, faCogs, faGlobe, faRocket
} from '@fortawesome/free-solid-svg-icons';
import './AboutUs.css';
import image2 from '../assets/2.png';
import drHafizImran from '../assets/5.png';
import drNaveedHaider from '../assets/10.png';
import muhammadAmir from '../assets/1.png';
import drTariqSaif from '../assets/13.png';
import muneebRehman from '../assets/12.png';
import drSfButt from '../assets/8.png';
import nasikBangash from '../assets/7.png';
import mudassirAli from '../assets/4.png';
import sunirAshnae from '../assets/6.png';
import image3 from '../assets/3.png';

const AboutUs = () => {
  useEffect(() => {
    console.log("AboutUs component mounted");
    document.title = "About Us | Rosebelt Consultants";
  }, []);

  // Team members data organized by categories
  // Health Experts
  const healthExperts = [
    {
      id: 1,
      name: "Dr. Ume Farwa",
      role: "Clinical Dietitian & Nutritionist",
      expertise: ["Medical Nutrition", "Weight Management", "Therapeutic Diets"],
      image: image2,
      bio: "A qualified clinical dietitian specialized in medical nutrition therapy, with experience treating nutrient deficiencies and various diseases through therapeutic diets."
    },
    {
      id: 2,
      name: "Dr. Hafiz Muhammad Imran",
      role: "Director-MOFEPT, Public Health Consultant",
      expertise: ["Public Health", "Health Policy", "Public Administration"],
      image: drHafizImran,
      bio: "PhD Public Health-PU, M.Phil Public Health-PU, MS Public Policy-UMT, MBA-IBA. Experienced public health consultant specializing in health policy development."
    },
    {
      id: 12,
      name: "Dr. Hafiz Muhammad Imran",
      role: "CEO RBC-Global",
      expertise: ["Corporate Law", "Strategic Leadership", "Business Development", "Legal Consulting"],
      image: image3,
      bio: "Advocate High Court, Chairman Punjab Bar Council (kSR) 2020, Member Managing Committee 2022. A visionary leader combining legal expertise with strategic business acumen to drive organizational growth and establish RBC as a trusted global consulting leader."
    },
    {
      id: 3,
      name: "Dr. Naveed Haider",
      role: "Health Expert",
      expertise: ["Pediatric Surgery", "Laparoscopic Surgery", "Public Health"],
      image: drNaveedHaider,
      bio: "MBBS, FCPS Paediatric Surgery, FACS (USA), Diploma in laparoscopic surgery (Germany), Mphil Public Health, PhD Public Health. Expert in specialized surgical care and health management."
    },
    {
      id: 4,
      name: "Dr. Muhammad Tariq Saif",
      role: "Health Expert",
      expertise: ["Pediatric Medicine", "Public Health", "Clinical Research"],
      image: drTariqSaif,
      bio: "MBBS, FCPS (Paeds medicine), KEMU, M.Phil Public Health-PU. Specialized in pediatric medicine and public health management."
    }
  ];

  // IT Experts
  const itExperts = [
    {
      id: 5,
      name: "Muhammad Amir",
      role: "IT Solutions Specialist",
      expertise: ["Digital Transformation", "Enterprise Solutions", "IT Strategy", "Systems Integration", "Technology Consulting"],
      image: muhammadAmir,
      bio: "A strategic technology advisor with extensive experience in developing and implementing comprehensive IT solutions. Specializes in aligning technology capabilities with business objectives to drive growth and efficiency. Leverages his role at NAVTTC to promote practical technology applications while delivering custom solutions that address complex organizational challenges."
    },
    {
      id: 6,
      name: "Muhammad Muneeb ur Rehman",
      role: "Design Expert",
      expertise: ["UI/UX Design", "Creative Direction", "Visual Identity"],
      image: muneebRehman,
      bio: "With a passion for creativity and a keen eye for detail, I craft innovative designs that inspire and elevate. Bringing visions to life through thoughtful solutions, blending art and functionality."
    }
  ];

  // Researchers
  const researchers = [
    {
      id: 8,
      name: "Dr. S.F.Butt",
      role: "Lead Researcher",
      expertise: ["Research Methodology", "Strategic Analysis", "Academic Leadership"],
      image: drSfButt,
      bio: "A researcher driven by a deep commitment to advancing knowledge through rigorous investigation and thoughtful reflection."
    },
    {
      id: 9,
      name: "Nasik Bangash",
      role: "Research Analyst",
      expertise: ["Monitoring & Evaluation", "Field Research", "Policy Analysis"],
      image: nasikBangash,
      bio: "Skilled in research, monitoring, and evaluation, with a focus on translating complex field realities into strategic insights that inform effective interventions and public policy."
    },
    {
      id: 10,
      name: "Mudassir Ali",
      role: "Research Associate",
      expertise: ["Data Analysis", "Innovation Research", "Strategic Solutions"],
      image: mudassirAli,
      bio: "Dedicated to uncovering innovative solutions through meticulous research and data analysis. Specializes in developing evidence-based strategies that drive organizational growth and efficiency."
    },
    {
      id: 11,
      name: "Sunir Ashnae",
      role: "Research Specialist",
      expertise: ["Research Methodology", "Creative Thinking", "Sector Innovation"],
      image: sunirAshnae,
      bio: "Passionate about exploring new frontiers in research methodology. Combines analytical expertise with creative thinking to identify opportunities for improvement and innovation in various sectors."
    }
  ];

  // Core values data
  const coreValues = [
    {
      id: 1,
      title: "Integrity",
      description: "We uphold the highest standards of integrity in all our interactions, ensuring transparency and honesty in everything we do.",
      icon: faShieldAlt
    },
    {
      id: 2,
      title: "Excellence",
      description: "We strive for excellence in every project, delivering solutions that exceed expectations and drive meaningful results.",
      icon: faTrophy
    },
    {
      id: 3,
      title: "Innovation",
      description: "We embrace innovative thinking and creative approaches to solve complex business challenges and drive growth.",
      icon: faLightbulb
    },
    {
      id: 4,
      title: "Collaboration",
      description: "We believe in the power of collaboration, working closely with our clients to achieve shared goals and lasting success.",
      icon: faHandshake
    },
    {
      id: 5,
      title: "Client Focus",
      description: "We place our clients at the center of everything we do, tailoring our services to meet their unique needs and aspirations.",
      icon: faUsers
    },
    {
      id: 6,
      title: "Ethical Practice",
      description: "We maintain the highest ethical standards in our practices, ensuring responsible and sustainable outcomes for all stakeholders.",
      icon: faBalanceScale
    }
  ];

  // Service areas data
  const serviceAreas = [
    {
      id: 1,
      title: "Strategic Planning",
      description: "Comprehensive strategic planning services to help businesses define their vision and achieve long-term objectives.",
      icon: faChartLine
    },
    {
      id: 2,
      title: "Financial Advisory",
      description: "Expert financial advice to optimize resource allocation, manage risks, and enhance financial performance.",
      icon: faSearchDollar
    },
    {
      id: 3,
      title: "Operational Excellence",
      description: "Process optimization and efficiency improvements to streamline operations and reduce costs.",
      icon: faClipboardCheck
    },
    {
      id: 4,
      title: "Organizational Development",
      description: "Talent management and organizational structure improvements to build high-performing teams.",
      icon: faBuilding
    },
    {
      id: 5,
      title: "Market Analysis",
      description: "In-depth market research and competitor analysis to identify opportunities and inform strategy.",
      icon: faChartPie
    },
    {
      id: 6,
      title: "Business Transformation",
      description: "End-to-end transformation services to help businesses adapt to changing market conditions and technologies.",
      icon: faPuzzlePiece
    }
  ];

  // Company milestones data
  const milestones = [
    {
      id: 1,
      year: 2010,
      title: "Company Founded",
      description: "Rosebelt Consultants was established with a vision to provide expert business consulting services to organizations of all sizes."
    },
    {
      id: 2,
      year: 2013,
      title: "Expanded Services",
      description: "Added financial advisory and market analysis to our service portfolio, expanding our capabilities to serve diverse client needs."
    },
    {
      id: 3,
      year: 2015,
      title: "Regional Expansion",
      description: "Opened offices in three new locations to better serve clients across the region, marking a significant growth milestone."
    },
    {
      id: 4,
      year: 2018,
      title: "Industry Recognition",
      description: "Received prestigious industry recognition for excellence in consulting services and client satisfaction."
    },
    {
      id: 5,
      year: 2020,
      title: "Digital Transformation",
      description: "Launched specialized digital transformation services to help clients navigate the rapidly evolving digital landscape."
    },
    {
      id: 6,
      year: 2023,
      title: "Global Partnerships",
      description: "Established strategic global partnerships to enhance our service offerings and extend our reach to international markets."
    }
  ];

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero">
        <Container>
          <h1>About Rosebelt Consultants</h1>
          <p className="lead">Building bridges to success through strategic consulting and innovative solutions</p>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="about-section bg-light">
        <Container>
          <div className="section-heading-container bg-white p-3 mb-5">
            <h2 className="section-heading">Our Story</h2>
          </div>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="about-content">
                <p>Rosebelt Consultants was founded in 2010 with a clear mission - to help businesses navigate complex challenges and achieve sustainable growth through strategic guidance and innovative solutions.</p>
                <p>Over the years, we've grown from a small team of dedicated consultants to a comprehensive business advisory firm serving clients across multiple industries and regions. Our journey has been marked by a steadfast commitment to excellence, integrity, and client success.</p>
                <p>What sets us apart is our personalized approach to consulting. We don't believe in one-size-fits-all solutions. Instead, we take the time to deeply understand each client's unique challenges, aspirations, and market context before developing tailored strategies that drive meaningful results.</p>
                <p>Today, Rosebelt Consultants stands as a trusted partner to businesses seeking to transform challenges into opportunities and achieve sustainable, long-term success in an ever-evolving business landscape.</p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about-image-container">
                <img src="https://via.placeholder.com/600x400?text=Our+Story" alt="Rosebelt Consultants Team" className="img-fluid about-image" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission and Vision Section */}
      <section className="about-section">
        <Container>
          <div className="section-heading-container bg-white p-3 mb-5">
            <h2 className="section-heading">Mission & Vision</h2>
          </div>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <div className="vision-mission-card">
                <div className="text-center">
                  <FontAwesomeIcon icon={faLightbulb} className="card-icon text-success" />
                </div>
                <h3 className="text-center">Our Mission</h3>
                <p>To empower businesses with the strategic insights, innovative solutions, and expert guidance they need to overcome challenges, seize opportunities, and achieve sustainable growth in today's dynamic business environment.</p>
                <p>We are committed to delivering excellence in every engagement, maintaining the highest standards of integrity, and fostering long-term partnerships built on trust and mutual success.</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="vision-mission-card">
                <div className="text-center">
                  <FontAwesomeIcon icon={faEye} className="card-icon text-success" />
                </div>
                <h3 className="text-center">Our Vision</h3>
                <p>To be recognized as the premier business consulting firm, known for our innovative approach, exceptional expertise, and unwavering commitment to client success.</p>
                <p>We envision a future where businesses of all sizes can access the strategic guidance they need to thrive, and where our collaborative approach to consulting creates lasting value for our clients, their stakeholders, and the broader communities they serve.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="about-section bg-light">
        <Container>
          <div className="section-heading-container bg-white p-3 mb-5">
            <h2 className="section-heading">Our Core Values</h2>
          </div>
          <Row>
            {coreValues.map(value => (
              <Col lg={4} md={6} className="mb-4" key={value.id}>
                <div className="value-card">
                  <div className="text-center">
                    <FontAwesomeIcon icon={value.icon} className="value-icon text-success" />
                  </div>
                  <h3 className="text-center">{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Our Approach Section */}
      <section className="about-section">
        <Container>
          <div className="section-heading-container bg-white p-3 mb-5">
            <h2 className="section-heading">Our Approach</h2>
          </div>
          <div className="text-center approach-intro mb-5">
            <p className="lead">We take a collaborative, data-driven approach to helping our clients overcome challenges and seize opportunities.</p>
          </div>
          <Row>
            <Col md={3} sm={6} className="mb-4">
              <div className="approach-card">
                <h3>1. Understand</h3>
                <p>We begin by deeply understanding your business, challenges, and goals through comprehensive discovery and analysis.</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <div className="approach-card">
                <h3>2. Strategize</h3>
                <p>We develop tailored strategies that leverage your strengths and address specific challenges with innovative solutions.</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <div className="approach-card">
                <h3>3. Implement</h3>
                <p>We work alongside your team to implement solutions effectively, ensuring alignment and buy-in at every level.</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <div className="approach-card">
                <h3>4. Optimize</h3>
                <p>We continuously monitor results, gather feedback, and refine our approach to maximize impact and ensure sustainable success.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="about-section bg-light">
        <Container>
          <div className="section-heading-container bg-white p-3 mb-5">
            <h2 className="section-heading">Our Services</h2>
          </div>
          <Row>
            {serviceAreas.map(service => (
              <Col lg={4} md={6} className="mb-4" key={service.id}>
                <div className="service-card">
                  <FontAwesomeIcon icon={service.icon} className="service-icon" />
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="about-section">
        <Container>
          <div className="section-heading-container bg-white p-3 mb-5">
            <h2 className="section-heading">Our Team</h2>
          </div>
          <div className="text-center team-intro mb-5">
            <p className="lead">Our diverse team of experts brings together decades of experience across various industries and specializations.</p>
          </div>
          
          {/* Health Experts Section */}
          <div className="mb-5">
            <h3 className="text-center mb-4">Health Experts</h3>
            <Row>
              {healthExperts.map(member => (
                <Col lg={3} md={6} className="mb-4" key={member.id}>
                  <Card className="team-card">
                    <div className="team-image-container">
                      <Card.Img variant="top" src={member.image} className="team-image" />
                    </div>
                    <Card.Body>
                      <Card.Title>{member.name}</Card.Title>
                      <Card.Subtitle className="mb-3">{member.role}</Card.Subtitle>
                      <Card.Text className="mb-3">{member.bio}</Card.Text>
                      <div className="expertise-badges">
                        {member.expertise.map((skill, index) => (
                          <Badge bg="success" className="me-2 mb-2" key={index}>{skill}</Badge>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          
          {/* IT Experts Section */}
          {itExperts.length > 0 && (
            <div className="mb-5">
              <h3 className="text-center mb-4">IT Experts</h3>
              <Row>
                {itExperts.map(member => (
                  <Col lg={3} md={6} className="mb-4" key={member.id}>
                    <Card className="team-card">
                      <div className="team-image-container">
                        <Card.Img variant="top" src={member.image} className="team-image" />
                      </div>
                      <Card.Body>
                        <Card.Title>{member.name}</Card.Title>
                        <Card.Subtitle className="mb-3">{member.role}</Card.Subtitle>
                        <Card.Text className="mb-3">{member.bio}</Card.Text>
                        <div className="expertise-badges">
                          {member.expertise.map((skill, index) => (
                            <Badge bg="success" className="me-2 mb-2" key={index}>{skill}</Badge>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
          
          {/* Researchers Section */}
          {researchers.length > 0 && (
            <div className="mb-5">
              <h3 className="text-center mb-4">Our Researchers</h3>
              <Row>
                {researchers.map(member => (
                  <Col lg={3} md={6} className="mb-4" key={member.id}>
                    <Card className="team-card">
                      <div className="team-image-container">
                        <Card.Img variant="top" src={member.image} className="team-image" />
                      </div>
                      <Card.Body>
                        <Card.Title>{member.name}</Card.Title>
                        <Card.Subtitle className="mb-3">{member.role}</Card.Subtitle>
                        <Card.Text className="mb-3">{member.bio}</Card.Text>
                        <div className="expertise-badges">
                          {member.expertise.map((skill, index) => (
                            <Badge bg="success" className="me-2 mb-2" key={index}>{skill}</Badge>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Container>
      </section>

      {/* Milestones Section */}
      <section className="about-section bg-light">
        <Container>
          <div className="section-heading-container bg-white p-3 mb-5">
            <h2 className="section-heading">Our Journey</h2>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-badge">{milestone.year}</div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4>{milestone.title}</h4>
                  </div>
                  <div className="timeline-body">
                    <p>{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="about-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center cta-content">
              <h2>Ready to Transform Your Business?</h2>
              <p className="lead mb-4">Partner with Rosebelt Consultants and unlock your organization's full potential.</p>
              <Button variant="success" size="lg" href="/contact">Contact Us Today</Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs; 