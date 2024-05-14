import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as loginUserAPI } from '../../api/authAPI';
import { fetchUserProfile as fetchUserProfileAPI } from '../../api/authAPI';

export const loginUser = createAsyncThunk('auth/loginUser', loginUserAPI);
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', fetchUserProfileAPI);


const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, user: null},
    reducers: {
        logoutUser: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
        },
        initializeAuth: (state) => {
            const token = localStorage.getItem('token');
            if (token) {
                state.token = token;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.token = action.payload.body.token;
            state.error = null;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = 'Failed to login';
        });
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.user = action.payload.body;
        });
    },
});



export const { logoutUser, initializeAuth } = authSlice.actions;

export default authSlice.reducer;