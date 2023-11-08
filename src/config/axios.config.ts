import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiIwOGY5MWFlMi05OTI3LTRjYzktYWRlMi0xMWQ4OWU0ZDRlNWUiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTkzODkzMDgsImlhdCI6MTY5OTM2MDUwOCwiYXV0aF90aW1lIjoxNjk5MzYwNTA3LCJnaXZlbl9uYW1lIjoiU2hpdmFtIiwiZmFtaWx5X25hbWUiOiJHdXB0YSIsImV4dGVuc2lvbl9jb21wYW55IjoiU3RhcnQgWCBMYWJzIiwiZW1haWxzIjpbImdzaGl2YW1Ac3RhcnR4bGFicy5pbiJdLCJ0aWQiOiJkZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkiLCJhdF9oYXNoIjoiMm9xTnVrQXNpUkpnSXBGMU5sLVNCZyIsIm5iZiI6MTY5OTM2MDUwOH0.wl1rFPnhCrWn5PeZD_vBXsTFYWCh9i99JEzBXtdLwduZpwuFbtUqWKu1lPRRe55kdnnRxF4u2cStRBzv8OKKYY4aYLovOVMypy_BFD4Rgewxch2I1ydjXf5XgwKis_-e5dEORLeDwyiWlnKvFf5wATRboAkh491BrHPYitLfeDK2hC2Jva3AF79p8BoV9vjxo2LBTkp0WVQ1OMU7HYNpYeXxpHTePyHV0dePBff4dYxKje0j1486gKeJAcw-XtTmId01YN9gQ4Wky1Kbd3cCCzxvEH6S9n3uOr7vQOri34upvh12YS1kmyQJWJGn6yrgA-TXDQJ__ETUjn9xAP-g9g",
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
