import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTg2ODM5MDgsImlhdCI6MTY5ODY1NTEwOCwiYXV0aF90aW1lIjoxNjk4NjU1MTA3LCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6IklqYkRvNXRwX040WUhXR3J6eW9Bd3ciLCJuYmYiOjE2OTg2NTUxMDh9.E7TU3OzFEZEftVZ-Nf3ebY_CqwqELscbl0IdGpnpk8pBCHfTgFY3DSfEGgi8xhHG0jRjw-WReSoiDKjqRQjezSHuhPtfyI8_AE7nc0Ssq7Q7kt9Wax_6tUCny4EHIvfGOGvLyYGE_yklNx6LThUu5UhVXROwRf2V0RlDDso1ANlgpCcbOkBNQRWQX2HEbd4ZSJxYjBcfqaZn667OT9osDBRReAovYDWuIpZnRk3OHqUBa29yn0p3kGI1YBn2dtBNBaJ8OiO80f3rGHS_W1FccG--cTd_ROgISHEDBQ7cR1xPY1UFqmKUYa8EFWGmeSWz8K2yjZ-faxK7eMWd_CyvfA",
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
