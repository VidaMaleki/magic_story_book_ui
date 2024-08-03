
import React, { useState } from 'react';
// import './Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoogleSignin = () => {
        window.location.href = 'http://localhost:8081/oauth2/authorization/google';
    };

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.get('http://localhost:8081/api/user/exists', {
                params: { email }
            });

            if (response.data) {
                // Assume user is logged in if they exist (adjust this logic for actual login process)
                navigate('/');
            } else {
                setError('User not found. Please sign up first.');
            }
        } catch (error) {
            console.error('Error checking user existence:', error);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2>Sign In</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Sign In</button>
                <div className="social-login">
                    <button onClick={handleGoogleSignin}>
                        <img src="/path/to/google-icon.png" alt="Google" /> Sign In with Google
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;

