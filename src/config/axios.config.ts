import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"X-User-Id": "primary",
		"Authorization": "Bearer anmjdVAnkEIoItWvFMHX9cHUetdfO1vf2CkOxIO0BNM",
		"Content-Type": "application/json",
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
			return { error };
		}
	};
