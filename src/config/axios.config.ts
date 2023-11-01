import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./app.config";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import { getCookie } from "utils";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	headers: {
		Authorization:
			getCookie("id_token") ||
			"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiIwOGY5MWFlMi05OTI3LTRjYzktYWRlMi0xMWQ4OWU0ZDRlNWUiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTg4NjExMDcsImlhdCI6MTY5ODgzMjMwNywiYXV0aF90aW1lIjoxNjk4ODMyMzA2LCJnaXZlbl9uYW1lIjoiU2hpdmFtIiwiZmFtaWx5X25hbWUiOiJHdXB0YSIsImV4dGVuc2lvbl9jb21wYW55IjoiU3RhcnQgWCBMYWJzIiwiZW1haWxzIjpbImdzaGl2YW1Ac3RhcnR4bGFicy5pbiJdLCJ0aWQiOiJkZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkiLCJhdF9oYXNoIjoialZBOGVmVVFueXcyTlM5TDhtNHV3ZyIsIm5iZiI6MTY5ODgzMjMwN30.TZRea_yqgHL00SAv3kQo-_nh5k8E_BljgMSZI_pgVxjPmSXSMhbHGe4o0ovWO2dd6avDmiRjiEg4A-pWeVQft1546oPqk8IH2NORZh_1itUH0Y_rnmfiCvte8AT6zI9fSdSJG4FYk8ZY6kF5wandxbBacSpPSIiMX43_G_4UX-7KFo1uXuPriO_uSk4pZ7Pf5h-K9wf8ztjmlLhhGZXxECZ8uB-uoKV4z7mBGekIKssOchKYfc6SuabO8vucEoRNLYl-Pb2oyPvpTTgCFlA3IL8c4swlFShKmZJGQ6u6DGrQ5lyFnhdFGAJPzzH3isw1n8Og2dts-Gj0bBlEHQJZkw",
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
