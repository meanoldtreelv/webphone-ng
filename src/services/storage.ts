import { apiStorageService } from "./api";

export const storageService = apiStorageService.injectEndpoints({
	endpoints: (build) => ({
		postFiles: build.query({
			query: (data) => ({
				method: "POST",
				url: `/files`,
				data,
			}),
		}),
		uploadFiles: build.query({
			query: ({ id, data }) => ({
				method: "POST",
				url: `/files/${id}/upload`,
				data,
			}),
		}),
		representationFiles: build.query({
			query: ({ id, data }) => ({
				method: "POST",
				url: `/conversion/files/${id}/representation`,
				data,
			}),
		}),
	}),
});

export const { useLazyPostFilesQuery, useLazyUploadFilesQuery, useLazyRepresentationFilesQuery } = storageService;
