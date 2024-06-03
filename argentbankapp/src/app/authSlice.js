import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as loginUserAPI } from '../api/authAPI';
import { fetchUserProfile as fetchUserProfileAPI } from '../api/authAPI';
import { updateUserName as updateUserNameAPI } from '../api/authAPI';

export const loginUser = createAsyncThunk('auth/loginUser', loginUserAPI);
export const fetchUserProfile = createAsyncThunk('auth/fetchUserProfile', fetchUserProfileAPI);
export const updateUserName = createAsyncThunk('auth/updateUserName', async ({ token, userName }, thunkAPI) => {
    try {
      const response = await updateUserNameAPI(token, userName);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
export const initializeAuth = createAsyncThunk('auth/initializeAuth', async (_, { dispatch }) => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUserProfile(token));
      return token;
    }
  });


  const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, user: null},
    reducers: {
      logoutUser: (state) => {
        state.token = null;
        state.user = null;
        localStorage.removeItem('token');
      },
    },
    extraReducers: (builder) => {
      builder.addCase(initializeAuth.fulfilled, (state, action) => {
        state.token = action.payload;
      });
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
      builder.addCase(updateUserName.fulfilled, (state, action) => {
        if (state.user) {
          state.user.userName = action.payload.body.userName;
        }
      });
    },
  });
  
  export const { logoutUser } = authSlice.actions;
  
  export default authSlice.reducer;