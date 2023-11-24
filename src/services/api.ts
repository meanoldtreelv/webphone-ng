import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery, clioAxiosBaseQuery } from "config/axios.config";

export const apiService = createApi({
	baseQuery: axiosBaseQuery(),
	endpoints: () => ({}),
});

export const clioApiService = createApi({
	baseQuery: clioAxiosBaseQuery(),
	endpoints: () => ({}),
});
