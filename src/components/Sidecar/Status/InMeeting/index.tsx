import React from "react";
import styles from "../Status.module.scss";
import CalenderIcon from "components/UI/Icons/Status/Calender";

const InMeeting = () => {
	return (
		<span className={styles.statusIcon}>
			<CalenderIcon />
			<span>
				<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 6 6" fill="none">
					<g clipPath="url(#clip0_1235_136112)">
						<path
							d="M1.125 1.125L4.875 4.875M4.875 1.125L1.125 4.875"
							stroke="white"
							strokeWidth="1.5"
							strokeLinecap="round"
						/>
					</g>
					<defs>
						<clipPath id="clip0_1235_136112">
							<rect width="24" height="24" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</span>
		</span>
	);
};

export default InMeeting;
