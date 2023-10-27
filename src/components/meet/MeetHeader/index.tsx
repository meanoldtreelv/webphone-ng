import Select from "components/UI/Forms/Select";
import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";
// import ChevronRightIcon from "components/UI/Icons/Profile/ChevronRight";
import React, { useState } from "react";
import styles from "./MeetHeader.module.scss";
import SettingsIcon from "components/UI/Icons/Sidebar/Settings";
// import ConferenceIcon from "components/UI/Icons/Sidecar/Conference";
// import RecentsIcon from "components/UI/Icons/Sidebar/Recents";
import ChevronRightIcon from "components/UI/Icons/Navigation/ChevronRight";
import OutputIcon from "components/UI/Icons/meet/Output";
import RecentsIcon from "components/UI/Icons/meet/Recents";
import ConferenceIcon from "components/UI/Icons/meet/Conference";
import { useDispatch, useSelector } from "react-redux";
import { setDateRange, setJoinDialogue, setScheduleDialogue } from "redux/meet/meetSlice";
import { createMeet } from "effects/apiEffect";
import { calendarView, dateRange } from "redux/meet/meetSelectors";

const MeetHeader = () => {
	const [selectedTab, setSelectedTab] = useState("");
	const dispatch = useDispatch();
	const [meetingCode, setMeetingCode] = useState("");
	const range = useSelector(dateRange);
	const view = useSelector(calendarView);
	const [list, setList] = useState([
		{ value: "Day", name: "Day", selected: true },
		{ value: "Week", name: "Week", selected: false },
		{ value: "Month", name: "Month", selected: false },
		{ value: "Year", name: "Year", selected: false },
	]);

	console.log(range, "range");
	console.log(view, "view");

	const startMeetingHandler = () => {
		createMeet(
			{},
			(res: any) => {
				console.log(res, "meet created ");

				if (res?.status === 201) {
					console.log("success in account retrieve");
					setMeetingCode(res?.data?.[0]?.jitsi_meeting_room_id);
					window.open(`https://meet.ringplan.com/auth/?id=${res?.data?.[0]?.jitsi_meeting_room_id}`, "_blank");
				}
			},
			(err: any) => {
				console.error(err, "err in meet creation");
			},
		);
	};

	const previousRangeHandler = () => {
		dispatch(setDateRange({ start: "2023-09-26", end: "2023-11-28" }));
	};

	const nextRangeHandler = () => {
		dispatch(setDateRange({ start: "2023-09-26", end: "2023-11-28" }));
	};

	const todayHandler = () => {
		dispatch(setDateRange({ start: "2023-10-26", end: "2023-10-28" }));
	};

	return (
		<div className={styles.meet}>
			<div className={styles.dateBox}>
				<div className={styles.rangeBox}>
					<span onClick={previousRangeHandler}>
						<ChevronLeftIcon />
					</span>

					<input
						type="date"
						name="begin"
						placeholder="dd-mm-yyyy"
						value=""
						min="1997-01-01"
						max="2030-12-31"
						className={styles.date}
					/>
					<span onClick={nextRangeHandler}>
						<ChevronRightIcon />
					</span>
				</div>
				<span className={styles.today} onClick={todayHandler}>
					Today
				</span>

				<div>
					{/* icon, options, onChange = undefined, defaultValue, */}
					<Select
						options={list.map((x: any) => [{ name: x["name"], value: x["value"] }]).map((y: any) => y[0])}
						onChange={(e) => {
							console.log(e.target.value);
						}}
					/>
				</div>
			</div>
			<div className={styles.rightBox}>
				<div className={styles.tabBox}>
					<div
						className={`${selectedTab === "schedule" ? styles.activeTab : ""}`}
						onClick={() => {
							// setSelectedTab("schedule");
							dispatch(setScheduleDialogue(true));
						}}>
						<RecentsIcon />
						<span>Schedule</span>
					</div>
					<div
						className={`${selectedTab === "join" && styles.activeTab}`}
						onClick={() => {
							setSelectedTab("join");
							dispatch(setJoinDialogue(true));
						}}>
						<OutputIcon />
						<span>Join</span>
					</div>
					<div className={`${selectedTab === "start_meeting" && styles.activeTab}`} onClick={startMeetingHandler}>
						<ConferenceIcon />
						<span>Start Meeting</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MeetHeader;
