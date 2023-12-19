import { apiService } from "./api";

export const chatService = apiService.injectEndpoints({
	endpoints: (build) => ({
		getConversationLists: build.query({
			query: (queries) => ({
				method: "GET",
				url: `/texting/v2/conversations?${queries}`,
			}),
		}),
		createConversationObject: build.query({
			query: (data) => ({
				method: "POST",
				url: `/texting/v2/conversations`,
				data,
			}),
		}),
		deleteConversationObject: build.query({
			query: (id) => ({
				method: "DELETE",
				url: `/texting/conversations/${id}`,
			}),
		}),
		pinUnpinConversation: build.query({
			query: ({ id, data }) => ({
				method: "POST",
				url: `/texting/v2/conversations/${id}/pin`,
				data,
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
		getTextingContactLists: build.query({
			query: (queries) => ({
				method: "GET",
				url: `/texting/contacts?${queries}`,
			}),
		}),
		createTextingContact: build.query({
			query: (data) => ({
				method: "POST",
				url: `/texting/contacts`,
				data,
			}),
		}),
		getTextingNumbers: build.query({
			query: () => ({
				method: "GET",
				url: `/texting/numbers`,
			}),
		}),
		editTextingContact: build.query({
			query: ({ id, data }) => ({
				method: "PUT",
				url: `/texting/contacts/${id}`,
				data,
			}),
		}),
	}),
});

export const {
	useLazyGetConversationListsQuery,
	useLazyCreateConversationObjectQuery,
	useLazyDeleteConversationObjectQuery,
	useLazyPinUnpinConversationQuery,
	useLazyGetMessagesListsQuery,
	useLazySendOutboundMessageQuery,
	useLazyDeleteMessagesQuery,
	useLazyGetTextingContactListsQuery,
	useLazyCreateTextingContactQuery,
	useLazyGetTextingNumbersQuery,
	useLazyEditTextingContactQuery,
} = chatService;
