import React from 'react';
import { Container, Row, Col, Card, Badge, ListGroup } from 'react-bootstrap';
import PageTemplate from './PageTemplate';

const ServicesAdvisors = () => {
  // Page content
  const title = "RoseBelt Advisors";
  const subtitle = "Strategic consulting services tailored to your organization's unique challenges";
  const content = [
    "RoseBelt Advisors is our core consulting practice, delivering strategic insights and tailored solutions to help organizations navigate complex challenges and capitalize on emerging opportunities. Our team of experienced consultants brings deep expertise across sectors and functions to provide guidance that drives sustainable impact.",
    "We work collaboratively with clients at every step, from defining challenges and conducting in-depth analysis to developing strategies and supporting implementation. Our approach combines rigorous analytical methods with practical experience to ensure solutions are both innovative and achievable.",
    "Whether you're seeking to refine your strategy, transform your operations, enhance your organizational effectiveness, or navigate change, RoseBelt Advisors provides the expertise and support you need to achieve your goals and create lasting value."
  ];
  
  // Additional components for the page
  const additionalContent = (
    <>
      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">Our Advisory Services</h2>
          <p className="text-center mb-5">
            We provide comprehensive consulting services across a wide range of areas:
          </p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm border-0 service-card">
            <Card.Body className="p-4">
              <Badge bg="primary" className="mb-3">Strategic Planning</Badge>
              <Card.Title className="mb-3">Strategy & Growth</Card.Title>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item className="border-0 ps-0">Strategic planning & vision setting</ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">Market assessment & opportunity analysis</ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">Growth strategy development</ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">Competitive positioning</ListGroup.Item>
              </ListGroup>
              <Card.Text>
                We help you define clear strategic directions and actionable pathways to sustainable growth.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm border-0 service-card">
            <Card.Body className="p-4">
              <Badge bg="success" className="mb-3">Performance</Badge>
              <Card.Title className="mb-3">Operational Excellence</Card.Title>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item className="border-0 ps-0">Process optimization</ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">Performance management</ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">Efficiency improvement initiatives</ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">Cost optimization</ListGroup.Item>
              </ListGroup>
              <Card.Text>
                We optimize your operations to enhance efficiency, quality, and overall performance.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm border-0 service-card">
            <Card.Body className="p-4">
              <Badge bg="warning" className="mb-3 text-dark">Transformation</Badge>
              <Card.Title className="mb-3">Organizational Transformation</Card.Title>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item className="border-0 ps-0">Change management</ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">Leadership development</ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">Culture transformation</ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">Digital transformation</ListGroup.Item>
              </ListGroup>
              <Card.Text>
                We guide organizations through complex transformations to build capabilities for the future.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <p className="fw-bold mb-4">
            Our advisors have collectively led over 1,000 consulting engagements across 
            40+ countries, delivering measurable results for clients of all sizes.
          </p>
        </Col>
      </Row>
    </>
  );

  return (
    <PageTemplate
      title={title}
      subtitle={subtitle}
      content={content}
      imageSrc="https://via.placeholder.com/600x400?text=RoseBelt+Advisors"
      imageAlt="RoseBelt Advisors Team"
      additionalComponents={additionalContent}
    />
  );
};

export default ServicesAdvisors; 