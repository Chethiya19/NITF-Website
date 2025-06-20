import React, { useState, useEffect } from 'react';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const buttonStyle = {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#0d6efd',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    fontSize: '28px',
    fontWeight: 'bold',
    lineHeight: '50px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(13, 110, 253, 0.5)',
    display: visible ? 'inline-flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    zIndex: 1000,
  };

  return (
    <button
      onClick={scrollToTop}
      style={buttonStyle}
      aria-label="Scroll to top"
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = '#0056b3';
        e.currentTarget.style.transform = 'scale(1.2)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = '#0d6efd';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      ↑
    </button>
  );
}

export default ScrollToTopButton;
