import { IIcon } from "constants/interfaces";

const UploadIcon = ({ color }: IIcon) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				d="M5.33334 5.33301H4.33334C3.93552 5.33301 3.55399 5.49104 3.27268 5.77235C2.99138 6.05365 2.83334 6.43518 2.83334 6.83301V12.1663C2.83334 12.5642 2.99138 12.9457 3.27268 13.227C3.55399 13.5083 3.93552 13.6663 4.33334 13.6663H11.6667C12.0645 13.6663 12.446 13.5083 12.7273 13.227C13.0086 12.9457 13.1667 12.5642 13.1667 12.1663V6.83301C13.1667 6.43518 13.0086 6.05365 12.7273 5.77235C12.446 5.49104 12.0645 5.33301 11.6667 5.33301H10.6667M10 3.33301L8.00001 1.33301M8.00001 1.33301L6.00001 3.33301M8.00001 1.33301V9.16634"
				stroke={`var(--${color ? color : "icon-primary"})`}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default UploadIcon;
