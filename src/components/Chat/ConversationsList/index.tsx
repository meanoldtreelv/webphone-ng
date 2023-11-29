import styles from "./ConversationsList.module.scss";
import SortIcon from "components/UI/Icons/Sort";
import SearchIcon from "components/UI/Icons/Search";
import { useState } from "react";
import SearchResultIcon from "components/UI/Icons/SearchResult";
import ContactCardSkeleton from "components/Contact/ContactCardSkeleton";
import EditIcon from "components/UI/Icons/ChatIcons/Edit";
import ConversationsCard from "../ConversationsCard";
import ConversationsSortingPopUp from "../ConversationsSortingPopUp";
import CloseIcon from "components/UI/Icons/ChatIcons/Close";

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
					// onScroll={handleScroll}
				>
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

					<div>
						{false ? (
							<>
								{Array(15)
									.fill(null)
									.map(() => (
										<ContactCardSkeleton />
									))}
							</>
						) : (
							<ConversationsCard />
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
