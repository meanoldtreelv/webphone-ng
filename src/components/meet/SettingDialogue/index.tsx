import React, { useEffect, useState } from "react";
import styles from "./SettingDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import CloseIcon from "components/UI/Icons/Close";
import OnOffSwitch from "components/UI/OnOffSwitch";
import gsuite from "assets/images/img/calender.png";
import outlook from "assets/images/img/outlook.png";
import { useDispatch, useSelector } from "react-redux";
import { setCalendarType, setSettingsDialogue } from "redux/meet/meetSlice";
import { GetGoogleCalendar, GetOutlookCalendar, RevokeGoogleCalendar, RevokeOutlookCalendar } from "effects/apiEffect";
import { calendarType, settingsDialogue } from "redux/meet/meetSelectors";

const SettingDialogue = () => {
	const [gsuiteCalendar, setGsuiteCalendar] = useState(false);
	const [outlookCalendar, setOutlookCalendar] = useState(false);
	const dispatch = useDispatch();

	const calendar = useSelector(calendarType);
	const email = "gshivam@startxlabs.in";
	console.log(calendar, "calendar");

	useEffect(() => {
		if (calendar === "google") {
			setGsuiteCalendar(true);
		}

		if (calendar === "outlook") {
			setOutlookCalendar(true);
		}
	}, [calendar]);

	const gsuiteHandler = () => {
		if (gsuiteCalendar) {
			RevokeGoogleCalendar(
				{
					calendar: email,
				},
				(res: any) => {
					console.log(res, "gsuiteCalendar revoke");
					if (res?.status === 200) {
						// console.log("success in account retrieve");
						dispatch(setCalendarType(""));
						// window.open(res?.data?.auth_url);
					}
				},
				(err: any) => {
					console.error(err, "err in gsuite calendar revoke");
				},
			);
		} else if (outlookCalendar) {
			RevokeOutlookCalendar(
				{
					calendar: email,
				},
				(res: any) => {
					console.log(res, "outlook revoke");
					if (res?.status === 200) {
						dispatch(setCalendarType(""));
						// console.log("success in account retrieve");
						// dispatch(setScheduleDialogue(false));
						// window.open(res?.data?.auth_url);
					}
				},
				(err: any) => {
					console.error(err, "err in outlook calendar revoke");
				},
			);
			GetGoogleCalendar(
				(res: any) => {
					console.log(res, "gsuiteCalendar ");
					if (res?.status === 200) {
						// console.log("success in account retrieve");
						// dispatch(setScheduleDialogue(false));
						window.open(res?.data?.auth_url);
					}
				},
				(err: any) => {
					console.error(err, "err in gsuite calendar");
				},
			);
		} else {
			GetGoogleCalendar(
				(res: any) => {
					console.log(res, "gsuiteCalendar ");
					if (res?.status === 200) {
						// console.log("success in account retrieve");
						// dispatch(setScheduleDialogue(false));
						window.open(res?.data?.auth_url);
					}
				},
				(err: any) => {
					console.error(err, "err in gsuite calendar");
				},
			);
		}
		// setGsuiteCalendar(!gsuiteCalendar);

		// setGsuiteCalendar(false);
		dispatch(setSettingsDialogue(false));
	};

	const outlookHandler = () => {
		if (outlookCalendar) {
			RevokeOutlookCalendar(
				{
					calendar: email,
				},
				(res: any) => {
					console.log(res, "outlook revoke");
					if (res?.status === 200) {
						dispatch(setCalendarType(""));
						// console.log("success in account retrieve");
						// dispatch(setScheduleDialogue(false));
						// window.open(res?.data?.auth_url);
					}
				},
				(err: any) => {
					console.error(err, "err in outlook calendar revoke");
				},
			);
		} else if (gsuiteCalendar) {
			RevokeGoogleCalendar(
				{
					calendar: email,
				},
				(res: any) => {
					console.log(res, "gsuiteCalendar revoke");
					if (res?.status === 200) {
						// console.log("success in account retrieve");
						dispatch(setCalendarType(""));
						// window.open(res?.data?.auth_url);
					}
				},
				(err: any) => {
					console.error(err, "err in gsuite calendar revoke");
				},
			);
			GetOutlookCalendar(
				(res: any) => {
					console.log(res, "outlookCalendar ");
					if (res?.status === 200) {
						// console.log("success in account retrieve");
						// dispatch(setScheduleDialogue(false));
						window.open(res?.data?.auth_url);
					}
				},
				(err: any) => {
					console.error(err, "err in outlook calendar");
				},
			);
		} else {
			GetOutlookCalendar(
				(res: any) => {
					console.log(res, "outlookCalendar ");
					if (res?.status === 200) {
						// console.log("success in account retrieve");
						// dispatch(setScheduleDialogue(false));
						window.open(res?.data?.auth_url);
					}
				},
				(err: any) => {
					console.error(err, "err in outlook calendar");
				},
			);
		}
		// setOutlookCalendar(!outlookCalendar);

		// setOutlookCalendar(false);
		dispatch(setSettingsDialogue(false));
	};

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
						<OnOffSwitch onChange={gsuiteHandler} checked={gsuiteCalendar} />
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
						<OnOffSwitch onChange={outlookHandler} checked={outlookCalendar} />
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
