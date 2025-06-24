import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import nonm from '../assets/nonm1.jpg';
import nonm2 from '../assets/nonm2.jpg';


const containerStyle = {
  paddingTop: '100px',
  paddingBottom: '50px',
  backgroundColor: '#f8f9fa',
};

const nonmStyle = {
  width: '500px',
  height: '600px',
};

function NonMotor() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div style={containerStyle} className="container">
      <h2 className="text-center mb-4" data-aos="fade-up">Non-Motor Insurance</h2>

      <div className="row align-items-center mb-5" data-aos="fade-up">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src={nonm} alt="Nonm" style={nonmStyle}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-6">
          <div className="mb-4">
            <h4>To Whom:</h4>
            <p className="lead">
              <strong></strong> General Insurance Cover for all the Government Bodies which is mandatory to them with all the necessary benefits.
            </p>
          </div>

          <div>
            <h4>We are providing following insurance covers:</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <span role="img" aria-label="fire">🔥</span> Fire Insurance
              </li>
              <li className="list-group-item">
                <span role="img" aria-label="construction">🏗️</span> Engineering Insurance - CAR, EAR, Electronic Equipment, CPM, etc.
              </li>
              <li className="list-group-item">
                <span role="img" aria-label="ship">🚢</span> Marine Insurance - Cargo, Hull & Machinery, Fishing Boat Insurance
              </li>
              <li className="list-group-item">
                <span role="img" aria-label="hospital">🏥</span> Health Insurance - Surgical & Hospitalization
              </li>
              <li className="list-group-item">
                <span role="img" aria-label="airplane">✈️</span> Travel Insurance
              </li>
              <li className="list-group-item">
                <span role="img" aria-label="box">📦</span> Miscellaneous Insurance - Personal Accident, Money Insurance, Banker’s Indemnity, Public Liability, Burglary, WCI, etc.
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div className="mb-5" data-aos="fade-up">
        <h4 className="text-center mb-4">
          <span role="img" aria-label="document">📝</span> Claim Procedure
        </h4>
        <div className="row g-4">
          {[
            {
              step: "01",
              text: "NITF has employed an excellent team of reputed assessors throughout the island."
            },
            {
              step: "02",
              text: "When a claim is intimated, prompt actions are taken to assess the damaged properties and expedite claim settlement."
            },
            {
              step: "03",
              text: "Our staff is well trained to provide customer-friendly claim settlement with service excellence."
            }
          ].map((stepItem, index) => (
            <div className="col-md-4" key={index}>
              <div className="card h-100 shadow-sm text-center border-info" data-aos="zoom-in">
                <div className="card-body">
                  <div
                    className="rounded-circle bg-info text-white mx-auto mb-3"
                    style={{ width: '60px', height: '60px', lineHeight: '60px', fontSize: '1.5rem' }}
                  >
                    {stepItem.step}
                  </div>
                  <p className="card-text">{stepItem.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="row align-items-center my-5">
        <div className="col-md-6 text-center" data-aos="zoom-in">
          <img
            src={nonm2}
            alt="Nonm2"
            className="img-fluid rounded shadow"
            style={{ maxHeight: '300px' }}
          />
        </div>

        <div className="col-md-6" data-aos="fade-left">
          <div className="bg-light p-4 rounded shadow-sm h-100">
            <h4 className="mb-3 text-center">
              <span role="img" aria-label="telephone">📞</span> Contact Us
            </h4>
            <div className="row text-center">
              <div className="col-12 mb-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">Non-Motor Insurance Underwriting</h5>
                    <p><span role="img" aria-label="phone">📞</span> +94 112 026 600</p>
                    <p><span role="img" aria-label="mobile">📱</span> +94 702 020 247</p>
                    <p><span role="img" aria-label="fax">📠</span> +94 112 421 733</p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">Non-Motor Insurance Claims</h5>
                    <p><span role="img" aria-label="phone">📞</span> +94 112 026 600</p>
                    <p><span role="img" aria-label="mobile">📱</span> +94 702 020 221</p>
                    <p><span role="img" aria-label="fax">📠</span> +94 112 421 765</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NonMotor;
