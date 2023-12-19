import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL, CLIO_BASE_URL, clioClientId, clioClientSecret, STORAGE_BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie, setCookie } from "typescript-cookie";
import { clioConstants } from "constants/clioConstants";
// import { getCookie } from "./../utils";

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

export const clioAxiosInstance = axios.create({
	baseURL: CLIO_BASE_URL + "/api/v4",
	headers: {
		Authorization: `Bearer ${getCookie(clioConstants.clioAccessToken)}`,
		"Content-Type": "application/x-www-form-urlencoded",
		// "Request-Headers": "Origin",
		// "Response-Headers":
		// 	"Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Access-Control-Allow-Credentials, Access-Control-Expose-Headers",
	},
});

export const clioAxiosBaseQuery =
	(): BaseQueryFn<AxiosRequestConfig, unknown, AxiosError> =>
	async ({ url, method, data, params }) => {
		try {
			const result = await clioAxiosInstance({
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
				await axios
					.post(
						CLIO_BASE_URL + "/oauth/token",
						{
							client_id: clioClientId,
							client_secret: clioClientSecret,
							grant_type: "refresh_token",
							refresh_token: getCookie(clioConstants.clioRefreshToken),
						},
						{
							headers: {
								"Content-Type": "application/x-www-form-urlencoded",
							},
						},
					)
					.then((res) => {
						console.log("this is your response");
						setCookie(clioConstants.clioAccessToken, res?.access_token);
					})
					.catch((e) => {
						console.log("this is your error message", e);
					});
			}

			return { error };
		}
	};

export default axiosInstance;
