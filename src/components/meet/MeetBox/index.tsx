import React, { useEffect, useState } from "react";
import styles from "./MeetBox.module.scss";
import SettingsIcon from "components/UI/Icons/Sidebar/Settings";
import MeetingCard from "../MeetingCard";
import Calendar from "components/UI/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { setSettingsDialogue } from "redux/meet/meetSlice";
import { getMeetList } from "effects/apiEffect";
import { dateRange } from "redux/meet/meetSelectors";

const MeetBox = () => {
	const [tabSelected, setTabSelected] = useState("timeline");

	const dispatch = useDispatch();
	const { start, end } = useSelector(dateRange);
	console.log(start, end, "range ");
	const [meetingList, setMeetingList] = useState([]);
	useEffect(() => {
		getMeetList(
			start,
			end,
			(res: any) => {
				console.log(res, "meet List API retrieve");
				if (res?.status === 200) {
					console.log("success in meet List retrieve");
					setMeetingList(res?.data);
				}
			},
			(err: any) => {
				console.error(err, "err in account retrieve");
			},
		);
	}, [start, end]);

	return (
		<div className={styles.queues}>
			<div className={styles.headerBox}>
				<div className={styles.header}>
					<span
						className={`${tabSelected === "timeline" && styles.activeTab}`}
						onClick={() => {
							setTabSelected("timeline");
						}}>
						Timeline
					</span>
					<span
						className={`${tabSelected === "calendar" && styles.activeTab}`}
						onClick={() => {
							setTabSelected("calendar");
						}}>
						Calender
					</span>
				</div>
				<span
					onClick={() => {
						dispatch(setSettingsDialogue(true));
					}}>
					<SettingsIcon />
				</span>
			</div>
			{tabSelected === "timeline" && (
				<div>
					<div className={styles.meetBox}>
						<div>17 OCTOBER, TUE</div>
						{meetingList?.map((item) => <MeetingCard key={item.id} meetData={item} />)}
						{/* <MeetingCard /> */}
					</div>
				</div>
			)}

			{tabSelected === "calendar" && (
				<div className={styles.calendar}>
					<Calendar />
				</div>
			)}
		</div>
	);
};

export default MeetBox;
