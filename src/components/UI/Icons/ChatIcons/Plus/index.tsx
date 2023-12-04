import { IIcon } from "constants/interfaces";

const PlusIcon = ({ color }: IIcon) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				d="M8.00016 3.3335V12.6668M3.3335 8.00016H12.6668"
				stroke={`var(--${color ? color : "icon-primary"})`}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default PlusIcon;
