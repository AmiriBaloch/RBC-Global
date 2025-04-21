import React from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import PageTemplate from './PageTemplate';

const ServicesData = () => {
  // Page content
  const title = "RoseBelt Data Insights";
  const subtitle = "Transforming data into actionable intelligence for informed decision-making";
  const content = [
    "RoseBelt Data Insights is our specialized practice focused on helping organizations leverage the power of data to drive better decisions and create lasting impact. In today's data-rich environment, we combine advanced analytics with deep domain expertise to uncover meaningful patterns and actionable intelligence.",
    "Our team of data scientists, engineers, and domain experts work closely with clients to design and implement data solutions that address critical business challenges. From data strategy and architecture to advanced analytics and visualization, we provide end-to-end support tailored to your specific needs and context.",
    "We believe that effective data utilization is not just about technology, but about creating a data-driven culture that empowers people to make better decisions. That's why our approach emphasizes building internal capabilities and designing solutions that are both powerful and accessible to users at all levels of technical expertise."
  ];
  
  // Additional components for the page
  const additionalContent = (
    <>
      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">Our Data Services</h2>
          <p className="text-center mb-5">
            From strategy to implementation, we provide comprehensive data and analytics solutions:
          </p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 shadow-sm border-0 service-card">
            <Card.Body className="p-4">
              <h3 className="h5 mb-3">Data Strategy</h3>
              <p>Developing comprehensive data strategies aligned with your organizational goals.</p>
              <div className="mt-4">
                <small className="text-muted">Strategy Development</small>
                <ProgressBar variant="success" now={95} className="mb-3" style={{height: "5px"}} />
                <small className="text-muted">Data Governance</small>
                <ProgressBar variant="success" now={90} className="mb-3" style={{height: "5px"}} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 shadow-sm border-0 service-card">
            <Card.Body className="p-4">
              <h3 className="h5 mb-3">Advanced Analytics</h3>
              <p>Applying AI, machine learning and statistical methods to extract meaningful insights.</p>
              <div className="mt-4">
                <small className="text-muted">Predictive Models</small>
                <ProgressBar variant="warning" now={85} className="mb-3" style={{height: "5px"}} />
                <small className="text-muted">Machine Learning</small>
                <ProgressBar variant="warning" now={90} className="mb-3" style={{height: "5px"}} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 shadow-sm border-0 service-card">
            <Card.Body className="p-4">
              <h3 className="h5 mb-3">Data Engineering</h3>
              <p>Building robust data pipelines and infrastructure to support your analytics needs.</p>
              <div className="mt-4">
                <small className="text-muted">Data Integration</small>
                <ProgressBar variant="info" now={95} className="mb-3" style={{height: "5px"}} />
                <small className="text-muted">Cloud Solutions</small>
                <ProgressBar variant="info" now={85} className="mb-3" style={{height: "5px"}} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100 shadow-sm border-0 service-card">
            <Card.Body className="p-4">
              <h3 className="h5 mb-3">Data Visualization</h3>
              <p>Creating intuitive dashboards and reports that make insights accessible to all stakeholders.</p>
              <div className="mt-4">
                <small className="text-muted">Dashboard Design</small>
                <ProgressBar variant="primary" now={90} className="mb-3" style={{height: "5px"}} />
                <small className="text-muted">Storytelling</small>
                <ProgressBar variant="primary" now={95} className="mb-3" style={{height: "5px"}} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h3 className="h4 mb-4 text-center">Our Data Impact</h3>
              <Row className="text-center">
                <Col md={3} className="mb-3 mb-md-0">
                  <h4 className="display-4 fw-bold text-primary">40+</h4>
                  <p className="mb-0">Data Projects</p>
                </Col>
                <Col md={3} className="mb-3 mb-md-0">
                  <h4 className="display-4 fw-bold text-primary">85%</h4>
                  <p className="mb-0">Increased Efficiency</p>
                </Col>
                <Col md={3} className="mb-3 mb-md-0">
                  <h4 className="display-4 fw-bold text-primary">12TB</h4>
                  <p className="mb-0">Data Processed</p>
                </Col>
                <Col md={3}>
                  <h4 className="display-4 fw-bold text-primary">24/7</h4>
                  <p className="mb-0">Support Provided</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );

  return (
    <PageTemplate
      title={title}
      subtitle={subtitle}
      content={content}
      imageSrc="https://via.placeholder.com/600x400?text=Data+Insights"
      imageAlt="RoseBelt Data Insights Team"
      additionalComponents={additionalContent}
    />
  );
};

export default ServicesData; 