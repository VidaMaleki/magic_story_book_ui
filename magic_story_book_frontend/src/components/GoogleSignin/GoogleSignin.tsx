import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleSignin: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/user/profile', {
                    withCredentials: true
                });
                console.log('User profile:', response.data);
                navigate('/'); // Redirect to home or any other page
            } catch (error) {
                console.error('Error fetching user profile:', error);
                navigate('/signin'); // Redirect to sign-in page if there's an error
            }
        };

        fetchUser();
    }, [location, navigate]);

    return <div>Loading...</div>;
};

export default GoogleSignin;
