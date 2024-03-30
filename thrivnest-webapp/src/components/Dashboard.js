import React, { useEffect } from 'react';
import '../CSS/Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard({ username, handleLogout, properties, handleEditProperty, handleDeleteProperty }) {
  const navigate = useNavigate(); // Use the useNavigate hook to get the navigate function

  const isloggedin = localStorage.getItem('loggedIn')
  const checkUsername = localStorage.getItem('username')
  useEffect(() => {
    if (!isloggedin) {
      navigate('/login'); // Navigate to the login page if not logged in
      if (checkUsername!=="admin") {
        navigate('/dashboard'); // Navigate to the login page if not logged in
      }
      navigate('/admin')
    }
  }, [isloggedin, checkUsername, navigate]);

  return (
    <div className='dashboard-page'>
      <div className='main-dashboard'>
        <div className='dashboard-profile'>
          <img src='./image/profile.png' alt='profile' className='dashboard-profile-pic' />
          <p>{username}</p>
        </div>
        <Link to='/postproperty'><button className='post-btn'>Post property</button></Link>
        <button onClick={handleLogout} className='login-submit'>Logout</button>
      </div>
      <div className='your-props-container'>
        <h1>Your Properties</h1>
        <div className='your-props'>
          <div className='prop-list'>
            {properties.filter(property => property.username === username).length === 0 && (
              <p className='prop-p'>No properties found.</p>
            )}

            {properties.map((property) => (
              property.username === username ? (
                <div key={property._id} className='prop-items'>
                  <div className='prop-img-div'>
                    {property.image && 
                    <img src={`https://thrivnest.onrender.com/${property.image}`} alt='Property' className='prop-img' />}
                  </div>
                  <div className='prop-details'>
                    {property.type.length ? (<h3>Type: {property.type}</h3>) : (<h3>Type: Other</h3>)}
                    {property.price !== "" ? (<p>Price: {property.price}</p>) : <p>Price: Not Available</p>}
                    {property.address.length ? (<p>Address: {property.address}</p>) : <p>Address: Not Available</p>}
                    {property.owner ? (<p>Owner: {property.owner}</p>) : <p>Owner: Not Available</p>}
                    {property.contact ? (<p>Contact: {property.contact}</p>) : <p>Contact: Not Available</p>}
                  </div>
                  <div className='update-btns'>
                    <button onClick={() => handleEditProperty(property._id)} className='login-submit'>Edit</button>
                    <button onClick={() => handleDeleteProperty(property._id)} className='login-submit'>Delete</button>
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
