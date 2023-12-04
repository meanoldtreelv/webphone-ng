import { isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { setSessionOut } from "redux/common/commonSlice";
import { store } from "redux/store";
import { getCookie, setCookie } from "utils";

export const jwtTokenRefresher =
	({ dispatch }: Record<any, any>) =>
	(next: any) =>
	async (action: any) => {
		if (action && isRejectedWithValue(action)) {
			if (action?.payload?.response?.status === 401) {
				await axios
					.post("https://b2clogin.ringplan.com/refresh-token", {
						access_token: getCookie("id_token"),
						refresh_token: getCookie("refresh_token"),
					})
					.then((resp) => {
						setCookie("id_token", resp?.data?.id_token);
						setCookie("refresh_token", resp?.data?.refresh_token);
						window.location.reload();
					})
					.catch((e) => {
						console.log("this is your error: ");
						console.log(e);
						store.dispatch(setSessionOut(true));
					});
			}
		}

		return next(action);
	};
