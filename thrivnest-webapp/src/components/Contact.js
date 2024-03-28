import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Contact.css';

function Contact() {
  return (
    <footer className='footer' id='footer'>
      <div className='contact-div'>
        <div className='contact'>
          <h1 className='f-h1'>Contact</h1>
          <div className='footer-box'>
            <p><FontAwesomeIcon icon={faPhone} title="Phone" />044-43857893</p>
            <p><FontAwesomeIcon icon={faEnvelope} title="Email" />thrivnestcontact@gmail.com</p>
            <p><FontAwesomeIcon icon={faGlobe} title="Website" /><a href="https://thrivnest.com/contact">thrivnest.com/contact</a></p>
          </div>
        </div>
        <div className='company'>
          <h1 className='f-h1'>Company</h1>
          <div className='footer-box'>
            <p>About us</p>
            <p>Terms & Conditions</p>
            <p>Privacy policy</p>
            <p><a href="mailto:someone@example.com" target="_blank" rel="noopener noreferrer">Feedback</a></p>
          </div>
        </div>
        <div className='Follow-us'>
          <h1 className='f-h1'>Follow Us</h1>
          <div className='footer-box' id='follow-box'>
            <p id='insta'><FontAwesomeIcon icon={faInstagram} title="Instagram" /></p>
            <p id='fbook'><FontAwesomeIcon icon={faFacebook} title="Facebook" /></p>
            <p id='twt'><FontAwesomeIcon icon={faTwitter} title="Twitter" /></p>
            <p id='yt'><FontAwesomeIcon icon={faYoutube} title="YouTube" /></p>
            <p id='lin'><FontAwesomeIcon icon={faLinkedin} title="LinkedIn" /></p>
          </div>
        </div>
        </div>
      <img src='./image/contact.png' alt='Happy family' className='contact-img' />
    </footer>
  );
}

export default Contact;
