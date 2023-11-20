import React from "react";

const PauseIcon = ({ color }: { color: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12C2.25 17.385 6.615 21.75 12 21.75C17.385 21.75 21.75 17.385 21.75 12C21.75 6.615 17.385 2.25 12 2.25ZM8 9C8 8.44771 8.44772 8 9 8H10C10.5523 8 11 8.44771 11 9V15C11 15.5523 10.5523 16 10 16H9C8.44771 16 8 15.5523 8 15V9ZM13 9C13 8.44771 13.4477 8 14 8H15C15.5523 8 16 8.44771 16 9V15C16 15.5523 15.5523 16 15 16H14C13.4477 16 13 15.5523 13 15V9Z"
				fill={`var(--${color})`}
			/>
		</svg>
	);
};

export default PauseIcon;
