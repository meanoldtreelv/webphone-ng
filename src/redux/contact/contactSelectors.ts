import { RootState } from "./../../redux/store";

export const contactLists = (state: RootState) => state.contact.contactList;
export const addContactOpen = (state: RootState) => state.contact.addContactPopUpOpen;
export const editContactOpen = (state: RootState) => state.contact.editContact;
export const deleteContactOpen = (state: RootState) => state.contact.deleteContactPopUpOpen;
export const contactSelectd = (state: RootState) => state.contact.selectedContactOpen;
