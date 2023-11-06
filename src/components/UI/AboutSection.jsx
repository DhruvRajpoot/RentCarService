import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "10vw" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Embark on a journey with us</h2>
              <p className="section__description">
              With us, your journey begins with convenience and quality. 
              We are dedicated to providing you with top-tier rental solutions, whether you're traveling for business or leisure. 
              Our extensive fleet of meticulously maintained vehicles, combined with our exceptional customer service, ensures a hassle-free and enjoyable experience from the moment you step into our world of car rentals. 
              Discover the freedom of the open road with confidence, knowing that we are here to meet your every travel need. 
              At Car Rent Service, we are your trusted partner on the road to unforgettable adventures and seamless transportation solutions.
              </p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Cars available in excellent condition. 
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Choose from a wide range of vehicles.
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> On-time deliveries every time.
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Exceptional customer service for seamless comfort.
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
