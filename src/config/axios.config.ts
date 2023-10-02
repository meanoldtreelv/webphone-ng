import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Authorization": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTYyNTkzNDQsImlhdCI6MTY5NjIzMDU0NCwiYXV0aF90aW1lIjoxNjk2MjMwNTQzLCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6IjU1dVJmQ25vdDdhRHRkTmVLVnB0MlEiLCJuYmYiOjE2OTYyMzA1NDR9.iGFrPvQ_mltHeF_YWqnui3hrornPevmCHyz8x9v_1DldX-VofKOXdX1ulvlj_in6FxcoeLKTDD7_YpFUEvLEpp5efnbkbGvnArOizYif-xI-D9ve7fs50U1AqzrQi5Jsq3ErEj52YF1AoN85ld8UZCTqUY3OM73PDpu4bIIEpczY1K3NPZTTgTRl9rAzcVMfiQx0EcL-QExvvm0KXPRPW6wU-8XNIRmZJUZ4JVtOJVWSrUsvAs0cb9pTG5lJskQTzqy2efvYB4UCBMor5mqZHqtXKLIVOGzWbwvt8gbhSurMPDPzRY_LBbCf-eI5OLhOBfsKhIuTP3W8CIIyJCWz5A",
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
