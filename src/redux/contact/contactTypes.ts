// update this interface according to the contact's list type
type IContactList = {
    id: number;
	first_name: string;
	last_name: string;
}

export interface IContactState {
    addContactPopUpOpen: boolean;
    deleteContactPopUpOpen: boolean;
    selectedContactOpen: boolean;
    contactList: IContactList[];
    selectedContact: [];
    deleteContactId: string;
    editContact: boolean;
}