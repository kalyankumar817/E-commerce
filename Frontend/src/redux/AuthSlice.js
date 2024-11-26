import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { register, login,logout,setUser,clearUser } = authSlice.actions;

export const validateSession = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/users/products/validate-session', {
      withCredentials: true,
    });
    dispatch(setUser(response.data.user));
  } catch (err) {
    if (err.response && err.response.status === 401) {
      // Attempt to refresh token
      try {
        const refreshResponse = await axios.post(
          'http://localhost:5000/users/products/refresh-token',
          {},
          { withCredentials: true }
        );
        dispatch(setUser(refreshResponse.data.user));
      } catch (refreshErr) {
        console.error('Token refresh failed:', refreshErr.message);
        dispatch(clearUser());
      }
    } else {
      console.error('Session validation failed:', err.message);
      dispatch(clearUser());
    }
  }
};

export default authSlice.reducer;
