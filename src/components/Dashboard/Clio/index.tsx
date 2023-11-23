import { useEffect, useState } from "react";
import styles from "./Clio.module.scss";
import ChevronRightIcon from "components/UI/Icons/Navigation/ChevronRight";
import ContactDetails from "components/Clio/ContactDetails";
import { useDispatch, useSelector } from "react-redux";
import { contactDetails } from "redux/clio/clioSelectors";
import { setContact, setContactDetails } from "redux/clio/clioSlice";
import ChevronUpIcon from "components/UI/Icons/ClioIcon/ChevronUp";
import StopWatch from "components/Clio/StopWatch";
import { useLazyGetContactQuery } from "services/clio";
import { clioContacts } from "constants/clioConstants";

const Clio = () => {
	const [clio, setClio] = useState(false);
	const dispatch = useDispatch();
	const contactDetail = useSelector(contactDetails);

	const [clioContact, { data, isLoading }] = useLazyGetContactQuery();

	// fetching the clio contact here
	useEffect(() => {
		clioContact(null);
	}, []);

	// filter the primary phone number and return in an array list from contact list
	useEffect(() => {
		const phoneNumbers = clioContacts?.data.map((entry) => entry.primary_phone_number).filter(Boolean);
		console.log(phoneNumbers);
	}, [clioContacts]);

	return (
		<div className={`${styles.clio} ${clio && styles.clio_active}`}>
			<div className={styles.dropdown}>
				<span>Clio/Connector</span>
				{clio && <StopWatch />}

				<span
					className={`${styles.chevron} ${clio && styles.active}`}
					onClick={() => {
						setClio(!clio);
					}}>
					<ChevronUpIcon />
				</span>
			</div>
			{clio && !contactDetail && (
				<div className={styles.clio_box}>
					<div className={styles.contactHeading}>Contacts ({clioContacts?.data?.length})</div>
					{/* map the components here */}
					{clioContacts?.data?.map((item) => (
						<div
							key={item.id}
							className={styles.contact}
							onClick={() => {
								dispatch(setContactDetails(true));
								dispatch(setContact(item));
							}}>
							<div>
								<span className={styles.profile}>
									<img src="/img/dummy/girl.jpg" alt="" />
								</span>
								{item.name}
							</div>

							<span className={styles.arrow_right}>
								<ChevronRightIcon />
							</span>
						</div>
					))}

					{/* <div className={styles.contact}>
						<div>
							<span className={styles.profile}>
								<img src="/img/dummy/girl.jpg" alt="" />
							</span>
							Sandra Pilon end
						</div>

						<span
							className={styles.arrow_right}
							onClick={() => {
								dispatch(setContactDetails(true));
							}}>
							<ChevronRightIcon />
						</span>
					</div> */}
				</div>
			)}
			{clio && contactDetail && <ContactDetails />}
		</div>
	);
};

export default Clio;
