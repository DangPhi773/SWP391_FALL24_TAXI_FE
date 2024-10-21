import React from "react";
import classnames from "classnames";
import {
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Collapse,
} from "reactstrap";
import "./index.css";
import { Link } from "react-router-dom";
import { Button } from "antd";

function IndexNavbar() {
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  return (
    <Navbar className={classnames("navbar", "fixed-top")} expand="lg">
  <Container className="d-flex justify-content-between align-items-center">
    {/* Logo Section */}
    <div className="navbar-translate">
      <NavbarBrand href="/" id="navbar-brand">
        <img src="/logo.png" alt="Taxis Logo" className="logo-img" />
      </NavbarBrand>
    </div>

    {/* Center Navigation Links */}
    <Collapse navbar isOpen={navbarCollapse}>
      <Nav className="mx-auto" navbar>
        <NavItem>
          <NavLink href="/home">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/pages">Pages</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/services">Services</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/contact">Contact</NavLink>
        </NavItem>
      </Nav>
    </Collapse>

    {/* Right Section with Buttons */}
    <div className="right-section d-flex align-items-center">
      <button className="book-btn">Book a Ride</button>
      <button className="login-btn"><NavLink href="/login">Log In</NavLink></button>
    </div>
  </Container>
</Navbar>
  );
}

export default IndexNavbar;