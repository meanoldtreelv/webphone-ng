import { apiService } from "./api";
import { getCookie } from "utils";

export const tokenService = apiService.injectEndpoints({
	endpoints: (build) => ({
		refreshToken: build.query({
			query: () => ({
				method: "POST",
				url: "/refresh-token",
				data: {
					access_token: getCookie("id_token"),
					refresh_token: getCookie("refresh_token"),
				},
			}),
		}),
	}),
});

export const { useLazyRefreshTokenQuery } = tokenService;
