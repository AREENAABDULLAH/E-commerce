import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import your Home CSS
import HomeImage from '../assets/img.jpg'; // Import your image

const Home = () => {
    const navigate = useNavigate();

    const handleOrderNow = () => {
        navigate('/products');
    };

    return (
        <div className="home-container">
            {/* Image directly with text on top */}
            <img src={HomeImage} alt="Home" className="home-image" />

            <div className="overlay-text">
                <h2>Welcome to Our Service</h2>
                <p>Experience the best quality and service.</p>
                <button className="order-button" onClick={handleOrderNow}>
                    Order Now
                </button>
            </div>
        </div>
    );
};

export default Home;
