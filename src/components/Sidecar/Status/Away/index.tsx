import React from "react";
import styles from "../Status.module.scss";

const Away = () => {
	return (
		<span className={styles.statusIcon}>
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
				<circle cx="15.9999" cy="16.0004" r="10.6" fill="#91A0B5" stroke="white" strokeWidth="2" />
			</svg>
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

export default Away;
