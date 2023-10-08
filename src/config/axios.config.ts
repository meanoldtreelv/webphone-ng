import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Authorization": getCookie("id_token") || "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTY4MDg2ODMsImlhdCI6MTY5Njc3OTg4MywiYXV0aF90aW1lIjoxNjk2Nzc5ODgxLCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6InV6OUN3Qlg4d1lhYXQwV1N5OVROdEEiLCJuYmYiOjE2OTY3Nzk4ODN9.PORsWGJeNtgDVCmejSxPMk1OcsnUAFDHWePG8WMbKqqZebUuuI_cP4lRxcBulNmrlPvfX0gLujieaNPUvGLUJjPqnCHzKWsEDBg59okQs6J0d2-OSoPow0eoaeLcH0XBjV2BDZFmB6NmRoRJj73a5sUG89sPQ9MgZdO5GepyTyycqF3lBOQpZdSS83aWYetddpe7n1hMUiM1utv-BEC-pkV0pmCd4uYKPUXa6ZY1pbFLjcet8TZlfWqAIgnkY7Fx3IZNf5-rYDGGGkIledZoMlAqVbe5EDHtaVT1tYuUsxkejPbRgnGw20p0EBiczWtAkhCbLyybtQwehCz5Se2xew",
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
