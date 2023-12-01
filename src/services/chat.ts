import { getCookie } from "typescript-cookie";
import { apiService } from "./api";

export const chatService = apiService.injectEndpoints({
	endpoints: (build) => ({
		getConversationLists: build.query({
			query: (queries) => ({
				method: "GET",
				url: `/texting/v2/conversations?${queries}`,
			}),
		}),
	}),
});

export const { useLazyGetConversationListsQuery } = chatService;
