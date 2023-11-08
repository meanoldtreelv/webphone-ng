import BaseLayout from "layouts/BaseLayout";
import { useEffect } from "react";
import styles from "./Meet.module.scss";
import Header from "components/meet/Header";
import MeetHeader from "components/meet/MeetHeader";
import MeetBox from "components/meet/MeetBox";
import JoinMeetingDialogue from "components/meet/JoinMeetingDialogue";
import ScheduleMeetingDialogue from "components/meet/ScheduleMeetingDialogue";
import SettingDialogue from "components/meet/SettingDialogue";
import { useDispatch, useSelector } from "react-redux";

import DescriptionDialogue from "components/meet/DescriptionDialogue";
import DeleteMeet from "components/meet/DeleteMeet";
import EditMeet from "components/meet/EditMeet";
import MeetRecordingDialogue from "components/meet/MeetRecordingDialogue";
import { useLazyGetCalendarQuery } from "services/meet";
import { GetCalendar } from "effects/apiEffect";
import { setCalendarType } from "redux/meet/meetSlice";
import {
	calendarType,
	deleteDialogue,
	descriptionDialogue,
	editDialogue,
	joinDialogue,
	recordDialogue,
	scheduleDialogue,
	settingsDialogue,
} from "redux/meet/meetSelectors";
import PromptDialog from "components/Modal/PromptDialog";

const Meet = () => {
	const settings = useSelector(settingsDialogue);
	const join = useSelector(joinDialogue);
	const schedule = useSelector(scheduleDialogue);
	const edit = useSelector(editDialogue);
	const deleteMeet = useSelector(deleteDialogue);
	const description = useSelector(descriptionDialogue);
	const recordDialogues = useSelector(recordDialogue);

	const dispatch = useDispatch();

	const [getCalendarData, { data: calendarData, isLoading, isFetching }] = useLazyGetCalendarQuery();

	useEffect(() => {
		const fetchData = async () => {
			await getCalendarData(null);
		};

		fetchData();
	}, []);

	useEffect(() => {
		dispatch(setCalendarType(calendarData?.type));
	}, [calendarData]);

	// console.log(calendarData, "data");
	// console.log(deleteMeet, "deleteMeet");

	return (
		<div className={styles.meet}>
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
			{description && <DescriptionDialogue />}
			{recordDialogues && <MeetRecordingDialogue />}

			{/* <PromptDialog type="info" title="" actionBtnTxt="Proceed">
				Are you sure you want to connect GSuite Calendar ?
			</PromptDialog> */}
		</div>
	);
};

export default Meet;
