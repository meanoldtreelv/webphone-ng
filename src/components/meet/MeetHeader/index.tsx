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
import { useDispatch } from "react-redux";
import { setJoinDialogue, setScheduleDialogue } from "redux/meet/meetSlice";
import { createMeet } from "effects/apiEffect";

const MeetHeader = () => {
	const [selectedTab, setSelectedTab] = useState("");
	const dispatch = useDispatch();
	const [meetingCode, setMeetingCode] = useState("");

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
	return (
		<div className={styles.meet}>
			<div className={styles.dateBox}>
				<div className={styles.rangeBox}>
					<span>
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
					<span>
						<ChevronRightIcon />
					</span>
				</div>
				<span className={styles.today}>Today</span>

				<div>
					{/* icon, options, onChange = undefined, defaultValue, */}
					<Select options={["Day", "Week", "Month", "Year"]} />
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
