import { apiService } from './api';

export const contactService = apiService.injectEndpoints({
    endpoints: (build) => ({
        getContacts: build.query({
            query: () => ({ method: 'GET', url: '/company/directory/contacts'}),
        })
    })
});

export const { useGetContactsQuery } = contactService;