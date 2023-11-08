import { useEffect, useState } from "react";
import styles from "./SettingDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import CloseIcon from "components/UI/Icons/Close";
import OnOffSwitch from "components/UI/OnOffSwitch";
import gsuite from "assets/images/img/calender.png";
import outlook from "assets/images/img/outlook.png";
import { useDispatch, useSelector } from "react-redux";
import { setCalendarType, setSettingsDialogue } from "redux/meet/meetSlice";
// import { GetGoogleCalendar, GetOutlookCalendar, RevokeGoogleCalendar, RevokeOutlookCalendar } from "effects/apiEffect";
import { calendarType } from "redux/meet/meetSelectors";
import {
	useLazyDeleteGoogleCalendarQuery,
	useLazyDeleteOutlookCalendarQuery,
	useLazyGetGoogleCalendarQuery,
	useLazyGetOutlookCalendarQuery,
} from "services/meet";
import { ClipLoader } from "react-spinners";

const SettingDialogue = () => {
	const [gsuiteCalendar, setGsuiteCalendar] = useState(false);
	const [outlookCalendar, setOutlookCalendar] = useState(false);
	const dispatch = useDispatch();

	const calendar = useSelector(calendarType);

	// todo - remove harcoded email
	const email = "gshivam@startxlabs.in";

	const [getGoogleCalendar, { data: googleCalendarData, isFetching: isFectching1 }] = useLazyGetGoogleCalendarQuery();
	const [getOutlookCalendar, { data: outlookCalendarData, isFetching: isFectching2 }] =
		useLazyGetOutlookCalendarQuery();
	const [revokeGoogleCalendar, { isLoading: isLoading1 }] = useLazyDeleteGoogleCalendarQuery();
	const [revokeOutlookCalendar, { isLoading: isLoading2 }] = useLazyDeleteOutlookCalendarQuery();

	useEffect(() => {
		if (calendar === "google") {
			setGsuiteCalendar(true);
		}

		if (calendar === "outlook") {
			setOutlookCalendar(true);
		}
	}, [calendar]);
	console.log(isLoading1, "isLoading1");

	const gsuiteHandler = async () => {
		if (gsuiteCalendar) {
			await revokeGoogleCalendar({
				calendar: email,
			});
			dispatch(setCalendarType(""));
			// RevokeGoogleCalendar(
			// 	{
			// 		calendar: email,
			// 	},
			// 	(res: any) => {
			// 		console.log(res, "gsuiteCalendar revoke");
			// 		if (res?.status === 200) {
			// 			dispatch(setCalendarType(""));
			// 		}
			// 	},
			// 	(err: any) => {
			// 		console.error(err, "err in gsuite calendar revoke");
			// 	},
			// );
		} else if (outlookCalendar) {
			await revokeOutlookCalendar({
				calendar: email,
			});
			// RevokeOutlookCalendar(
			// 	{
			// 		calendar: email,
			// 	},
			// 	(res: any) => {
			// 		console.log(res, "outlook revoke");
			// 		if (res?.status === 200) {
			// 			dispatch(setCalendarType(""));
			// 		}
			// 	},
			// 	(err: any) => {
			// 		console.error(err, "err in outlook calendar revoke");
			// 	},
			// );
			await getGoogleCalendar(null);
			// window.open(googleCalendarData?.auth_url);
			// GetGoogleCalendar(
			// 	(res: any) => {
			// 		console.log(res, "gsuiteCalendar ");
			// 		if (res?.status === 200) {
			// 			window.open(res?.data?.auth_url);
			// 		}
			// 	},
			// 	(err: any) => {
			// 		console.error(err, "err in gsuite calendar");
			// 	},
			// );
		} else {
			await getGoogleCalendar(null);
			// window.open(googleCalendarData?.auth_url);
			// GetGoogleCalendar(
			// 	(res: any) => {
			// 		console.log(res, "gsuiteCalendar ");
			// 		if (res?.status === 200) {
			// 			window.open(res?.data?.auth_url);
			// 		}
			// 	},
			// 	(err: any) => {
			// 		console.error(err, "err in gsuite calendar");
			// 	},
			// );
		}
		// setGsuiteCalendar(!gsuiteCalendar);

		// setGsuiteCalendar(false);
		dispatch(setSettingsDialogue(false));
	};

	useEffect(() => {
		googleCalendarData && window.open(googleCalendarData?.auth_url);
	}, [googleCalendarData]);

	const outlookHandler = async () => {
		if (outlookCalendar) {
			await revokeOutlookCalendar({
				calendar: email,
			});

			dispatch(setCalendarType(""));
			// RevokeOutlookCalendar(
			// 	{
			// 		calendar: email,
			// 	},
			// 	(res: any) => {
			// 		console.log(res, "outlook revoke");
			// 		if (res?.status === 200) {
			// 			dispatch(setCalendarType(""));
			// 		}
			// 	},
			// 	(err: any) => {
			// 		console.error(err, "err in outlook calendar revoke");
			// 	},
			// );
		} else if (gsuiteCalendar) {
			await revokeGoogleCalendar({
				calendar: email,
			});
			// RevokeGoogleCalendar(
			// 	{
			// 		calendar: email,
			// 	},
			// 	(res: any) => {
			// 		console.log(res, "gsuiteCalendar revoke");
			// 		if (res?.status === 200) {
			// 			dispatch(setCalendarType(""));
			// 		}
			// 	},
			// 	(err: any) => {
			// 		console.error(err, "err in gsuite calendar revoke");
			// 	},
			// );
			await getOutlookCalendar(null);
			window.open(outlookCalendarData?.auth_url);
			// GetOutlookCalendar(
			// 	(res: any) => {
			// 		console.log(res, "outlookCalendar ");
			// 		if (res?.status === 200) {
			// 			window.open(res?.data?.auth_url);
			// 		}
			// 	},
			// 	(err: any) => {
			// 		console.error(err, "err in outlook calendar");
			// 	},
			// );
		} else {
			await getOutlookCalendar(null);
			window.open(outlookCalendarData?.auth_url);
			// GetOutlookCalendar(
			// 	(res: any) => {
			// 		console.log(res, "outlookCalendar ");
			// 		if (res?.status === 200) {
			// 			// console.log("success in account retrieve");
			// 			// dispatch(setScheduleDialogue(false));
			// 			window.open(res?.data?.auth_url);
			// 		}
			// 	},
			// 	(err: any) => {
			// 		console.error(err, "err in outlook calendar");
			// 	},
			// );
		}

		// setOutlookCalendar(!outlookCalendar);

		// setOutlookCalendar(false);
		dispatch(setSettingsDialogue(false));
	};

	useEffect(() => {
		outlookCalendarData && window.open(outlookCalendarData?.auth_url);
	}, [outlookCalendarData]);

	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<span>Manage Calendar</span>
					</span>

					<span
						onClick={() => {
							dispatch(setSettingsDialogue(false));
						}}>
						<CloseIcon />
					</span>
				</h1>

				<p>Manage your calendars integrations</p>

				<div className={styles.calendar}>
					<div className={styles.left}>
						<img src={gsuite} alt="" />
						<div>
							<span>GSuite Calendar</span>
							<span>You will be able to connect any of your G-Suite accounts</span>
						</div>
					</div>
					<div>
						{isLoading1 ? (
							<ClipLoader color="black" size={13} />
						) : (
							<OnOffSwitch onChange={gsuiteHandler} checked={gsuiteCalendar} />
						)}
					</div>
				</div>

				<div className={styles.calendar}>
					<div className={styles.left}>
						<img src={outlook} alt="" />
						<div>
							<span>Outlook Calendar</span>
							<span>Or connect any of your Office 365 accounts</span>
						</div>
					</div>
					<div>
						{isLoading2 ? (
							<ClipLoader color="black" size={13} />
						) : (
							<OnOffSwitch onChange={outlookHandler} checked={outlookCalendar} />
						)}
					</div>
				</div>

				<div className={styles.btnBox}>
					<button
						onClick={() => {
							dispatch(setSettingsDialogue(false));
						}}>
						Close
					</button>
				</div>
			</div>
		</>
	);
};

export default SettingDialogue;
