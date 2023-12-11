import { IIcon } from "constants/interfaces";

const SearchIcon = ({ color }: IIcon) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
		<path
			d="M14 14L10.5353 10.5354M10.5353 10.5354C11.473 9.59765 11.9998 8.32583 11.9998 6.9997C11.9998 5.67357 11.473 4.40175 10.5353 3.46403C9.59759 2.52632 8.32577 1.99951 6.99964 1.99951C5.67351 1.99951 4.40169 2.52632 3.46397 3.46403C2.52625 4.40175 1.99945 5.67357 1.99945 6.9997C1.99945 8.32583 2.52625 9.59765 3.46397 10.5354C4.40169 11.4731 5.67351 11.9999 6.99964 11.9999C8.32577 11.9999 9.59759 11.4731 10.5353 10.5354Z"
			stroke={`var(--${color ? color : "icon-primary"})`}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default SearchIcon;
