export interface ICallState {
    dialer: boolean;
    callInProgress: boolean;
    addCall: boolean;
    transferCall: boolean;
    callEnding: boolean;
    callNumber: string;
}