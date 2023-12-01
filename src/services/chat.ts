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
		getMessagesLists: build.query({
			query: ({ id, queries }) => ({
				method: "GET",
				url: `/texting/conversations/${id}/messages?${queries}`,
			}),
		}),
		sendOutboundMessage: build.query({
			query: ({ id, data }) => ({
				method: "POST",
				url: `/texting/conversations/${id}/messages/publish`,
				data,
			}),
		}),
		deleteMessages: build.query({
			query: ({ conversation_id, message_id_list }) => ({
				method: "DELETE",
				url: `/texting/conversations/${conversation_id}/messages?${message_id_list}`,
			}),
		}),
	}),
});

export const {
	useLazyGetConversationListsQuery,
	useLazyGetMessagesListsQuery,
	useLazySendOutboundMessageQuery,
	useLazyDeleteMessagesQuery,
} = chatService;
