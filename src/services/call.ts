import { getCookie } from "typescript-cookie";
import { apiService } from "./api";

export const callService = apiService.injectEndpoints({
	endpoints: (build) => ({
		getCallHistories: build.query({
			query: (queries) => ({
				method: "GET",
				url: `/cdrs/v3/cdrs?${queries}&sort=-starttime&extension=${getCookie("ext_user_id")}`,
			}),
		}),
	}),
});

export const { useLazyGetCallHistoriesQuery } = callService;
