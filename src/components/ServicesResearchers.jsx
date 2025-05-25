import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './AboutUs.css';

// Import researcher images
import sfButt from '../assets/8.png';
import nasikBangash from '../assets/7.png';
import mudassirAli from '../assets/4.png';
import sunirAshnae from '../assets/6.png';
import muhammadShahroze from '../assets/14.png';
import farhatAbbas from '../assets/15.png';
import maheenNisar from '../assets/16.png';
import mishaShahbaz from '../assets/17.png';
import ridaBatool from '../assets/19.png';
import muskanFatima from '../assets/20.png';
import bushraMaqsood from '../assets/23.png';
import faheemManzoor from '../assets/25.png';
import shehzalEman from '../assets/26.png';
import harramMubarik from '../assets/27.png';
import joatKhalid from '../assets/28.png';
import zunairaHumail from '../assets/29.png';
import maimoonaMunir from '../assets/30.png';
import fatimaAli from '../assets/31.png';
import areeba from '../assets/33.png';
import aminaAkram from '../assets/34.png';
import ahtshamKhan from '../assets/36.jpg';

const ServicesResearchers = () => {
  // Researchers data from Team.jsx
  const researchers = [
    {
      id: 8,
      name: "S.F. Butt",
      role: "Lead Researcher",
      image: sfButt,
      description: "A distinguished senior researcher with extensive experience in driving evidence-based decision making through methodical investigation. Leads complex research projects across multiple sectors with a focus on sustainable development and policy impact. Combines academic rigor with practical insights to create knowledge that transforms organizations and communities. Dedicated to fostering innovation and excellence in research methodologies while maintaining the highest standards of analytical integrity.",
      linkedin: "#",
      twitter: "#",
      email: "sfbutt@rosebeltconsultants.com"
    },
    {
      id: 9,
      name: "Nasik Bangash",
      role: "Research Analyst",
      image: nasikBangash,
      description: "A dedicated research analyst with expertise in translating complex data into actionable insights. Specializes in monitoring and evaluation of public policy interventions, with a focus on sustainable development outcomes. Combines quantitative and qualitative methodologies to bridge the gap between research findings and practical implementation. Committed to delivering comprehensive analyses that drive informed decision-making and create lasting impact in communities.",
      linkedin: "#",
      twitter: "#",
      email: "nasik@rosebeltconsultants.com"
    },
    {
      id: 10,
      name: "Mudassir Ali Watto",
      role: "Research Associate",
      image: mudassirAli,
      description: "A methodical research associate with a passion for uncovering innovative solutions to complex challenges. Specializes in data analysis and strategic development, focusing on organizational effectiveness and community wellbeing. Combines analytical expertise with practical insights to create frameworks that enhance program implementation. Dedicated to developing evidence-based strategies that drive sustainable development and positive social change.",
      linkedin: "#",
      twitter: "#",
      email: "mudassir@rosebeltconsultants.com"
    },
    {
      id: 11,
      name: "Sunir Ashnae",
      role: "Research Specialist",
      image: sunirAshnae,
      description: "A creative research specialist dedicated to exploring new methodological frontiers in social and development research. Develops innovative multidisciplinary research designs and analytical frameworks that address complex societal challenges. Combines theoretical knowledge with practical applications to generate insights that inspire innovation. Committed to advancing research methodologies while ensuring findings translate into meaningful, actionable outcomes.",
      linkedin: "#",
      twitter: "#",
      email: "sunir@rosebeltconsultants.com"
    },
    {
      id: 12,
      name: "Muhammad Shahroze Iqbal",
      role: "Research Associate",
      image: muhammadShahroze,
      description: "A passionate sociologist with expertise in security strategies and community dynamics. Specializes in sustainable development research and strategic counseling, focusing on social impact and community engagement. Combines sociological insights with practical approaches to address complex social challenges. Dedicated to developing evidence-based solutions that promote social cohesion and sustainable community development.",
      linkedin: "#",
      twitter: "#",
      email: "shahroze@rosebeltconsultants.com"
    },
    {
      id: 13,
      name: "Farhat Abbas",
      role: "Young Researcher",
      image: farhatAbbas,
      description: "A dynamic young researcher with expertise in data-driven insights and modern research approaches. Specializes in analyzing complex social issues through innovative methodologies and contemporary analytical tools. Combines academic knowledge with practical research skills to develop creative solutions for contemporary challenges. Dedicated to advancing research practices while ensuring findings contribute to meaningful social development.",
      linkedin: "#",
      twitter: "#",
      email: "farhat@rosebeltconsultants.com"
    },
    {
      id: 21,
      name: "Faheem Manzoor",
      role: "Young Researcher",
      image: faheemManzoor,
      description: "An emerging scholar specializing in data-driven socioeconomic research with expertise in quantitative analysis methodologies. Combines academic rigor with innovative approaches to address complex social challenges. Focuses on leveraging research to influence evidence-based policy making and sustainable development initiatives. Dedicated to developing comprehensive research frameworks that drive positive change across diverse communities.",
      linkedin: "#",
      twitter: "#",
      email: "faheem@rosebeltconsultants.com"
    },
    {
      id: 14,
      name: "Maheen Nisar Khan",
      role: "Young Researcher",
      image: maheenNisar,
      description: "A committed qualitative researcher with expertise in social development and public policy analysis. Specializes in field research and stakeholder engagement across diverse communities. Combines methodological expertise with practical insights to ensure research translates into meaningful improvements. Dedicated to developing comprehensive research approaches that address complex social challenges and drive sustainable development.",
      linkedin: "#",
      twitter: "#",
      email: "maheen@rosebeltconsultants.com"
    },
    {
      id: 15,
      name: "Misha Shahbaz",
      role: "Young Researcher",
      image: mishaShahbaz,
      description: "A dedicated data analyst with expertise in socioeconomic research and community dynamics. Specializes in translating complex findings into practical recommendations for sustainable development. Combines analytical skills with research methodologies to drive positive social change. Committed to developing evidence-based solutions that address community needs and promote sustainable development initiatives.",
      linkedin: "#",
      twitter: "#",
      email: "misha@rosebeltconsultants.com"
    },
    {
      id: 29,
      name: "Amina Akram",
      role: "Allied Health Sciences Specialist",
      image: aminaAkram,
      description: "A distinguished Allied Health Sciences Professional with comprehensive expertise in molecular biology and genetic engineering applications. Specializes in developing innovative biotechnological solutions for healthcare and industrial applications. Combines advanced laboratory techniques with research methodologies to develop evidence-based biotechnological protocols. Dedicated to advancing biotechnological innovations through cutting-edge approaches and research-driven methodologies in healthcare and industrial sectors.",
      linkedin: "#",
      twitter: "#",
      email: "amina@rosebeltconsultants.com"
    },
    {
      id: 16,
      name: "Rida Batool",
      role: "Young Researcher",
      image: ridaBatool,
      description: "A passionate educational researcher with expertise in evidence-based approaches to learning outcomes. Specializes in curriculum development and educational policy analysis across diverse learning environments. Combines research methodologies with practical insights to create inclusive educational environments. Dedicated to developing comprehensive strategies that empower learners and promote educational excellence.",
      linkedin: "#",
      twitter: "#",
      email: "rida@rosebeltconsultants.com"
    },
    {
      id: 17,
      name: "Muskan Fatima",
      role: "Young Researcher",
      image: muskanFatima,
      description: "A passionate public health researcher with expertise in sustainable and evidence-based health strategies. Specializes in designing health promotion initiatives and conducting community engagement programs. Combines research methodologies with practical approaches to improve community health outcomes. Dedicated to advancing public health initiatives that make healthcare accessible and effective for all communities.",
      linkedin: "#",
      twitter: "#",
      email: "muskan@rosebeltconsultants.com"
    },
    {
      id: 20,
      name: "Bushra Maqsood",
      role: "Young Researcher",
      image: bushraMaqsood,
      description: "A passionate advocate and researcher with expertise in gender equality and social inclusion. Specializes in participatory methodologies that amplify marginalized voices in research and policy development. Combines research expertise with practical approaches to create meaningful policy change. Dedicated to developing inclusive research frameworks that promote equity and social justice in communities.",
      linkedin: "#",
      twitter: "#",
      email: "bushra@rosebeltconsultants.com"
    },
    {
      id: 22,
      name: "Shehzal Eman",
      role: "Public Health Researcher",
      image: shehzalEman,
      description: "A dedicated public health researcher with extensive experience as a WHO Independent Monitor. Specializes in field operations, vaccination campaign monitoring, and program evaluation for immunization initiatives. Combines public health expertise with practical field experience to advance health programs. Committed to developing research-driven strategies that improve healthcare delivery and outcomes in Pakistan.",
      linkedin: "#",
      twitter: "#",
      email: "shehzal@rosebeltconsultants.com"
    },
    {
      id: 23,
      name: "Harram Mubarik",
      role: "Nutritionist & Dietetics Specialist",
      image: harramMubarik,
      description: "A dedicated nutritionist and dietetics specialist with expertise in personalized nutrition planning and community health programs. Specializes in nutritional assessment, counseling, and chronic disease management through dietary interventions. Combines clinical knowledge with research methodologies to develop evidence-based nutrition strategies. Committed to advancing public health through education and tailored nutritional interventions.",
      linkedin: "#",
      twitter: "#",
      email: "harram@rosebeltconsultants.com"
    },
    {
      id: 24,
      name: "Joat Khalid",
      role: "Public Health Researcher",
      image: joatKhalid,
      description: "A passionate public health researcher with expertise in maternal and child health research and health equity initiatives. Specializes in applying rigorous, evidence-based research to improve health outcomes and inform policy development. Combines research methodologies with practical approaches to create meaningful community impact. Dedicated to developing comprehensive strategies that address health disparities and promote sustainable health solutions.",
      linkedin: "#",
      twitter: "#",
      email: "joat@rosebeltconsultants.com"
    },
    {
      id: 25,
      name: "Zunaira Humail",
      role: "Sociologist",
      image: zunairaHumail,
      description: "A results-driven sociologist with expertise in field monitoring, data collection, and community-based research. Specializes in evaluating vaccination campaigns and strengthening health initiatives as a former WHO Independent Monitor. Combines sociological insights with practical fieldwork to support health and development programs. Dedicated to advancing social equity through evidence-based research and community engagement strategies.",
      linkedin: "#",
      twitter: "#",
      email: "zunaira@rosebeltconsultants.com"
    },
    {
      id: 26,
      name: "Maimoona Munir",
      role: "Public Health Researcher",
      image: maimoonaMunir,
      description: "A dedicated public health researcher with expertise in vaccination campaign monitoring and maternal and child health research. Specializes in program evaluation and field data collection to inform evidence-based health interventions. Combines research methodologies with practical approaches to improve health outcomes. Committed to developing comprehensive strategies that address public health challenges and promote community wellbeing.",
      linkedin: "#",
      twitter: "#",
      email: "maimoona@rosebeltconsultants.com"
    },
    {
      id: 27,
      name: "Fatima Ali",
      role: "Public Health Researcher",
      image: fatimaAli,
      description: "A dedicated public health researcher and WHO Independent Campaign Monitor with expertise in research design and data analysis. Specializes in immunization initiatives and field work to support public health development in Pakistan. Combines research methodologies with practical approaches to drive impactful health recommendations. Committed to advancing public health policies through evidence-based research and strategic interventions.",
      linkedin: "#",
      twitter: "#",
      email: "fatima@rosebeltconsultants.com"
    },
    {
      id: 28,
      name: "Areeba",
      role: "Public Health Professional",
      image: areeba,
      description: "A dedicated public health professional with expertise in data analysis, program management, and community engagement. Specializes in monitoring intra-campaign activities and developing evidence-based health programs. Combines research methodologies with practical approaches to inform policy and drive health initiatives. Committed to advancing health equity through strategic interventions and community-driven research approaches.",
      linkedin: "#",
      twitter: "#",
      email: "areeba@rosebeltconsultants.com"
    },
    {
      id: 35,
      name: "Ahtsham Ahmad Khan",
      role: "Agricultural Researcher",
      image: ahtshamKhan,
      description: "A dedicated public health professional with expertise in data analysis, program management, and community engagement. Specializes in monitoring intra-campaign activities and developing evidence-based health programs. Combines research methodologies with practical approaches to inform policy and drive health initiatives. Committed to advancing health equity through strategic interventions and community-driven research approaches.",
      linkedin: "#",
      twitter: "#",
      email: "kahtsham@gmail.com"
    }
  ];

  useEffect(() => {
    document.title = "RoseBelt Researchers | Rosebelt Consultants";
    // Force scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="researchers-service-page">
      {/* Hero Section */}
      <div className="careers-hero text-white py-5" style={{ backgroundColor: '#333333' }}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 mb-3">RoseBelt <span style={{ color: '#f59e0b' }}>Researchers</span></h1>
              <p className="lead fw-bold" style={{ color: 'white' }}>
                Evidence-based insights to drive informed decision-making
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {/* Meet Our Researchers Section - Moved to top */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Meet Our</span> Young Researchers
            </h2>
          </div>
          <Row className="g-4">
            {researchers.map((researcher) => (
              <Col key={researcher.id} lg={4} md={6}>
                <Card className="h-100" style={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  border: '1px solid #e0e0e0',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '700px'
                }}>
                  <div 
                    style={{ 
                      height: '55%', 
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#f8f8f8'
                    }}
                  >
                    <Card.Img 
                      src={researcher.image} 
                      alt={researcher.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div className="text-center p-4" style={{ height: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Card.Title 
                      style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: '600', 
                        color: '#333',
                        marginBottom: '5px'
                      }}
                    >
                      {researcher.name}
                    </Card.Title>
                    <Card.Subtitle 
                      style={{ 
                        color: '#f59e0b', 
                        fontSize: '1.1rem',
                        marginBottom: '15px'
                      }}
                    >
                      {researcher.role}
                    </Card.Subtitle>
                    <Card.Text 
                      style={{ 
                        color: '#555', 
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        marginBottom: '20px' 
                      }}
                    >
                      {researcher.description}
                    </Card.Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Service Overview Section - Moved down */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Service</span> Overview
            </h2>
          </div>
          <Row>
            <Col lg={12}>
              <div className="about-content p-4 rounded-3 text-dark" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0' }}>
                <p>
                  RoseBelt Researchers provides comprehensive research and analysis services that deliver actionable insights for decision-makers. Our team of experienced research professionals specializes in collecting, analyzing, and interpreting data across various domains to inform strategy development, policy formulation, and program design.
                </p>
                <p>
                  We employ a rigorous, methodical approach to research that combines both quantitative and qualitative methodologies, ensuring that our findings are robust, reliable, and relevant to your specific context. Our interdisciplinary expertise allows us to tackle complex research questions from multiple perspectives, providing holistic solutions to multifaceted challenges.
                </p>
              </div>
            </Col>
          </Row>
        </section>

        {/* Key Services Section - Moved down */}
        <section className="about-section mb-5">
          <div className="section-heading-container mb-4">
            <h2 className="section-heading">
              <span style={{ color: '#f59e0b' }}>Key</span> Services
            </h2>
          </div>
          <Row className="mb-4">
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Market Research</h4>
                <p>Comprehensive market analysis to identify opportunities, understand consumer behavior, and inform business strategy development.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Policy Research</h4>
                <p>Analysis of existing policies and development of evidence-based recommendations for policy formulation and improvement.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Impact Assessment</h4>
                <p>Evaluation of program outcomes and impacts to measure effectiveness and identify areas for improvement.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Data Analysis</h4>
                <p>Advanced statistical analysis and data interpretation to extract meaningful insights from complex datasets.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Needs Assessment</h4>
                <p>Identification of community or organizational needs through systematic research and stakeholder engagement.</p>
              </div>
            </Col>
            <Col md={6} lg={4} className="mb-4">
              <div className="p-4 h-100 rounded-3" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', borderLeft: '4px solid #f59e0b' }}>
                <h4 className="mb-3">Research Training</h4>
                <p>Capacity building programs to enhance research skills within organizations and institutions.</p>
              </div>
            </Col>
          </Row>
        </section>
        
        {/* CTA Section */}
        <section className="about-section py-5 mb-0 text-white" style={{ backgroundColor: '#333333', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}>
          <Container>
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                <h2 className="mb-3">Need <span style={{ color: '#f59e0b' }}>Research</span> Insights?</h2>
                <p className="lead mb-4">
                  Contact our research team to discuss how we can help you gather the evidence and insights needed for informed decision-making.
                </p>
                <div>
                  <Button 
                    variant="outline-light"
                    size="lg" 
                    href="/contact"
                    className="contact-btn"
                    style={{
                      backgroundColor: 'transparent', 
                      borderColor: '#f59e0b',
                      color: '#f59e0b',
                      padding: '10px 25px',
                      borderRadius: '30px'
                    }}
                  >
                    Start Your Research Project
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

export default ServicesResearchers; 