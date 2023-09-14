import React, { useState } from "react";
import classes from "./contactDetails.module.scss";
import HistoryCard from "./HistoryCard";
import { useDispatch, useSelector } from "react-redux";
import { contactActions } from "../../store/contact";

const ContactDetails = () => {
	const [activeButton, setActiveButton] = useState("1");

	const [isCallHistory, setIsCallHistory] = useState(false);

	const dispatch = useDispatch();

	const selectedContactData = useSelector((state) => state.contact.selectedContact);
	console.log(selectedContactData, "selectedContactData");

	// styling
	const contactActiveButton = {
		background: "var(--primary-default, #0c6dc7)",
		boxShadow: "0px 4px 4px 0px rgba(12, 109, 199, 0.15)",
		color: "var(--text-on-color, #FFF)",
		fontWeight: "500",
	};
	return (
		<section className={classes.contactDetails}>
			<div className={classes.contactDetails_box}>
				<div className={`flex justify-between items-center`}>
					<div className={`flex items-center gap-2`}>
						<span className={` ${classes.profile}`} style={{ background: "var(--accent-purple-primary, #944af5)" }}>
							<span
								className={`flex justify-center items-center title_3`}
								style={{
									color: "var(--accent-purple-label, #FFF)",
									background: "linear-gradient(135deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.00) 50.52%)",
									height: "100%",
								}}>
								MT
							</span>
						</span>
						<div>
							<p className={`title_3 `} style={{ color: "var(--text-primary, #1F2023)" }}>
								{`${selectedContactData?.salutation || ""} ${selectedContactData?.first_name || ""} ${
									selectedContactData?.last_name || ""
								}`}
							</p>
							<p className={`body`} style={{ color: "var(--text-secondary, #5C6168)" }}>
								{selectedContactData?.email || "null"}
							</p>
						</div>
					</div>
					<span className={`flex ${classes.edit}`}>
						<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
							<path
								d="M7.75 3.00017H2.5C2.10218 3.00017 1.72064 3.15821 1.43934 3.43951C1.15804 3.72081 1 4.10235 1 4.50017V15.0002C1 15.398 1.15804 15.7795 1.43934 16.0608C1.72064 16.3421 2.10218 16.5002 2.5 16.5002H13C13.3978 16.5002 13.7794 16.3421 14.0607 16.0608C14.342 15.7795 14.5 15.398 14.5 15.0002V9.75017M13.375 1.87517C13.6734 1.5768 14.078 1.40918 14.5 1.40918C14.922 1.40918 15.3266 1.5768 15.625 1.87517C15.9234 2.17354 16.091 2.57821 16.091 3.00017C16.091 3.42213 15.9234 3.8268 15.625 4.12517L8.5 11.2502L5.5 12.0002L6.25 9.00017L13.375 1.87517Z"
								stroke="#1F2023"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span className={`footnote `} style={{ color: "var(--text-primary, #1F2023)" }}>
							Edit
						</span>
					</span>
				</div>
				<div className={`caption_1 ${classes.contactButton}`}>
					<span
						style={activeButton === "1" ? contactActiveButton : {}}
						onClick={() => {
							setActiveButton("1");
						}}>
						Contact Info
					</span>
					<span
						style={activeButton === "2" ? contactActiveButton : {}}
						onClick={() => {
							setActiveButton("2");
						}}>
						Call History
					</span>
				</div>
				{activeButton === "1" ? (
					<div className={classes.contactInfo}>
						<div className={classes.rowBox}>
							<div className={classes.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Phone
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										{selectedContactData?.phone || "null"}
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
										Fax
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										{selectedContactData?.fax || "null"}
									</p>
								</div>
								<div className={classes.iconBox}>
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M9.5625 4.875V1.5H4.5C3.67157 1.5 3 2.17157 3 3V15C3 15.8284 3.67157 16.5 4.5 16.5H13.5C14.3284 16.5 15 15.8284 15 15V6.9375H11.625C10.4859 6.9375 9.5625 6.01409 9.5625 4.875ZM5.25 10.6875C5.25 10.3768 5.50184 10.125 5.8125 10.125H11.4375C11.7482 10.125 12 10.3768 12 10.6875C12 10.9982 11.7482 11.25 11.4375 11.25H5.8125C5.50184 11.25 5.25 10.9982 5.25 10.6875ZM5.25 13.3125C5.25 13.0018 5.50184 12.75 5.8125 12.75H8.4375C8.74816 12.75 9 13.0018 9 13.3125C9 13.6232 8.74816 13.875 8.4375 13.875H5.8125C5.50184 13.875 5.25 13.6232 5.25 13.3125Z"
												fill="white"
											/>
											<path
												d="M10.6875 4.875V1.73674C10.7778 1.79456 10.8623 1.86233 10.9393 1.93934L14.5607 5.56066C14.6377 5.63767 14.7054 5.72219 14.7633 5.8125H11.625C11.1072 5.8125 10.6875 5.39277 10.6875 4.875Z"
												fill="white"
											/>
										</svg>
									</span>
								</div>
							</div>
						</div>
						<div className={classes.rowBox}>
							<div className={classes.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Birthday
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										{selectedContactData?.birthday || "null"}
									</p>
								</div>
							</div>
							<div className={classes.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Position
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										{selectedContactData?.job_details?.position || "null"}
									</p>
								</div>
							</div>
							<div className={classes.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Department
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										{selectedContactData?.job_details?.department || "null"}
									</p>
								</div>
							</div>
						</div>
						<div className={classes.rowBox}>
							<div className={classes.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Company
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										{selectedContactData?.organization_details?.organization || "null"}
									</p>
								</div>
							</div>
						</div>
						<div className={classes.rowBox}>
							<div className={classes.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										City
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										{selectedContactData?.address?.city || "null"}
									</p>
								</div>
							</div>
							<div className={classes.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										State
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										{selectedContactData?.address?.state || "null"}
									</p>
								</div>
							</div>
							<div className={classes.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Country
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										{selectedContactData?.address?.country || "null"}
									</p>
								</div>
							</div>
							{/* <div className={classes.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Mailing Address
									</p>
									<p className={`body`} style={{ color: "var(--text-primary, #1F2023)" }}>
										new jersy, US, 20551
									</p>
								</div>
							</div> */}
						</div>
						<p
							className={`footnote_bold cursor-pointer`}
							style={{ color: "var(--support-danger, #EE3939)", textAlign: "left", width: "100%" }}
							onClick={() => {
								dispatch(contactActions.openDeleteContact());
							}}>
							Delete Contact
						</p>
					</div>
				) : (
					<div className={classes.callHistory}>
						{isCallHistory ? (
							<div>
								<p className={`caption_2 py-2 px-4`} style={{ color: "var(--text-secondary, #5C6168)" }}>
									Today (6)
								</p>
								<HistoryCard />
								<HistoryCard />
								<HistoryCard />
								<HistoryCard />
								<HistoryCard />
							</div>
						) : (
							<div className={classes.noHistory_box}>
								<div className={classes.noHistory}>
									<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
										<path
											d="M15 41.8654C17.7052 43.2309 20.7628 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24V30L10 24M24 14V26L32 30"
											stroke="#6C7A8B"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<p>{`You have no call history with Melisa Townsend`}</p>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</section>
	);
};

export default ContactDetails;
