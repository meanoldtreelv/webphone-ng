import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "typescript-cookie";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: getCookie("id_token"),
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
});

export const axiosBaseQuery =
	(): BaseQueryFn<AxiosRequestConfig, unknown, AxiosError> =>
	async ({ url, method, data, params }) => {
		try {
			const result = await axiosInstance({
				url,
				method,
				data,
				params,
			});
			return { data: result.data };
		} catch (axiosError) {
			const error = axiosError as AxiosError;

			if (axiosError?.response?.data?.status === 401) {
				// await axios.post('https://b2clogin.ringplan.com/refresh-token')
				await axiosInstance
					.post("/refresh-token")
					.then((resp) => console.log("this is your response in refresh token", resp))
					.catch((e) => {
						console.log("this is your error message in refresh token", e);
					});
			}

			return { error };
		}
	};

export default axiosInstance;
