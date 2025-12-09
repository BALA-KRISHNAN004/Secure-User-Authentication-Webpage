import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,

        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user // Optional, if you return user data with token
      };
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'LOGOUT':
      return {
        ...state,

        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    case 'USER_LOADED':
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: action.payload
        };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
        axios.defaults.headers.common['x-auth-token'] = localStorage.token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
        dispatch({ type: 'AUTH_ERROR' });
        return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/auth/user');
      dispatch({
        type: 'USER_LOADED',
        payload: res.data
      });
    } catch (err) {
      console.error('Load user error:', err);
      dispatch({ type: 'AUTH_ERROR' });
    }
  };
  
  // Register
  const register = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);

      localStorage.setItem('token', res.data.token); // Synchronously save token
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
         type: 'REGISTER_FAIL',
         payload: err.response.data.msg
      });
      throw err; // Re-throw to handle in component
    }
  };

  // Login
  const login = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);

      localStorage.setItem('token', res.data.token); // Synchronously save token
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data.msg
      });
        throw err;
    }
  };

  // Logout
  const logout = () => {
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
  };
  
  useEffect(() => {
      loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
