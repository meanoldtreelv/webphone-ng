import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery, axiosStorageBaseQuery } from "config/axios.config";

export const apiService = createApi({
	baseQuery: axiosBaseQuery(),
	endpoints: () => ({}),
});

export const apiStorageService = createApi({
	baseQuery: axiosStorageBaseQuery(),
	endpoints: () => ({}),
});
