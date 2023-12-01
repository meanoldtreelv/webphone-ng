import { IIcon } from "constants/interfaces";

const PlusIcon = ({ color }: IIcon) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
		<path
			d="M9 3.75V14.25M3.75 9H14.25"
			stroke={`var(--${color ? color : "icon-primary"})`}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default PlusIcon;
