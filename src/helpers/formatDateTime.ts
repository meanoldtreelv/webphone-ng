export const formatDate = (dateString: string) => {
	const date = new Date(dateString);

	const hours = date.getHours();
	const hours12 = hours % 12 === 0 ? 12 : hours % 12; // Adjust for 12 AM/PM
	const minutes = date.getMinutes();

	const hoursString = hours12 < 10 ? `0${hours12}` : hours12; // Ensure two digits for hours
	const minutesString = minutes < 10 ? `0${minutes}` : minutes;
	const ampm = hours >= 12 ? "PM" : "AM";

	return `${hoursString}:${minutesString} ${ampm}`;
};

export const toSecMinAndHr = (totalSeconds: number) => {
	const seconds = Math.floor(totalSeconds % 60);
	const minutes = Math.floor((totalSeconds - seconds) / 60);
	const hours = Math.floor(minutes / 60);
	const minutesRemaining = minutes % 60;

	const secondsString = seconds >= 0 ? `${seconds}` : "";
	const minutesString = minutesRemaining >= 0 ? `${minutesRemaining}` : "";
	const hoursString = hours >= 0 ? `${hours}` : "";

	return `${hoursString}:${minutesString}:${secondsString}`;
};

// export const convertDateFormat = (dateString: string) => {
// 	const dateComponents = dateString?.split("-");

// 	const year = parseInt(dateComponents[0]);
// 	const month = parseInt(dateComponents[1]);
// 	const day = parseInt(dateComponents[2]);

// 	const date = new Date(year, month - 1, day);

// 	const formattedDate = date?.toLocaleDateString("en-US", {
// 		month: "long",
// 		day: "numeric",
// 		year: "numeric",
// 	});

// 	return formattedDate;
// };

export const convertDateFormat = (dateString: string) => {
	const dateComponents = dateString?.split("-");

	if (dateComponents && dateComponents.length === 3) {
		const year = parseInt(dateComponents[0]);
		const month = parseInt(dateComponents[1]);
		const day = parseInt(dateComponents[2]);

		if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
			const date = new Date(year, month - 1, day);

			if (!isNaN(date.getTime())) {
				const formattedDate = date.toLocaleDateString("en-US", {
					month: "long",
					day: "numeric",
					year: "numeric",
				});

				return formattedDate;
			}
		}
	}

	return "Invalid Date"; // Handle the case where the input date is invalid
};

export const formatTime = (time: number) => {
	if (time && !isNaN(time)) {
		const minutes = Math.floor(time / 60);
		const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
		const seconds = Math.floor(time % 60);
		const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
		return `${formatMinutes}:${formatSeconds}`;
	}

	return "00:00";
};

export const convertInputDateFormat = (str: string) => {
	const date = new Date(str);
	const convertedDateStr = date.toISOString() + "Z";
	const millisecondsRegex = /\.\d+$/;
	return convertedDateStr.replace(millisecondsRegex, ".868000");
};

export const longDateTimeFormat = (str: string) => {
	const date = new Date(str);
	const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
	const month = date.toLocaleDateString("en-US", { month: "long" });
	const day = date.getDate();
	const year = date.getFullYear();
	const formattedDateString = `${weekday}, ${month} ${day}, ${year}`;
	return formattedDateString;
};

export const convertToHourMinuteFormat = (dateTimeString) => {
	// Create a Date object from the input string
	const dateTime = new Date(dateTimeString);

	// Get hours and minutes
	const hours = dateTime.getUTCHours();
	const minutes = dateTime.getUTCMinutes();

	// Format hours and minutes as two-digit strings
	const formattedHours = hours.toString().padStart(2, "0");
	const formattedMinutes = minutes.toString().padStart(2, "0");

	// Return the time in "HH:MM" format
	return `${formattedHours}:${formattedMinutes}`;
};

export const getWeek = (date: Date) => {
	const d = new Date(date.getFullYear(), 0, 1);
	const dayNum = d.getDay();
	d.setMonth(0);
	d.setDate(d.getDate() - dayNum + 1);
	const weeks = Math.ceil((date.getTime() - d.getTime()) / (86400000 * 7));
	return weeks;
};

export const recentDateFormat = (dateStr: any) => {
	const dateNum = Date.parse(dateStr);
	const date = new Date(dateNum);
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	if (date.toDateString() === today.toDateString()) {
		return "Today";
	} else if (date.toDateString() === yesterday.toDateString()) {
		return "Yesterday";
	} else {
		const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const currentWeek = today.getFullYear() === date.getFullYear() && getWeek(date) === getWeek(today);
		return currentWeek
			? days[date.getDay()]
			: date.toLocaleDateString("en-US", {
					year: "numeric",
					month: "short",
					day: "numeric",
			  });
	}
};

