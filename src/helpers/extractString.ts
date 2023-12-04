export const extractFieldName = (str: string): string => {
	const match = str.match(/'(.*?)'/);

	if (match) return match[1];

	return "";
};

export const convertErrorString = (str: string): string => {
	const match = str.match(/'(.*?)'/);
	if (match) {
		const extractedString = match[1];
		const capitalizedString = extractedString[0].toUpperCase() + extractedString.slice(1);
		str = str.replace(extractedString, capitalizedString.replace("_", " "));
	}

	return str;
};
