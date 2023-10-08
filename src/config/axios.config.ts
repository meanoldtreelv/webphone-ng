import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Authorization": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmMWRmNDdmNy1kMmVhLTRiZjktOTg0My02ODk2ZGMwZTZhYjIiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTY3MDAzODYsImlhdCI6MTY5NjY3MTU4NiwiYXV0aF90aW1lIjoxNjk2NjcxNTg0LCJnaXZlbl9uYW1lIjoiRGVlcGNoYW5kIiwiZmFtaWx5X25hbWUiOiJTaW5naCIsImVtYWlscyI6WyJkZWVwQHN0YXJ0eGxhYnMuaW4iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6Im1zWHVURWEzOFNDaDROcU9MTDY3enciLCJuYmYiOjE2OTY2NzE1ODZ9.W53AZi_n0Gu0tkgJ-XjceLNlN-Yiir80kRR4pnIzksjWKmYWcRzyrNdfIRzkNwgmhc0fwF2-lKpyLRNBTASRN1Q51fubDRaGuBxm3cxFuKOgTfLAJudhvuP9-6hhRQIGAN0l2dcM5tqZcX9mBOxR2nBHnqSLDkNZNx8EJihgcYGidGqLHD1s8ae6kSZX8iF6RuNFjVB59dc6PN1Z3_-J5yCnd6qmtcyDxut7eCWJ3Q4tG7MLyfTy-K1MHhLWrSLh4sIOZPIS16mY50s7oCJ6ZKIfuqXDIQan4b-zbQNACzSoD98CAAd75Izk5Yx9Zpw4VXXu9EALeinH8z9BqAAdYw",
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
