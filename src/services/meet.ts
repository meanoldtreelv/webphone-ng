import { apiService } from "./api";

export const meetService = apiService.injectEndpoints({
	endpoints: (build) => ({
		getMeet: build.query({
			query: ({ dateFrom, dateTo, perPage, page }) => ({
				method: "GET",
				url: `https://ssp-backend.ringplan.com/meet/v2/events?date_from=${dateFrom}&date_to=${dateTo}&per_page=${perPage}&page=${page}`,
			}),
		}),
		createMeet: build.query({
			query: (data) => ({
				method: "POST",
				url: "/meet/v2/events",
				data,
			}),
		}),
		editMeet: build.query({
			query: ({ event_id, data }) => ({
				method: "PATCH",
				url: `https://ssp-backend.ringplan.com/meet/v2/events/${event_id}`,
				data,
			}),
		}),

		deleteMeet: build.query({
			query: (event_id) => ({
				method: "DELETE",
				url: `/meet/v2/events/${event_id}`,
			}),
		}),
		getMeetFiles: build.query({
			query: (id) => ({
				method: "GET",
				url: `/meet/v2/meeting/files/${id}`,
			}),
		}),

		getCalendar: build.query({
			query: () => ({
				method: "GET",
				url: `/meet/app/calendar`,
			}),
		}),
		getGoogleCalendar: build.query({
			query: () => ({
				method: "GET",
				url: `/meet/app/calendar/get-auth-url`,
			}),
		}),
		getOutlookCalendar: build.query({
			query: () => ({
				method: "GET",
				url: `/meet/app/outlook/get-auth-url`,
			}),
		}),
		deleteGoogleCalendar: build.query({
			query: (data) => ({
				method: "DELETE",
				url: `/meet/google/revoke`,
				data,
			}),
		}),
		deleteOutlookCalendar: build.query({
			query: (data) => ({
				method: "DELETE",
				url: `/meet/outlook/revoke`,
				data,
			}),
		}),
	}),
});

export const {
	useLazyGetMeetQuery,
	useLazyCreateMeetQuery,
	useLazyEditMeetQuery,
	useLazyDeleteMeetQuery,
	useLazyGetMeetFilesQuery,
	useLazyGetCalendarQuery,
	useLazyGetGoogleCalendarQuery,
	useLazyGetOutlookCalendarQuery,
	useLazyDeleteGoogleCalendarQuery,
	useLazyDeleteOutlookCalendarQuery,
} = meetService;
