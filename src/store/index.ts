import {
  combineReducers,
  configureStore,
  createSelector,
} from '@reduxjs/toolkit';

import authReducer from './auth';
import notificationReducer from './notification';

const reducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
});

const store = configureStore({
  reducer,
});

export const getNotificationState = createSelector(
  (state: RootState) => state.notification,
  notificationState => {
    return {
      message: notificationState!.message,
      type: notificationState!.type,
    };
  },
);

export type RootState = ReturnType<typeof store.getState>;

export default store;
