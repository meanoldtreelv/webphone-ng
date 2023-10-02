import { apiService } from "./api";

export const voicemailService = apiService.injectEndpoints({
	endpoints: (build) => ({
		getVoicemails: build.query({
			query: () => ({
				method: "GET",
				url: "/voicemail/messages",
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
	useGetVoicemailsQuery,
	useLazyDeleteVoicemailQuery,
	useLazyDeleteVoicemailsQuery,
	useLazyUpdateVoicemailsQuery,
} = voicemailService;
