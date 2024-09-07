// authActions.js
import axios from 'axios';
import { loginSuccess, loginFailure, setUser, logout } from './authSlice.js';

export const loginUser = (formData, csrfToken) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
      headers: {
        'CSRF-Token': csrfToken,
      },
      withCredentials: true,
    });
    const { success} = response.data;
    if (success) {
      dispatch(loginSuccess());
    } else {
      dispatch(loginFailure('Invalid User ID or Password'));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
}


export const getUser = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/protected/getuser', { withCredentials: true });
    const { user} = response.data;
    dispatch(setUser(user));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('User not authenticated, logging out.');
      dispatch(logout());
    } else {
      console.error('Get user error:', error);
    }
  }
};


export const logoutUser = () => async (dispatch) => {
  try {
    console.log('Logging out');
    await axios.post('http://localhost:5000/api/protected/logout', {}, { withCredentials: true });
    localStorage.clear();
    dispatch(logout());
    window.location.href = "/";
  } catch (error) {
    console.error('Logout error:', error);
  }
};


