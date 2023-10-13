import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTcxODkxODgsImlhdCI6MTY5NzE2MDM4OCwiYXV0aF90aW1lIjoxNjk3MTA2NTY1LCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6InNWUUIxTWhldGt0dTV4a2JXb0JiV1EiLCJuYmYiOjE2OTcxNjAzODh9.f63QuxHkg5vHxCeRSttFNbbPZo0yibnF5I7f8VARfhr_B8tBM3RaJIu9RS_RPZ07kc_YdhpJIYpD00gEMk0ITJAjPGm2y3Z5FsMc9eqVOVbSav7aCTxPfJalbIMplAQWiks1fsGU_gtPbzy3MNE2Qh0avBfyQELv3koiattJZ1NWIqThLin05y_ku_fde4fwT6LU4KjJERuxOkxmT4Df5xEGrv1T6d2H9ppC4yKZ4iNWP-ujc8t1UuTnSCuwJMG1Jh8HRlWMyOsh18YUfvepgYCl0WF-nMw_S67evwRe2pKuQ3DICyV_wzN8bg_Hr6DguO_cA2y4pjKNk7QTX3klmA",
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
