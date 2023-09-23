import { RootState } from "./../../redux/store";

export const callDailer = (state: RootState) => state.calling.dialer;
export const callInProgress = (state: RootState) => state.calling.callInProgress;
export const transferCall = (state: RootState) => state.calling.transferCall;
export const addCall = (state: RootState) => state.calling.addCall;
export const callEnding = (state: RootState) => state.calling.callEnding;
export const callNumber = (state: RootState) => state.calling.callNumber;
