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
	}),
});

export const { useLazyGetMeetQuery, useLazyCreateMeetQuery } = meetService;
