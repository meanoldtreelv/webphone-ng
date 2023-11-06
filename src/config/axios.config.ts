import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiIwOGY5MWFlMi05OTI3LTRjYzktYWRlMi0xMWQ4OWU0ZDRlNWUiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTkyOTQ0NjMsImlhdCI6MTY5OTI2NTY2MywiYXV0aF90aW1lIjoxNjk5MjY1NjYyLCJnaXZlbl9uYW1lIjoiU2hpdmFtIiwiZmFtaWx5X25hbWUiOiJHdXB0YSIsImV4dGVuc2lvbl9jb21wYW55IjoiU3RhcnQgWCBMYWJzIiwiZW1haWxzIjpbImdzaGl2YW1Ac3RhcnR4bGFicy5pbiJdLCJ0aWQiOiJkZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkiLCJhdF9oYXNoIjoidG9HZDF5WHpjY3JMQld0QURBUV9hUSIsIm5iZiI6MTY5OTI2NTY2M30.FLH0cBG2Bz5yBszWvqanjrQ9yotunPYDiZP-D55cPa8UpuK3wU7Qkvtd7lVtWpSo-qwAtVh1S8bbVELVc4PQw_HqwWn9EPXZ73EOgDtr8RSQ-lBKMxXAUXkduPaRSNZnLkx-ryfn8usFRBoWJsHxEEITc6l3zDVV2T53hIWJfkL7KJXEV67Ggpvg7Dgn9eZWMBYJWBynn1EUWHFGOWVWqOipjbVj3YudEpPwDYt91WuKj3bSZ-wCBC98EWpmxBry0FJdlwspJR3sjcqPEElDAWy3vZXA5F3KRuOnda0cOs5YdQez5KvLj8UDs2i_xxJT5p9r_QP93ucuWjaDB0vMWg",
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
