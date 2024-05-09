import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/loginForm/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;