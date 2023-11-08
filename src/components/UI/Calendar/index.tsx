import { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
// import CustomWeekView from "./CustomWeekView";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useLazyGetMeetQuery } from "services/meet";
import { useSelector } from "react-redux";
import { meetList } from "redux/meet/meetSelectors";
import events from "./events";
import "./Calendar.scss";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

// const allViews = Object.keys(BigCalendar.Views).map((k) => BigCalendar.Views[k]);
// const events2 = [
// 	{
// 		title: "Some Event",
// 		start: new Date(2023, 3, 9, 0, 0, 0),
// 		end: new Date(2023, 3, 9, 0, 0, 0),
// 	},
// 	{
// 		title: "Conference",
// 		start: new Date(2023, 3, 11),
// 		end: new Date(2023, 3, 13),
// 		desc: "Big conference for important people",
// 	},
// 	{
// 		title: "Meeting",
// 		start: new Date(2023, 3, 12, 10, 30, 0, 0),
// 		end: new Date(2023, 3, 12, 12, 30, 0, 0),
// 		desc: "Pre-meeting meeting, to prepare for the meeting",
// 	},
// 	{
// 		title: "Lunch",
// 		start: new Date(2023, 3, 12, 12, 0, 0, 0),
// 		end: new Date(2023, 3, 12, 13, 0, 0, 0),
// 		desc: "Power lunch",
// 	},
// ];

const MyCalendar = () => {
	// const [getMeetList, { data: meetListDatas, headers }] = useLazyGetMeetQuery();

	useEffect(() => {
		// const fetchData = async () => {
		// 	await getMeetList({ dateFrom: null, dateTo: null, perPage: 100, page: 1 });
		// };
		// fetchData();
		// start && end && console.log(fetchData(), "fetchdata");
		// setTotalPageCount(headers?.["x-pagination-page-count"]);
		// setPage(2);
		// console.log(meetingList, meetListData, "both");
	}, []);

	const meetListData = useSelector(meetList);
	const filteredEvents = meetListData?.map(({ start, end, title }) => ({
		start: new Date(start),
		end: new Date(end),
		title,
	}));
	// console.log(meetListData, "meeting list");
	// console.log("====================================");
	// console.log(filteredEvents, "filteredEvents");
	// console.log("====================================");

	//...
	// const {views, ...otherProps} = useMemo(() => ({
	//   views: {
	//     month: true,
	//     week: CustomWeekView,
	//     day: true
	//   },
	//   // ... other props
	// }), [])
	const views = {
		month: true,
		week: true,
		day: true,
		// myweek: WorkWeekViewComponent,
	};

	return (
		<div style={{ height: "100%" }}>
			<Calendar
				localizer={localizer}
				events={filteredEvents}
				startAccessor="start"
				endAccessor="end"
				style={{ height: "100%" }}
				views={views}
				// {...otherProps}
			/>
		</div>
	);
};

export default MyCalendar;
