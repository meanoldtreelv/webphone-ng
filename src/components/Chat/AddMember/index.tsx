import styles from "./AddMember.module.scss";
import SearchBar from "components/UI/SearchBar";
import ContactCard from "components/Contact/ContactCard";
import CloseIcon from "components/UI/Icons/Close";
import SearchIcon from "components/UI/Icons/Search";
import { useDispatch, useSelector } from "react-redux";
import {
	setAddedMemberLists,
	setCampaignMemberLists,
	setIsAddMemberDialogueOpen,
	setTextingContactLists,
} from "redux/chat/chatSlice";
import { useEffect, useState } from "react";
import { useLazyGetTextingContactListsQuery } from "services/chat";
import {
	addedMemberLists,
	campaignMemberLists,
	startConversationType,
	textingContactLists,
} from "redux/chat/chatSelectors";
import AddMemberBox from "../StartNewConversations/AddMemberBox";

const AddMember = () => {
	const dispatch = useDispatch();

	const textingContactList = useSelector(textingContactLists);
	const memberLists = useSelector(addedMemberLists);
	const campaignMemberList = useSelector(campaignMemberLists);
	const conversationType = useSelector(startConversationType);

	const [search, setSearch] = useState("");
	const [filteredContactList, setFilteredContactList] = useState<any>([]);
	const [fakePage, setFakePage] = useState(1);

	const [getContacts, { data: contactsData, isLoading: contactsLoading, isFetching: contactsFetching }] =
		useLazyGetTextingContactListsQuery();

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
			// dispatch(setLoader(false));
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
		}
	}, [search]);

	useEffect(() => {
		let contactsPerPage: any;
		if (search) {
			contactsPerPage = filteredContactList?.slice(0, fakePage * 20);
		} else {
			contactsPerPage = JSON.parse(String(localStorage?.getItem("texting-contacts")))?.slice(0, fakePage * 20);
		}
		dispatch(setTextingContactLists(contactsPerPage));
	}, [fakePage]);

	const handleScroll = (e: any) => {
		const scrollTop = e.target.scrollTop;
		const scrollHeight = e.target.scrollHeight;
		const clientHeight = e.target.clientHeight;

		if (scrollTop + clientHeight >= scrollHeight) {
			setFakePage((prevState) => prevState + 1);
		}
	};

	const contactClickedHandler = (contact) => {
		if (conversationType === "group") {
			dispatch(setAddedMemberLists([...memberLists, contact]));
			dispatch(setIsAddMemberDialogueOpen(false));
		}
		if (conversationType === "campaign") {
			dispatch(setCampaignMemberLists([...campaignMemberList, contact]));
			dispatch(setIsAddMemberDialogueOpen(false));
		}
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.box}>
				<div className={styles.header}>
					<span>Add Member</span>
					<span
						className={styles.close}
						onClick={() => {
							dispatch(setIsAddMemberDialogueOpen(false));
						}}>
						<CloseIcon />
					</span>
				</div>
				<div>
					<SearchBar
						placeholder="Type number here "
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
				</div>
				<div className={styles.contact}>
					{search ? (
						<span>
							<SearchIcon />
							<span>Search results ({filteredContactList.length})</span>
						</span>
					) : (
						<span>Contacts ({textingContactList?.length}) </span>
					)}
				</div>
				<div className={styles.contactCardBox} onScroll={handleScroll}>
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
												contactClickedHandler(contact);
											}}
											key={idx}
										/>
									);
								})}
							</div>
						) : (
							<>
								<AddMemberBox search={search} />
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
											contactClickedHandler(contact);
										}}
										key={idx}
									/>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AddMember;
