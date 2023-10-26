import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiIwOGY5MWFlMi05OTI3LTRjYzktYWRlMi0xMWQ4OWU0ZDRlNWUiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTgwMjE0NjksImlhdCI6MTY5Nzk5MjY2OSwiYXV0aF90aW1lIjoxNjk3NzkxMzc0LCJnaXZlbl9uYW1lIjoiU2hpdmFtIiwiZmFtaWx5X25hbWUiOiJHdXB0YSIsImV4dGVuc2lvbl9jb21wYW55IjoiU3RhcnQgWCBMYWJzIiwiZW1haWxzIjpbImdzaGl2YW1Ac3RhcnR4bGFicy5pbiJdLCJ0aWQiOiJkZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkiLCJhdF9oYXNoIjoiaGpjWFRZNE9XVFFUa213UDNXejVUZyIsIm5iZiI6MTY5Nzk5MjY2OX0.WqXnfqpt4CxiNRPHGFqSRZ12zxNTPeVuO4KM73DBHmvcuh41Wb1jFGz8FQkpB1DvgMDuZpBPK3rF5dVOemG6yIj8LoqffxR1i72D3JFJGtXv-34t4cg1OMmS_5TOyx_oLVU5aDwIB6Sx9bHKSc5CuGiZK0LiNw5TvyhOXJB1UCgMdvmG-ELvXiPle80hQzrKCuTAC-Rqz8xVKPYhb1A02uKxeTddl_ha5BPC8om-wFYNAro_qw6tVK_r4dRRJpeL3x5c6QY6UkKGHsroFOprCcO_nMv7dNn2_FiXo0gNNOGW4L_qLAhe5mPHdMgPceGyaKQ4H0lh18TpLlwwa9KSYw",
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
