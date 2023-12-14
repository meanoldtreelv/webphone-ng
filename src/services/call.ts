import { apiService } from "./api";

export const callService = apiService.injectEndpoints({
	endpoints: (build) => ({
		getCallHistories: build.query({
			query: (queries) => ({
				method: "GET",
				url: `/cdrs/v3/cdrs?${queries}&sort=-starttime&extension=${localStorage.getItem("ext_user_id")}`,
			}),
		}),
	}),
});

export const { useLazyGetCallHistoriesQuery } = callService;
