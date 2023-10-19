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

const Meet = () => {
	return (
		<div style={{ position: "relative", width: "100%", height: "100vh" }}>
			<BaseLayout>
				<Header />
				<MeetHeader />
				<MeetBox />
			</BaseLayout>
			{/* <JoinMeetingDialogue /> */}
			{/* <ScheduleMeetingDialogue /> */}
			<SettingDialogue />
			{/* <PromptDialog type="info" title="" actionBtnTxt="Proceed">
				Are you sure you want to connect GSuite Calendar ?
			</PromptDialog> */}
		</div>
	);
};

export default Meet;
