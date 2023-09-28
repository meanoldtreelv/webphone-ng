import styles from "./ContactList.module.scss";
import ContactCard from "../ContactCard";
import { useDispatch, useSelector } from "react-redux";
import { openAddContact } from "../../../redux/contact/contactSlice";
import { contactLists } from "redux/contact/contactSelectors";
import StarIcon from "components/UI/Icons/Star";
import SortIcon from "components/UI/Icons/Sort";
import UserAddIcon from "components/UI/Icons/User/UserAdd";
import SearchIcon from "components/UI/Icons/Search";

const ContactList = () => {
	const dispatch = useDispatch();
	const contactList = useSelector(contactLists);

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
		<div className={styles.contact}>
			<div className={styles.contact_search}>
				<input type="text" placeholder="Search number" />

				<button
					className={styles.add_contact}
					onClick={() => {
						dispatch(openAddContact());
					}}>
					<UserAddIcon />
				</button>

				<div className={styles.search_icon}>
					<SearchIcon />
				</div>
			</div>
			<div className={styles.contact_lists}>
				{/* favourite contact heading */}
				<div>
					<p className={styles.contact_favorites}>
						<span>
							<StarIcon />
							<span>Favorites (3)</span>
						</span>
						<span className={styles.contact_sorting}>
							<SortIcon />
						</span>
					</p>
				</div>
				{/* favourite contact  */}
				{/* <div>{sortedContactLists?.map((item) => <ContactCard contactData={item} key={item.id} />)}</div> */}

				{/* frquently contact heading  */}
				<div>
					<p className={styles.contact_favorites}>
						<span>Frequently Contacted</span>
					</p>
				</div>

				{/* frequently contact  */}
				<div>
					{contactList?.map((contact) => (
						<ContactCard
							id={contact.id}
							first_name={contact.first_name}
							last_name={contact.last_name}
							phone={contact.phone}
							email={contact.email}
							fax={contact.fax}
						/>
					))}
				</div>
				{/* namewise contact heading  */}
				<div>
					<p className={styles.contact_favorites}>
						<span>
							<span>A</span>
						</span>
					</p>
				</div>

				{/* frequently contact  */}
				<div>
					{contactList?.map((contact) => (
						<ContactCard
							id={contact.id}
							first_name={contact.first_name}
							last_name={contact.last_name}
							phone={contact.phone}
							email={contact.email}
							fax={contact.fax}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ContactList;
