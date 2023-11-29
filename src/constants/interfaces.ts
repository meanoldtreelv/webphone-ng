import { ReactNode, CSSProperties, MouseEvent, ChangeEvent, ReactElement } from "react";

export interface IButton {
	children: ReactNode;
	icon?: ReactNode;
	fill?: boolean;
	styles?: CSSProperties;
	border?: boolean;
	onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export interface IInput {
	onChange?: (event: ChangeEvent<HTMLInputElement>) => {} | void;
	placeholder?: string;
	required?: boolean;
	type?: string;
	icon?: ReactElement;
	errorMsg?: string;
	value?: string | number;
	disabled?: boolean;
	underlined?: boolean;
	label?: string;
}

export interface IErrorMessage {
	msg: string;
}

export interface ILogo {
	type?: "ri" | "ri-voice" | "ri-fill";
}

export interface IPromptDialog {
	type: "info" | "warning" | "success";
	title: string;
	children: ReactNode;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	actionBtnTxt: string;
	loading: boolean;
}

export interface IAuthWrapper {
	children: ReactNode;
}

export interface IAuthState {
	isAuthenticated: boolean;
}

export interface IContactCard {
	id: string;
	first_name: string;
	last_name: string;
	phone: string;
	email: string;
	fax: string;
	clicked: () => void;
}

export interface IHeader {
	filterClicked: (filter: boolean) => void;
	deleteClicked: (del: boolean) => void;
	dateClicked: (filter: boolean) => void;
	search: (search: string) => void;
	filterSilder: boolean;
	filterDate: boolean;
}

export interface IExtensionList {
	data: {
		extension: number;
	};
}

export interface IIcon {
	color?: string;
}
