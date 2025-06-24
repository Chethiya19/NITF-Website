import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

function Reinsurance() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const sectionStyle = {
    paddingTop: '80px',
    paddingBottom: '60px',
    backgroundColor: '#f0f4f7',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '30px',
  };

  const iconStyle = {
    fontSize: '1.5rem',
    color: '#0d6efd',
    marginRight: '10px',
  };

  const headingStyle = {
    fontWeight: 'bold',
    color: '#003366',
  };

  return (
    <div style={sectionStyle} className="container">
      <h2 className="text-center mb-5" style={headingStyle} data-aos="fade-down">Reinsurance</h2>
      <div className="row" data-aos="fade-up">
        <div className="col-lg-12">
          <div style={cardStyle}>
            <p>
              As the sole reinsurer in Sri Lanka, <strong>NITF</strong> plays a crucial role in maintaining financial stability by accepting both treaty and facultative reinsurance under a mandatory <strong>30% cession</strong> from General Insurance companies. Our reinsurance portfolio includes property, engineering, marine, motor, and other general insurance.
            </p>
          </div>
        </div>
      </div>

      {/* Treaty Reinsurance */}
      <h4 className="mt-5" style={headingStyle} data-aos="fade-right">Treaty Reinsurance</h4>
      <div className="row" data-aos="fade-up">
        <div className="col-lg-12">
          <div style={cardStyle}>
            <p>
              Treaty reinsurance involves reinsurance of a <strong>portfolio of policies</strong> offering stable coverage.
              NITF offers treaty reinsurance to:
            </p>
            <ul>
              <li><strong>General Insurance Companies</strong>: Accepting 30% compulsory cession for risk management and portfolio stability.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Facultative Reinsurance */}
      <h4 className="mt-5" style={headingStyle} data-aos="fade-right">Facultative Reinsurance</h4>
      <div className="row" data-aos="fade-up">
        <div className="col-lg-12">
          <div style={cardStyle}>
            <p>
              Facultative reinsurance is provided <strong>case-by-case</strong> for specific, large, or unique risks:
            </p>
            <ul>
              <li>Helps insurers cover risks beyond standard limits.</li>
              <li>Fills coverage gaps excluded by treaty reinsurance.</li>
              <li>Allows reinsurers to participate in new markets short-term.</li>
              <li>Treaty reinsurers can use facultative reinsurance to minimize risk.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <h4 className="mt-5" style={headingStyle} data-aos="fade-right">Benefits</h4>
      <div className="row" data-aos="fade-up">
        {[
          'Covers loss due to strike, riot, civil commotion beyond fund limits.',
          'Increases underwriting capacity of the insurer.',
          'Protects against catastrophic losses and stabilizes profits.',
          'Allows exiting from territories or insurance lines.',
          'Reduces unearned premium reserve.'
        ].map((benefit, index) => (
          <div className="col-md-6" key={index}>
            <div style={cardStyle} className="d-flex align-items-start">
              <span style={iconStyle}><i className="bi bi-check-circle-fill"></i></span>
              <span>{benefit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Info */}
      <h4 className="mt-5" style={headingStyle} data-aos="fade-right">Contact Us</h4>
      <div className="row" data-aos="fade-up">
        <div className="col-lg-12">
          <div style={cardStyle}>
            <p><strong>Phone:</strong> +94 112 026 600</p>
            <p><strong>Hotline:</strong> +94 112 447 072</p>
            <p><strong>Fax:</strong> +94 114 700 988</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reinsurance;
