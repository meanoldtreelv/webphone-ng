import Select from "components/UI/Forms/Select";
import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";
import { useEffect, useState } from "react";
import styles from "./MeetHeader.module.scss";
import ChevronRightIcon from "components/UI/Icons/Navigation/ChevronRight";
import OutputIcon from "components/UI/Icons/meet/Output";
import RecentsIcon from "components/UI/Icons/meet/Recents";
import ConferenceIcon from "components/UI/Icons/meet/Conference";
import { useDispatch, useSelector } from "react-redux";
import {
	setCalendarView,
	setDate,
	setDateRange,
	setJoinDialogue,
	setScheduleDialogue,
	setView,
} from "redux/meet/meetSlice";
import { calendarView, dateRange } from "redux/meet/meetSelectors";
import DateRange from "components/UI/DateRange";
import { useLazyCreateMeetQuery } from "services/meet";
import { Views } from "react-big-calendar";
import moment from "moment";

const MeetHeader = () => {
	const dispatch = useDispatch();

	const [views, setViews] = useState("week");
	const [datee, setDatee] = useState(new Date());

	const [createMeet, { data: createMeetData }] = useLazyCreateMeetQuery();

	const view = useSelector(calendarView);
	const { start, end } = useSelector(dateRange);
	const calendarViews = useSelector(calendarView);
	const dateRanges = useSelector(dateRange);
	// const [view, setView] = useState(Views.WEEK);

	const [list] = useState([
		{ value: "week", name: "Week", selected: true },
		{ value: "day", name: "Day", selected: false },
		{ value: "month", name: "Month", selected: false },
		// { value: "Year", name: "Year", selected: false },
	]);

	function addDaysToDate(inputDate, daysToAdd) {
		const date = new Date(inputDate);
		date.setDate(date.getDate() + daysToAdd);
		return date.toISOString().split("T")[0];
	}

	const startMeetingHandler = async () => {
		await createMeet({});
		setMeetingCode(createMeetData?.[0]?.jitsi_meeting_room_id);
		window.open(`https://meet.ringplan.com/auth/?id=${createMeetData?.[0]?.jitsi_meeting_room_id}`, "_blank");
	};

	useEffect(() => {
		if (views === "Week") {
			// Get the current date
			const currentDate = new Date(start);

			// Get the first day of the week (Sunday)
			const firstDayOfWeek = new Date(currentDate);
			firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

			// Get the last day of the week (Saturday)
			const lastDayOfWeek = new Date(currentDate);
			lastDayOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));

			// console.log("First Day of the Week (Sunday): " + firstDayOfWeek.toDateString());
			// console.log("Last Day of the Week (Saturday): " + lastDayOfWeek.toDateString());
			dispatch(setDateRange({ start: firstDayOfWeek.toDateString(), end: lastDayOfWeek.toDateString() }));
		}
		if (views === "Month") {
			// Get the current date
			const currentDate = new Date(start);

			// Get the first day of the current month
			const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

			// Get the last day of the current month
			const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

			// console.log("Start Date of the Month: " + firstDayOfMonth.toDateString());
			// console.log("End Date of the Month: " + lastDayOfMonth.toDateString());

			dispatch(setDateRange({ start: firstDayOfMonth.toDateString(), end: lastDayOfMonth.toDateString() }));
		}
	}, [views]);

	useEffect(() => {
		// Update the view based on calendarViews value
		if (calendarViews === "Day") {
			dispatch(setView(Views.DAY));
		} else if (calendarViews === "Week") {
			dispatch(setView(Views.WEEK));
		} else if (calendarViews === "Month") {
			dispatch(setView(Views.MONTH));
		}
	}, [calendarViews]);

	const handleBack = () => {
		const newStart = addDaysToDate(start, -7);
		const newEnd = addDaysToDate(start, -1);
		dispatch(setDateRange({ start: newStart, end: newEnd }));

		if (view === Views.MONTH) {
			setDatee(moment(datee).subtract(1, "months").toDate());
		} else if (view === Views.WEEK) {
			setDatee(moment(datee).subtract(1, "weeks").toDate());
		} else if (view === Views.DAY) {
			setDatee(moment(datee).subtract(1, "days").toDate());
		}
	};

	const handleNext = () => {
		const newStart = addDaysToDate(end, 1);
		const newEnd = addDaysToDate(end, 7);

		dispatch(setDateRange({ start: newStart, end: newEnd }));

		if (view === Views.DAY) {
			setDatee(moment(datee).add(1, "days").toDate());
		} else if (view === Views.WEEK) {
			setDatee(moment(datee).add(1, "weeks").toDate());
		} else if (view === Views.MONTH) {
			setDatee(moment(datee).add(1, "months").toDate());
		}
	};

	useEffect(() => {
		dispatch(setDate(datee));
	}, [datee]);

	const todayHandler = () => {
		const date = new Date();
		date.setDate(date.getDate());
		const today = date.toISOString().split("T")[0];

		dispatch(setDateRange({ start: today, end: today }));
	};

	console.log(view, "view");

	return (
		<div className={styles.meet}>
			<div className={styles.dateBox}>
				<div className={styles.rangeBox}>
					<span onClick={handleBack} className={styles.arrow}>
						<ChevronLeftIcon />
					</span>

					<DateRange />
					<span onClick={handleNext} className={styles.arrow}>
						<ChevronRightIcon />
					</span>
				</div>
				<span className={styles.today} onClick={todayHandler}>
					Today
				</span>

				<div>
					<Select
						options={list.map((x: any) => [{ name: x["name"], value: x["value"] }]).map((y: any) => y[0])}
						onChange={(e) => {
							setViews(e.target.value);
							dispatch(setCalendarView(e.target.value));
						}}
					/>
				</div>
			</div>
			<div className={styles.rightBox}>
				<div className={styles.tabBox}>
					<div
						className={styles.schedule}
						onClick={() => {
							dispatch(setScheduleDialogue(true));
						}}>
						<RecentsIcon />
						<span>Schedule</span>
					</div>
					<div
						onClick={() => {
							dispatch(setJoinDialogue(true));
						}}>
						<OutputIcon />
						<span>Join</span>
					</div>
					<div onClick={startMeetingHandler}>
						<ConferenceIcon />
						<span>Start&nbsp;Meeting</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MeetHeader;
