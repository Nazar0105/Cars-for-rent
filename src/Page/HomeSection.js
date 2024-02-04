// HomeSection.js
import React from 'react';

const HomeSection = ({ title, description }) => {
  return (
    <section className="home-section">
      <div className="content">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default HomeSection;
