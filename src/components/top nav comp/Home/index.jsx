import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  const handleKnowMoreBtn = () => history.push("/about");

  useEffect(() => {
    document.querySelector(".Home").style.overFlow = "hidden";
  }, []);

  return (
    <div className="Home">
      <div className="Home__container">
        <Row
          className="hero"
          className="align-items-center justify-content-around">
          <Col sm={12} md={12} lg={6} className="hero__content">
            <h1 className="Home__title">Free online video editor</h1>
            <h2 className="Home__subtitle">
              A simple,easy to use video editor
            </h2>
            <div>
              <button
                className="customBtn customBtn__large"
                onClick={handleKnowMoreBtn}>
                Know more
              </button>
            </div>
          </Col>
          <Col sm={12} md={12} lg={6}>
            <img
              src="/images/computer.png"
              alt=""
              className="img-fluid hero__img"
            />
          </Col>
        </Row>
      </div>
      <footer>sumukha k.b @copyright 2020-22</footer>
    </div>
  );
};

export default Home;
