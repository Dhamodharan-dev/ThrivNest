import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Header.css';
import { Link } from 'react-router-dom';

function Header({ loggedIn }) {
  const [hamburger, setHamburger] = useState(faBars);
  
  const handleMenu = () => {
    setHamburger((prevHamburger) => (prevHamburger === faBars ? faX : faBars));
  };

  const handleItemClick = () => {
    if (hamburger === faX) {
      setHamburger(faBars)
    }
  };

  let navBarId = 'nav-bar';
  if (hamburger === faBars) {
    navBarId = 'closed';
  }

  const isLogin = loggedIn ? '/properties' : '/login'

  return (
    <div className='header'>
      <Link to='/'><img src='./image/TNlogo.png' className='logo' alt='ThrivNestLogo'/></Link>
      <nav className="nav-bar" id={navBarId}>
        <li className='nav-list' onClick={handleItemClick}><Link to='/'>Home</Link></li>
        <li className='nav-list' onClick={handleItemClick}><Link to={isLogin}>Properties</Link></li>
        <li className='nav-list' onClick={handleItemClick}><Link to='/contact'>Contact</Link></li>
        {loggedIn ? (
          <Link to='/dashboard'><li className='nav-list' onClick={handleItemClick}>
          <div className="profile-container">
            <img src='./image/profile.png' className='profile-img' alt='Profile'/>
            <span className="profile-text">Profile</span>
          </div>
        </li></Link> 
        ) : (
          <li className='nav-list' onClick={handleItemClick}><Link to='/login'className='login-btn'>Login</Link></li>
        )}
      </nav>
      <div id='hamburger-menu' onClick={handleMenu}><FontAwesomeIcon icon={hamburger} /></div>
    </div>
  );
}

export default Header;
