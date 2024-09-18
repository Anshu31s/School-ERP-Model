import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    error: null,
    user: null,
    isauthenticated: false,
  },
  reducers: {
    loginSuccess: (state) => {
      state.isauthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.isauthenticated = false;
      state.error = null;
      state.user = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});



export const { loginSuccess, loginFailure, setUser, logout } = authSlice.actions;
export default authSlice.reducer;