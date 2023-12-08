import { isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { setSessionOut } from "redux/common/commonSlice";
import { store } from "redux/store";
import { getCookie, setCookie } from "utils";

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
							// setCookie("id_token", resp?.data?.id_token);
							Cookies.set("id_token", resp?.data?.id_token, {
								expires: 7,
								path: ".ringplan.com",
							});
							Cookies.set("refresh_token", resp?.data?.id_token, {
								expires: 7,
								path: ".ringplan.com",
							});
							// setCookie("refresh_token", resp?.data?.refresh_token);
							window.location.reload();
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
