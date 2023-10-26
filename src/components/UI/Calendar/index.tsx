import React from "react";
import { render } from "react-dom";
import events from "./events";
// import BigCalendar from "react-big-calendar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useLazyGetMeetQuery } from "services/meet";

moment.locale("en-GB");
// BigCalendar.momentLocalizer(moment);
const localizer = momentLocalizer(moment);

// const allViews = Object.keys(BigCalendar.Views).map((k) => BigCalendar.Views[k]);

const MyCalendar = () => {
	const { data } = useLazyGetMeetQuery("2023-10-21T18:30:00.000Z", "2023-10-28T18:29:59.999Z");
	console.log(data, "meeting list");

	return (
		<div style={{ height: "100%" }}>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: "100%" }}
			/>
		</div>
	);
};

export default MyCalendar;
