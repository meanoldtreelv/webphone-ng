import { useState } from "react";
import styles from "./Group.module.scss";
import ChevronDownIcon from "components/UI/Icons/ChatIcons/ChevronDown";
import SearchBar from "components/UI/SearchBar";
import ContactCard from "components/Contact/ContactCard";
import FromNumberPopUp from "../../FromNumberPopUp";
import SearchIcon from "components/UI/Icons/Search";
import UsersGroupIcon from "components/UI/Icons/ChatIcons/UsersGroup";
import PlusIcon from "components/UI/Icons/Plus";

const Group = () => {
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
					987654321
					<span className={`${isFromNumberPopUpOpen ? styles.active : ""}`}>
						<ChevronDownIcon color={`${isFromNumberHovered || isFromNumberPopUpOpen ? "text-link" : "text-primary"}`} />
					</span>
				</span>
				{isFromNumberPopUpOpen && <FromNumberPopUp />}
			</div>
			<div>
				<SearchBar placeholder="Type group name here.." />
			</div>
			<div className={styles.contact}>
				{false ? (
					<span>
						<SearchIcon />
						<span>Search results (8)</span>
					</span>
				) : (
					<span>
						<UsersGroupIcon />
						<span>Members (0)</span>
					</span>
				)}
			</div>
			<div className={styles.memberBox}>
				{false ? (
					true ? (
						<div>
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
						</div>
					) : (
						<div className={styles.startConversation}>
							<div>You don’t have any member here</div>
							<p>Follow this button to add members</p>
							<button>
								<PlusIcon />
								<span>Add Member</span>
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
			</div>
			<div className={styles.footer}>
				<button className={`${true && styles.active}`}>Create Group</button>
			</div>
		</>
	);
};

export default Group;
