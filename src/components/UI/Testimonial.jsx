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
        '"Exceptional Service Experience: I was thoroughly impressed with the top-notch service provided by this rental company. From the moment I booked my car to the final drop-off, everything was seamless and stress-free. The vehicle was clean, well-maintained, and delivered on time. I can\'t recommend them enough!"',
      name: "Mahesh Kumar",
      designation: "Customer",
      imgUrl: ava01,
    },

    {
      description:
        '"I recently rented a car from this company, and I must say it was a fantastic! Vehicle was in excellent condition, and the customer service was outstanding. I especially appreciated the prompt response to my questions and the smooth, hassle-free pickup and drop-off. I\'ll definitely be a returning customer!"',
      name: "Jaya Bachchan",
      designation: "Customer",
      imgUrl: ava02,
    },

    {
      description:
        '"The car rental experience exceeded my expectations. The vehicle was in excellent condition, and the customer service was exceptional. I appreciate the punctuality and professionalism displayed by the team. Will definitely choose them again in the future travels."',
      name: "Rahul Kumawat",
      designation: "Customer",
      imgUrl: ava03,
    },

    {
      description:
        '"Renting from this company made our family trip a breeze. The spacious and clean vehicle accommodated all our needs, and the friendly driver ensured a safe and comfortable journey. My husband and I were thoroughly impressed, and we\'ll definitely be using their services again for our next adventure!"',
      name: "Radha Sharma",
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
              <img
                src={item.imgUrl}
                loading="lazy"
                alt=""
                className="w-25 h-25 rounded-2"
              />

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
