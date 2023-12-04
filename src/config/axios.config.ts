import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie, setCookie } from "./../utils";

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

			return { error };
		}
	};

export default axiosInstance;
