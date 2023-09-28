import { apiService } from './api';

export const contactService = apiService.injectEndpoints({
    endpoints: (build) => ({
        getContacts: build.query({
            query: () => ({ method: 'GET', url: '/company/directory/contacts'}),
        }),
        getContact: build.query({
            query: (id) => ({method: 'GET', url: `/company/directory/contacts/${id}`})
        })
    })
});

export const { useGetContactsQuery, useGetContactQuery } = contactService;
