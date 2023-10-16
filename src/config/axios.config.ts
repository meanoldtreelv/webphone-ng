import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTczOTIxMTgsImlhdCI6MTY5NzM2MzMxOCwiYXV0aF90aW1lIjoxNjk3MzYzMzE3LCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6Im9aVzVlNHd1Wk9IcU5GOG9FYlZabnciLCJuYmYiOjE2OTczNjMzMTh9.ZRPQIwSt_ilm7I2HsXpzO2_ZP0CdQmy3XWcOvUFWskWdh0bqpQKkprQQP7aoUlr1HBfVrSs7m_T47kRe8HnxrmajbMWahgD1TZeELYdgY4tPSMgpucofc4OVFIXH4vJTJvP1x-7kCLdbCad7X6jINbk4H14zDmx9Efn8wMW-R3GkpnvbkGzujYblXBAzB2fST4oHhTPsoJlSePMCmp41hcd8-Xr46dm1MnqPocJ3mj_xHT8PeMioTfCO42UKshCeImXFBbJfLR9NfFr6V_14ev2bCw6PrUgiqrxD5OTAINO45RhvyYnXNIX6RgNMVcmhFzNMwFaO7Itv6AEPI_uixQ",
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
