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

export const convertDateFormat = (dateString: string) => {
	const dateComponents = dateString.split("-");

	const year = parseInt(dateComponents[0]);
	const month = parseInt(dateComponents[1]);
	const day = parseInt(dateComponents[2]);

	const date = new Date(year, month - 1, day);

	const formattedDate = date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	return formattedDate;
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
