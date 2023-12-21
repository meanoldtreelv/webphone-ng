import { IIcon } from "constants/interfaces";
import React from "react";

const RecentsIcon: React.FC<IIcon> = ({ color }) => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g id="line / recents" clipPath="url(#clip0_2129_3082)">
			<path
				id="Vector"
				d="M4.99967 13.9553C5.9014 14.4105 6.9206 14.6668 7.99967 14.6668C11.6816 14.6668 14.6663 11.6821 14.6663 8.00016C14.6663 4.31826 11.6816 1.3335 7.99967 1.3335C4.31778 1.3335 1.33301 4.31826 1.33301 8.00016V10.0002L3.33301 8.00016M7.99967 4.66683V8.66683L10.6663 10.0002"
				stroke={`var(--${color ? color : "icon-primary"})`}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</g>
		<defs>
			<clipPath id="clip0_2129_3082">
				<rect width="16" height="16" fill="white" />
			</clipPath>
		</defs>
	</svg>
);

export default RecentsIcon;
