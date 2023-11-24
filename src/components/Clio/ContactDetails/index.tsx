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
import { useDispatch, useSelector } from "react-redux";
import { setContactDetails } from "redux/clio/clioSlice";
import Details from "../Details";
import TaskIcon from "components/UI/Icons/ClioIcon/Task";
import Tasks from "../Tasks";
import More from "../More";
import { contact } from "redux/clio/clioSelectors";

const ContactDetails = () => {
	const dispatch = useDispatch();
	const [tabSelected, setTabSelected] = useState("details");
	const [tabHover, setTabHover] = useState("");

	const contactDetails = useSelector(contact);

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
						<span className={styles.name}>{contactDetails?.name}</span>
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
			{tabSelected === "task" && <Tasks />}
			{tabSelected === "more" && <More />}

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
					onClick={() => {
						setTabSelected("task");
					}}
					onMouseOver={() => {
						setTabHover("task");
					}}
					onMouseOut={() => {
						setTabHover("");
					}}>
					<span className={`${styles.icon} ${(tabHover === "task" || tabSelected === "task") && styles.icon_active}`}>
						<TaskIcon color={`${tabHover === "task" || tabSelected === "task" ? "default-primary" : "icon-primary"}`} />
					</span>
					<span className={`${(tabHover === "task" || tabSelected === "task") && styles.text_active}`}>Task</span>
				</div>
				<div
					onClick={() => {
						setTabSelected("more");
					}}
					onMouseOver={() => {
						setTabHover("more");
					}}
					onMouseOut={() => {
						setTabHover("");
					}}>
					<span className={`${styles.icon} ${(tabHover === "more" || tabSelected === "more") && styles.icon_active}`}>
						<MoreIcon color={`${tabHover === "more" || tabSelected === "more" ? "default-primary" : "icon-primary"}`} />
					</span>
					<span className={`${(tabHover === "more" || tabSelected === "more") && styles.text_active}`}>More</span>
				</div>
			</div>
		</div>
	);
};

export default ContactDetails;
