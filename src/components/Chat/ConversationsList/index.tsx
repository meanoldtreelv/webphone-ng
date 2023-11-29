import styles from "./ConversationsList.module.scss";
import { useState } from "react";
import ContactCardSkeleton from "components/Contact/ContactCardSkeleton";
import ConversationsCard from "../ConversationsCard";
import ConversationsSortingPopUp from "../ConversationsSortingPopUp";
import SortIcon from "components/UI/Icons/Sort";
import SearchIcon from "components/UI/Icons/Search";
import SearchResultIcon from "components/UI/Icons/SearchResult";
import EditIcon from "components/UI/Icons/ChatIcons/Edit";
import CloseIcon from "components/UI/Icons/ChatIcons/Close";
import SearchBar from "components/UI/SearchBar";
import { useDispatch } from "react-redux";
import { setIsStartNewConversationDialogueOpen } from "redux/chat/chatSlice";

const ConversationsList = () => {
	const dispatch = useDispatch();
	const [sortingIconHover, setSortingIconHover] = useState(false);
	const [isSortingPopUpTrue, setIsSortingPopUpTrue] = useState(false);

	const [searchText, setSearchText] = useState("");

	return (
		<div className={`${styles.contact} ${true ? styles.contactListSml : ""}`}>
			<div className={styles.contact_header}>
				{/* <h1 className={styles.respContacts_header}>Contacts</h1> */}
				<div className={styles.contact_search}>
					<SearchBar
						placeholder="Search conversations..."
						value={searchText}
						onChange={(e) => {
							setSearchText(e.target.value);
						}}
					/>

					<button
						className={styles.add_contact}
						onClick={() => {
							dispatch(setIsStartNewConversationDialogueOpen(true));
						}}>
						<EditIcon color="icon-on-color" />
					</button>
				</div>
			</div>
			{true ? (
				<div
					className={styles.contact_lists}
					// onScroll={handleScroll}
				>
					<div>
						{searchText.length > 0 ? (
							<p className={styles.contact_favorites}>
								<span>
									<SearchIcon />
									<span>Search results (8)</span>
								</span>
								<span
									className={styles.contact_sorting}
									onClick={() => {
										setSearchText("");
									}}>
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
							<>
								<ConversationsCard />
								<ConversationsCard />
								<ConversationsCard />
								<ConversationsCard />
							</>
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
