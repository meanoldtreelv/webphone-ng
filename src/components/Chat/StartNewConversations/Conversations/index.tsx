import { useState } from "react";
import styles from "./Conversations.module.scss";
import ChevronDownIcon from "components/UI/Icons/ChatIcons/ChevronDown";
import SearchBar from "components/UI/SearchBar";
import ContactCard from "components/Contact/ContactCard";
import FromNumberPopUp from "../../FromNumberPopUp";
import SearchIcon from "components/UI/Icons/Search";
import ChatIcon from "components/UI/Icons/Chat";

const Conversations = () => {
	const [isFromNumberPopUpOpen, setIsFromNumberPopUpOpen] = useState(false);
	const [isFromNumberHovered, setIsFromNumberHovered] = useState(false);

	return (
		<>
			<div className={styles.from}>
				<span className={styles.left}>From Number</span>
				<span
					className={`${styles.right} ${isFromNumberHovered || isFromNumberPopUpOpen ? styles.active1 : ""}`}
					onMouseOver={() => {
						setIsFromNumberHovered(true);
					}}
					onMouseOut={() => {
						setIsFromNumberHovered(false);
					}}
					onClick={() => {
						setIsFromNumberPopUpOpen(!isFromNumberPopUpOpen);
					}}>
					987654321{" "}
					<span className={`${isFromNumberPopUpOpen ? styles.active : ""}`}>
						<ChevronDownIcon color={`${isFromNumberHovered || isFromNumberPopUpOpen ? "text-link" : "text-primary"}`} />
					</span>
				</span>
				{isFromNumberPopUpOpen && <FromNumberPopUp />}
			</div>
			<div>
				<SearchBar placeholder="Type number here.." />
			</div>
			<div className={styles.contact}>
				{false ? (
					<span>
						<SearchIcon />
						<span>Search results (8)</span>
					</span>
				) : (
					<span>Contacts (18) </span>
				)}
			</div>
			{true ? (
				false ? (
					<div>
						<ContactCard />
						<ContactCard />
						<ContactCard />
						<ContactCard />
						<ContactCard />
					</div>
				) : (
					<div className={styles.startConversation}>
						<div>Start Conversation with this number?</div>
						<p>9876542872</p>
						<button>
							<ChatIcon />
							<span>Start Conversation</span>
						</button>
					</div>
				)
			) : (
				<div>
					<ContactCard />
					<ContactCard />
					<ContactCard />
					<ContactCard />
					<ContactCard />
				</div>
			)}
		</>
	);
};

export default Conversations;
