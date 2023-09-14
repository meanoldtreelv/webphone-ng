import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contact";
import callingReducer from "./calling";

const store = configureStore({
	reducer: { contact: contactReducer, calling: callingReducer },
});

export default store;
