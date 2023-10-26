import BaseLayout from "layouts/BaseLayout";
import React from "react";
import styles from "./Meet.module.scss";
import Header from "components/meet/Header";
import MeetHeader from "components/meet/MeetHeader";
import MeetBox from "components/meet/MeetBox";
import JoinMeetingDialogue from "components/meet/JoinMeetingDialogue";
import ScheduleMeetingDialogue from "components/meet/ScheduleMeetingDialogue";
import SettingDialogue from "components/meet/SettingDialogue";
import PromptDialog from "components/Modal/PromptDialog";
import { useSelector } from "react-redux";
import {
	deleteDialogue,
	editDialogue,
	joinDialogue,
	scheduleDialogue,
	settingsDialogue,
} from "redux/meet/meetSelectors";
import DescriptionDialogue from "components/meet/DescriptionDialogue";
import DeleteMeet from "components/meet/DeleteMeet";
import EditMeet from "components/meet/EditMeet";

const Meet = () => {
	const settings = useSelector(settingsDialogue);
	const join = useSelector(joinDialogue);
	const schedule = useSelector(scheduleDialogue);
	const edit = useSelector(editDialogue);
	const deleteMeet = useSelector(deleteDialogue);

	return (
		<div style={{ position: "relative", width: "100%", height: "100vh" }}>
			<BaseLayout>
				<Header />
				<MeetHeader />
				<MeetBox />
			</BaseLayout>
			{settings && <SettingDialogue />}
			{join && <JoinMeetingDialogue />}
			{schedule && <ScheduleMeetingDialogue />}
			{edit && <EditMeet />}
			{deleteMeet && <DeleteMeet />}
			{/* <DescriptionDialogue />
			 */}

			{/* <PromptDialog type="info" title="" actionBtnTxt="Proceed">
				Are you sure you want to connect GSuite Calendar ?
			</PromptDialog> */}
		</div>
	);
};

export default Meet;
