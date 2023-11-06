import React from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

const quickLinks = [
  {
    path: "/about",
    display: "About",
  },

  {
    path: "#",
    display: "Privacy Policy",
  },

  {
    path: "/cars",
    display: "Car Listing",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  const [email, setEmail] = React.useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email);
    setEmail("");
  };

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="12" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className=" d-flex align-items-center gap-2">
                  <i className="ri-car-line"></i>
                  <span>Rent Car Service</span>
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
            We are your trusted destination for hassle-free car rentals.
            Discover the ease of renting a car with us. Our extensive range of vehicles ensures you'll find the perfect ride for your needs, whether it's a weekend getaway or a long road trip.
            </p>
          </Col>

          <Col lg="2" md="6" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title">Quick Links</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="6" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4">Head Office</h5>
              <p className="office__info">123, Bhopal, Madhya Pradesh</p>
              <p className="office__info">
                Email:
                <a
                  href="mailto:contact.rentcarservice@gmail.com"
                  style={{
                    color: "rgba(255, 255, 255, 0.715)",
                    textDecoration: "none",
                    marginLeft: "5px",
                  }}
                >
                  contact.rentcarservice@gmail.com
                </a>
              </p>
              <p className="office__info">Phone: +123123123123</p>
              <p className="office__info">Office Time: 24 hours</p>
            </div>
          </Col>

          <Col lg="3" md="12" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title mb-3">Newsletter</h5>
              <p className="section__description">
                We're launching a newsletter filled with exclusive content,
                expert insights, and valuable tips. Join us to stay informed,
                inspired, and connected. Subscribers will receive the latest
                updates, industry news, and more.
              </p>
            </div>
          </Col>

          <Col lg="12" md="12">
            <div className="footer__bottom">
              <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                <i className="ri-copyright-line"></i>Copyright {year}, All
                rights reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
