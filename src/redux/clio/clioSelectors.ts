import { RootState } from "./../../redux/store";

export const isClioLoggedIn = (state: RootState) => state.clio.isClioLoggedIn;
export const isClioActivated = (state: RootState) => state.clio.isClioActivated;
export const contactDetails = (state: RootState) => state.clio.contactDetails;
export const isAddNoteOpen = (state: RootState) => state.clio.isAddNoteOpen;
export const isAddTaskOpen = (state: RootState) => state.clio.isAddTaskOpen;
export const isNewExpenseOpen = (state: RootState) => state.clio.isNewExpenseOpen;
export const isNewTimeEntryOpen = (state: RootState) => state.clio.isNewTimeEntryOpen;
export const contact = (state: RootState) => state.clio.contact;
export const matter = (state: RootState) => state.clio.matter;
