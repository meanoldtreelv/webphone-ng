import styles from "./ConversationsList.module.scss";
import { useEffect, useState } from "react";
import ContactCardSkeleton from "components/Contact/ContactCardSkeleton";
import ConversationsCard from "../ConversationsCard";
import ConversationsSortingPopUp from "../ConversationsSortingPopUp";
import SortIcon from "components/UI/Icons/Sort";
import SearchIcon from "components/UI/Icons/Search";
import SearchResultIcon from "components/UI/Icons/SearchResult";
import EditIcon from "components/UI/Icons/ChatIcons/Edit";
import CloseIcon from "components/UI/Icons/ChatIcons/Close";
import SearchBar from "components/UI/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { setIsSortingMessagePopUpOpen, setIsStartNewConversationDialogueOpen } from "redux/chat/chatSlice";
import { conData } from "components/Data/conversationListData";
import { conversationLists, isSortingMessagePopUpOpen } from "redux/chat/chatSelectors";
import { useLazyGetConversationListsQuery } from "services/chat";

const ConversationsList = () => {
	const dispatch = useDispatch();
	const conversationsLists = useSelector(conversationLists);
	const sortingMessagePopUpOpen = useSelector(isSortingMessagePopUpOpen);

	const [
		getConversationLists,
		{ data: conversationListsData, isLoading: isLoading1, isFetching: isFetching1, isError: isError1 },
	] = useLazyGetConversationListsQuery();

	const [sortingIconHover, setSortingIconHover] = useState(false);
	const [isSortingPopUpTrue, setIsSortingPopUpTrue] = useState(false);
	// const [searchListData, setSearchListData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [searchText, setSearchText] = useState("");
	const [searchedConversationLists, setSearchedConversationLists] = useState([]);

	useEffect(() => {
		if (!searchText) {
			return;
		}
		setSearchedConversationLists([]);
		const searchStrQuery = new URLSearchParams({
			page: 1,
			per_page: 20,
			search: searchText,
			sort: "last_activity",
		}).toString();

		const fetchData = async () => {
			const { error, data } = await getConversationLists(searchStrQuery);

			if (data) {
				console.log(data, "data");
				setSearchedConversationLists(data);
			}

			if (error) {
				console.log("getting error in fetching search conversations list API");
			}
		};
		fetchData();
	}, [searchText]);

	console.log(isLoading1, "loading");
	console.log(isFetching1, "isFetching");
	console.log(searchText?.length, "searchtext");
	console.log(isError1, "setIsErr1");

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
				<div>
					{searchText.length > 0 ? (
						<p className={styles.contact_favorites}>
							<span>
								<SearchIcon />
								<span>Search results ({searchedConversationLists?.length})</span>
							</span>
							<span
								className={styles.contact_sorting}
								onClick={() => {
									setSearchText("");
									setSearchedConversationLists([]);
								}}>
								<CloseIcon />
							</span>
							{/* {sortingMessagePopUpOpen && <ConversationsSortingPopUp />} */}
						</p>
					) : (
						<p className={styles.contact_favorites}>
							<span>
								<span>Conversations ({conversationsLists?.length})</span>
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
									dispatch(setIsSortingMessagePopUpOpen(!sortingMessagePopUpOpen));
								}}>
								<SortIcon color={sortingIconHover ? "primary-default" : "icon-primary"} />
							</span>
							{sortingMessagePopUpOpen && <ConversationsSortingPopUp />}
						</p>
					)}
				</div>
			</div>
			<div className={styles.contact_lists}>
				{searchText.length > 0 &&
					(isFetching1 ? (
						<>
							{Array(16)
								.fill(null)
								.map(() => (
									<ContactCardSkeleton />
								))}
						</>
					) : searchedConversationLists?.length > 0 ? (
						<>{searchedConversationLists?.map((item) => <ConversationsCard key={item.id} conversationData={item} />)}</>
					) : (
						<div className={styles.noSearchResult}>
							<SearchResultIcon />
							<p>No Search Result</p>
							{isError1 && <span className={styles.err}>Something went wrong, please try again later</span>}
						</div>
					))}

				{searchText.length === 0 &&
					(conversationsLists?.length > 0 ? (
						<>{conversationsLists?.map((item) => <ConversationsCard key={item.id} conversationData={item} />)}</>
					) : isFetching1 ? (
						<>
							{conversationsLists?.map((item) => <ConversationsCard key={item.id} conversationData={item} />)}
							{Array(16)
								.fill(null)
								.map(() => (
									<ContactCardSkeleton />
								))}
						</>
					) : (
						<>{conversationsLists?.map((item) => <ConversationsCard key={item.id} conversationData={item} />)}</>
					))}
				{/* {searchText.length === 0 &&
					(isFetching1 ? (
						<>
							{Array(16)
								.fill(null)
								.map(() => (
									<ContactCardSkeleton />
								))}
						</>
					) : searchedConversationLists?.length > 0 ? (
						<>{conversationsLists?.map((item) => <ConversationsCard key={item.id} conversationData={item} />)}</>
					) : (
						<></>
					))} */}
				{/* {searchText ? (
					searchedConversationLists?.length > 0 ? (
						<>{searchedConversationLists?.map((item) => <ConversationsCard key={item.id} conversationData={item} />)}</>
					) : (
						<div className={styles.noSearchResult}>
							<SearchResultIcon />
							<p>No Search Result</p>
						</div>
					)
				) : isLoading ? (
					<>
						{Array(16)
							.fill(null)
							.map(() => (
								<ContactCardSkeleton />
							))}
					</>
				) : (
					<>{conversationsLists?.map((item) => <ConversationsCard key={item.id} conversationData={item} />)}</>
				)} */}
			</div>
		</div>
	);
};

export default ConversationsList;
