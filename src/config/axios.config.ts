import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiIwOGY5MWFlMi05OTI3LTRjYzktYWRlMi0xMWQ4OWU0ZDRlNWUiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTc3MjYyNDQsImlhdCI6MTY5NzY5NzQ0NCwiYXV0aF90aW1lIjoxNjk3Njk3NDQyLCJnaXZlbl9uYW1lIjoiU2hpdmFtIiwiZmFtaWx5X25hbWUiOiJHdXB0YSIsImV4dGVuc2lvbl9jb21wYW55IjoiU3RhcnQgWCBMYWJzIiwiZW1haWxzIjpbImdzaGl2YW1Ac3RhcnR4bGFicy5pbiJdLCJ0aWQiOiJkZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkiLCJhdF9oYXNoIjoiV25jdHpsR3FMWkpIZ05Ia2t3YzlWQSIsIm5iZiI6MTY5NzY5NzQ0NH0.cilxBcj7RMQIdgl1d0of0kQN-tkWHL6uP4vMYfUu3wf1NGyTELPmG-vpkGC2vvaFAbguTf5OzE_u1sIX_hH56GON5GYMkYbQucvlZ0l2wIu1Bnl8V1gtF1-g-nP_2FnVXE58xK2RASf5Brml5rHDq5ULFwR45XZ7odD9ArdebxqRaCOFx0K3LawEApd3TgPPGDjhFad7RGCasAC3AP2cbNDXGiiFbEtBpSS5xxprUVDzbl1QgmaSKV1VYHK5EjnoB70oBNyk-Z042tx4Lkn2wBI8oZcq9MlCIGBFvB-vRxJHzsoGTiRdlNR1Erx6CAPp7ju8TMYSOHRdiifGBLAW4g",
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
