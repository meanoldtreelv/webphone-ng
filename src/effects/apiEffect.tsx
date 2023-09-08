import axios from "axios";
import { instance } from "../utils/axios";
import "../utils/endPoints";
import API_ENDPOINTS from "../utils/endPoints";

const authToken =
	"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTQxODk0MjAsImlhdCI6MTY5NDE2MDYyMCwiYXV0aF90aW1lIjoxNjk0MTYwNjE5LCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6Il92WkplUFc5aFdZUjdkNTNMa3lmRFEiLCJuYmYiOjE2OTQxNjA2MjB9.k7ljl9otVHzBxLxpJgCA1Dww0M1nGRfgdKmCDZhKtaRQaVqLyLGedqJKPXMSOpdzlNRS3ehTTsFWHr1Q5DCedRf0i-kFnhwh2hbinIdJ7e7DvngP70bKOs6aCZUH5P2xK9Fn2TjvOkRV-7XGar7mDleDzaBJjT03EJJ5_DVfjkQQff6nKVLCdy46ReL4ouCaDRbE4xC1YfVU_GmmYGTyPAcJbPnRYwXp91P5_Z43eFf_KhJexoYrgLSYblrYeGWTL4V91OEYfVcyfiLvrHB0DyTsPcy-A-hWwSQlWm8GPKa156wayaOZLrljueC1dlhxgng__Qr5FNHoFANhyl-uPg";

// export const instances_API = (success: Function, error: Function) => {
// 	axios
// 		.get(`https://ssp-backend.ringplan.com/system/instances`, {
// 			headers: {
// 				Authorization: `${authToken}`,
// 			},
// 		})
// 		.then((res) => success?.(res))
// 		.catch((err) => error?.(err));
// };

export const account_API = (success: Function, error: Function) => {
	axios
		.get("https://ssp-backend.ringplan.com/system/account", {
			headers: {
				Authorization: `${authToken}`,
			},
		})
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const instances_API = (success: Function, error: Function) => {
	instance
		.get(`/system/instances`, {
			headers: {
				Authorization: `${authToken}`,
			},
		})
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

// export const instances_API = (success: Function, error: Function) => {
// 	instance
// 		.get(`/system/instances`)
// 		.then((res) => success?.(res))
// 		.catch((err) => error?.(err));
// };

// export const account_API = (success: Function, error: Function) => {
// 	instance
// 		.get("/system/account")
// 		.then((res) => success?.(res))
// 		.catch((err) => error?.(err));
// };

export const contacts_API = (success: Function, error: Function) => {
	instance
		.get(`/company/directory/contacts`, {
			headers: {
				Authorization: `${authToken}`,
			},
		})
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const extension_API = (userId: String, success: Function, error: Function) => {
	instance
		.get(`/instances/${userId}/bulks/extensions?filter_by=softphone&by_user=on`, {
			headers: {
				Authorization: `${authToken}`,
			},
		})
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const user_API = (userId: String, success: Function, error: Function) => {
	instance
		.get("/statuses/v2/users?user_id=" + userId, {
			headers: {
				Authorization: `${authToken}`,
			},
		})
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const callerId_API = (userId: String, success: Function, error: Function) => {
	instance
		.get(`/instances/${userId}/dids/callerids`, {
			headers: {
				Authorization: `${authToken}`,
			},
		})
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};
