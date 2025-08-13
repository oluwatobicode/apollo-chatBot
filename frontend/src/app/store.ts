import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import chatSlice from "../features/chat/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
