import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";
import "../styles/car-selection.css";

const CarListing = () => {
  const [sort, setSort] = useState("none");
  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const sortedCarData = carData.sort((a, b) => {
    if (sort === "low") {
      return a.price - b.price;
    } else if (sort === "high") {
      return b.price - a.price;
    } else {
      return a.id - b.id;
    }
  });

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select className="selection" onChange={handleSort}>
                  <option value="none">Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {sortedCarData.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
