import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Home.css';
import aboutImage from '../assets/about-image.png';
import ScrollToTopButton from './ScrollToTopButton';


import AOS from 'aos';
import 'aos/dist/aos.css';

import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const sliderImages = [
  {
    src: image1,
    alt: 'Image 1',
    caption: 'National Insurance Trust Fund',
    text: '100% government ownered entity to provide affordable insurance scheme for all needy people of the nation.',
    link: '/',
  },
  {
    src: image2,
    alt: 'Image 2',
    caption: 'Agrahara Insurance',
    text: 'Ensure the health of the Public Servents and their families. Upgrade to our gold scheme for better benifits.',
    link: '/agrahara-login',
  },
  {
    src: image3,
    alt: 'Image 3',
    caption: 'Motor Insurance',
    text: 'Vehicle insurance policy dedicated towards Public Servants. Let us hold the burden,so you can enjoy your journey.',
    link: '/motor',
  },
];


function Home() {
  React.useEffect(() => {
    AOS.init({ duration: 1000 });

    const carousel = document.getElementById('homeCarousel');
    const captions = carousel.querySelectorAll('.carousel-caption');

    function handleSlide(e) {
      // Remove animation class from all captions
      captions.forEach(caption => caption.classList.remove('animate-slideup'));

      // Add animation class to the active slide's caption
      const activeItem = carousel.querySelector('.carousel-item.active');
      if (activeItem) {
        const activeCaption = activeItem.querySelector('.carousel-caption');
        if (activeCaption) {
          // Trigger reflow to restart animation
          activeCaption.classList.remove('animate-slideup');
          void activeCaption.offsetWidth; // reflow
          activeCaption.classList.add('animate-slideup');
        }
      }
    }

    // On initial load, run animation for the first slide caption
    handleSlide();

    // Listen for Bootstrap's slide event
    carousel.addEventListener('slid.bs.carousel', handleSlide);

    return () => {
      carousel.removeEventListener('slid.bs.carousel', handleSlide);
    };
  }, []);

  return (
    <>
      {/* ✅ FULL-WIDTH Carousel with 3s auto-slide */}
      <div
        id="homeCarousel"
        className="carousel slide carousel-fade full-width-carousel carousel-wrapper"
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >
        <div className="carousel-inner">
          {sliderImages.map(({ src, alt, caption, text, link }, index) => (
            <div key={index} className={`carousel-item${index === 0 ? ' active' : ''}`}>
              <div className="position-relative">
                <img
                  src={src}
                  className="d-block w-100"
                  alt={alt}
                  style={{ height: '600px', objectFit: 'cover' }}
                />
                <div
                  className={`carousel-caption text-start ${index === 0 ? 'animate-slideup' : ''}`}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '50px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
                    color: '#fff',
                  }}
                >
                  <div style={{ maxWidth: '600px' }}>
                    <h2 className="display-4 fw-bold mb-3">{caption}</h2>
                    <p className="lead mb-4">{text}</p>
                    <Link to={link} className="btn btn-primary btn-lg shadow-sm custom-hover-btn">
                      Discover More <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-100 py-4" style={{ backgroundColor: '#c2bcbb', paddingTop: '30px' }}>
        <h2 className="text-center mb-0 blinking-text">
          Welcome to the National Insurance Trust Fund
        </h2>
      </div>

      {/* ✅ PAGE CONTENT */}
      <main className="container-fluid my-5">
        {/* ✅ Services Section */}
        <section id="services" className="section shadow-sm mb-5 p-4 rounded" data-aos="fade-up">
          <h3 className="section-title">Our Services</h3>

          <div className="scroll-wrapper">
            <div className="scrolling-cards">
              {Array(2).fill([
                { icon: 'bi-heart-pulse', title: 'Agrahara', desc: 'Health insurance for government employees' },
                { icon: 'bi-car-front', title: 'Motor Insurance', desc: 'Comprehensive vehicle protection' },
                { icon: 'bi-box', title: 'Non Motor', desc: 'Property & liability coverage' },
                { icon: 'bi-globe', title: 'Reinsurance', desc: 'Risk coverage for insurers' },
                { icon: 'bi-shield-shaded', title: 'SRCC & TC', desc: 'Coverage for strikes, riots & terrorism' },
              ]).flat().map(({ icon, title, desc }, index) => (
                <div className="service-card text-center shadow-sm" key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                  <i className={`bi ${icon} fs-1 text-primary mb-3`}></i>
                  <h5>{title}</h5>
                  <p className="mb-0">{desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ✅ About Section */}
        <section id="about" style={{ scrollMarginTop: '70px' }} className="section shadow-sm mb-5 p-4 rounded" data-aos="fade-up">
          <h3 className="section-title mb-4 text-center">About Us</h3>

          <div className="row align-items-center">
            {/* Left Column (Text) */}
            <div className="col-md-6" style={{ paddingLeft: '50px' }}>
              <div className="about-text" style={{ textAlign: 'justify' }} data-aos="fade-right">
                <h3 style={{ marginBottom: '30px' }}>
                  Providing You With a Team of Professionals Whose Common Focus Is Medical Insurance.
                </h3>
                <p>
                  The National Insurance Trust Fund Board was established by the National Insurance Trust
                  Fund Act, No. 28 of 2006. Its contribution towards the economy encompasses the
                  provision of reinsurance, strike, riot, civil commotion and Agrahara medical insurance,
                  health insurance, other forms of general insurance including and crop insurance covers.
                  NITF has extended its services to the general public with regard to the provision of all
                  classes of general insurance.
                </p>
                <div className="d-flex gap-4 mt-4">
                  <div className="text-center">
                    <i className="bi bi-shield-lock-fill mb-2" style={{ fontSize: '3rem', color: '#0d6efd' }}></i>
                    <p className="mb-0 fw-semibold" style={{ fontSize: '1.1rem' }}>100% Government Security</p>
                  </div>
                  <div className="text-center" style={{ paddingLeft: '100px' }}>
                    <i className="bi bi-people-fill mb-2" style={{ fontSize: '3rem', color: '#0d6efd' }}></i>
                    <p className="mb-0 fw-semibold" style={{ fontSize: '1.1rem' }}>Highly Experienced Team</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Image) */}
            <div className="col-md-6 text-center" style={{ paddingLeft: '60px' }} data-aos="fade-left">
              <img
                src={aboutImage}
                alt="About us"
                className="img-fluid rounded"
                style={{ maxHeight: '450px', objectFit: 'cover', maxWidth: '1000px' }}
              />
            </div>
          </div>
        </section>

        {/* ✅ Contact Section */}
        <section id="contact" style={{ scrollMarginTop: '70px' }} className="section shadow-sm mb-5 p-4 rounded" data-aos="fade-up">
          <h3 className="section-title mb-4">Contact Us</h3>
          <div className="row">

            {/* Left Column: Google Map */}
            <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-right">
              <div className="map-responsive rounded shadow-sm" style={{ height: '400px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2355.032737731433!2d79.84552268251433!3d6.929135872936708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2591af1166ee5%3A0x11b69b17744b2eec!2sNational%20Insurance%20Trust%20Fund%20(NITF)!5e0!3m2!1sen!2slk!4v1749452701544!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NITF Location Map"
                />
              </div>

            </div>

            {/* Right Column: Contact Form */}
            <div className="col-md-6" data-aos="fade-left">
              <div className="border p-4 rounded shadow-sm">
                <form className="contact-form needs-validation" noValidate>
                  <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">Name</label>
                    <input type="text" className="form-control" id="nameInput" required />
                    <div className="invalid-feedback">Please enter your name.</div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email</label>
                    <input type="email" className="form-control" id="emailInput" required />
                    <div className="invalid-feedback">Please enter a valid email.</div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="messageInput" className="form-label">Message</label>
                    <textarea className="form-control" id="messageInput" rows="4" required></textarea>
                    <div className="invalid-feedback">Please enter a message.</div>
                  </div>

                  <button type="submit" className="btn btn-primary">Send Message</button>
                </form>
              </div>
            </div>

          </div>
        </section>

        <ScrollToTopButton />

      </main>
    </>
  );
}

export default Home;
