import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contact/contactSlice";
import callingReducer from "./call/callSlice";
import settingReducer from "./setting/settingSlice";
import commonReducer from "./common/commonSlice";
import callHistoryReducer from "./call-history/callHistorySlice";
import { apiService } from "./../services/api";
import sipReducer from "./sip"

export const store = configureStore({
	reducer: {
		contact: contactReducer,
		calling: callingReducer,
        sip: sipReducer,
		common: commonReducer,
		setting: settingReducer,
		callHistory: callHistoryReducer,
		[apiService.reducerPath]: apiService.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
