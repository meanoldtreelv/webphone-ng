// import "react-date-range/dist/styles.css"; // main css file
// import "react-date-range/dist/theme/default.css"; // theme css file

// import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDateRange } from "redux/meet/meetSlice";
import { DateRangePicker, Stack } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const DateRange = () => {
	// Get the current date
	const currentDate = new Date();

	// Create a new date 7 days from the current date
	const newDate = new Date(currentDate);
	newDate.setDate(currentDate.getDate() + 7);

	// Initialize the state with an array containing the current date and the new date
	const [value, setValue] = useState([currentDate, newDate]);

	const dispatch = useDispatch();

	useEffect(() => {
		// console.log(typeof value[0]);
		if (value === null) {
			return;
		}
		dispatch(setDateRange({ start: formatDateToYYYYMMDD(value[0]), end: formatDateToYYYYMMDD(value[1]) }));
	}, [value]);

	function formatDateToYYYYMMDD(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	}
	// console.log(value, "value");

	return (
		<Stack direction="column" spacing={8} alignItems="flex-start">
			<DateRangePicker
				value={value}
				onChange={setValue}
				block
				defaultCalendarValue={[new Date("2022-02-01 00:00:00"), new Date("2022-03-01 23:59:59")]}
			/>

			{/* <DateRangePicker
				value={value}
				onChange={setValue}
				showMeridian
				format="yyyy-MM-dd HH:mm:ss"
				defaultCalendarValue={[new Date("2022-02-01 00:00:00"), new Date("2022-03-01 23:59:59")]}
			/> */}
		</Stack>
	);
};

export default DateRange;
