import { IIcon } from "constants/interfaces";

const CloseIcon = ({ color }: IIcon) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2.62605 2.62622C3.01658 2.2357 3.64974 2.23569 4.04026 2.62622L7.99983 6.58578L11.9594 2.62622C12.3499 2.2357 12.9831 2.2357 13.3736 2.62622C13.7641 3.01674 13.7641 3.64991 13.3736 4.04043L9.41404 7.99999L13.3736 11.9596C13.7641 12.3501 13.7641 12.9832 13.3736 13.3738C12.9831 13.7643 12.3499 13.7643 11.9594 13.3738L7.99983 9.41421L4.04027 13.3738C3.64974 13.7643 3.01658 13.7643 2.62605 13.3738C2.23553 12.9832 2.23553 12.3501 2.62605 11.9596L6.58561 7.99999L2.62605 4.04043C2.23553 3.64991 2.23553 3.01674 2.62605 2.62622Z"
				fill={`var(--${color ? color : "icon-primary"})`}
			/>
		</svg>
	);
};

export default CloseIcon;
