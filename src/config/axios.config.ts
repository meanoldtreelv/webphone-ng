import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTcyMTYzMTcsImlhdCI6MTY5NzE4NzUxNywiYXV0aF90aW1lIjoxNjk3MTg3NTE1LCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6InM5dDJYOG5rWjk5UXRWU05kYnQwTmciLCJuYmYiOjE2OTcxODc1MTd9.FARWDTHL33uUof3ufPn87Iagm36XTWKL33SC7S_Z36CN1BEpcINF5FhdYHR87uvFZGmDw7h9IE5qZ0hMpdJjJT3fj4Hl46mQNSyZh1FxE95JHs2fcYo-6RIibcjsEmgFle02yRJji5NUW4B933og5k7a0UTVERfNp7QiUGrJ0k-uqR3SAD0C7bjljkIikuXFa7WK9c-zAf06oyO_OODtTX0x7yF5KNcyIgcnUXAkdkQ3P1Z_Zn2bM1G3KX4i0TzLRTXgDyxghGyb7ADlZGZ3CMtMePFgQF1gT9ZjTiH0sD2pQHP1Da_3-Y_J2vj2ndcQmmtYZgyG6bQSie86BDJy3g",
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
