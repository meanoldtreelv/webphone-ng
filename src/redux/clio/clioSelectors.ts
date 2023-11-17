import { RootState } from "./../../redux/store";

export const isClioActivated = (state: RootState) => state.clio.isClioActivated;
export const contactDetails = (state: RootState) => state.clio.contactDetails;
