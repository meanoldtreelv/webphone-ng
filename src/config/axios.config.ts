import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiIwOGY5MWFlMi05OTI3LTRjYzktYWRlMi0xMWQ4OWU0ZDRlNWUiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTg2ODkyMjMsImlhdCI6MTY5ODY2MDQyMywiYXV0aF90aW1lIjoxNjk4NjYwNDIyLCJnaXZlbl9uYW1lIjoiU2hpdmFtIiwiZmFtaWx5X25hbWUiOiJHdXB0YSIsImV4dGVuc2lvbl9jb21wYW55IjoiU3RhcnQgWCBMYWJzIiwiZW1haWxzIjpbImdzaGl2YW1Ac3RhcnR4bGFicy5pbiJdLCJ0aWQiOiJkZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkiLCJhdF9oYXNoIjoiV1hEbXVEQU5vQkFoR1Z5MElabXFxQSIsIm5iZiI6MTY5ODY2MDQyM30.gEhJrWUE_fJGYp-wRBTT5D0enkADTstTw_yIAVDO_G7JCE6mZkTmxsY0869P39bNSrwCSa3rusyZZnu2-6_Zv5YccBYT0mgYcot_d1kcEmq2i9W3o6CAfMHMziKmIYBQc_jfKT866t5LcJ5IEUln2t7Y7q4GEEDdhk4brEWn6pLzn0XCslYhyK6GRwLRE4edl2L7c47-ldDdsCT1trTHutSazcBEllDCXyP6_atKX8-NYZ5xIZIp83c0Yz3iEqzfB3z1b9cCAw3k00gsTZ4FDQ0Y6VIGGJG85rOm91hsRBMFQOOrfnaANm_JpowdWdsQGzT2tlfrniaJd5www7pa5g",
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
