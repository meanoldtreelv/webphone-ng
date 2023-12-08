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
import {
	setConversationData,
	setConversationLists,
	setIsConversationSelected,
	setIsSortingMessagePopUpOpen,
	setIsStartNewConversationDialogueOpen,
} from "redux/chat/chatSlice";
import {
	conversationLists,
	isSortingMessagePopUpOpen,
	queries,
	socket,
	sortConversationType,
} from "redux/chat/chatSelectors";
import { useLazyGetConversationListsQuery } from "services/chat";
import { showToast } from "utils";

const ConversationsList = () => {
	const dispatch = useDispatch();
	const conversationsLists = useSelector(conversationLists);
	const sortingMessagePopUpOpen = useSelector(isSortingMessagePopUpOpen);
	const sortConversationTypes = useSelector(sortConversationType);
	const query = useSelector(queries);
	const Socket = useSelector(socket);

	const [
		getConversationLists,
		{ data: conversationListsData, isLoading: isLoading1, isFetching: isFetching1, isError: isError1 },
	] = useLazyGetConversationListsQuery();

	const [sortingIconHover, setSortingIconHover] = useState(false);
	const [isSortingPopUpTrue, setIsSortingPopUpTrue] = useState(false);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(20);
	const [endOfTheList, setEndOfTheList] = useState(false);

	const [searchText, setSearchText] = useState("");
	const [searchedConversationLists, setSearchedConversationLists] = useState([]);

	useEffect(() => {
		setPage(1);

		const strQuery = new URLSearchParams(query).toString();

		const fetchData = async () => {
			const { error, data } = await getConversationLists(strQuery);

			if (data) {
				dispatch(setConversationLists(data));
			}

			if (error) {
				showToast("There is an error in filtering Conversation Lists, please try again later", "error");
			}
		};
		fetchData();
	}, [sortConversationTypes]);

	useEffect(() => {
		setEndOfTheList(false);
		if (!searchText) {
			return;
		}
		setPage(1);
		setSearchedConversationLists([]);
		const searchStrQuery = new URLSearchParams({
			page: 1,
			per_page: perPage,
			search: searchText,
			sort: "last_activity",
		}).toString();

		const fetchData = async () => {
			const { error, data } = await getConversationLists(searchStrQuery);

			if (data) {
				setSearchedConversationLists(data);
			}

			if (error) {
				showToast("There is an error in searching Conversation Lists, please try again later", "error");
			}
		};
		fetchData();
	}, [searchText]);

	const handleScroll = (e: any) => {
		if (endOfTheList) return;
		if (isFetching1) {
			return;
		}
		const scrollTop = e.target.scrollTop;
		const scrollHeight = e.target.scrollHeight;
		const clientHeight = e.target.clientHeight;

		if (scrollTop + clientHeight >= scrollHeight) {
			setPage(page + 1);
		}
	};

	useEffect(() => {
		if (searchText?.length === 0) {
			if (page === 1) return;
			const searchStrQuery = new URLSearchParams({
				...query,
				page: page,
			}).toString();

			const fetchData = async () => {
				const { error, data } = await getConversationLists(searchStrQuery);

				if (data) {
					if (data?.length < perPage) {
						setEndOfTheList(true);
					}
					const newLists = [...conversationsLists, ...data];

					dispatch(setConversationLists(newLists));
				}

				if (error) {
					showToast("There is an error in fetching Conversation Lists, please try again later", "error");
				}
			};
			fetchData();
		} else {
			const searchStrQuery = new URLSearchParams({
				page: page,
				per_page: perPage,
				sort: "last_activity",
				search: searchText,
			}).toString();

			const fetchData = async () => {
				const { error, data } = await getConversationLists(searchStrQuery);

				if (data) {
					const newLists = [...searchedConversationLists, ...data];

					setSearchedConversationLists(newLists);
					if (data?.length < perPage) {
						setEndOfTheList(true);
					}
				}

				if (error) {
					showToast("There is an error in fetching Search Conversation Lists, please try again later", "error");
				}
			};
			fetchData();
		}
	}, [page]);

	useEffect(() => {
		if (!Socket || !Socket.connected) return;

		Socket.on("texting.chat.new", (data) => {
			console.log("texting.chat.new", data);

			// todo - we need to modify data according to conversation list item

			dispatch(setConversationLists([data, ...conversationsLists]));
			dispatch(setIsConversationSelected(true));
			dispatch(setConversationData(data));
		});
	}, [Socket]);

	useEffect(() => {
		if (!Socket || !Socket.connected) return;

		Socket.on("texting.message.new", (data) => {
			console.log("texting.message.new", data);

			let updatedList = conversationsLists.map((item) => {
				if (item.id === data.conversation_id) {
					return {
						...item,
						last_msg: { ...item.last_msg, text: data.text },
						created_at: data?.created_at,
						unread_msg_count: item.unread_msg_count + 1,
					};
				}
				return item;
			});

			const updatedItemIndex = updatedList.findIndex((item) => item.id === data.conversation_id);
			if (updatedItemIndex !== -1) {
				const updatedItem = updatedList[updatedItemIndex];
				updatedList = [
					updatedItem,
					...updatedList.slice(0, updatedItemIndex),
					...updatedList.slice(updatedItemIndex + 1),
				];
			}
			dispatch(setConversationLists(updatedList));
		});
	}, [Socket, conversationsLists, dispatch]);

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
			<div className={styles.contact_lists} onScroll={handleScroll}>
				{searchText.length > 0 &&
					(searchedConversationLists?.length > 0 ? (
						isFetching1 ? (
							<>
								{searchedConversationLists?.map((item) => <ConversationsCard key={item.id} conversationData={item} />)}
								{Array(2)
									.fill(null)
									.map((item, index) => (
										<ContactCardSkeleton key={index} />
									))}
							</>
						) : (
							<>
								{searchedConversationLists?.map((item) => <ConversationsCard key={item.id} conversationData={item} />)}
							</>
						)
					) : isFetching1 ? (
						<>
							{Array(16)
								.fill(null)
								.map((item, index) => (
									<ContactCardSkeleton key={index} />
								))}
						</>
					) : (
						<div className={styles.noSearchResult}>
							<SearchResultIcon />
							<p>No Search Result</p>
							{isError1 && <span className={styles.err}>Something went wrong, please try again later</span>}
						</div>
					))}

				{searchText.length === 0 &&
					(isFetching1 ? (
						<>
							{conversationsLists?.map((item) => <ConversationsCard key={item.id} conversationData={item} />)}
							{Array(2)
								.fill(null)
								.map((item, index) => (
									<ContactCardSkeleton key={index} />
								))}
						</>
					) : (
						<>{conversationsLists?.map((item) => <ConversationsCard key={item.id} conversationData={item} />)}</>
					))}
			</div>
		</div>
	);
};

export default ConversationsList;
