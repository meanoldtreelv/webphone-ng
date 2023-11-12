import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiIwOGY5MWFlMi05OTI3LTRjYzktYWRlMi0xMWQ4OWU0ZDRlNWUiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTk0NjgyOTksImlhdCI6MTY5OTQzOTQ5OSwiYXV0aF90aW1lIjoxNjk5NDM5NDk4LCJnaXZlbl9uYW1lIjoiU2hpdmFtIiwiZmFtaWx5X25hbWUiOiJHdXB0YSIsImV4dGVuc2lvbl9jb21wYW55IjoiU3RhcnQgWCBMYWJzIiwiZW1haWxzIjpbImdzaGl2YW1Ac3RhcnR4bGFicy5pbiJdLCJ0aWQiOiJkZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkiLCJhdF9oYXNoIjoiNVBBbG41YXM4VGVZZUlzRkFpREhzdyIsIm5iZiI6MTY5OTQzOTQ5OX0.YaqxYFBXVPzez3MSdKMQnXleT5obwmTkS3cMsUl1qS-Cg8cLQNlbVwbWI0kpFWpFnRmWXbIwh8BkyPVcgpPaypNnhrGZQN4VPKVypi_ANqMPOUdn7CAUJJtPl_VodFPpcX5t6LLT2NdonTKnNEH3zBzjB-Aw0CuaaYC4bXgE9NkwEs4E-9xB5s2KjMj_jLg32Qo8mZaQduw-aAHpuEqVjUbIRwRNPRyzaQncv9dlztvQn4JA9kJLClBFfSyH2KqzcOhz-lBE9N22kYdROXkaduh-2FU_GJXs5Em0Qo4-m7wSHNqKlnq1lzJYceSPrWtFZpClkcHK_00Y2bAsYE3dew",
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
