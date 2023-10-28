import { apiService } from './api';

export const statusService = apiService.injectEndpoints({
    endpoints: (build) => ({
        setStatus: build.query({
            query: (data) => ({ method: 'PATCH', url: `/status/v2/current-user`, data: data}),
        }),
        getStatus: build.query({
            query: (id) => ({ method: 'GET', url: `/statuses/v2/users?user_id=${id}`}),
        })
    })
});

export const { useLazySetStatusQuery, useLazyGetStatusQuery} = statusService;