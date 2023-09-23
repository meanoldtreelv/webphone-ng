import { IContactList } from "redux/contact/contactTypes";

export const _sortContacts = (contacts: IContactList[]) => {
	[...contacts]?.sort((a, b) => {
		const firstNameA = a.first_name || ""; // Handle null first name
		const firstNameB = b.first_name || ""; // Handle null first name

		if (firstNameA === "" && firstNameB === "") {
			return 0; // If both first names are null, consider them equal
		} else if (firstNameA === "") {
			return 1; // Put null values at the end
		} else if (firstNameB === "") {
			return -1; // Put null values at the end
		}

		return firstNameA.localeCompare(firstNameB);
	});
};