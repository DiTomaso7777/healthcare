import React from 'react';
import './ServiceDescription.css';

const ServiceDescription: React.FC = () => {
  return (
    <section className="service-description">
      <div className="service-description__content">
        <h2 className="service-description__title">Our Services</h2>
        <p className="service-description__text">
          We offer a wide range of services to meet your needs. Our team of professionals is dedicated to providing top-quality solutions to help you achieve your goals.
        </p>
      </div>
      <div className="separator">
        <hr className="separator__line" />
      </div>
    </section>
  );
};

export default ServiceDescription;