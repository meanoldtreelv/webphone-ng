import { RootState } from "./../../redux/store";

export const callHistory = (state: RootState) => state.callHistory.callHistory;
export const selectedCallHistory = (state: RootState) => state.callHistory.selectedCallHistory;
