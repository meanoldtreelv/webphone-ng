import React, { useState } from "react";
import classes from "./contactDetails.module.scss";

const ContactDetails = () => {
	const [activeButton, setActiveButton] = useState("1");
	const contactActiveButton = {
		background: "var(--primary-default, #0c6dc7)",
		boxShadow: "0px 4px 4px 0px rgba(12, 109, 199, 0.15)",
		color: "var(--text-on-color, #FFF)",
		fontWeight: "500",
	};
	return (
		<section className={classes.contactDetails}>
			<div className={classes.contactDetails_box}>
				{activeButton === "1" ? (
					<div className={classes.contactInfo}>
						<div className={classes.rowBox}>
							<div className={classes.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
									Name
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
									Luis Arnold
									</p>
								</div>
								<div className={`caption_1_bold ${classes.contactInfoText}`}>
									<span>
										Contact Info
									</span>
								
								</div>
							</div>
						</div>
						<div className={classes.rowBox}>
							<div className={classes.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Phone
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										+1(234) 687 5520
									</p>
								</div>
								<div className={classes.iconBox}>
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
											<path
												d="M16.5 12.6901V14.9401C16.5008 15.1489 16.458 15.3557 16.3743 15.5471C16.2907 15.7385 16.1679 15.9103 16.014 16.0515C15.8601 16.1927 15.6784 16.3002 15.4805 16.3671C15.2826 16.434 15.073 16.4589 14.865 16.4401C12.5571 16.1893 10.3402 15.4007 8.39245 14.1376C6.58032 12.9861 5.04395 11.4497 3.89245 9.63757C2.62493 7.68098 1.83613 5.45332 1.58995 3.13507C1.57121 2.92767 1.59586 2.71864 1.66233 2.52129C1.72879 2.32394 1.83563 2.14259 1.97602 1.98879C2.11642 1.83499 2.2873 1.7121 2.47779 1.62796C2.66828 1.54382 2.87421 1.50027 3.08245 1.50007H5.33245C5.69643 1.49649 6.04929 1.62538 6.32527 1.86272C6.60125 2.10006 6.78151 2.42966 6.83245 2.79007C6.92742 3.51012 7.10354 4.21712 7.35745 4.89757C7.45836 5.16602 7.4802 5.45776 7.42038 5.73823C7.36056 6.01871 7.2216 6.27616 7.01995 6.48007L6.06745 7.43257C7.13512 9.31023 8.68979 10.8649 10.5674 11.9326L11.5199 10.9801C11.7239 10.7784 11.9813 10.6395 12.2618 10.5796C12.5423 10.5198 12.834 10.5417 13.1024 10.6426C13.7829 10.8965 14.4899 11.0726 15.21 11.1676C15.5743 11.219 15.907 11.4025 16.1448 11.6832C16.3827 11.9639 16.5091 12.3223 16.5 12.6901Z"
												fill="white"
											/>
										</svg>
									</span>
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
											<path
												d="M15.75 11.25C15.75 11.6478 15.592 12.0294 15.3107 12.3107C15.0294 12.592 14.6478 12.75 14.25 12.75H5.25L2.25 15.75V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H14.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V11.25Z"
												fill="white"
											/>
										</svg>
									</span>
								</div>
							</div>
							<div className={classes.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Date
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										Monday, March 13, 2023 6:33 PM
									</p>
								</div>
							</div>
							<div className={classes.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Type
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										Missed Call
									</p>
								</div>
							</div>
							<div className={classes.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Duration
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										Ring 2 time
									</p>
								</div>
							</div>
						</div>
						<p
							className={`footnote_bold cursor-pointer`}
							style={{ color: "var(--support-danger, #EE3939)", textAlign: "left", width: "100%" }}>
							Delete Record
						</p>
					</div>
				) : (
					<div className={classes.callHistory}>
						<div>
							<p className={`caption_2 py-2 px-4`} style={{ color: "var(--text-secondary, #5C6168)" }}>
								Today (6)
							</p>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default ContactDetails;
