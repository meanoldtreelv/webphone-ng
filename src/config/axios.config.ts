import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiIwOGY5MWFlMi05OTI3LTRjYzktYWRlMi0xMWQ4OWU0ZDRlNWUiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTk5Njg3MjYsImlhdCI6MTY5OTkzOTkyNiwiYXV0aF90aW1lIjoxNjk5OTM5OTI1LCJnaXZlbl9uYW1lIjoiU2hpdmFtIiwiZmFtaWx5X25hbWUiOiJHdXB0YSIsImV4dGVuc2lvbl9jb21wYW55IjoiU3RhcnQgWCBMYWJzIiwiZW1haWxzIjpbImdzaGl2YW1Ac3RhcnR4bGFicy5pbiJdLCJ0aWQiOiJkZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkiLCJhdF9oYXNoIjoiUHNNbDdHMWFTaTRVUXo4T3lrN2g2QSIsIm5iZiI6MTY5OTkzOTkyNn0.ZDp41Tlcohq4lz5H-ChVtKp4mpuR7wbcZd3LBv1BgHTIFiQZWr6VipoTNUeAzeJlmVHfnMrBdJqgMt9ZSU9eWXyJN3qQqcQu0qyIztZ3IDGQG8ypviapcU0RA2ntsxKcAvuirT__wD0ycaK4qBJ6S0zmXMkThH019uI8hEVjdXClZEd7oR_FeItSFzItLzg8B2tXuy9gVFjgukHKe75VDIB5B7Gz6gDiCQgYZjOswdzGmkBnd_QCOHNAnmCmTp_zqNbnNBFkhMxlsq-R-YwK1jR7v_OPA6EdbfwUe2ssBxifNF7uFOUNQdQxoZm6fyvcYFlVueDlNteNLhVPO9TM2g",
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
