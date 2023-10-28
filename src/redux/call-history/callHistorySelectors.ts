import { RootState } from "./../../redux/store";

export const callHistory = (state: RootState) => state.callHistory.callHistory;
export const selectedCallHistory = (state: RootState) => state.callHistory.selectedCallHistory;
export const queries = (state: RootState) => state.callHistory.queries;
export const strQueries = (state: RootState) => state.callHistory.strQueries;
