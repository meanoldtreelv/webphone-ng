import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDateRange, setMeetDateRange } from "redux/meet/meetSlice";
import { CustomProvider, DateRangePicker, Stack } from "rsuite";

import "./DateRange.scss";
import { calendarView, dateRange } from "redux/meet/meetSelectors";

const DateRange = () => {
	const dispatch = useDispatch();

	const { start, end } = useSelector(dateRange);

	function formatDateToYYYYMMDD(dateObject: any) {
		if (!(dateObject instanceof Date)) {
			// Handle cases where dateObject is not a Date
			return "Invalid Date";
		}

		const year = dateObject.getFullYear();
		const month = String(dateObject.getMonth() + 1).padStart(2, "0");
		const day = String(dateObject.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}

	const [value, setValue] = useState([new Date(), new Date()]);

	useEffect(() => {
		let currentDate = new Date();

		// Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
		let currentDay = currentDate.getDay();

		// Calculate the difference between the current day and the start of the week (Sunday)
		let difference = currentDay - 0; // Assuming Sunday is the start of the week

		// Get the first date of the week by subtracting the difference from the current date
		let firstDateOfWeek = new Date(currentDate);
		firstDateOfWeek.setDate(currentDate.getDate() - difference + 1);
		firstDateOfWeek.setHours(0, 0, 0, 0); // Set time to 00:00:00

		// Get the last date of the week by adding the remaining days until Saturday
		let lastDateOfWeek = new Date(currentDate);
		let remainingDays = 6 - currentDay; // Remaining days until Saturday
		lastDateOfWeek.setDate(currentDate.getDate() + remainingDays);
		lastDateOfWeek.setHours(23, 59, 59, 999); // Set time to 23:59:59

		// Formatting the dates
		let formattedFirstDate = firstDateOfWeek.toISOString().split("T")[0] + " 00:00:00";
		let formattedLastDate = lastDateOfWeek.toISOString().split("T")[0] + " 23:59:59";

		// console.log("First date of the week:", formattedFirstDate);
		// console.log("Last date of the week:", formattedLastDate);
		setValue([new Date(formattedFirstDate), new Date(formattedLastDate)]);

		dispatch(setDateRange({ start: formattedFirstDate, end: formattedLastDate }));
	}, []);

	useEffect(() => {
		setValue([new Date(start), new Date(end)]);
	}, [start]);

	useEffect(() => {
		dispatch(setMeetDateRange({ meetStart: formatDateToYYYYMMDD(value[0]), meetEnd: formatDateToYYYYMMDD(value[1]) }));
	}, [value]);

	return (
		<CustomProvider>
			<Stack direction="column" spacing={8} alignItems="flex-start">
				<DateRangePicker
					value={value}
					onChange={setValue}
					block
					// format="yyyy-MM"
					// defaultCalendarValue={[new Date(formattedFirstDate), new Date(formattedLastDate)]}
					appearance="default"
				/>

				{/* <DateRangePicker
				value={value}
				onChange={setValue}
				showMeridian
				format="yyyy-MM-dd HH:mm:ss"
				defaultCalendarValue={[new Date("2022-02-01 00:00:00"), new Date("2022-03-01 23:59:59")]}
			/> */}
			</Stack>
		</CustomProvider>
	);
};

export default DateRange;
