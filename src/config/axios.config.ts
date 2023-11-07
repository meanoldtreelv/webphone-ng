import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiIwOGY5MWFlMi05OTI3LTRjYzktYWRlMi0xMWQ4OWU0ZDRlNWUiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTkzNTIxNTksImlhdCI6MTY5OTMyMzM1OSwiYXV0aF90aW1lIjoxNjk5MzIzMzU4LCJnaXZlbl9uYW1lIjoiU2hpdmFtIiwiZmFtaWx5X25hbWUiOiJHdXB0YSIsImV4dGVuc2lvbl9jb21wYW55IjoiU3RhcnQgWCBMYWJzIiwiZW1haWxzIjpbImdzaGl2YW1Ac3RhcnR4bGFicy5pbiJdLCJ0aWQiOiJkZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkiLCJhdF9oYXNoIjoiUU9GbVdVN0hfOVY4NzY3ckVmWklsdyIsIm5iZiI6MTY5OTMyMzM1OX0.ccauAiTx41KHJttW-z5dsWy6Pk-4PLw8hCAWVCqGS9bIp2p0Cp2T0GIR99Y7GVtSeNbv8klCWDWOemnNd5c0_OGBx9x-7XYgnsue3Fp_kGDuagu3Z3ljyASywqKdcgBO60NeuF47Ie1er9_nL6aTxpNEXf6cEsZjcmByhSOZgUD159qMhYEpvZNlnJ0SeqS23LkvrE9XbHaNa-K_XyUTcxJpt8rwH0PbbfaTIRITt1V_lvC3UiUcI95Pb6_6_2UDu_FbEXIjRmMyDnA4fXv0jPRIMPKxAhKrE0v-WR5FqIQhWBb9EmP5RecC6bpHoT4PD695yIuSuZw5Xx1R1xemhA",
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
