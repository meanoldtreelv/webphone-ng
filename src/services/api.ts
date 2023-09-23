import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { axiosBaseQuery } from "config/axios.config";

export const apiService = createApi({
	baseQuery: axiosBaseQuery(),
	endpoints: () => ({}),
});
