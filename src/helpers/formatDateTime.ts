export const formatDate = (dateString: string) => {
	const date = new Date(dateString);

	const hours = date.getHours();
	const hours12 = hours % 12;
	const minutes = date.getMinutes();

	const minutesString = minutes < 10 ? `0${minutes}` : minutes;
	const ampm = hours >= 12 ? "PM" : "AM";

	return `${hours12}:${minutesString} ${ampm}`;
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
