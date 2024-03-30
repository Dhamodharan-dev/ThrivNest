import '../CSS/Login.css'
import { Link } from 'react-router-dom'
import { faEye, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

function Login({ navigate, handleSubmit, message, setMessage, username, setUsername, password, setPassword, handleShowPassword, showPassword }) {

  const handleTryAgain = () => {
    setMessage('');
  };

  const isloggedin = localStorage.getItem('loggedIn')
  const checkUsername = localStorage.getItem('username')
  useEffect(() => {
    if (isloggedin) {
      if (checkUsername==="admin") {
        navigate('/admin');
      } else {
        navigate('/dashboard'); // Navigate to the login page if not logged in
      }
    }
  }, [isloggedin, checkUsername, navigate]);

  return (
    <div className='login-main'>
      <form className='login-form' onSubmit={handleSubmit}>
        {message ? (
          <>
            <h1>{message}</h1>
            <button className='login-submit' onClick={handleTryAgain}>Try again</button>
          </>
        ) : (
          <>
            <h1>Login</h1>
            <div className='login-field'>
              <label htmlFor="username" className='login-label'>Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='login-input'
                placeholder='Username'
                required
              />
              <FontAwesomeIcon icon={faUser} title="Profile" className='login-icons'/>
            </div>
            <div className='login-field'>
              <label htmlFor="password" className='login-label'>Password:</label>
              <input
                type={showPassword}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='login-input'
                placeholder='Password'
                required
              />
              <FontAwesomeIcon icon={faEye} title="Show password" onClick={handleShowPassword} className='login-icons'/>
            </div>
            <div className='login-btns'>
              <input type="submit" value="Login" className='login-submit'></input>
              <Link to='/signup'><button className='login-submit'>Sign up</button></Link>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

export default Login