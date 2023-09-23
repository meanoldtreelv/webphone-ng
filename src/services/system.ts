import { apiService } from './api';

export const systemService = apiService.injectEndpoints({
    endpoints: (build) => ({
        getAccount: build.query({
            query: () => ({ method: 'GET', url: '/system/account'}),
        })
    })
});

export const { useGetAccountQuery } = systemService;