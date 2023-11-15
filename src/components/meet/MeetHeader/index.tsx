import Select from "components/UI/Forms/Select";
import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";
import { useEffect, useState } from "react";
import styles from "./MeetHeader.module.scss";
import ChevronRightIcon from "components/UI/Icons/Navigation/ChevronRight";
import OutputIcon from "components/UI/Icons/meet/Output";
import RecentsIcon from "components/UI/Icons/meet/Recents";
import ConferenceIcon from "components/UI/Icons/meet/Conference";
import { useDispatch, useSelector } from "react-redux";
import { setCalendarView, setDateRange, setJoinDialogue, setScheduleDialogue } from "redux/meet/meetSlice";
import { calendarView, dateRange } from "redux/meet/meetSelectors";
import DateRange from "components/UI/DateRange";
import { useLazyCreateMeetQuery } from "services/meet";
// import { Views } from "react-big-calendar";
// import moment from "moment";

const MeetHeader = () => {
	const dispatch = useDispatch();

	const [createMeet, { data: createMeetData }] = useLazyCreateMeetQuery();

	const { start, end } = useSelector(dateRange);
	const calendarViews = useSelector(calendarView);

	const [list] = useState([
		{ value: "week", name: "Week", selected: true },
		{ value: "day", name: "Day", selected: false },
		{ value: "month", name: "Month", selected: false },
		// { value: "Year", name: "Year", selected: false },
	]);

	function addDaysToDate(inputDate, daysToAdd) {
		const date = new Date(inputDate);
		return date.setDate(date.getDate() + daysToAdd);
		//  date.toISOString().split("T")[0];
	}

	const startMeetingHandler = async () => {
		await createMeet({});
		// setMeetingCode(createMeetData?.[0]?.jitsi_meeting_room_id);
		window.open(`https://meet.ringplan.com/auth/?id=${createMeetData?.[0]?.jitsi_meeting_room_id}`, "_blank");
	};

	// useEffect(() => {
	// 	// Update the view based on calendarViews value
	// 	if (calendarViews === "Day") {
	// 		dispatch(setView(Views.DAY));
	// 	} else if (calendarViews === "Week") {
	// 		dispatch(setView(Views.WEEK));
	// 	} else if (calendarViews === "Month") {
	// 		dispatch(setView(Views.MONTH));
	// 	}
	// }, [calendarViews]);

	const handleBack = () => {
		if (calendarViews === "week") {
			const newStart = addDaysToDate(start, -7);
			const newEnd = addDaysToDate(start, -1);
			dispatch(setDateRange({ start: newStart, end: newEnd }));
		}

		if (calendarViews === "month") {
			// Given date
			const givenDate = new Date(start);

			// Get the year and month from the given date
			const year = givenDate.getFullYear();
			const month = givenDate.getMonth();

			// Calculate the first date of last month
			const firstDateOfLastMonth = new Date(year, month - 1, 1);
			firstDateOfLastMonth.setHours(0, 0, 0, 0); // Set time to 00:00:00

			// Calculate the last date of last month
			const lastDateOfLastMonth = new Date(year, month, 0);
			lastDateOfLastMonth.setHours(23, 59, 59, 999); // Set time to 23:59:59

			// console.log("First date of last month:", firstDateOfLastMonth.toISOString().split("T")[0]);
			// console.log("Last date of last month:", lastDateOfLastMonth.toISOString().split("T")[0]);
			dispatch(setDateRange({ start: firstDateOfLastMonth, end: lastDateOfLastMonth }));
		}

		if (calendarViews === "day") {
			const newStart = addDaysToDate(start, -1);
			const newEnd = addDaysToDate(start, -1);
			dispatch(setDateRange({ start: newStart, end: newEnd }));
		}

		// if (calendarViews === Views.MONTH) {
		// 	setDatee(moment(datee).subtract(1, "months").toDate());
		// } else if (calendarViews === Views.WEEK) {
		// 	setDatee(moment(datee).subtract(1, "weeks").toDate());
		// } else if (calendarViews === Views.DAY) {
		// 	setDatee(moment(datee).subtract(1, "days").toDate());
		// }
	};

	const handleNext = () => {
		// if (calendarViews === Views.DAY) {
		// 	setDatee(moment(start).add(1, "days").toDate());
		// } else if (calendarViews === Views.WEEK) {
		// 	setDatee(moment(start).add(1, "weeks").toDate());
		// 	// dispatch(
		// 	// 	setDateRange({ start: moment(start).add(1, "weeks").toDate(), end: moment(end).add(1, "weeks").toDate() }),
		// 	// );
		// } else if (calendarViews === Views.MONTH) {
		// 	setDatee(moment(start).add(1, "months").toDate());
		// 	// dispatch(
		// 	// 	setDateRange({ start: moment(start).add(1, "months").toDate(), end: moment(end).add(1, "months").toDate() }),
		// 	// );
		// }

		if (calendarViews === "week") {
			const date = new Date(end);
			const dayOfWeek = date.getDay();

			if (dayOfWeek === 6) {
				// console.log("November 15, 2023, is the first day of the week.");
				const newStart = addDaysToDate(end, 1);
				const newEnd = addDaysToDate(end, 7);

				// console.log();

				dispatch(setDateRange({ start: newStart, end: newEnd }));
			} else {
				// console.log("November 15, 2023, is not the first day of the week.");
				const currentDate = new Date(start);

				// Get the first day of the week (Sunday)
				const firstDayOfWeek = new Date(currentDate);
				firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

				// Get the last day of the week (Saturday)
				const lastDayOfWeek = new Date(currentDate);
				lastDayOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));

				console.log("First Day of the Week (Sunday): " + firstDayOfWeek.toDateString());
				console.log("Last Day of the Week (Saturday): " + lastDayOfWeek.toDateString());
				dispatch(setDateRange({ start: firstDayOfWeek.toDateString(), end: lastDayOfWeek.toDateString() }));
			}
		}

		if (calendarViews === "month") {
			// Given date
			const givenDate = new Date(start);

			// Get the year and month from the given date
			const year = givenDate.getFullYear();
			const month = givenDate.getMonth();

			// Calculate the first date of next month
			const firstDateOfNextMonth = new Date(year, month + 1, 1);
			firstDateOfNextMonth.setHours(0, 0, 0, 0); // Set time to 00:00:00

			// Calculate the last date of next month
			const lastDateOfNextMonth = new Date(year, month + 2, 0);
			lastDateOfNextMonth.setHours(23, 59, 59, 999); // Set time to 23:59:59

			console.log("First date of next month:", firstDateOfNextMonth.toISOString().split("T")[0]);
			console.log("Last date of next month:", lastDateOfNextMonth.toISOString().split("T")[0]);
			// const firstDate = firstDateOfNextMonth.toISOString().split("T")[0];
			// const lastDate = lastDateOfNextMonth.toISOString().split("T")[0];

			dispatch(setDateRange({ start: firstDateOfNextMonth, end: lastDateOfNextMonth }));
		}

		if (calendarViews === "day") {
			const newStart = addDaysToDate(end, 1);
			const newEnd = addDaysToDate(end, 1);
			dispatch(setDateRange({ start: newStart, end: newEnd }));
		}
	};

	// useEffect(() => {
	// 	dispatch(setDate(datee));
	// }, [datee]);

	useEffect(() => {
		if (!start) return;
		if (calendarViews === "week") {
			const currentDate = new Date(start);

			// Get the first day of the week (Sunday)
			const firstDayOfWeek = new Date(currentDate);
			firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

			// Get the last day of the week (Saturday)
			const lastDayOfWeek = new Date(currentDate);
			lastDayOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay()));

			console.log("First Day of the Week (Sunday): " + firstDayOfWeek.toDateString());
			console.log("Last Day of the Week (Saturday): " + lastDayOfWeek.toDateString());
			dispatch(setDateRange({ start: firstDayOfWeek.toDateString(), end: lastDayOfWeek.toDateString() }));
			// setDateRange({ start: moment(start).subtract(1, "weeks").toDate(), end: datee });
		}
		if (calendarViews === "month") {
			const givenDate = new Date(start);

			// Get the year and month from the given date
			const year = givenDate.getFullYear();
			const month = givenDate.getMonth();

			// Calculate the first date of last month
			const firstDateOfLastMonth = new Date(year, month - 1, 1);
			firstDateOfLastMonth.setHours(0, 0, 0, 0); // Set time to 00:00:00

			// Calculate the last date of last month
			const lastDateOfLastMonth = new Date(year, month, 0);
			lastDateOfLastMonth.setHours(23, 59, 59, 999); // Set time to 23:59:59

			console.log("First date of last month:", firstDateOfLastMonth.toISOString().split("T")[0]);
			console.log("Last date of last month:", lastDateOfLastMonth.toISOString().split("T")[0]);
			dispatch(setDateRange({ start: firstDateOfLastMonth, end: lastDateOfLastMonth }));
		}
		if (calendarViews === "day") {
			dispatch(setDateRange({ start: start, end: start }));
		}
	}, [calendarViews]);

	const todayHandler = () => {
		const date = new Date();
		date.setDate(date.getDate());
		const today = date.toISOString().split("T")[0];

		dispatch(setDateRange({ start: today, end: today }));
	};

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
							dispatch(setCalendarView(e.target.value));
						}}
					/>
				</div>
			</div>
			{/* <div>{start + "--------" + end}</div> */}
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
