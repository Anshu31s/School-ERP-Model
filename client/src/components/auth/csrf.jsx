import axios from 'axios';
import { useState, useEffect } from 'react';

const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get('http://localhost:5000/csrf-token', {
          withCredentials: true, 
        });
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchToken();
  }, []);

  return csrfToken;
};

export default useCsrfToken;
