import { apiService } from "./api";

export const extensionService = apiService.injectEndpoints({
	endpoints: (build) => ({
		getExtensions: build.query({
			query: (id) => ({ method: "GET", url: `/account/${id}/extensions` }),
		}),
		getAllExtensions: build.query({
			query: (id) => ({ method: "GET", url: `/instances/${id}/bulks/extensions` }),
		}),
		getActiveExtensions: build.query({
			query: (id) => ({ method: "GET", url: `/instances/${id}/bulks/extensions?by_user=on` }),
		}),
	}),
});

export const { useGetExtensionsQuery, useGetAllExtensionsQuery, useGetActiveExtensionsQuery } = extensionService;
