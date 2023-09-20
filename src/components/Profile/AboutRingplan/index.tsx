import { useState } from "react";
import styles from "./AboutRingplan.module.scss";

const AboutRingplan = () => {
	const [isLatestVersion, setIsLatestVersion] = useState(true);

	return (
		<div className={styles.aboutRingplan}>
			<div className={styles.aboutBox}>
				<div className={styles.headline}>
					<span className={`sub_headline_bold`}>About RingPlan</span>
					<span className={styles.close}>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="line / close" clipPath="url(#clip0_2236_1196)">
								<path
									id="Vector"
									d="M11.25 6.75L6.75 11.25M6.75 6.75L11.25 11.25M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
									stroke="#6C7A8B"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_2236_1196">
									<rect width="18" height="18" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</span>
				</div>
				<div className={`flex flex-col justify-center items-center gap-3 my-3`}>
					<div>
						<img src="/RingPlanVoiceIcon.svg" alt="" />
					</div>

					<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
						Application Version MacOS: 3.0
					</p>
					<p className={`flex justify-center items-center gap-1`}>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="fill / info">
								<path
									id="Vector"
									fillRule="evenodd"
									clipRule="evenodd"
									d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8C1.5 11.59 4.41 14.5 8 14.5C11.59 14.5 14.5 11.59 14.5 8C14.5 4.41 11.59 1.5 8 1.5ZM8.66667 5.33333C8.66667 5.70152 8.36819 6 8 6C7.63181 6 7.33333 5.70152 7.33333 5.33333C7.33333 4.96514 7.63181 4.66667 8 4.66667C8.36819 4.66667 8.66667 4.96514 8.66667 5.33333ZM7.33333 8C7.33333 7.63181 7.63181 7.33333 8 7.33333C8.36819 7.33333 8.66667 7.63181 8.66667 8V10.6667C8.66667 11.0349 8.36819 11.3333 8 11.3333C7.63181 11.3333 7.33333 11.0349 7.33333 10.6667V8Z"
									fill={isLatestVersion ? "#75C322" : "#F5C400"}
								/>
							</g>
						</svg>
						<span className={`footnote `} style={{ color: "var(--text-secondary, #5C6168)" }}>
							{isLatestVersion ? "You are using the latest version" : " You are not using the latest version"}
						</span>
					</p>
				</div>
				<div className={`body flex flex-col gap-2 ${styles.updateBox}`}>
					<div className={`flex justify-between items-center px-2 py-4 cursor-pointer`}>
						<span>Check updates for RingPlan Voice App</span>
						<span>
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="line / chevron_right">
									<path
										id="Vector"
										d="M7.125 4.5L11.625 9L7.125 13.5"
										stroke="#1480E1"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</g>
							</svg>
						</span>
					</div>
					<div className={`flex justify-between items-center px-2 py-4 cursor-pointer`}>
						<span>Download RingPlan Meet App</span>
						<span>
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="line / chevron_right">
									<path
										id="Vector"
										d="M7.125 4.5L11.625 9L7.125 13.5"
										stroke="#1480E1"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</g>
							</svg>
						</span>
					</div>
				</div>
				<div className={`flex flex-col gap-5 items-center p-5`}>
					<div
						className={`footnote_bold flex flex-col justify-center items-center gap-3`}
						style={{ color: " var(--primary-default, #0C6DC7)" }}>
						<p className={`cursor-pointer`}>Visit RingPlan Website</p>
						<p className={`cursor-pointer`}>Legal and Policy Policy</p>
						<p className={`cursor-pointer`}>Support</p>
					</div>
					<p className={`footnote`} style={{ color: "var(--text-secondary, #5C6168)" }}>
						2020-2023 RingPlan
					</p>
				</div>
			</div>
		</div>
	);
};

export default AboutRingplan;
