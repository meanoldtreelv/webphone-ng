import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Authorization": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTYxNjY2OTIsImlhdCI6MTY5NjEzNzg5MiwiYXV0aF90aW1lIjoxNjk2MTM3ODkxLCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6ImRMcm1KNUlQSkdsM2FOUDVoeXp4enciLCJuYmYiOjE2OTYxMzc4OTJ9.qKhWnfT-jYEcG46TbtRpRHq_FeoeZJTkKnrTAkKlamgonOXiJntDBw6YSwP5oWmoPSc4AogtT0X4s7vF9DefW_02tQApH6yjSrVtzkrlWa7oOurroqy47jkWUqiryiLdAF97MYzceweB-nd80uttpRoNXm1rZ4Cdx9mLCygNT9XzrQnxtMyzYNO7aThL7ZnauA8RI-Gfqn9t7p1pLz9gqrOYF9EUw0UMj4WkwwmhfnSz-C2tibYuJ_CwoW-kvjYTjcXJUxqolyMxfwAz8bszX3muYtSfX0CKuKQa394qPemOjTbzoUjvRqVIhaPGE_euozJeU6sgdyiycclSaklVAQ",
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
