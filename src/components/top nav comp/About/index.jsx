import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const About = () => {
  return (
    <div className="About mt-5">
      <div className="About__videoder">
        <Container>
          <h4 className="title">
            About <span>Videoder</span> :-
          </h4>
          <p className="content">
            vidoder is a simple easy to use video editor. It is Created by using
            ffmpeg and wasm-ffmpeg package. It is really fast and supports all
            modern browsers.
          </p>
        </Container>
      </div>

      <div className="About__choose-us mt-5">
        <Container>
          <h4 className="title pt-4">
            Why to <span>choose us</span> :-
          </h4>
          <Row className="justify-content-between">
            <Col sm={12} md={6} lg={4}>
              <Card>
                <Card.Title className="text-center pt-4 card__title">
                  100% free
                </Card.Title>
                <Card.Body>
                  <Card.Text className="pb-3">
                    It is completly free, you can convert as much videos as you
                    want
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <Card>
                <Card.Title className="text-center pt-4 card__title">
                  No Adds
                </Card.Title>
                <Card.Body>
                  <Card.Text className="pb-3">
                    No Adds, No clickBytes, No Redirects
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <Card>
                <Card.Title className="text-center pt-4 card__title">
                  Virus Free
                </Card.Title>
                <Card.Body>
                  <Card.Text className="pb-3">
                    Website does not inject any virus or illegal cookies
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default About;
