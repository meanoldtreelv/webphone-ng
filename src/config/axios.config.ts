import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTcyMDk5MzAsImlhdCI6MTY5NzE4MTEzMCwiYXV0aF90aW1lIjoxNjk3MTgxMTI5LCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6IklzTU5EN3c5aHhGbkRDMHlRdmxfRXciLCJuYmYiOjE2OTcxODExMzB9.Lkel4kaRb8aj-fnXzRbbuDm9JjBEK4ZSCfPLo0wNWfWRRoxe3VpVDh7zQP9lxJ_T2j7Irp46bS99mxdzufw6q31p8UP5P77YQxUjb_vWG9-MciECvFGgJ2SMOZEhQRMMueXiiKuZaQf35WJB_ee24f2-rG976yoH0ZLX55aJyRaDCHe9m2rWAFNLYAL_E28i7KR9nLYspJZAn3cqG9zjW5JG_a9C2X8R3gLrx9kKryjFa8m3waUhv4lugH48QU7YIHNmWUWGKFBQVf1vKzLTJ1KbjXVaicYXvzx2-g6ATlZxG_V9AdRR70QIYof2MYNQo9sWRER9rGIdKAfoxVyHHA",
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
