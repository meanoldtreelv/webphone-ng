import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTg1MjAzNDcsImlhdCI6MTY5ODQ5MTU0NywiYXV0aF90aW1lIjoxNjk4NDkxNTM4LCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6Ilk3TEd6RlRZVGhSNVNTR0NDM0VtNmciLCJuYmYiOjE2OTg0OTE1NDd9.ysaSoRXIKhYIbfzSazWXgZPgl-D7KgV91pxUFgEiPpJqx2L5zB_uwZAVJw75eBR-9GIfsWEzn6UNKobIUYtlmG9Tbk4k4eq04kPPbDzhqIt8K9zn-6e41WGH6KlxgcRhFQioeFxOczLIkdRtUkBzu10lNHZF3WMJ3YvqXpZCx8MNOeZjI6T0EzeF9gcQ_Jhpm4lK7TSfzEvnhBx27m4F-6MNI-zZgoOPg-YSVcECadpxBNBb-ie1arahRS2usSqaWNS0JvJa3tbzBfEFMye6ZbdSlyHnR9Fk9hd8dLGf9-zoGeRujSC7EarEJBk5Tv9mKQfrgFWgFJa777fQmuBIRw",
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
