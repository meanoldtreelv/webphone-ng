export interface IVoicemail {
	_id: string;
	company_id: string;
	extension_destination: number;
	extension_destination_id: number;
	extension_source: number;
	pbx: string;
	pbx_msg_id: string;
	listened: boolean;
	source_representation_name: string;
	time_received: string;
	transcription: string;
	voicemail_email: string;
	voicemail_file: {
		duration: number;
		id: string;
		name: string;
		link: string;
		size: number;
	};
}

export interface IVoicemailState {
	selectedVoicemail: {
		title: string;
		time: string;
		duration: number;
		link: string;
	};
	moreOptVoicemailId: string;
	selectVoicemails: boolean;
	selectedVoicemailList: string[];
}
