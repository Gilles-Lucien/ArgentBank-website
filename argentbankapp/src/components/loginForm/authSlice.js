import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/loginUser', async (loginData) => {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', {
        email: loginData.email,
        password: loginData.password,
    });
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.token = action.payload.token;
        });
    },
});
export default authSlice.reducer;