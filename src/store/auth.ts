import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {boolean} from 'yup';
import {RootState} from '.';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  avatar?: string | undefined;
  followers: number;
  followings: number;
}
interface AuthState {
  profile: UserProfile | null;
  loggedIn: boolean;
}

const initialState: AuthState = {
  profile: null,
  loggedIn: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfile(authState, {payload}: PayloadAction<UserProfile | null>) {
      authState.profile = payload;
    },

    updateLoggedIn(authState, {payload}: PayloadAction<boolean>) {
      authState.loggedIn = payload;
    },
  },
});

export const {updateProfile, updateLoggedIn} = slice.actions;

export const getAuthState = createSelector(
  (state: RootState) => state.auth,
  authState => {
    return {loggedIn: authState.loggedIn, profile: authState.profile};
  },
);

export default slice.reducer;
