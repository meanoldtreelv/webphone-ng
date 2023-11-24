import { clioApiService } from "./api";

export const clioService = clioApiService.injectEndpoints({
	endpoints: (build) => ({
		getContact: build.query({
			query: () => ({
				method: "GET",
				url: `/contacts.json`,
			}),
		}),
	}),
});

export const { useLazyGetContactQuery } = clioService;
