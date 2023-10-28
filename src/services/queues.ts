import { apiService } from "./api";

export const extensionService = apiService.injectEndpoints({
	endpoints: (build) => ({
		getAllQueues: build.query({
			query: (page) => ({ method: "GET", url: `/pbx/queues/statuses?page=${page}&per_page=300` }),
		}),
		getMyQueues: build.query({
			query: (id) => ({ method: "GET", url: `/pbx/queues/${id}/status` }),
		}),
	}),
});

export const { useGetAllQueuesQuery, useGetMyQueuesQuery } = extensionService;
