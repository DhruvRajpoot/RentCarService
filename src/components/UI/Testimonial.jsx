import React from "react";
import Slider from "react-slick";

import "../../styles/testimonial.css";

import ava01 from "../../assets/all-images/ava-1.jpg";
import ava02 from "../../assets/all-images/ava-2.jpg";
import ava03 from "../../assets/all-images/ava-3.jpg";
import ava04 from "../../assets/all-images/ava-4.jpg";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const testimonialData = [
    {
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni explicabo molestias recusandae repudiandae, dolor, sapiente placeat ab, animi eum minima nulla facere aliquam aut vitae quo pariatur voluptate odit?",
      name: "Jhon Doe",
      designation: "Customer",
      imgUrl: ava01,
    },

    {
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni explicabo molestias recusandae repudiandae, dolor, sapiente placeat ab, animi eum minima nulla facere aliquam aut vitae quo pariatur voluptate odit?",
      name: "Jhon Doe",
      designation: "Customer",
      imgUrl: ava02,
    },

    {
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni explicabo molestias recusandae repudiandae, dolor, sapiente placeat ab, animi eum minima nulla facere aliquam aut vitae quo pariatur voluptate odit?",
      name: "Jhon Doe",
      designation: "Customer",
      imgUrl: ava03,
    },

    {
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus magni explicabo molestias recusandae repudiandae, dolor, sapiente placeat ab, animi eum minima nulla facere aliquam aut vitae quo pariatur voluptate odit?",
      name: "Jhon Doe",
      designation: "Customer",
      imgUrl: ava04,
    },
  ];

  return (
    <div style={{ maxWidth: "90vw" }}>
      <Slider {...settings}>
        {testimonialData.map((item, index) => (
          <div className="testimonial py-4 px-3" key={index}>
            <p className="section__description">{item.description}</p>

            <div className="mt-3 d-flex align-items-center gap-4">
              <img src={item.imgUrl} alt="" className="w-25 h-25 rounded-2" />

              <div>
                <h6 className="mb-0 mt-3">{item.name}</h6>
                <p className="section__description">{item.designation}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
