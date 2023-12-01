import { IIcon } from "constants/interfaces";

const UserIcon = ({ color }: IIcon) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
			<path
				d="M2.91644 2.91679C2.91644 4.06528 3.84876 5.00022 4.99987 5.00022C6.15098 5.00022 7.08333 4.06526 7.0833 2.91676C7.0833 1.76568 6.15095 0.833334 4.99987 0.833334C3.84879 0.833334 2.91644 1.76568 2.91644 2.91679Z"
				fill={`var(--${color ? color : "icon-primary"})`}
			/>
			<path
				d="M9.16663 8.1255C9.16663 6.73742 6.38783 6.04207 4.99975 6.04207C3.61166 6.04207 0.832886 6.73742 0.832886 8.1255V8.75057C0.832886 8.98068 1.01943 9.16723 1.24955 9.16723H8.74997C8.98009 9.16723 9.16663 8.98068 9.16663 8.75057V8.1255Z"
				fill={`var(--${color ? color : "icon-primary"})`}
			/>
		</svg>
	);
};

export default UserIcon;
