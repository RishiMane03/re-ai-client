import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import backgroundVideo from './paper-planes-background.mp4';
import flowerLogo2 from '../../assets/A-2.png'

const LandingPage = () => {
    const navigate = useNavigate(); 
  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="video-overlay">
        <div className='main'>
            <nav className='navBar'>
                <div className='leftSide'>
                    <img 
                        src={flowerLogo2}
                        alt='logo'
                    />
                    <p onClick={() => navigate('/')}>AiHub</p>
                </div>
                <div className='rightSide'>
                    <span>|</span>
                    <p onClick={() => navigate('/dashboard')}>Dashboard</p>
                </div>
            </nav>  
            <section className='btmSection'>
                <div className='bottom'>
                    <p>From Heart to AI, <br/>Solutions with Soul</p>
                    <p className='slogan'>Your AI Companion for Every Task</p>
                </div>
                <div className='footerBtn'>
                    <p onClick={() => navigate('/dashboard')}>GET STARTED</p> 
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
