import { IIcon } from "constants/interfaces";

const InfoIcon = ({ color }: IIcon) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M9 1.6875C4.96125 1.6875 1.6875 4.96125 1.6875 9C1.6875 13.0387 4.96125 16.3125 9 16.3125C13.0387 16.3125 16.3125 13.0387 16.3125 9C16.3125 4.96125 13.0387 1.6875 9 1.6875ZM9.75 6C9.75 6.41421 9.41421 6.75 9 6.75C8.58579 6.75 8.25 6.41421 8.25 6C8.25 5.58579 8.58579 5.25 9 5.25C9.41421 5.25 9.75 5.58579 9.75 6ZM8.25 9C8.25 8.58579 8.58579 8.25 9 8.25C9.41421 8.25 9.75 8.58579 9.75 9V12C9.75 12.4142 9.41421 12.75 9 12.75C8.58579 12.75 8.25 12.4142 8.25 12V9Z"
				fill={`var(--${color ? color : "icon-primary"})`}
			/>
		</svg>
	);
};

export default InfoIcon;
