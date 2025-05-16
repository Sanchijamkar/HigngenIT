import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set the current user data
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    // Sign out the current user
    signOut: (state) => {
      state.currentUser = null;
    },
    // Other actions for updating or deleting user...
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;  // Set the user data when login is successful
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    updateUserFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  setCurrentUser,
  signOut,
  loginSuccess,  // Export the loginSuccess action
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
