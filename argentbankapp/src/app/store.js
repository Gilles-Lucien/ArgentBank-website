// This file is used to create the Redux store and combine the reducers.

// Import the configureStore function from the @reduxjs/toolkit package. 
// This function is used to create the Redux store. 
// A Redux store is an object which brings together the state, actions, and reducers in the application
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Create the Redux store using the configureStore function.
const store = configureStore({
    reducer: {
        // The auth reducer is added to the store. This reducer is responsible for managing the authentication state of the application.
        auth: authReducer,
    },
});

export default store;