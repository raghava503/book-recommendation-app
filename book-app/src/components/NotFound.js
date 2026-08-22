import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="text-center mt-5 pt-5">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="text-muted mb-4">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              🏠 Go Home
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;