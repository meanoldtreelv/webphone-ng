import { useState } from "react";
import styles from "./ContactDetails.module.scss";
import HistoryCard from "../HistoryCard";
import { useDispatch, useSelector } from "react-redux";
import {
	openAddEditContact,
	setEditContactNumber,
	openDeleteContact,
	setDeleteContactId,
} from "redux/contact/contactSlice";
import { contactAbbreviation } from "../../../utils";
import EditIcon from "components/UI/Icons/Edit";
import PhoneIcon from "components/UI/Icons/Phone";
import ChatIcon from "components/UI/Icons/Chat";
import FileIcon from "components/UI/Icons/File";
import HistoryTimeIcon from "components/UI/Icons/Call/CallHistory";
import { selectedContactData } from "redux/contact/contactSelectors";
import sip from "lib/sip";
import { useNavigate } from "react-router";

const ContactDetails = () => {
	const [activeButton, setActiveButton] = useState("1");
	const [isCallHistory, setIsCallHistory] = useState(false);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const selectedContact = useSelector(selectedContactData);

	const editContactHandler = () => {
		dispatch(setEditContactNumber(selectedContact?.id));
		dispatch(openAddEditContact());
	};

	// styling
	const contactActiveButton = {
		background: "var(--primary-default, #0c6dc7)",
		boxShadow: "0px 4px 4px 0px rgba(12, 109, 199, 0.15)",
		color: "var(--text-on-color, #FFF)",
		fontWeight: "500",
	};

	const handleCall = () => {
		sip.call(String(selectedContact?.phone));
		navigate("/dashboard");
	};

	return (
		<section className={styles.contactDetails}>
			<div className={styles.contactDetails_box}>
				<div className={styles.contactDetails_header}>
					<div className={styles.headerLeft}>
						<div className={styles.profile}>
							<span>
								{contactAbbreviation(
									selectedContact?.first_name,
									selectedContact?.last_name,
									selectedContact?.phone,
									selectedContact?.email,
								)}
							</span>
						</div>
						<div className={styles.profileInfo}>
							<p>
								{selectedContact?.salutation} {selectedContact?.first_name} {selectedContact?.last_name}
							</p>
							<span>{selectedContact?.email}</span>
						</div>
					</div>

					<button className={styles.edit} onClick={editContactHandler}>
						<EditIcon />
						<span>Edit</span>
					</button>
				</div>
				<div className={styles.contactButton}>
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
					<div className={styles.contactInfo}>
						<div className={styles.rowBox}>
							<div className={styles.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Phone
									</p>
									<p className={styles.rowValue}>{selectedContact?.phone}</p>
								</div>
								<div className={styles.iconBox}>
									<span onClick={handleCall}>
										{/* fix the padding for this icon */}
										<PhoneIcon />
										{/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
											<path
												d="M16.5 12.6901V14.9401C16.5008 15.1489 16.458 15.3557 16.3743 15.5471C16.2907 15.7385 16.1679 15.9103 16.014 16.0515C15.8601 16.1927 15.6784 16.3002 15.4805 16.3671C15.2826 16.434 15.073 16.4589 14.865 16.4401C12.5571 16.1893 10.3402 15.4007 8.39245 14.1376C6.58032 12.9861 5.04395 11.4497 3.89245 9.63757C2.62493 7.68098 1.83613 5.45332 1.58995 3.13507C1.57121 2.92767 1.59586 2.71864 1.66233 2.52129C1.72879 2.32394 1.83563 2.14259 1.97602 1.98879C2.11642 1.83499 2.2873 1.7121 2.47779 1.62796C2.66828 1.54382 2.87421 1.50027 3.08245 1.50007H5.33245C5.69643 1.49649 6.04929 1.62538 6.32527 1.86272C6.60125 2.10006 6.78151 2.42966 6.83245 2.79007C6.92742 3.51012 7.10354 4.21712 7.35745 4.89757C7.45836 5.16602 7.4802 5.45776 7.42038 5.73823C7.36056 6.01871 7.2216 6.27616 7.01995 6.48007L6.06745 7.43257C7.13512 9.31023 8.68979 10.8649 10.5674 11.9326L11.5199 10.9801C11.7239 10.7784 11.9813 10.6395 12.2618 10.5796C12.5423 10.5198 12.834 10.5417 13.1024 10.6426C13.7829 10.8965 14.4899 11.0726 15.21 11.1676C15.5743 11.219 15.907 11.4025 16.1448 11.6832C16.3827 11.9639 16.5091 12.3223 16.5 12.6901Z"
												fill="white"
											/>
										</svg> */}
									</span>
									<span>
										{/* fix the padding for this icon */}
										<ChatIcon />
										{/* <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
											<path
												d="M15.75 11.25C15.75 11.6478 15.592 12.0294 15.3107 12.3107C15.0294 12.592 14.6478 12.75 14.25 12.75H5.25L2.25 15.75V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H14.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75V11.25Z"
												fill="white"
											/>
										</svg> */}
									</span>
								</div>
							</div>
							<div className={styles.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Fax
									</p>
									<p className={styles.rowValue}>{selectedContact?.fax}</p>
								</div>
								<div className={styles.iconBox}>
									<span>
										<FileIcon />
									</span>
								</div>
							</div>
						</div>
						<div className={styles.rowBox}>
							<div className={styles.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Birthday
									</p>
									<p className={styles.rowValue}>{selectedContact?.birthday}</p>
								</div>
							</div>
							<div className={styles.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Position
									</p>
									<p className={styles.rowValue}>{selectedContact?.job_details?.position}</p>
								</div>
							</div>
							<div className={styles.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Department
									</p>
									<p className={styles.rowValue}>{selectedContact?.job_details?.department}</p>
								</div>
							</div>
						</div>
						<div className={styles.rowBox}>
							<div className={styles.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Company
									</p>
									<p className={styles.rowValue}>{selectedContact?.organization_details?.organization}</p>
								</div>
							</div>
						</div>
						<div className={styles.rowBox}>
							<div className={styles.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										City
									</p>
									<p className={styles.rowValue}>{selectedContact?.address?.city}</p>
								</div>
							</div>
							<div className={styles.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										State
									</p>
									<p className={styles.rowValue}>{selectedContact?.address?.state}</p>
								</div>
							</div>
							<div className={styles.row}>
								<div>
									<p className={`caption_1`} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Country
									</p>
									<p className={styles.rowValue}>{selectedContact?.address?.country}</p>
								</div>
							</div>
							{/* <div className={styles.row}>
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
						<button
							className={`footnote_bold cursor-pointer`}
							style={{ color: "var(--support-danger, #EE3939)", textAlign: "left", width: "100%" }}
							onClick={() => {
								dispatch(openDeleteContact());
								dispatch(setDeleteContactId(selectedContact?.id));
							}}>
							Delete Contact
						</button>
					</div>
				) : (
					<div className={styles.callHistory}>
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
							<div className={styles.noHistory_box}>
								<div className={styles.noHistory}>
									<HistoryTimeIcon />
									<p>{`You have no call history with ${
										selectedContact?.first_name ? selectedContact?.first_name + " " : ""
									}${selectedContact?.last_name ? selectedContact?.last_name + " " : ""}${
										!selectedContact?.first_name && !selectedContact?.last_name && selectedContact?.phone
											? selectedContact?.phone + " "
											: ""
									}${
										!selectedContact?.first_name &&
										!selectedContact?.last_name &&
										!selectedContact?.phone &&
										selectedContact?.email
											? selectedContact?.email + " "
											: ""
									}`}</p>
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
