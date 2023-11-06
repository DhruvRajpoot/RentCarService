import React from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/hero-slider.css";

const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 4000,
    autoplaySpeed: 3000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };
  return (
    <Slider {...settings} className="hero__slider">
      <div className="slider__item slider__item-01 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">For Rent Rs. 8000 Per Day</h4>
            <h1 className="text-light mb-3">Reserve Now and Get 50% Off</h1>
            <Link to="/cars" className="reserve-now-link">
              <button className="mt-4">Reserve Now</button>
            </Link>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-02 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">For Rent Rs. 8000 Per Day</h4>
            <h1 className="text-light mb-3">Reserve Now and Get 50% Off</h1>
            <Link to="/cars" className="reserve-now-link">
              <button className="mt-4">Reserve Now</button>
            </Link>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-03 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">For Rent Rs. 8000 Per Day</h4>
            <h1 className="text-light mb-3">Reserve Now and Get 50% Off</h1>
            <Link to="/cars" className="reserve-now-link">
              <button className="mt-4">Reserve Now</button>
            </Link>
          </div>
        </Container>
      </div>
    </Slider>
  );
};

export default HeroSlider;
