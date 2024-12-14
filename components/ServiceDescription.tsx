import React from 'react';
import './ServiceDescription.css';

const ServiceDescription: React.FC = () => {
  return (
    <section className="service-description">
      <div className="service-description__content">
        <h2 className="service-description__title">Our Services</h2>
        <p className="service-description__text">
        At our clinic, we specialize in comprehensive hematology and blood analysis services. Our team of experienced healthcare professionals is dedicated to providing accurate diagnostics and personalized treatment plans. We utilize state-of-the-art technology to ensure the highest quality of care, helping you maintain optimal health and well-being.
        </p>
      </div>
      <div className="separator">
        <hr className="separator__line" />
      </div>
    </section>
  );
};

export default ServiceDescription;