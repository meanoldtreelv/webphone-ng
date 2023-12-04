import { IIcon } from "constants/interfaces";

const UserStatusIcon = ({ color }: IIcon) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<circle
				cx="7.99995"
				cy="7.99922"
				r="5.8"
				fill={`var(--${color ? color : "icon-primary"})`}
				stroke="white"
				strokeWidth="2"
			/>
		</svg>
	);
};

export default UserStatusIcon;
