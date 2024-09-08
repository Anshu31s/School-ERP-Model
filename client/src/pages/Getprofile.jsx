import { useState, useEffect } from 'react';
import axios from 'axios';

const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/protected/getuser', {
                    withCredentials: true,
                });
                const { student, teacher } = response.data;
                setProfile(student || teacher);
            } catch (error) {
                console.error('Error fetching the user profile:', error);
                setError('Failed to load user profile');
            } finally {
                setLoading(false);
              }
        };
        getProfile();
    }, []);

    return { profile, loading, error };
};

export default useProfile;