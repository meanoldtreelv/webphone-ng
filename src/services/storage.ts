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
	}),
});

export const { useLazyPostFilesQuery, useLazyUploadFilesQuery } = storageService;
