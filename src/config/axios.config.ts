import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTkzMDk2MDUsImlhdCI6MTY5OTI4MDgwNSwiYXV0aF90aW1lIjoxNjk5MjgwODA0LCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6IkNqWnZBRGdqMkkxbnVhaWN6V2lVcWciLCJuYmYiOjE2OTkyODA4MDV9.YpbfVRxccVn647R9qBxe0qsU3xsNiqIn6BrHzItZP8awg0CBHZsrALNoLJfnErV8fxMWvQrwl4nlz8gOkEqDTGUMTluz2k1vHTnj4_2icIqJSlAtoPQ88vcHa5xP39GiLrenvyWfTIr4sbQ6x4HnwXIalKQtJL1Ux2sINRSJwtjPUWY6FbRgSvXnqL1PqR4j66NZPgPzxHLdm1MFSvrS5b7wZDbFxqB612lkbntIeJZNd0SQ9ZseCNMPPqc3Z6d0c64NObF1i5KXVUOJBqwINzw9lKhwKGIGzmd4lXzjl7tdOvIntySTnH_oFSeItLe2CrJN1voRDajltzMYPiFeJQ",
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

export default axiosInstance;
