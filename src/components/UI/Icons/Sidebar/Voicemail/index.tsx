import { IIcon } from "constants/interfaces";
import React from "react";

const VoicemailIcon: React.FC<IIcon> = ({ color }) => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g id="line / voicemail" clipPath="url(#clip0_2129_3092)">
			<path
				id="Vector"
				d="M4.00033 11.3332C5.84127 11.3332 7.33366 9.84079 7.33366 7.99984C7.33366 6.15889 5.84127 4.6665 4.00033 4.6665C2.15938 4.6665 0.666992 6.15889 0.666992 7.99984C0.666992 9.84079 2.15938 11.3332 4.00033 11.3332ZM4.00033 11.3332H12.0003M12.0003 11.3332C13.8413 11.3332 15.3337 9.84079 15.3337 7.99984C15.3337 6.15889 13.8413 4.6665 12.0003 4.6665C10.1594 4.6665 8.66699 6.15889 8.66699 7.99984C8.66699 9.84079 10.1594 11.3332 12.0003 11.3332Z"
				stroke={`var(--${color ? color : "icon-primary"})`}
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</g>
		<defs>
			<clipPath id="clip0_2129_3092">
				<rect width="16" height="16" fill="white" />
			</clipPath>
		</defs>
	</svg>
);

export default VoicemailIcon;
