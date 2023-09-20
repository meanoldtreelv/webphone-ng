import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contact/contactSlice";
import callingReducer from "./call/callSlice";

export const store = configureStore({
	reducer: { 
        contact: contactReducer,
        calling: callingReducer
    },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