export const formatDateAdvanced = (dateString: string) => {
	const date = new Date(dateString);
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	if (date.toDateString() === today.toDateString()) {
		return "Today";
	} else if (date.toDateString() === yesterday.toDateString()) {
		return "Yesterday";
	} else {
		const weekStart = new Date(today);
		weekStart.setDate(today.getDate() - today.getDay());

		if (date >= weekStart) {
			const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
			return days[date.getDay()];
		} else {
			const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

			const year = date.getFullYear() === today.getFullYear() ? "" : ` ${date.getFullYear()}`;
			const dateMonth = `${monthNames[date.getMonth()]}${year}`;
			return `${date.getDate()} ${dateMonth}`;
		}
	}
};

// export function getDate(dateTimeString: any) {
// 	const dateObj = new Date(dateTimeString);
// 	return dateObj?.toDateString(); // Returns the date in a human-readable format
// }

export const longDateFormat = (date) => {
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// Split the date string into day, month, and year
	const dateParts = date.split("/");
	const day = parseInt(dateParts[0], 10); // Extract day
	const month = parseInt(dateParts[1], 10) - 1; // Extract month (subtract 1 as months are zero-indexed)
	const year = parseInt(dateParts[2], 10); // Extract year

	// Create a new Date object using the extracted parts
	const currentDate = new Date(year, month, day);

	// Get the day, month abbreviation, and year from the Date object
	const formattedDay = currentDate.getDate();
	const formattedMonth = months[currentDate.getMonth()];
	const formattedYear = currentDate.getFullYear();

	// Construct the formatted date string
	const formattedDate = `${formattedDay} ${formattedMonth} ${formattedYear}`;
	// console.log(formattedDate);
	return formattedDate;
};

// export function passedTime(date) {
// 	const currentdate = new Date();
// 	const miliseconds = new Date(date);
// 	const seconds = Math.floor(miliseconds.getTime() / 1000);
// 	const currentseconds = Math.floor(currentdate.getTime() / 1000);
// 	const difference = Math.abs(seconds - currentseconds);

// 	var d = Math.floor(difference / (3600 * 24));
// 	var h = Math.floor((difference % (3600 * 24)) / 3600);
// 	var m = Math.floor((difference % 3600) / 60);
// 	var s = Math.floor(difference % 60);

// 	var dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
// 	var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
// 	var mDisplay = m > 0 ? m + (m == 1 ? " min " : " mins ") : "";
// 	var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";

// 	if (d > 0) {
// 		return dDisplay;
// 	} else if (h > 0) {
// 		return hDisplay;
// 	} else if (m > 0) {
// 		return mDisplay;
// 	} else if (s > 0) {
// 		return sDisplay;
// 	}
// }

export function showPassedTimeDate(givenDate) {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const dayBeforeYesterday = new Date(today);
	dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);

	const dateFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
	const timeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

	const isSameDay = (date1, date2) =>
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate();

	if (isSameDay(givenDate, today)) {
		return givenDate.toLocaleTimeString("en-US", timeFormatOptions);
	} else if (isSameDay(givenDate, yesterday)) {
		return "Yesterday";
	} else if (isSameDay(givenDate, dayBeforeYesterday)) {
		return givenDate.toLocaleDateString("en-US", dateFormatOptions).replace(/\//g, ".");
	} else {
		// Check if the given date is further in the past
		if (givenDate < dayBeforeYesterday) {
			return givenDate.toLocaleDateString("en-US", dateFormatOptions).replace(/\//g, ".");
		} else {
			return "Date is further in the past";
		}
	}
}

export function convertIntoLongDateFormat(dateString) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const dateParts = dateString.split("/");
	const day = parseInt(dateParts[0], 10);
	const monthIndex = parseInt(dateParts[1], 10) - 1;
	const year = parseInt(dateParts[2], 10);

	const date = new Date(year, monthIndex, day);
	const options = { weekday: "long", month: "long", day: "numeric", year: "numeric" };

	const formattedDate = date.toLocaleDateString("en-US", options);

	const daySuffix = getDaySuffix(day);

	return formattedDate.replace(/\b\d{1,2}\b/, day + daySuffix);
}

function getDaySuffix(day) {
	if (day >= 11 && day <= 13) {
		return "th";
	}
	switch (day % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
}

// Example usage:
// const originalDate = "20/12/2023";
// const convertedDate = convertDateFormat(originalDate);
// console.log(convertedDate); // Output: Thursday, December 20th, 2023
