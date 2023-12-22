import styles from "./ShareContactDialogue.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import SearchIcon from "components/UI/Icons/Search";
import SearchBar from "components/UI/SearchBar";
import ContactCard from "components/Contact/ContactCard";
import { useLazyGetContactQuery, useLazyGetContactsQuery } from "services/contact";
import { useEffect, useState } from "react";
import {
	setIsContactDetailsDialogueOpen,
	setIsShareContactDialogueOpen,
	setSelectedShareContact,
} from "redux/chat/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { contactLists, contactSelectd } from "redux/contact/contactSelectors";
import { setLoader } from "redux/common/commonSlice";
import { setContactList, setSelectedContact } from "redux/contact/contactSlice";
import ContactCardSkeleton from "components/Contact/ContactCardSkeleton";
import BtnAction from "components/UI/BtnAction";
import BtnMedium from "components/UI/BtnMedium";

const ShareContactDialogue = () => {
	const dispatch = useDispatch();
	const contactList = useSelector(contactLists);
	const [filteredContactList, setFilteredContactList] = useState<any>([]);
	const [noSearchResult, setNoSearchResult] = useState(false);
	const [getContacts, { data: contactsData, isLoading: contactsLoading, isFetching: contactsFetching }] =
		useLazyGetContactsQuery();
	const [getContact, { data: contactData, isLoading: contactLoading }] = useLazyGetContactQuery();
	const [search, setSearch] = useState("");
	const [cancelHover, setCancelHover] = useState(false);
	const isContactSelected = useSelector(contactSelectd);
	const [fakePage, setFakePage] = useState(1);

	const [selectedContacts, setSelectedContacts] = useState([]);
	const [combinedVcf, setCombinedVcf] = useState(true);

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

	const contactDetails = (id: string) => {
		try {
			const contacts = JSON.parse(localStorage?.getItem("contacts"));
			const contact = contacts.filter((contact) => contact.id == id);

			if (contact.length) {
				dispatch(setSelectedContact(contact[0]));
				// dispatch(openSelectedContact());
			} else {
				throw new Error();
			}
		} catch (e) {
			const fetchContact = async () => {
				await getContact(id);
			};

			fetchContact();
		}
	};

	useEffect(() => {
		if (!contactLoading && contactData) {
			dispatch(setSelectedContact(contactData[0]));
			// dispatch(openSelectedContact());
		}
	}, [contactLoading, contactData]);

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

	// maybe this needs a little bit of change for performance
	useEffect(() => {
		let contactsPerPage: any;
		if (search) {
			contactsPerPage = filteredContactList?.slice(0, fakePage * 20);
		} else {
			contactsPerPage = JSON.parse(String(localStorage?.getItem("contacts")))?.slice(0, fakePage * 20);
		}
		dispatch(setContactList(contactsPerPage));
	}, [fakePage]);

	const handleSelectContact = (contact) => {
		// Check if the contact is already in the selectedContacts list
		const contactExists = selectedContacts.some((c) => c.id === contact.id);

		if (contactExists) {
			// If the contact exists, remove it from the list
			const updatedContacts = selectedContacts.filter((c) => c.id !== contact.id);
			setSelectedContacts(updatedContacts);
		} else {
			// If the contact doesn't exist, add it to the list
			setSelectedContacts([...selectedContacts, contact]);
		}
	};

	console.log(selectedContacts, "selectedContactLists");

	return (
		<div className={styles.overlay}>
			<div className={styles.box}>
				<div className={styles.header}>
					<span>Share contacts</span>
					<BtnAction
						btnType={"normal"}
						isDisabled={false}
						type="button"
						isActive={false}
						onMouseOut={() => {
							setCancelHover(false);
						}}
						onMouseOver={() => {
							setCancelHover(true);
						}}
						onClick={() => {
							dispatch(setIsShareContactDialogueOpen(false));
						}}
						icon={<CloseIcon color={cancelHover ? "primary-default" : "icon-primary"} />}
					/>
					{/* <span
						className={styles.close}
						onClick={() => {
							dispatch(setIsShareContactDialogueOpen(false));
						}}>
						<CloseIcon />
					</span> */}
				</div>
				<div>
					<SearchBar placeholder="Type number here " onChange={handleContactsSearch} />
				</div>
				<div className={styles.contact}>
					{search ? (
						<span>
							<SearchIcon />
							<span>Search results ({contactList?.length})</span>
						</span>
					) : (
						<span>Contacts ({contactList?.length}) </span>
					)}
				</div>
				<div className={styles.contactCardBox} onScroll={handleScroll}>
					<div>
						{contactsLoading ? (
							<>
								{Array(15)
									.fill(null)
									.map((el) => (
										<ContactCardSkeleton />
									))}
							</>
						) : (
							contactList?.map((contact: any, idx) => {
								return (
									<div className={styles.card}>
										<ContactCard
											id={contact.id}
											first_name={contact.first_name}
											last_name={contact.last_name}
											phone={contact.phone}
											email={contact.email}
											fax={contact.fax}
											clicked={() => contactDetails(contact.id)}
											key={idx}
										/>
										<input
											type="checkbox"
											onChange={() => {
												handleSelectContact(contact);
											}}
										/>
									</div>
								);
							})
						)}
					</div>
				</div>
				<div className={styles.footer}>
					<div>
						<input
							type="checkbox"
							name=""
							id="vcf"
							checked={combinedVcf}
							onChange={() => {
								setCombinedVcf(!combinedVcf);
							}}
						/>
						<label htmlFor="vcf">As combied VCF</label>
					</div>
					<BtnMedium
						btnType={"primary"}
						isDanger={false}
						isDisabled={selectedContacts.length === 0}
						type="button"
						btnText="Add Selected"
						// isLoading={isFetching1}
						onClick={() => {
							dispatch(setSelectedShareContact({ lists: selectedContacts, combinedVcf: combinedVcf }));
							dispatch(setIsShareContactDialogueOpen(false));
						}}
					/>
					{/* <button>Add Selected</button> */}
				</div>
			</div>
		</div>
	);
};

export default ShareContactDialogue;
