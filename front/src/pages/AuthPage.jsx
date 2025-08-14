import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  // --- STATE MANAGEMENT ---
  const [isLogin, setIsLogin] = useState(true); // Toggles between Login and Signup form
  const [email, setEmail] = useState(''); // Holds the email input
  const [password, setPassword] = useState(''); // Holds the password input
  const [confirmPassword, setConfirmPassword] = useState(''); // Holds the confirm password input
  const [loading, setLoading] = useState(false); // Used to disable buttons during API calls
  const [message, setMessage] = useState(''); // Displays success or error messages to the user

  const navigate = useNavigate(); // Hook from React Router for programmatic navigation
// front/src/pages/AuthPage.jsx


  // --- FORM SUBMISSION LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default browser form submission (which causes a page reload)
    setLoading(true); // Disable buttons
    setMessage(''); // Clear any old messages

    if (isLogin) {
      // --- LOGIN LOGIC ---
      try {
        // OAuth2 expects form data (key=value&key=value), not JSON
        const formData = new URLSearchParams();
        formData.append('username', email); // The standard requires the key to be 'username'
        formData.append('password', password);

        // Send the login request to the backend
        const response = await axios.post('http://127.0.0.1:8000/login', formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        // If successful, save the token to browser storage and redirect to the dashboard
        localStorage.setItem('token', response.data.access_token);
        navigate('/dashboard');

      } catch (error) {
        // If the API call fails, display the error message from the backend
        const errorMsg = error.response ? error.response.data.detail : "Login failed.";
        setMessage(errorMsg);
      } finally {
        setLoading(false); // Re-enable buttons
      }
    } else {
      // --- SIGNUP LOGIC ---
      // First, check if passwords match on the frontend
      if (password !== confirmPassword) {
        setMessage("Passwords do not match!");
        setLoading(false);
        return;
      }

      try {
        // Send the signup request with JSON data
        await axios.post('http://127.0.0.1:8000/signup', {
          email,
          password,
          confirm_password: confirmPassword
        });

        // On success, show a message and switch to the login form
        setMessage("Signup successful! Please login.");
        setIsLogin(true);
        // Clear the form fields for a better user experience
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        const errorMsg = error.response ? error.response.data.detail : "Signup failed.";
        setMessage(errorMsg);
      } finally {
        setLoading(false);
      }
    }
  };

  // --- INLINE STYLES ---
  // A collection of style objects for a modern, dark-themed UI
  const styles = {
    wrapper: {
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #12151e, #1e222d)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Segoe UI', Roboto, sans-serif",
    },
    card: {
      backgroundColor: '#1e222d',
      padding: '40px 50px',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
      width: '380px',
      textAlign: 'center',
    },
    toggle: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px',
    },
    toggleBtn: (active) => ({
      flex: 1,
      padding: '10px',
      background: active ? '#26a69a' : '#131722',
      border: 'none',
      color: active ? 'white' : '#a0a4b0',
      fontWeight: 'bold',
      cursor: 'pointer',
      borderRadius: '8px',
      margin: '0 5px',
      transition: 'all 0.3s',
    }),
    form: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    inputWrapper: {
      position: 'relative',
      margin: '20px 0 10px',
    },
    input: {
      width: '100%',
      padding: '15px 12px 15px 12px',
      borderRadius: '8px',
      border: '1px solid #2a2e39',
      background: '#131722',
      color: '#d1d4dc',
      fontSize: '1em',
      outline: 'none',
    },
    label: {
      position: 'absolute',
      top: '50%',
      left: '12px',
      transform: 'translateY(-50%)',
      color: '#a0a4b0',
      fontSize: '1em',
      pointerEvents: 'none',
      transition: '0.2s all',
      background: '#1e222d',
      padding: '0 5px',
    },
    labelActive: {
      top: '-10px',
      fontSize: '0.75em',
      color: '#26a69a',
    },
    submitBtn: {
      width: '100%',
      padding: '15px',
      marginTop: '20px',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: '#26a69a',
      color: 'white',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    message: {
      color: '#ef5350',
      marginTop: '15px',
      fontSize: '0.9em',
    }
  };

  // Helper function to render an input with a floating label
  const renderInput = (type, value, setValue, placeholder) => (
    <div style={styles.inputWrapper}>
      <input
        type={type}
        style={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      {/* The label's style changes dynamically based on whether the input has a value */}
      <label style={{ ...styles.label, ...(value ? styles.labelActive : {}) }}>{placeholder}</label>
    </div>
  );

  // --- JSX TO RENDER THE UI ---
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {/* Toggle buttons for Login and Signup */}
        <div style={styles.toggle}>
          <button style={styles.toggleBtn(isLogin)} onClick={() => setIsLogin(true)}>Login</button>
          <button style={styles.toggleBtn(!isLogin)} onClick={() => setIsLogin(false)}>Sign Up</button>
        </div>

        {/* The main form */}
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
          {renderInput('email', email, setEmail, 'Email')}
          {renderInput('password', password, setPassword, 'Password')}
          {/* Conditionally render the "Confirm Password" field only for the signup form */}
          {!isLogin && renderInput('password', confirmPassword, setConfirmPassword, 'Confirm Password')}
          <button type='submit' style={styles.submitBtn} disabled={loading}>
            {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        {/* Display any success or error messages */}
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
export default AuthPage;

