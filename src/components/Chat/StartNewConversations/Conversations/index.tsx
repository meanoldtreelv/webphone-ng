import { useEffect, useState } from "react";
import styles from "./Conversations.module.scss";
import SearchBar from "components/UI/SearchBar";
import ContactCard from "components/Contact/ContactCard";
import FromNumberPopUp from "../../FromNumberPopUp";
import ChevronDownIcon from "components/UI/Icons/ChatIcons/ChevronDown";
import SearchIcon from "components/UI/Icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { fromNumberSelected, textingContactLists } from "redux/chat/chatSelectors";
import { setLoader } from "redux/common/commonSlice";
import StartConversationBox from "../StartConversationBox";
import {
	useLazyCreateConversationObjectQuery,
	useLazyGetConversationListsQuery,
	useLazyGetTextingContactListsQuery,
} from "services/chat";
import { showToast } from "utils";
import {
	setConversationData,
	setIsConversationSelected,
	setIsStartNewConversationDialogueOpen,
	setTextingContactLists,
} from "redux/chat/chatSlice";

const Conversations = () => {
	const dispatch = useDispatch();
	const selectedFromNumber = useSelector(fromNumberSelected);
	const textingContactList = useSelector(textingContactLists);

	const [isFromNumberPopUpOpen, setIsFromNumberPopUpOpen] = useState(false);
	const [isFromNumberHovered, setIsFromNumberHovered] = useState(false);

	const [search, setSearch] = useState("");
	const [filteredContactList, setFilteredContactList] = useState<any>([]);
	// const [noSearchResult, setNoSearchResult] = useState(false);
	const [fakePage, setFakePage] = useState(1);
	const [getContacts, { data: contactsData, isLoading: contactsLoading, isFetching: contactsFetching }] =
		useLazyGetTextingContactListsQuery();

	const [
		getConversationLists,
		{ data: conversationListsData, isLoading: isLoading1, isFetching: isFetching1, isError: isError1 },
	] = useLazyGetConversationListsQuery();

	useEffect(() => {
		const contactsJson = localStorage?.getItem("texting-contacts");
		let contactsParsed: [];

		try {
			contactsParsed = JSON.parse(contactsJson)?.slice(0, 20);
		} catch (e) {
			contactsParsed = [];
		}

		const fetchContacts = async () => {
			await getContacts("");
			dispatch(setLoader(false));
		};

		if (contactsParsed && contactsParsed.length) {
			dispatch(setTextingContactLists(contactsParsed));
			// dispatch(setLoader(true));
			fetchContacts();
		} else {
			fetchContacts();
		}
	}, []);

	useEffect(() => {
		if (!contactsLoading && contactsData) {
			localStorage.setItem("texting-contacts", JSON.stringify(contactsData));
			dispatch(setTextingContactLists(contactsData?.slice(0, 20)));
		}
	}, [contactsLoading]);

	// const handleContactsSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const filterStr = e.target.value.trim();
	// 	setSearch(filterStr);
	// };

	useEffect(() => {
		if (search) {
			const contactsJson = localStorage?.getItem("texting-contacts");
			let contactsParsed: [];

			try {
				contactsParsed = JSON.parse(contactsJson);
			} catch (e) {
				contactsParsed = [];
			}

			const filteredRes = contactsParsed?.filter((contact) => {
				return (
					(contact?.first_name + " " + contact?.last_name).toLowerCase().includes(search.toLowerCase()) ||
					contact?.number?.toLowerCase().includes(search.toLowerCase())
				);
			});

			setFilteredContactList(filteredRes);

			// setNoSearchResult(!filteredRes?.length ? true : false);
		}
	}, [search]);

	const handleScroll = (e: any) => {
		const scrollTop = e.target.scrollTop;
		const scrollHeight = e.target.scrollHeight;
		const clientHeight = e.target.clientHeight;

		if (scrollTop + clientHeight >= scrollHeight) {
			setFakePage((prevState) => prevState + 1);
		}
	};

	useEffect(() => {
		let contactsPerPage: any;
		if (search) {
			contactsPerPage = filteredContactList?.slice(0, fakePage * 20);
		} else {
			contactsPerPage = JSON.parse(String(localStorage?.getItem("texting-contacts")))?.slice(0, fakePage * 20);
		}
		dispatch(setTextingContactLists(contactsPerPage));
	}, [fakePage]);

	// start conversation handler
	const [contactClicked, setContactClicked] = useState(null);
	const [createConversationObject, {}] = useLazyCreateConversationObjectQuery();

	useEffect(() => {
		if (!contactClicked) return;
		if (!selectedFromNumber) {
			showToast("please select 'From Number'", "info");
			return;
		}

		const strQuery = new URLSearchParams({ contact_id: contactClicked.id }).toString();

		// let searchList = [];
		let filteredList = [];

		const filterList = (list) => {
			return list?.filter((item) => {
				return (
					item?.conversation_type === "direct" &&
					item?.from_number === selectedFromNumber &&
					item?.contactsinfo.length > 0 &&
					item?.contactsinfo[0].number === contactClicked.number
				);
			});
		};
		const fetchConversationList = async () => {
			const { error, data } = await getConversationLists(strQuery);

			if (data) {
				// searchList = data;
				filteredList = filterList(data);

				if (filteredList?.length > 0) {
					dispatch(setConversationData(filteredList[0]));
					dispatch(setIsConversationSelected(true));
					dispatch(setIsStartNewConversationDialogueOpen(false));
				} else {
					fetchData();
				}
			}

			if (error) {
				showToast("There is an error in filtering Conversation Lists, please try again later", "error");
			}
		};
		fetchConversationList();

		const fetchData = async () => {
			const { error: conversationError, data: conversationData } = await createConversationObject({
				recipients: [
					{
						number: contactClicked?.number,
					},
				],
				from_number: selectedFromNumber,
				conversation_type: "direct",
			});

			if (conversationData) {
				showToast("Conversation object is created successfully", "info");
				dispatch(setIsStartNewConversationDialogueOpen(false));
			}
			if (conversationError) {
				showToast("Error in creating conversation object", "error");
			}
		};
	}, [contactClicked]);

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
					{selectedFromNumber}
					<span className={`${isFromNumberPopUpOpen ? styles.active : ""}`}>
						<ChevronDownIcon color={`${isFromNumberHovered || isFromNumberPopUpOpen ? "text-link" : "text-primary"}`} />
					</span>
				</span>
				{isFromNumberPopUpOpen && <FromNumberPopUp />}
			</div>
			<div>
				<SearchBar
					placeholder="Type number here.."
					type="number"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
				/>
			</div>
			<div className={styles.contact}>
				{search.length > 0 ? (
					<span>
						<SearchIcon />
						<span>Search results ({filteredContactList.length})</span>
					</span>
				) : (
					<span>Contacts ({textingContactList?.length}) </span>
				)}
			</div>
			<div className={styles.contactList} onScroll={handleScroll}>
				{search.length > 0 ? (
					filteredContactList.length > 0 ? (
						<div>
							{filteredContactList?.map((contact: any, idx) => {
								return (
									<ContactCard
										id={contact.id}
										first_name={contact.first_name}
										last_name={contact.last_name}
										phone={contact.number}
										clicked={() => {
											setContactClicked({ number: contact.number, id: contact.id });
										}}
										key={idx}
									/>
								);
							})}
						</div>
					) : (
						<>
							<StartConversationBox search_no={search} />
						</>
					)
				) : (
					<div>
						{textingContactList?.map((contact: any, idx) => {
							return (
								<ContactCard
									id={contact.id}
									first_name={contact.first_name}
									last_name={contact.last_name}
									phone={contact.number}
									clicked={() => {
										setContactClicked({ number: contact.number, id: contact.id });
									}}
									key={idx}
								/>
							);
						})}
					</div>
				)}
			</div>
		</>
	);
};

export default Conversations;
