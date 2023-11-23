import { apiService } from "./api";

// https://ssp-backend.ringplan.com/texting/v2/conversations?page=1&per_page=100&from_numbers=7007464886,7007464887&search=8123772212&sort=last_activity
export const conversationsService = apiService.injectEndpoints({
	endpoints: (build) => ({
		getConversationsList: build.query({
			query: () => ({ method: "GET", url: `/texting/v2/conversations` }),
		}),
	}),
});

export const { useLazyGetConversationsListQuery } = conversationsService;
