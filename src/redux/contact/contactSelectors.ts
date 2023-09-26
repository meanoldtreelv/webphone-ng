import { RootState } from "./../../redux/store";

export const contactLists = (state: RootState) => state.contact.contactList;
export const addContactOpen = (state: RootState) => state.contact.addContactPopUpOpen;
export const editContactNumber = (state: RootState) => state.contact.editContactNumber;
export const deleteContactOpen = (state: RootState) => state.contact.deleteContactPopUpOpen;
export const contactSelectd = (state: RootState) => state.contact.selectedContactOpen;
export const selectedContactData = (state: RootState) => state.contact.selectedContact;
