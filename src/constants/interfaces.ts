import {ReactNode, CSSProperties, MouseEvent, ChangeEvent, ReactElement} from 'react';

export interface IButton {
	children: ReactNode;
	icon?: ReactNode;
	fill?: boolean;
	styles?: CSSProperties;
	border?: boolean;
	onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export interface IInput {
	onChange?: (event: ChangeEvent<HTMLInputElement>) => {};
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
	type?: "ri" | "ri-voice" | 'ri-fill';
}

export interface IPromptDialog {
	type: "info" | "warning" | "success";
	title: string;
	children: ReactNode;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	actionBtnTxt: string;
}

export interface IAuthWrapper {
	children: ReactNode;
}

export interface IAuthState {
	isAuthenticated: boolean;
}