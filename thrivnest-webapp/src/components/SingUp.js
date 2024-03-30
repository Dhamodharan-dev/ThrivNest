import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Login.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser } from '@fortawesome/free-solid-svg-icons';

const Signup = ({ handleShowPassword, showPassword }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://thrivnest.onrender.com/api/signup', { username, password });
            alert('User created successfully');
            setUsername(''); // Clear input fields after successful signup
            setPassword('');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred';
            setMessage(errorMessage);
        }
    };

    const handleTryAgain = () => {
        setMessage('');
        setUsername('');
        setPassword('');
    };

    return (
        <div className='login-main'>
            <form onSubmit={handleSignup} className='login-form'>
                {message ? (
                    <>
                        <h1>{message}</h1>
                        <button className='login-submit' onClick={handleTryAgain}>Try again</button>
                    </>
                ) : (
                    <>
                        <h1>Sign Up</h1>
                        <div className='login-field'>
                            <label className='login-label'>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Username'
                                className='login-input'
                                required
                            />
                            <FontAwesomeIcon icon={faUser} className='login-icons' />
                        </div>
                        <div className='login-field'>
                            <label className='login-label'>Password:</label>
                            <input
                                type={showPassword}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                className='login-input'
                                required
                            />
                            <FontAwesomeIcon icon={faEye} title="Show password" onClick={handleShowPassword} className='login-icons' />
                        </div>
                        <div className='login-btns'>
                            <Link to='/login'><button value="Login" className='login-submit'>Login</button></Link>
                            <input type="submit" className='login-submit' value="Sign Up"></input>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default Signup;
