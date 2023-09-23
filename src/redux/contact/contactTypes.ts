// update this interface according to the contact's list type
export type IContactList = {
    id: string;
    company_id: string;
    first_name: string;
    last_name: string;
    phone: string;
    fax: string;
    email: string;
    extension: {
        id: string;
        number: number;
        name: string;
        description: string;
    };
    group: {
        id: string;
        name: string;
        description: string;
    };
    is_user: boolean;
    is_deleted: boolean;
    birthday: string;
    salutation: string;
    description: string;
    mailing_address: string;
    address: {
        country: string;
        state: string;
        city: string;
        street: string;
        zipcode: string;
    };
    job_details: {
        position: string;
        department: string;
        reports_to: string;
    };
    organization_details: {
        organization: string;
        parent_organization: string;
    }
}

export interface IContactState {
    addContactPopUpOpen: boolean;
    deleteContactPopUpOpen: boolean;
    selectedContactOpen: boolean;
    contactList: (IContactList[] | null);
    selectedContact: IContactList;
    deleteContactId: string;
    editContactNumber: string | null;
}