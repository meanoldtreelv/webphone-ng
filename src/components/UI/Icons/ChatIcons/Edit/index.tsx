import { IIcon } from "constants/interfaces";

const EditIcon = ({ color }: IIcon) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
		<path
			d="M8.25 2.99999H3C2.60218 2.99999 2.22064 3.15802 1.93934 3.43933C1.65804 3.72063 1.5 4.10216 1.5 4.49999V15C1.5 15.3978 1.65804 15.7793 1.93934 16.0606C2.22064 16.342 2.60218 16.5 3 16.5H13.5C13.8978 16.5 14.2794 16.342 14.5607 16.0606C14.842 15.7793 15 15.3978 15 15V9.74999M13.875 1.87499C14.1734 1.57662 14.578 1.409 15 1.409C15.422 1.409 15.8266 1.57662 16.125 1.87499C16.4234 2.17336 16.591 2.57803 16.591 2.99999C16.591 3.42194 16.4234 3.82662 16.125 4.12499L9 11.25L6 12L6.75 8.99999L13.875 1.87499Z"
			stroke={`var(--${color ? color : "icon-primary"})`}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default EditIcon;
