import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as loginUserAPI } from '../api/authAPI';
import { fetchUserProfile as fetchUserProfileAPI } from '../api/authAPI';
import { updateUserName as updateUserNameAPI } from '../api/authAPI';

// Create the loginUser, fetchUserProfile, and updateUserName async thunks. A thunk is a function that can contain asynchronous logic.
// These thunks will be used to send requests to the API to log in the user, fetch the user profile, and update the user name, respectively.
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

//The createSlice function is used to generate a slice of the Redux store.
//This slice is named 'auth' and has an initial state with token and user set to null.
  const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, user: null},
    //The reducers field defines a logoutUser reducer that resets the state and removes the token from local storage.
    reducers: {
      logoutUser: (state) => {
        state.token = null;
        state.user = null;
        localStorage.removeItem('token');
      },
    },
    //The extraReducers field defines how the state should be updated based on the actions dispatched by the thunks.
    //For example, when loginUser is fulfilled, the state's token is set to the payload of the action, and the error is set to null.
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
      // When updateUserName is fulfilled, the user name in the state is updated with the new user name.
      builder.addCase(updateUserName.fulfilled, (state, action) => {
        if (state.user) {
          state.user.userName = action.payload.body.userName;
        }
      });
    },
  });
  
  export const { logoutUser } = authSlice.actions;
  
  export default authSlice.reducer;