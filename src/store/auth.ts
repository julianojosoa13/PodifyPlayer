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
  busy: boolean;
}

const initialState: AuthState = {
  profile: null,
  loggedIn: false,
  busy: true,
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
    updateBusyState(authState, {payload}: PayloadAction<boolean>) {
      authState.busy = payload;
    },
  },
});

export const {updateProfile, updateLoggedIn, updateBusyState} = slice.actions;

export const getAuthState = createSelector(
  ({auth}: RootState) => auth,
  authState => {
    return {
      loggedIn: authState.loggedIn,
      profile: authState.profile,
      busy: authState.busy,
    };
  },
);

export default slice.reducer;
