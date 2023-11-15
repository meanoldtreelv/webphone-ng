import { useCallback, useEffect, useRef, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { calendarView, meetList, date, dateRange } from "redux/meet/meetSelectors";
import "./Calendar.scss";
import { setDescriptionDialogue, setMeetingDetails } from "redux/meet/meetSlice";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

// const allViews = Object.keys(BigCalendar.Views).map((k) => BigCalendar.Views[k]);

const MyCalendar = () => {
	const [id, setId] = useState("");
	const [view, setView] = useState(Views.WEEK);

	const dispatch = useDispatch();

	const meetingList = useSelector(meetList);
	const meetListData = useSelector(meetList);
	const { start, end } = useSelector(dateRange);
	const datee = useSelector(date);
	const calendarViews = useSelector(calendarView);

	useEffect(() => {
		// Update the view based on calendarViews value
		if (calendarViews === "day") {
			setView(Views.DAY);
		} else if (calendarViews === "week") {
			setView(Views.WEEK);
		} else if (calendarViews === "month") {
			setView(Views.MONTH);
		}
	}, [calendarViews]);

	const filteredEvents = meetListData?.map(({ start, end, title, id }) => ({
		start: new Date(start),
		end: new Date(end),
		title,
		id,
	}));

	// const views = {
	// 	month: false, // Hide Month view
	// 	week: false, // Hide Week view
	// 	day: false, // Hide Day view
	// 	agenda: false, // Hide Agenda view
	// };

	const onView = useCallback((newView) => setView(newView), [setView]);
	// const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);

	// const [view, setView] = useState("month");
	// const [date, setDate] = useState(new Date());
	const [newDate, setNewDate] = useState(datee);

	// const handleNext = () => {
	// 	if (view === Views.DAY) {
	// 		setDate(moment(date).add(1, "days").toDate());
	// 	} else if (view === Views.WEEK) {
	// 		setDate(moment(date).add(1, "weeks").toDate());
	// 	} else if (view === Views.MONTH) {
	// 		setDate(moment(date).add(1, "months").toDate());
	// 	}
	// };

	// const handleBack = () => {
	// 	if (view === Views.MONTH) {
	// 		setDate(moment(date).subtract(1, "months").toDate());
	// 	} else if (view === Views.WEEK) {
	// 		setDate(moment(date).subtract(1, "weeks").toDate());
	// 	} else if (view === Views.DAY) {
	// 		setDate(moment(date).subtract(1, "days").toDate());
	// 	}
	// };

	const MyEvent = ({ event }) => (
		<div
			onClick={() => {
				setId(event.id);
			}}>
			<strong>{event?.title}</strong>
			<p>{event?.description}</p>
		</div>
	);

	useEffect(() => {
		if (!id) return;
		const selectedData = (meetingList ?? []).filter((item) => item.id === id);

		dispatch(setMeetingDetails(selectedData[0]));
		dispatch(setDescriptionDialogue(true));
	}, [id]);

	const components = {
		event: MyEvent,
	};

	// console.log(datee, "dateee");

	return (
		<div style={{ height: "100%" }}>
			{/* <button onClick={handleBack}>Back</button>
			<button onClick={handleNext}>Next</button> */}

			<Calendar
				localizer={localizer}
				events={filteredEvents}
				startAccessor="start"
				endAccessor="end"
				style={{ height: "100%" }}
				// onNavigate={onNavigate}
				onView={onView}
				view={view}
				// views={views}
				// toolbar={false}
				components={components}
				date={start}
				// onView={(newView) => setView(newView)}
				onNavigate={(newDate, newView) => {
					setNewDate(newDate);
					setView(newView);
				}}
			/>
		</div>
	);
};

export default MyCalendar;
