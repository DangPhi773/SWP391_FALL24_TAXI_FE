import { Layout } from "antd";
import { Container } from "reactstrap";
import './index.css';





function Footer() {
  const { Footer } = Layout;
  return (
    <div className="footer-container">
      {/* Email Signup Section */}
      <div className="email-signup">
        <input type="email" placeholder="Your Email" className="email-input" />
        <button className="signup-btn">Sign Up</button>
      </div>

      {/* Footer Links */}
      <div className="footer-content">
        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">About Us</a></li>
            <li><a href="/">Our Services</a></li>
            <li><a href="/">Latest Blog</a></li>
            <li><a href="/">Contact Us</a></li>
          </ul>
        </div>

        {/* Popular Links */}
        <div className="footer-column">
          <h3>Popular Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">About Us</a></li>
            <li><a href="/">Our Services</a></li>
            <li><a href="/">Latest Blog</a></li>
            <li><a href="/">Contact Us</a></li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div className="footer-column">
          <h3>Get In Touch</h3>
          <p>
            Lot E2a-7, Street D1, D. D1,<br />
            Long Thanh My, Thu Duc City, Ho Chi Minh City, Vietnam
          </p>
          <p>Email: taxis@gmail.com</p>
          <p>Phone: +012 345 67890</p>
        </div>

        {/* Follow Us */}
        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="/"><i className="fab fa-twitter"></i></a>
            <a href="/"><i className="fab fa-facebook-f"></i></a>
            <a href="/"><i className="fab fa-linkedin-in"></i></a>
            <a href="/"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;