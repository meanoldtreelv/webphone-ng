import { isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { setSessionOut } from "redux/common/commonSlice";
import { store } from "redux/store";
import { getCookie } from "utils";

export const jwtTokenRefresher =
	({ dispatch }: Record<any, any>) =>
	(next: any) =>
	async (action: any) => {
		if (action && isRejectedWithValue(action)) {
			if (localStorage.getItem("extAuth") !== "true") {
				if (action?.payload?.response?.status === 401) {
					await axios
						.post("https://b2clogin.ringplan.com/refresh-token", {
							access_token: getCookie("id_token"),
							refresh_token: getCookie("refresh_token"),
						})
						.then((resp) => {
							var expiryDate = new Date();
							expiryDate.setFullYear(expiryDate.getFullYear() + 10);
							var formattedExpiryDate = expiryDate.toUTCString();

							if (process.env.NODE_ENV === "development") {
								document.cookie = `id_token=${resp?.data?.id_token}; domain=localhost; path=/; expires=${formattedExpiryDate}`;
								document.cookie = `refresh_token=${resp?.data?.refresh_token}; domain=localhost; path=/; expires=${formattedExpiryDate}`;
							} else if (process.env.NODE_ENV === "production") {
								document.cookie = `id_token=${resp?.data?.id_token}; domain=.ringplan.com; path=/; expires=${formattedExpiryDate}`;
								document.cookie = `refresh_token=${resp?.data?.refresh_token}; domain=.ringplan.com; path=/; expires=${formattedExpiryDate}`;
							}
						})
						.catch((e) => {
							store.dispatch(setSessionOut(true));
						});
				}
			} else {
				store.dispatch(setSessionOut(false));
			}
		}

		return next(action);
	};
