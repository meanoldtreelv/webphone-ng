import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contact";

const store = configureStore({
	reducer: { contact: contactReducer },
});

export default store;
