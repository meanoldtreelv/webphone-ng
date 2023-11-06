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
		editExtension: build.query({
			query: (req) => ({ method: "PATCH", url: `/instances/${req.instance_id}/bulks/extensions/${req.extension_id}`, data:req.data}),
		}),
		getAvailableNumbers: build.query({
			query: (instance_id) => ({ method: "GET", url: `/instances/${instance_id}/dids/callerids`}),
		}),
	}),
});

export const { useGetExtensionsQuery, useGetAllExtensionsQuery, useGetActiveExtensionsQuery, useLazyEditExtensionQuery, useGetAvailableNumbersQuery } = extensionService;
