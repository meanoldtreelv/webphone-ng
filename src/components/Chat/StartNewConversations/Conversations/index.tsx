import { useEffect, useState } from "react";
import styles from "./Conversations.module.scss";
import SearchBar from "components/UI/SearchBar";
import ContactCard from "components/Contact/ContactCard";
import FromNumberPopUp from "../../FromNumberPopUp";
import ChevronDownIcon from "components/UI/Icons/ChatIcons/ChevronDown";
import SearchIcon from "components/UI/Icons/Search";
import ChatIcon from "components/UI/Icons/Chat";
import { useDispatch, useSelector } from "react-redux";
import { fromNumberSelected } from "redux/chat/chatSelectors";
import { useLazyGetContactsQuery } from "services/contact";
import { setLoader } from "redux/common/commonSlice";
import { setContactList } from "redux/contact/contactSlice";
import { contactLists } from "redux/contact/contactSelectors";
import StartConversationBox from "../StartConversationBox";
import { useLazyCreateConversationObjectQuery } from "services/chat";
import { showToast } from "utils";
import { setIsStartNewConversationDialogueOpen } from "redux/chat/chatSlice";

const Conversations = () => {
	const dispatch = useDispatch();
	const selectedFromNumber = useSelector(fromNumberSelected);
	const contactList = useSelector(contactLists);

	const [isFromNumberPopUpOpen, setIsFromNumberPopUpOpen] = useState(false);
	const [isFromNumberHovered, setIsFromNumberHovered] = useState(false);

	const [searchedContactLists, setSearchedContactLists] = useState([]);

	// const toContactLists = JSON.parse(localStorage?.getItem("contacts"));
	const [search, setSearch] = useState("");
	const [filteredContactList, setFilteredContactList] = useState<any>([]);
	const [noSearchResult, setNoSearchResult] = useState(false);
	const [fakePage, setFakePage] = useState(1);
	const [getContacts, { data: contactsData, isLoading: contactsLoading, isFetching: contactsFetching }] =
		useLazyGetContactsQuery();

	useEffect(() => {
		const contactsJson = localStorage?.getItem("contacts");
		let contactsParsed: [];

		try {
			contactsParsed = JSON.parse(contactsJson)?.slice(0, 20);
		} catch (e) {
			contactsParsed = [];
		}

		const fetchContacts = async () => {
			await getContacts(null);
			dispatch(setLoader(false));
		};

		if (contactsParsed && contactsParsed.length) {
			dispatch(setContactList(contactsParsed));
			dispatch(setLoader(true));
			fetchContacts();
		} else {
			fetchContacts();
		}
	}, []);

	useEffect(() => {
		if (!contactsLoading && contactsData) {
			localStorage.setItem("contacts", JSON.stringify(contactsData));
			dispatch(setContactList(contactsData?.slice(0, 20)));
		}
	}, [contactsLoading]);

	// useEffect(() => {
	// 	if (!contactLoading && contactData) {
	// 		dispatch(setSelectedContact(contactData[0]));
	// 		dispatch(openSelectedContact());
	// 	}
	// }, [contactLoading, contactData]);

	const handleContactsSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const filterStr = e.target.value.trim();
		setSearch(filterStr);
	};

	useEffect(() => {
		if (search) {
			const contactsJson = localStorage?.getItem("contacts");
			let contactsParsed: [];

			try {
				contactsParsed = JSON.parse(contactsJson);
			} catch (e) {
				contactsParsed = [];
			}

			const filteredRes = contactsParsed?.filter((contact) => {
				return (
					(contact?.first_name + " " + contact?.last_name).toLowerCase().includes(search.toLowerCase()) ||
					contact?.phone?.toLowerCase().includes(search.toLowerCase()) ||
					contact?.email?.toLowerCase().includes(search.toLowerCase())
				);
			});

			// console.log("====================================");
			// console.log(filteredRes, "filteredRes");
			// console.log("====================================");
			setFilteredContactList(filteredRes);
			dispatch(setContactList(filteredRes?.slice(0, 20)));

			setNoSearchResult(!filteredRes?.length ? true : false);
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
			contactsPerPage = JSON.parse(String(localStorage?.getItem("contacts")))?.slice(0, fakePage * 20);
		}
		dispatch(setContactList(contactsPerPage));
	}, [fakePage]);

	// start conversation handler
	const [contactClicked, setContactClicked] = useState("");
	const [createConversationObject, {}] = useLazyCreateConversationObjectQuery();

	useEffect(() => {
		if (!contactClicked) return;
		if (!selectedFromNumber) {
			showToast("please select 'From Number'", "info");
			return;
		}
		const fetchData = async () => {
			const { error: conversationError, data: conversationData } = await createConversationObject({
				recipients: [
					{
						number: contactClicked,
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
		fetchData();
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
					<span>Contacts ({contactList?.length}) </span>
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
										phone={contact.phone}
										email={contact.email}
										fax={contact.fax}
										clicked={() => {
											setContactClicked(contact.phone);
										}}
										key={idx}
									/>
								);
							})}
							{/* <ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard />
							<ContactCard /> */}
						</div>
					) : (
						<>
							{/* <div className={styles.startConversation}>
								<div>Start Conversation with this number?</div>
								<p>{search}</p>
								<button>
									<ChatIcon color="icon-on-color" />
									<span>Start Conversation</span>
								</button>
							</div> */}
							<StartConversationBox search_no={search} />
						</>
					)
				) : (
					<div>
						{contactList?.map((contact: any, idx) => {
							return (
								<ContactCard
									id={contact.id}
									first_name={contact.first_name}
									last_name={contact.last_name}
									phone={contact.phone}
									email={contact.email}
									fax={contact.fax}
									clicked={() => {
										setContactClicked(contact.phone);
									}}
									key={idx}
								/>
							);
						})}

						{/* <ContactCard />
					<ContactCard />
					<ContactCard />
					<ContactCard /> */}
					</div>
				)}
			</div>
		</>
	);
};

export default Conversations;
