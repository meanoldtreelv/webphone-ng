import { useState } from "react";
import styles from "./ContactDetails.module.scss";
import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";
import ContactDetailsIcon from "components/UI/Icons/ClioIcon/ContactDetails";
import MatterIcon from "components/UI/Icons/ClioIcon/Matter";
import HistoryIcon from "components/UI/Icons/ClioIcon/History";
import NotesIcon from "components/UI/Icons/ClioIcon/Notes";
import MoreIcon from "components/UI/Icons/ClioIcon/More";
import Matter from "../Matter";
import History from "../History";
import Notes from "../Notes";
import { useDispatch } from "react-redux";
import { setContactDetails } from "redux/clio/clioSlice";
import Details from "../Details";

const ContactDetails = () => {
	const dispatch = useDispatch();
	const [tabSelected, setTabSelected] = useState("details");
	const [tabHover, setTabHover] = useState("");

	return (
		<div className={styles.wrapper}>
			<div className={styles.contact}>
				<div className={styles.contact_name}>
					<span
						className={styles.chevron}
						onClick={() => {
							dispatch(setContactDetails(false));
						}}>
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

			{tabSelected === "details" && <Details />}
			{tabSelected === "matter" && <Matter />}
			{tabSelected === "history" && <History />}
			{tabSelected === "notes" && <Notes />}

			<div className={styles.footer}>
				<div
					onClick={() => {
						setTabSelected("details");
					}}
					onMouseOver={() => {
						setTabHover("details");
					}}
					onMouseOut={() => {
						setTabHover("");
					}}>
					<span
						className={`${styles.icon} ${(tabHover === "details" || tabSelected === "details") && styles.icon_active}`}>
						<ContactDetailsIcon
							color={`${tabHover === "details" || tabSelected === "details" ? "default-primary" : "icon-primary"}`}
						/>
					</span>
					<span className={`${(tabHover === "details" || tabSelected === "details") && styles.text_active}`}>
						Details
					</span>
				</div>
				<div
					onClick={() => {
						setTabSelected("matter");
					}}
					onMouseOver={() => {
						setTabHover("matter");
					}}
					onMouseOut={() => {
						setTabHover("");
					}}>
					<span
						className={`${styles.icon} ${(tabHover === "matter" || tabSelected === "matter") && styles.icon_active}`}>
						<MatterIcon
							color={`${tabHover === "matter" || tabSelected === "matter" ? "default-primary" : "icon-primary"}`}
						/>
					</span>
					<span className={`${(tabHover === "matter" || tabSelected === "matter") && styles.text_active}`}>
						Matters
					</span>
				</div>
				<div
					onClick={() => {
						setTabSelected("history");
					}}
					onMouseOver={() => {
						setTabHover("history");
					}}
					onMouseOut={() => {
						setTabHover("");
					}}>
					<span
						className={`${styles.icon} ${(tabHover === "history" || tabSelected === "history") && styles.icon_active}`}>
						<HistoryIcon
							color={`${tabHover === "history" || tabSelected === "history" ? "default-primary" : "icon-primary"}`}
						/>
					</span>
					<span className={`${(tabHover === "history" || tabSelected === "history") && styles.text_active}`}>
						History
					</span>
				</div>
				<div
					onClick={() => {
						setTabSelected("notes");
					}}
					onMouseOver={() => {
						setTabHover("notes");
					}}
					onMouseOut={() => {
						setTabHover("");
					}}>
					<span className={`${styles.icon} ${(tabHover === "notes" || tabSelected === "notes") && styles.icon_active}`}>
						<NotesIcon
							color={`${tabHover === "notes" || tabSelected === "notes" ? "default-primary" : "icon-primary"}`}
						/>
					</span>
					<span className={`${(tabHover === "notes" || tabSelected === "notes") && styles.text_active}`}>Notes</span>
				</div>
				<div
					onMouseOver={() => {
						setTabHover("more");
					}}
					onMouseOut={() => {
						setTabHover("");
					}}>
					<span className={`${styles.icon} ${tabHover === "more" && styles.icon_active}`}>
						<MoreIcon color={`${tabHover === "more" ? "default-primary" : "icon-primary"}`} />
					</span>
					<span className={`${tabHover === "more" && styles.text_active}`}>More</span>
				</div>
			</div>
		</div>
	);
};

export default ContactDetails;
