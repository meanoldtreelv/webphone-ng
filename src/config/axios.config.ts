import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Authorization": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTYyODgyNzEsImlhdCI6MTY5NjI1OTQ3MSwiYXV0aF90aW1lIjoxNjk2MjU5NDY5LCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6InoyMUxnc1Y3MGlKNE5aNjZmZHVEVkEiLCJuYmYiOjE2OTYyNTk0NzF9.ZJOxRxq4VTYsjaS4SN2OeRBDpCxMZrAptsSZTSkcEdON9ZuI4dznPB1o2_j4ulDVf2iKuDksmN82WJszs4yiwDZGYWYLGFSLci_Uujp3SRMLEj_4XvlsX-4CwOXB301_u6Te5BXyo29dufZHy6CJUDEA0S36E5NYeGR-zetD6eVGs0ZbddPf_G_kv_kZvfDonegmV0w4VpvnEMlmoU1WvbRNNo22Y8rUF21Icy9fuuUZZvl4QGXlycoo5OYy_fD0AXf5v18kZAztV7_FFRUqyN-8qmuWAQpOHCp7cDtW-SzmcC6wfkP9RdNkOtuVSnc9uwyt9sCuwcaGvJjQo9XIqg",
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
