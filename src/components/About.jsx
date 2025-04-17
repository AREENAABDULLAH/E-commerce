import React from 'react';
import './About.css';
import Image from '../assets/imagee.png';  // Ensure correct image path
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  
  const going = () => {
    navigate('/');
  }

  return (
    <div className="about-container">
      <div className="about-content">
        {/* Left Side - Image */}
        <div className="left-side">
          <img src={Image} alt="About Us" className="responsive-image" />
        </div>

        {/* Right Side - Text */}
        <div className="right-side">
          <h1>We provide healthy food for your family.</h1>
          <p>Our story began with a vision to create a unique dining experience that merges fine dining, exceptional service, and a vibrant ambiance. Rooted in the city's rich culinary culture, we aim to honor our local roots while infusing a global palate.</p>
          <p>At our place, we believe that dining is not just about food, but also about the overall experience. Our staff, renowned for their warmth and dedication, strives to make every visit an unforgettable event.</p>
          <button className="white" onClick={going}>More About Us</button>
        </div>
      </div>
    </div>
  );
}

export default About;
