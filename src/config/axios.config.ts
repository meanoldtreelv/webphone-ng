import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTY4OTQzODIsImlhdCI6MTY5Njg2NTU4MiwiYXV0aF90aW1lIjoxNjk2ODY1NTgxLCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6IlJzcV96ME5sbkp3dFNLcXBvYjBna3ciLCJuYmYiOjE2OTY4NjU1ODJ9.wP6pt_G5WvOIFFmVUIpjp0IslG6Vg0bwHw03mvIev3XsWiywRk87Kmy7swiqIdyE2Z2W5IGqiGTHCx7DD3f5d2XTXtY06OizK2yZ0KOjnERz-jhxfI6HbkLRhwX1gr_581a5GKs2To3gZaNOLZz0q0GmilNdlPHq8NprOm91bI7xt_AIdrIK-SaZRMVe7MvxlwqSwPzSyLgUC5O6o01Fyf55p45vFsTJbhcOkY5QIiouzxgeAIpkrMO15kpPJF0X32-wFVbXwowBSOdZN7FeIlmf3ogH_E1OQPxtx530osKxAHxkLjRZ2jshnf5UX1bXDP_NJ08a-I1ljHajoJ-_kQ",
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
