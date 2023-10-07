import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Authorization": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTY3MDk2NzAsImlhdCI6MTY5NjY4MDg3MCwiYXV0aF90aW1lIjoxNjk2NjgwODY5LCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6IldmbWs3VUVULWd3Y1V0dWFTdVZ0bkEiLCJuYmYiOjE2OTY2ODA4NzB9.w3znwauINho7pwH6IxkG7Yp-XI37l7yXiBE9Q3uVDCu8sjpLl4pNJza1FlQD2B5_tAZxaHZwtJm8AAFTSgLEKD35_CwZPadznsnj2fr4v6j9pCdyQPOrfLAf0-JWmwmSINtrFZjHUP4WpTQiQG7UjfAfzK72H1YUWmlBXPE5spXgCRVK5qv8z9_JFKmx9BvvnvMaHpEzEGzmpyCFoFL5CyA1IgtfRvF6w7HenKzoHKJ0M7v3LejvUJsXHQtRd4wu7FD7zHzNHqAL6cIqtOyr33TvC4OvopER7dH6KpDAmTW79UY-6HF46b9KDDM8didGTpb0btUSyf52couvJI02jw",
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
