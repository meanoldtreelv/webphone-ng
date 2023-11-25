import styles from "./ConversationsList.module.scss";
// import ContactCard from "../ContactCard";
import { useDispatch, useSelector } from "react-redux";
import {
	clearSelectedContact,
	openAddEditContact,
	openSelectedContact,
	setContactList,
	setSelectedContact,
} from "../../../redux/contact/contactSlice";
import { contactLists, contactSelectd } from "redux/contact/contactSelectors";
import StarIcon from "components/UI/Icons/Star";
import SortIcon from "components/UI/Icons/Sort";
import UserAddIcon from "components/UI/Icons/User/UserAdd";
import SearchIcon from "components/UI/Icons/Search";
import { useLazyGetContactQuery, useLazyGetContactsQuery } from "services/contact";
import React, { useEffect, useState } from "react";
// import ContactCardSkeleton from "../ContactCardSkeleton";
import SearchResultIcon from "components/UI/Icons/SearchResult";
import { setLoader } from "redux/common/commonSlice";
import ContactCard from "components/Contact/ContactCard";
import ContactCardSkeleton from "components/Contact/ContactCardSkeleton";
import EditIcon from "components/UI/Icons/ChatIcons/Edit";
import ConversationsCard from "../ConversationsCard";
import ConversationsSortingPopUp from "../ConversationsSortingPopUp";
import XIcon from "components/UI/Icons/X";
import CloseIcon from "components/UI/Icons/ChatIcons/Close";
// import CloseIcon from "components/UI/Icons/Close";

const ConversationsList = () => {
	const [sortingIconHover, setSortingIconHover] = useState(false);
	const [isSortingPopUpTrue, setIsSortingPopUpTrue] = useState(false);
	return (
		<div className={`${styles.contact} ${true ? styles.contactListSml : ""}`}>
			<div className={styles.contact_header}>
				<h1 className={styles.respContacts_header}>Contacts</h1>
				<div className={styles.contact_search}>
					<input type="text" placeholder="Search conversations..." />

					<button className={styles.add_contact} onClick={() => {}}>
						<EditIcon />
					</button>

					<div className={styles.search_icon}>
						<SearchIcon />
					</div>
				</div>
			</div>
			{true ? (
				<div
					className={styles.contact_lists}
					// style={{ overflowY: contactsLoading ? "hidden" : undefined }}
					// onScroll={handleScroll}
				>
					{/* favourite contact heading */}
					<div>
						{false ? (
							<p className={styles.contact_favorites}>
								<span>
									<SearchIcon />
									<span>Search results (8)</span>
								</span>
								<span className={styles.contact_sorting}>
									<CloseIcon />
								</span>
								{isSortingPopUpTrue && <ConversationsSortingPopUp />}
							</p>
						) : (
							<p className={styles.contact_favorites}>
								<span>
									{/* <StarIcon /> */}
									<span>Conversations (8)</span>
								</span>
								<span
									className={styles.contact_sorting}
									onMouseOver={() => {
										setSortingIconHover(true);
									}}
									onMouseOut={() => {
										setSortingIconHover(false);
									}}
									onClick={() => {
										setIsSortingPopUpTrue(!isSortingPopUpTrue);
									}}>
									<SortIcon color={sortingIconHover ? "primary-default" : "icon-primary"} />
								</span>
								{isSortingPopUpTrue && <ConversationsSortingPopUp />}
							</p>
						)}
					</div>
					{/* favourite contact  */}
					{/* <div>{sortedContactLists?.map((item) => <ContactCard contactData={item} key={item.id} />)}</div> */}

					{/* frquently contact heading  */}
					{/* <div>
					<p className={styles.contact_favorites}>
						<span>Frequently Contacted</span>
					</p>
				</div> */}

					{/* <div>
					<ContactCard />
				</div> */}

					{/* uncomment this line of code */}
					{/* <div>
					<p className={styles.contact_favorites}>
						<span>
							<span>A</span>
						</span>
					</p>
				</div> */}

					<div>
						{false ? (
							<>
								{Array(15)
									.fill(null)
									.map((el) => (
										<ContactCardSkeleton />
									))}
							</>
						) : (
							<ConversationsCard
							// id={contact.id}
							// first_name={contact.first_name}
							// last_name={contact.last_name}
							// phone={contact.phone}
							// email={contact.email}
							// fax={contact.fax}
							// clicked={() => contactDetails(contact.id)}
							// key={idx}
							/>
						)}
					</div>
				</div>
			) : (
				<div className={styles.noSearchResult}>
					<div className={styles.noSearchResult_center}>
						<SearchResultIcon />
						<p>No Search Result</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default ConversationsList;
