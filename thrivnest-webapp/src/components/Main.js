import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Header from './Header';
import PropertySection from './PropertySection';
import Contact from './Contact';
import Missing from './Missing';
import Login from './Login';
import Signup from './SingUp';
import Dashboard from './Dashboard';
import PostProperty from './PostProperty';
import EditProperty from './EditProperty';

function Main() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState('password');
  const [properties, setProperties] = useState([]);
  const [propertyId, setPropertyId] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', username);
        navigate('/dashboard');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while logging in');
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/property');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [navigate]);

  useEffect(() => {
    setDisplayName(localStorage.getItem('username'));
    const storedLoggedIn = localStorage.getItem('loggedIn');
    if (storedLoggedIn) {
      setLoggedIn(true);
    }
  }, [handleSubmit]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    setLoggedIn(false);
    navigate('/login');
  };

  const handleShowPassword = () => {
    setShowPassword(showPassword === 'password' ? 'text' : 'password');
  };

  const handleEditProperty = (propertyId) => {
    setPropertyId(propertyId);
    navigate(`/editproperty/${propertyId}`);
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      await axios.delete(`http://localhost:5000/api/property/${propertyId}`);
      setProperties(properties.filter(property => property._id !== propertyId));
      alert('Property deleted successfully');
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
    <div id='main'>
      <Header 
        loggedIn={loggedIn} 
        handleLogout={handleLogout} 
      />
      <Routes>
        <Route path='/'
         element={<Home 
         loggedIn={loggedIn} />} 
        />
        <Route
          path='/properties'
          element={<PropertySection 
          loggedIn={loggedIn} 
          navigate={navigate} 
          properties={properties}/>}
        />
        <Route 
          path='/contact' 
          element={<Contact />} 
        />
        <Route
          path='/dashboard'
          element={<Dashboard 
          loggedIn={loggedIn} 
          username={displayName} 
          handleLogout={handleLogout} 
          navigate={navigate} 
          properties={properties} 
          handleEditProperty={handleEditProperty} 
          handleDeleteProperty={handleDeleteProperty} />}
        />
        <Route 
          path="/editproperty/:id" 
          element={<EditProperty 
          properties={properties} 
          propertyId={propertyId} 
          username={displayName} 
          navigate={navigate} />} 
        />
        <Route
          path='/postproperty'
          element={<PostProperty 
          loggedIn={loggedIn} 
          navigate={navigate} 
          username={displayName} />}
        />
        <Route
          path='/login'
          element={<Login 
          handleSubmit={handleSubmit} 
          message={message} 
          setMessage={setMessage} 
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword} 
          displayName={displayName} 
          setDisplayName={setDisplayName} 
          handleShowPassword={handleShowPassword} 
          showPassword={showPassword} />}
        />
        <Route
          path='/signup'
          element={<Signup 
          handleShowPassword={handleShowPassword} 
          showPassword={showPassword} />}
        />
        <Route path='*' element={<Missing />} />
      </Routes>
    </div>
  );
}

export default Main;
