import { apiService } from './api';

export const callbackService = apiService.injectEndpoints({
    endpoints: (build) => ({
        getInstances: build.query({
            query: () => ({
                method: 'GET',
                url: 'system/instances'
            }),
        }),
        getInstancesBulks: build.query({
            query: (uuid) => ({
                method: 'GET',
                url: `/instances/${uuid}/bulks/extensions?filter_by=softphone&by_user=on`
            }),
        })
    })
});

export const { useGetInstancesQuery, useLazyGetInstancesBulksQuery } = callbackService;