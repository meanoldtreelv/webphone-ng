import { apiService } from "./api";

export const contactService = apiService.injectEndpoints({
	endpoints: (build) => ({
		getContacts: build.query({
			query: () => ({
				method: "GET",
				url: "/company/directory/contacts",
			}),
		}),
		getContact: build.query({
			query: (id) => ({
				method: "GET",
				url: `/company/directory/contacts/${id}`,
			}),
		}),
		createContact: build.query({
			query: (data) => ({
				method: "POST",
				url: "/company/directory/contacts",
				data,
			}),
		}),
		updateContact: build.query({
			query: (data) => ({
				method: "PUT",
				url: `/company/directory/contacts/${data.id}`,
				data,
			}),
		}),
		deleteContact: build.query({
			query: (id) => ({
				method: "DELETE",
				url: `/company/directory/contacts/${id}`,
			}),
		}),
	}),
});

export const {
	useLazyGetContactsQuery,
	useLazyGetContactQuery,
	useLazyUpdateContactQuery,
	useLazyDeleteContactQuery,
	useLazyCreateContactQuery,
} = contactService;
