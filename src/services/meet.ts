import { apiService } from "./api";

export const meetService = apiService.injectEndpoints({
	endpoints: (build) => ({
		getMeet: build.query({
			query: (dateFrom: string, dateTo: string) => ({
				method: "GET",
				url: `/meet/v2/events?date_from=${dateFrom}&date_to=${dateTo}`,
			}),
		}),
		createMeet: build.query({
			query: (data) => ({
				method: "POST",
				url: "/meet/v2/events",
				data,
			}),
		}),
		deleteMeet: build.query({
			query: (event_id) => ({
				method: "DELETE",
				url: `/meet/v2/events/${event_id}`,
			}),
		}),
		getCalendar: build.query({
			query: () => ({
				method: "GET",
				url: `/meet/app/calendar`,
			}),
		}),
	}),
});

export const { useLazyGetMeetQuery, useLazyCreateMeetQuery, useLazyDeleteMeetQuery, useLazyGetCalendarQuery } =
	meetService;
