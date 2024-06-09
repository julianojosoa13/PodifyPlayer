import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type notificaitonType = 'error' | 'success';

interface Notification {
  message: string;
  type: notificaitonType;
}

const initialState: Notification = {
  message: '',
  type: 'error',
};

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    updateNotification(state, {payload}: PayloadAction<Notification | null>) {
      state!.message = payload!.message;
      state!.type = payload!.type;
    },
  },
});

export const {updateNotification} = slice.actions;

export default slice.reducer;
