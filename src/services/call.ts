import { apiService } from './api';

export const callService = apiService.injectEndpoints({
    endpoints: (build) => ({
        getCallHistory: build.query({
            query: (queries) => ({ method: 'GET', url: `/cdrs/v3/cdrs?${queries}`}),
        })
    })
});

export const { useLazyGetCallHistoryQuery } = callService;