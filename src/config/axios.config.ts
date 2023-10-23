import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTgxMDE3NTcsImlhdCI6MTY5ODA3Mjk1NywiYXV0aF90aW1lIjoxNjk4MDcyOTU2LCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6Im1td011dmlyQkc0cVlXY0h2ODB5Q3ciLCJuYmYiOjE2OTgwNzI5NTd9.x-Xony2nZBIzPrbT3NQmxXgIgf4IO2ZfaEOXf55LntQkqGmWOIvJVS-EBUxqq9n2uYzJ0Av5UUvKrlmyZ1VgqWj7JgNANh4ZJ_ZofC20HDSe8oa6V8geVZOigqXhE6UIUUsLTadAdwoMVKXxBbUiWBX119P9f9KGG2kmMCFoUMgg_hu8L_cF41QsWYqUbwEKIEKRiskY7klmE3CgSBjCeaSULpngJhcGK3ygKuH-4typIc_O0eMkWRZfjSeYKGcHFINYCL9RIdcOEmhAk4IQy1WMy1LaNdL59uZ8_tGVU4fnNH6De3zBnD_iYz66MXEH1NphiTEoVhBG27i7VtH9Zw",
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
