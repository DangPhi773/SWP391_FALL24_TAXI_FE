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
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { toast } from "react-toastify"; 

function IndexNavbar() {
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/");
  };

  const handleBookRide = () => {
    if (token && role === "STUDENT") {
      navigate("/create-ride"); 
    } else {
      toast.error("You must be logged in as STUDENT to access this page."); 
    }
  };

  const handleJoinRide = () => {
    if (token && role === "STUDENT") {
      navigate("/join-ride"); 
    } else {
      toast.error("You must be logged in as STUDENT to access this page."); 
    }
  };

  const handleMyRides = () => {
    if (token && role === "STUDENT") {
      navigate("/my-rides"); 
    } else {
      toast.error("You must be logged in as STUDENT to access this page."); 
    }
  };


  return (
    <Navbar className={classnames("navbar", "fixed-top")} expand="lg">
      <Container className="d-flex justify-content-between align-items-center">
        <div className="navbar-translate">
          <NavbarBrand href="/" id="navbar-brand">
            <img src="/logo.png" alt="Taxis Logo" className="logo-img" />
          </NavbarBrand>
        </div>

        <Collapse navbar isOpen={navbarCollapse}>
          <Nav className="mx-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/services">Services</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact">Contact</NavLink>
            </NavItem>
          </Nav>
        </Collapse>

        <div className="right-section d-flex align-items-center">
        <button className="book-btn" onClick={handleMyRides}>
            My Rides
          </button>
        <button className="book-btn" onClick={handleJoinRide}>
            Join a Ride
          </button>
          <button className="book-btn" onClick={handleBookRide}>
            Book a Ride
          </button>

          {token ? (
            <>
              
              <button className="login-btn" onClick={handleLogout}>
                Log Out
              </button>
              <span className="welcome-message">
                Hello, {username ? username : "User"}
              </span>
            </>
          ) : (
            <button className="login-btn">
              <NavLink href="/login">Log In</NavLink>
            </button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
