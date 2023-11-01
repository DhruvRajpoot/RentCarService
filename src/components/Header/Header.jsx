import React, { useContext, useRef } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../../styles/header.css";
import { MyContext } from "../../context/context";
import carData from "../../assets/data/carData";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menubglayerRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    if (window.innerWidth > 768) return;
    if (menuRef.current.style.right === "-100%") {
      menubglayerRef.current.style.display = "block";
      menuRef.current.style.right = "0";
    } else {
      menubglayerRef.current.style.display = "none";
      menuRef.current.style.right = "-100%";
    }
  };

  const { setFilterCarData } = useContext(MyContext);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.replace(/\s+/g, "");
    if (searchQuery.length === 0) {
      setFilterCarData(carData);
    } else {
      const afterFilter = carData.filter((item) => {
        return item.carName.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilterCarData(afterFilter);
      if (location.pathname !== "/cars") {
        navigate("/cars");
      }
    }
  };

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i class="ri-phone-fill"></i>
                  <a href="tel:+1234567890">+123 456 7890</a>
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                <Link to="#" className=" d-flex align-items-center gap-1">
                  <i class="ri-login-circle-line"></i> Login
                </Link>

                <Link to="#" className=" d-flex align-items-center gap-1">
                  <i class="ri-user-line"></i> Register
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i class="ri-car-line"></i>
                    <span>
                      Rent Car <br /> Service
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Bhopal</h4>
                  <h6>Madhya Pradesh, India</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Everyday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span
              className="mobile-logo"
              onClick={() => {
                navigate("/home");
              }}
            >
              <span className="mobile-icon">
                <i class="ri-car-line"></i>
              </span>
              Rent Car Service
            </span>
            <span className="mobile__menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>

            <div
              className="menu-bg-layer"
              style={{ display: "none" }}
              ref={menubglayerRef}
            ></div>
            <div className="menu" style={{ right: "-100%" }} ref={menuRef}>
              <div className="menu-close-btn" onClick={toggleMenu}>
                <i class="ri-close-line"></i>
              </div>
              {navLinks.map((item, index) => (
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive ? "nav__active nav__item" : "nav__item"
                  }
                  key={index}
                  onClick={toggleMenu}
                >
                  {item.display}
                </NavLink>
              ))}
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search Cars"
                  name="search"
                  onChange={handleSearch}
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
