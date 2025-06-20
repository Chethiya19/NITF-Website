import React, { useEffect } from 'react';
import './Footer.css';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-fadeInUp');

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach(el => {
      el.classList.add('fade-in-hidden');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand / Logo */}
        <div className="footer-brand animate-fadeInUp" style={{animationDelay: '0.1s'}}>
          <h2 className="footer-logo">
            <span className="footer-logo-highlight">NITF</span>
          </h2>
          <p className="footer-tagline">
            Ministry of Finance, Planning and Economics Development 
          </p>
          <a href="https://www.treasury.gov.lk" target="_blank" rel="noopener noreferrer" className="footer-link">
            www.treasury.gov.lk
          </a>
        </div>

        {/* Contact Info */}
        <div className="footer-contact animate-fadeInUp" style={{animationDelay: '0.3s'}}>
          <h5 className="footer-heading">Contact</h5>
          <p><FiMail className="footer-icon" /><a href="mailto:mail@nitf.lk" className="footer-link">mail@nitf.lk</a></p>
          <p><FiPhone className="footer-icon" /><a href="tel:+94112026600" className="footer-link">+94 11 202 6600</a></p>
          <p><FiMapPin className="footer-icon" />95, Chittampalam A Gardiner MW, Colombo 2.</p>
        </div>

        {/* Social Media */}
        <div className="footer-social animate-fadeInUp" style={{animationDelay: '0.5s'}}>
          <h5 className="footer-heading">Follow Us</h5>
          <div className="social-icons">
            <a href="https://www.facebook.com/nitf.lk/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="footer-bottom animate-fadeInUp" style={{animationDelay: '0.7s'}}>
        &copy; 2025 NITF | Developed by Chehtiya Senadheera.
      </div>
    </footer>
  );
}

export default Footer;
