import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiIwOGY5MWFlMi05OTI3LTRjYzktYWRlMi0xMWQ4OWU0ZDRlNWUiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTg0MDE3MjEsImlhdCI6MTY5ODM3MjkyMSwiYXV0aF90aW1lIjoxNjk4MzcyOTIwLCJnaXZlbl9uYW1lIjoiU2hpdmFtIiwiZmFtaWx5X25hbWUiOiJHdXB0YSIsImV4dGVuc2lvbl9jb21wYW55IjoiU3RhcnQgWCBMYWJzIiwiZW1haWxzIjpbImdzaGl2YW1Ac3RhcnR4bGFicy5pbiJdLCJ0aWQiOiJkZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkiLCJhdF9oYXNoIjoiNUlLSmRNanhQSVN4OTRmVmZHakZ6dyIsIm5iZiI6MTY5ODM3MjkyMX0.HGlnH1bcr0l-14KKo5D_ODheJyU0aSa2McSEwDpblPAO0cJuT0XpM-ze3nIj-C7soCq9iPPWGTbUJeV55ZiwNx3STrDlQhE8kkq6dD56mjM7-gswI4RdE2keIf0_WjYa7yYB0VeEwaZXvu0UXCEtcnNICVXmmlRwke4KymTwXAvuc3P5rl4w2c8DXHkAJbVFVXzpDlh-FfFxpsEdq4DUOxa7w_5_Z_0kXotsdoQt6VDtby5wLHEG4xEF_SZBfqDuM0sGwRz6oKDOuVPn04mDOk89oFWEsCbZBE-QQexCFfLoxr5hA713RaIrV2AVWVRC8iXWHxTCl2xdWDeCCFcBJg",
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

export default axiosInstance;
