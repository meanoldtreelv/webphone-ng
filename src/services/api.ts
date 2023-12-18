import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery, axiosStorageBaseQuery } from "config/axios.config";

export const apiService = createApi({
	reducerPath: "apiService",
	baseQuery: axiosBaseQuery(),
	endpoints: () => ({}),
});

export const apiStorageService = createApi({
	reducerPath: "apiStorageService",
	baseQuery: axiosStorageBaseQuery(),
	endpoints: () => ({}),
});
