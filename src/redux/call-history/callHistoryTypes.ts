export interface CallHistoryCDR {
	cdr: {
		billsec: number;
		direction: null;
		dst: string;
		// dst: number;
		duration: number;
		durationms: number;
		id: string;
		network: string;
		origalias: string;
		pbx_cnam: null;
		pbx_cnum: null;
		pbx_dcontext: null;
		pbx_did: null;
		pbx_dst: null;
		pbx_lastapp: null;
		pbx_linkedid: null;
		pbx_outbound_cnam: null;
		pbx_outbound_cnum: null;
		pbx_sequence: null;
		pbx_uniqueid: null;
		rate: number;
		recno: number;
		relcause: number;
		releasecausecode: number;
		ringtime: number;
		src: string;
		starttime: string;
		status: string;
		termalias: string;
	};
	recording: {
		transcription_id: string;
		url: string;
	};
}

export interface ICallHistoryState {
	callHistory: CallHistoryCDR[];
	selectedCallHistory: CallHistoryCDR;
}
