import { IContactList } from "redux/contact/contactTypes";

// export const sortByPhoneAndName = (contacts: IContactList[]) => {
// 	const sortedByPhone = contacts?.sort((a: any, b: any) => {
// 		if (a?.phone === null && b?.phone !== null) return 1;
// 		if (a?.phone !== null && b?.phone === null) return -1;
// 		return a?.phone?.localeCompare(b.phone);
// 	});

// 	const filteredObjects = sortedByPhone?.filter((ct: any) => ct?.phone !== null);

// 	const sortedByName = filteredObjects?.sort((a: any, b: any) => {
// 		if (a?.first_name === null && b?.first_name !== null) return 1;
// 		if (a?.first_name !== null && b?.first_name === null) return -1;
// 		return a?.first_name?.localeCompare(b?.first_name);
// 	});

// 	const filteredObjects2 = filteredObjects?.filter((ct) => ct?.first_name !== null);
// 	const sortedByEmail = filteredObjects2?.sort((a: any, b: any) => {
// 		if (a?.email === null && b?.email !== null) return 1;
// 		if (a?.email !== null && b?.email === null) return -1;
// 		return a?.email?.localeCompare(b?.email);
// 	});

// 	console.log([...sortedByPhone, ...sortedByName, ...sortedByEmail]);

// 	return [...sortedByPhone, ...sortedByName, ...sortedByEmail];
// };
