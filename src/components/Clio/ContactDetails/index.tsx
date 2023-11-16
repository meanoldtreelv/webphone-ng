import React from "react";
import styles from "./ContactDetails.module.scss";
import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";
import ContactIcon from "components/UI/Icons/Sidebar/Contact";
import CallHistoryIcon from "components/UI/Icons/Call/CallHistory";
import ContactDetailsIcon from "components/UI/Icons/ClioIcon/ContactDetails";
import MatterIcon from "components/UI/Icons/ClioIcon/Matter";
import HistoryIcon from "components/UI/Icons/ClioIcon/History";
import NotesIcon from "components/UI/Icons/ClioIcon/Notes";
import MoreIcon from "components/UI/Icons/ClioIcon/More";
import Matter from "../Matter";
import History from "../History";
import Notes from "../Notes";

const ContactDetails = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.contact}>
				<div className={styles.contact_name}>
					<span className={styles.chevron}>
						<ChevronLeftIcon />
					</span>
					<div>
						<span className={styles.name}>Sandra Pilons</span>
						<span>Outgoing Call</span>
					</div>
				</div>
				<span className={styles.profile}>
					<img src="/img/dummy/girl.jpg" alt="" />
				</span>
			</div>
			{/* <Matter /> */}
			{/* <History /> */}
			<Notes />
			{/* <div className={styles.box}>
				<div className={styles.heading}>
					<span>Contact Details</span>
				</div>
				<div className={styles.contact_details}>
					<div>
						<label htmlFor="name">Name</label>
						<p>Sandra Pilon</p>
					</div>
					<div>
						<label htmlFor="phone">Phone</label>
						<p>1234567890</p>
					</div>
					<div>
						<label htmlFor="">Email</label>
						<p>sandrapilon@gmail.com</p>
					</div>
					<div>
						<label htmlFor="">Website</label>
						<p>sandra.me</p>
					</div>
					<div>
						<label htmlFor="">Address</label>
						<p>17D, new jersy, USA 011041</p>
					</div>
					<div>
						<label htmlFor="">Country</label>
						<p>Canada</p>
					</div>
				</div>
				<div className={styles.heading}>
					<span>Custom Fields</span>
				</div>
				<div className={styles.contact_details}>
					<div>
						<label htmlFor="phone">Zoho Contact ID</label>
						<p>1234567890</p>
					</div>
					<div>
						<label htmlFor="">Hobbies</label>
						<p>Baking, Reading, Singing</p>
					</div>
					<div>
						<label htmlFor="">Date of Birth</label>
						<p>1998-01-01</p>
					</div>
					<div>
						<label htmlFor="">Website Lead</label>
						<p>No</p>
					</div>
				</div>
			</div> */}

			<div className={styles.footer}>
				<div>
					<span>
						<ContactDetailsIcon />
					</span>
					<span>Details</span>
				</div>
				<div>
					<span>
						<MatterIcon />
					</span>
					<span>Matters</span>
				</div>
				<div>
					<span>
						<HistoryIcon />
					</span>
					<span>History</span>
				</div>
				<div>
					<span>
						<NotesIcon />
					</span>
					<span>Notes</span>
				</div>
				<div>
					<span>
						<MoreIcon />
					</span>
					<span>More</span>
				</div>
			</div>
		</div>
	);
};

export default ContactDetails;
