import cookie from "cookie";
import Cookies from "js-cookie";
import { toast, TypeOptions } from "react-toastify";

import { cookieType } from "../types";

// export const generateFormData = (obj) => {
// 	let formData = new FormData();
// 	for (let [key, value] of Object.entries(obj)) {
// 		if (Array.isArray(value)) {
// 			formData.append(`${key}`, `${value}`);
// 		} else {
// 			formData.append(`${key}`, `${value}`);
// 		}
// 	}
// 	return formData;
// };

export const nameIcon = (displayname: string) => {
	return displayname[0] + (displayname.split(" ") && displayname.split(" ")[1] ? displayname.split(" ")[1][0] : "");
};

export const generateFormData = (obj: Record<string, any>): FormData => {
	let formData = new FormData();
	for (let [key, value] of Object.entries(obj)) {
		if (Array.isArray(value)) {
			formData.append(`${key}`, `${value}`);
		} else {
			formData.append(`${key}`, `${value}`);
		}
	}
	return formData;
};

// export const parseCookies = (req = null): cookieType => {
// 	return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
// };

export const parseCookies = (req: { headers: { cookie?: string } } | null = null): cookieType => {
	return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
};

// export const setCookie = (name, value) => Cookies.set(name, value);
export const setCookie = (name: string, value: any) => Cookies.set(name, value);

export const resetUserCookie = () => Cookies.remove("user");

// export const getCookie = (name) => Cookies.get(name);
export const getCookie = (name: string) => Cookies.get(name);

export const isUserAuthenticated = () => {
	const data = cookie.parse(document.cookie);
	return data?.user ? true : false;
};

// export const asyncErrorHandler = (asyncFn, cb) => {
// 	return function (e) {
// 		return asyncFn.call(this, e).catch((error) => {
// 			console.log({ error });
// 			if (cb) cb();
// 			return null;
// 		});
// 	};
// };
export const asyncErrorHandler = (asyncFn: (e: any) => Promise<any>, cb?: () => void) => {
	return async (e: any) => {
		// Use an arrow function to preserve the outer this context
		try {
			await asyncFn.call(this, e);
		} catch (error) {
			console.log({ error });
			if (cb) cb();
		}
	};
};

// export const showToast = (message, type: TypeOptions, id = "unique") => {
// 	toast(message, {
// 		toastId: id,
// 		position: "top-right",
// 		autoClose: 2000,
// 		hideProgressBar: false,
// 		closeOnClick: true,
// 		pauseOnHover: false,
// 		type,
// 	});
// };
export const showToast = (message: string, type: TypeOptions, id = "unique") => {
	toast(message, {
		toastId: id,
		position: "top-right",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		type,
	});
};

//short Abbreviation for contact
export const contactAbbreviation = (firstName: any, lastName: any, phone: any, email: any) => {
	const firstNameChar = firstName ? firstName[0] : "";
	const lastNameChar = lastName ? lastName[0] : "";
	const phoneChar = phone ? phone[0] + phone[1] + phone[2] : "";
	const emailChar = email ? email[0] + email[1] : "";
	const abbreviation =
		firstNameChar + lastNameChar || ((!firstNameChar || !lastNameChar) && (phoneChar ? phoneChar : emailChar));
	return abbreviation;
};

// empty function
export const emptyFunction = () => {};

// export const sortArrayOfObj = (arr: any) => {
// 	return arr?.sort((a: any, b: any) => {
// 		if (a?.phone) {
// 			return a.phone.localeCompare(b.phone, "en-US", { sensitivity: "base" });
// 		} else {
// 			return a.first_name.localeCompare(b.first_name, "en-US", { sensitivity: "base" });
// 		}
// 	});
// };
