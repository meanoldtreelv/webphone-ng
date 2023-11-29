import { IIcon } from "constants/interfaces";

const PlayerPause = ({ color }: IIcon) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10 0.25C4.615 0.25 0.25 4.615 0.25 10C0.25 15.385 4.615 19.75 10 19.75C15.385 19.75 19.75 15.385 19.75 10C19.75 4.615 15.385 0.25 10 0.25ZM6 7C6 6.44771 6.44772 6 7 6H8C8.55229 6 9 6.44771 9 7V13C9 13.5523 8.55228 14 8 14H7C6.44771 14 6 13.5523 6 13V7ZM11 7C11 6.44771 11.4477 6 12 6H13C13.5523 6 14 6.44771 14 7V13C14 13.5523 13.5523 14 13 14H12C11.4477 14 11 13.5523 11 13V7Z"
				fill={`var(--${color ? color : "icon-primary"})`}
			/>
		</svg>
	);
};

export default PlayerPause;
