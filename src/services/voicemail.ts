import { apiService } from "./api";

export const voicemailService = apiService.injectEndpoints({
	endpoints: (build) => ({
		getVoicemails: build.query({
			query: (queries: string) => ({
				method: "GET",
				url: `/voicemail/messages?${queries}`,
			}),
		}),
		deleteVoicemail: build.query({
			query: (id) => ({
				method: "DELETE",
				url: `/voicemail/messages/${id}`,
			}),
		}),
		deleteVoicemails: build.query({
			query: (data) => ({
				method: "POST",
				url: "/voicemail/messages/bulk-delete",
				data,
			}),
		}),
		updateVoicemails: build.query({
			query: (data) => ({
				method: "PATCH",
				url: "/voicemail/messages/bulk-update",
				data: {
					listened: true,
					message_ids: data,
				},
			}),
		}),
	}),
});

export const {
	useLazyGetVoicemailsQuery,
	useLazyDeleteVoicemailQuery,
	useLazyDeleteVoicemailsQuery,
	useLazyUpdateVoicemailsQuery,
} = voicemailService;