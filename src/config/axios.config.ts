import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Authorization": getCookie("id_token") || "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmMWRmNDdmNy1kMmVhLTRiZjktOTg0My02ODk2ZGMwZTZhYjIiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTY3MzQ0MDQsImlhdCI6MTY5NjcwNTYwNCwiYXV0aF90aW1lIjoxNjk2NzA1NjAzLCJnaXZlbl9uYW1lIjoiRGVlcGNoYW5kIiwiZmFtaWx5X25hbWUiOiJTaW5naCIsImVtYWlscyI6WyJkZWVwQHN0YXJ0eGxhYnMuaW4iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6InRvZmZmS25OUF96T1dXQ055YTc5enciLCJuYmYiOjE2OTY3MDU2MDR9.tGqBxjNQHHTyggaJDJvKKx8IwZwwd09kARC_Z64RuutoGJ0eNoEkR50ppzQz6v-vGscp_oJwK4WSdUzGKjBgzG1TzOejG7I5H7_PpVwAQih8FKNCC-s_kjT0h4q0rCIwoAYqTiEcLaSMm3IqM2DIjLMRt-4OFzI6yfhMOof49QYCAVrEUvHrMg3CcGDtkcYpXJOb-iEslPU13rq_U8vqCrvHEcQ3jd4bPPae1aPmjY2EvSALnprRmGZy_Ss96gZeDWZlO4T_wfwUr7Hjiv2FDzjOMmHEnw8IHdbD7j_frXa_ynuHrmrsQhcb2AWBec7YK-9Fu8xXkztiQ__EhnYKdw",
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
