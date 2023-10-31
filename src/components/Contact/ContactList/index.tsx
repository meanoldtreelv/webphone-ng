import styles from "./ContactList.module.scss";
import ContactCard from "../ContactCard";
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
import ContactCardSkeleton from "../ContactCardSkeleton";
import { sortArrayOfObj } from "utils";

const ContactList = () => {
	const dispatch = useDispatch();
	const contactList = useSelector(contactLists);
	const [getContacts, { data: contactsData, isLoading: contactsLoading }] = useLazyGetContactsQuery();
	const [getContact, { data: contactData, isLoading: contactLoading }] = useLazyGetContactQuery();
	const [search, setSearch] = useState("");
	const isContactSelected = useSelector(contactSelectd);
	const [fakePage, setFakePage] = useState(1);

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
		};

		if (contactsParsed && contactsParsed.length) {
			dispatch(setContactList(contactsParsed));
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
				dispatch(openSelectedContact());
			} else {
				throw new Error();
			}
			console.log("here is your contact :", contact);
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
			dispatch(openSelectedContact());
		}
	}, [contactLoading, contactData]);

	const handleContactsSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const filterStr = e.target.value.trim();
		setSearch(filterStr);
	};

	const handleFilter = (contact: any) => {
		// return (contact?.first_name + " " + contact?.last_name).toLowerCase().includes(search.toLowerCase()) ||
		// contact?.phone.toLowerCase().includes(search.toLowerCase()) ||
		// contact?.email.toLowerCase().includes(search.toLowerCase())

		return (contact?.first_name + " " + contact?.last_name).toLowerCase().includes(search.toLowerCase());
	};

	const handleScroll = (e: any) => {
		const scrollTop = e.target.scrollTop;
		const scrollHeight = e.target.scrollHeight;
		const clientHeight = e.target.clientHeight;

		if (scrollTop + clientHeight >= scrollHeight) {
			setFakePage((prevState) => prevState + 1);
		}
	};

	useEffect(() => {
		const contactsPerPage = JSON.parse(localStorage?.getItem("contacts"))?.slice(0, fakePage * 20);
		dispatch(setContactList(contactsPerPage));
	}, [fakePage]);

	// Sort the array based on first name
	// const sortedContactLists = [...contactList]?.sort((a, b) => {
	// 	const firstNameA = a.first_name || ""; // Handle null first name
	// 	const firstNameB = b.first_name || ""; // Handle null first name

	// 	if (firstNameA === "" && firstNameB === "") {
	// 		return 0; // If both first names are null, consider them equal
	// 	} else if (firstNameA === "") {
	// 		return 1; // Put null values at the end
	// 	} else if (firstNameB === "") {
	// 		return -1; // Put null values at the end
	// 	}

	// 	return firstNameA.localeCompare(firstNameB);
	// });

	// const sortedData = [...contactList]
	// 	.filter((item) => item.first_name && item.first_name.startsWith("a"))
	// 	.sort((a, b) => a.first_name.localeCompare(b.first_name));

	return (
		<div className={`${styles.contact} ${isContactSelected ? styles.contactListSml : ""}`}>
			<div className={styles.contact_header}>
				<h1 className={styles.respContacts_header}>Contacts</h1>
				<div className={styles.contact_search}>
					<input type="text" placeholder="Search contact..." onChange={handleContactsSearch} />

					<button
						className={styles.add_contact}
						onClick={() => {
							dispatch(clearSelectedContact());
							dispatch(openAddEditContact());
						}}>
						<UserAddIcon />
					</button>

					<div className={styles.search_icon}>
						<SearchIcon />
					</div>
				</div>
			</div>
			<div
				className={styles.contact_lists}
				style={{ overflowY: contactsLoading ? "hidden" : undefined }}
				onScroll={handleScroll}>
				{/* favourite contact heading */}
				<div>
					<p className={styles.contact_favorites}>
						<span>
							{/* <StarIcon /> */}
							<span>Contacts</span>
						</span>
						<span className={styles.contact_sorting}>
							<SortIcon />
						</span>
					</p>
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
					{contactsLoading ? (
						<>
							{Array(15)
								.fill(null)
								.map((el) => (
									<ContactCardSkeleton />
								))}
						</>
					) : (
						contactList?.map((contact: any) => {
							return handleFilter(contact) ? (
								<ContactCard
									id={contact.id}
									first_name={contact.first_name}
									last_name={contact.last_name}
									phone={contact.phone}
									email={contact.email}
									fax={contact.fax}
									clicked={() => contactDetails(contact.id)}
								/>
							) : null;
						})
					)}
				</div>
			</div>
		</div>
	);
};

export default ContactList;
