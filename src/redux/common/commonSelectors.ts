import { RootState } from "./../../redux/store";

export const modalState = (state: RootState) => state.common.modal;
export const playPauseState = (state: RootState) => state.common.playPause;
export const notification = (state: RootState) => state.common.notification;
export const simpleNotification = (state: RootState) => state.common.simpleNotification;
export const loader = (state: RootState) => state.common.loader;
export const extChange = (state: RootState) => state.common.extChange;
