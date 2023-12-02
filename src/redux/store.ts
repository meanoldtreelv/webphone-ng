import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contact/contactSlice";
import callingReducer from "./call/callSlice";
import settingReducer from "./setting/settingSlice";
import commonReducer from "./common/commonSlice";
import voicemailReducer from "./voicemail/voicemailSlice";
import callHistoryReducer from "./call-history/callHistorySlice";
import sidecarReducer from "./sidecar/sidecarSlice";
import meetReducer from "./meet/meetSlice";
import chatReducer from "./chat/chatSlice";
import { apiService } from "./../services/api";
import sipReducer from "./sip";
import { jwtTokenRefresher } from "middleware/jwtTokenRefresher";

export const store = configureStore({
	reducer: {
		contact: contactReducer,
		calling: callingReducer,
		sip: sipReducer,
		common: commonReducer,
		setting: settingReducer,
		callHistory: callHistoryReducer,
		voicemail: voicemailReducer,
		sidecar: sidecarReducer,
		meet: meetReducer,
		chat: chatReducer,
		[apiService.reducerPath]: apiService.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware, jwtTokenRefresher),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
