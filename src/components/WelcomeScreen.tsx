import React, { useEffect } from 'react';
import './WelcomeScreen.css'; // Add CSS for animations
import logo from '../images/logo.png'; // Import the logo image

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // Hide the welcome screen after 10 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 10000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Handle click event to skip the welcome screen
  const handleClick = () => {
    onComplete();
  };

  return (
    <div className="welcome-container" onClick={handleClick}>
      <img src={logo} alt="SwipeMove Logo" className="welcome-logo" />
      <h1 className="welcome-text">Welcome to SwipeMove</h1>
      <p className="welcome-subtext">Find your dream home with a swipe</p>
    </div>
  );
};

export default WelcomeScreen;