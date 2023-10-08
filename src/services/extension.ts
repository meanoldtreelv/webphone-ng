import { apiService } from './api';

export const extensionService = apiService.injectEndpoints({
    endpoints: (build) => ({
        getExtensions: build.query({
            query: (id) => ({ method: 'GET', url: `/account/${id}/extensions`}),
        })
    })
});

export const { useGetExtensionsQuery } = extensionService;