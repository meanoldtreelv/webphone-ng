import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL, STORAGE_BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "./../utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization: getCookie("id_token"),
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
});

export const axiosStorageInstance = axios.create({
	baseURL: STORAGE_BASE_URL,
	headers: {
		Authorization: getCookie("id_token"),
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
	},
});

export const axiosStorageBaseQuery =
	(): BaseQueryFn<AxiosRequestConfig, unknown, AxiosError> =>
	async ({ url, method, data, params }) => {
		try {
			const result = await axiosStorageInstance({
				url,
				method,
				data,
				params,
			});

			console.log(result);

			return { data: result.data };
		} catch (axiosError) {
			const error = axiosError as AxiosError;
			// debugger;

			return { error };
		}
	};

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
