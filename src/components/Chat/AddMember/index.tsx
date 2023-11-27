import { useState } from "react";
import styles from "./AddMember.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import SearchBar from "components/UI/SearchBar";
import SearchIcon from "components/UI/Icons/Search";
import ContactCard from "components/Contact/ContactCard";
import PlusIcon from "components/UI/Icons/Plus";

const AddMember = () => {
	return (
		<div className={styles.overlay}>
			<div className={styles.box}>
				<div className={styles.header}>
					<span>Add Member</span>
					<span className={styles.close}>
						<CloseIcon />
					</span>
				</div>
				<div>
					<SearchBar placeholder="Type number here " />
				</div>
				<div className={styles.contact}>
					{true ? (
						<span>
							<SearchIcon />
							<span>Search results (0)</span>
						</span>
					) : (
						<span>Contacts (18) </span>
					)}
				</div>
				<div className={styles.contactCardBox}>
					{true ? (
						<div className={styles.startConversation}>
							<div>Add this number to members list?</div>
							<p>9876542872</p>
							<button>
								<PlusIcon />
								<span>Add Member</span>
							</button>
						</div>
					) : (
						<>
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default AddMember;
