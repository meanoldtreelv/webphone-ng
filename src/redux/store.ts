import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contact/contactSlice";
import callingReducer from "./call/callSlice";
import { apiService } from "./../services/api";

export const store = configureStore({
	reducer: { 
        contact: contactReducer,
        calling: callingReducer,
        [apiService.reducerPath]: apiService.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware)
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
