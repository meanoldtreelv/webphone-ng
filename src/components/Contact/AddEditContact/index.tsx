import { useEffect, useRef, useState } from "react";
import styles from "./AddEditContact.module.scss";
import { Add_contact_API, UPDATE_Contact_API } from "effects/apiEffect";
import { useDispatch, useSelector } from "react-redux";
import { closeAddEditContact, setEditContactFalse } from "redux/contact/contactSlice";
import { addContactOpen, editContactNumber, selectedContactData } from "redux/contact/contactSelectors";
import { GET_Contact_Salutation_API } from "../../../effects/apiEffect";
import accordionPlusImg from "./../../../assets/images/icon/btn_accordion_plus.svg";
import accordionMinusImg from "./../../../assets/images/icon/btn_accordion_minus.svg";
import XIcon from "components/UI/Icons/X";
import UserIcon from "components/UI/Icons/User/UserSingle";
import { useLazyCreateContactQuery, useLazyUpdateContactQuery } from "services/contact";
import { IContactList } from "redux/contact/contactTypes";
import { PulseLoader } from "react-spinners";

const AddContact = () => {
	const isAddContactOpen = useSelector(addContactOpen);
	const contactNumber = useSelector(editContactNumber);
	const [contactData, setContactData] = useState<IContactList | {}>({});

	const selectedContact = useSelector(selectedContactData);

	const [updateContact] = useLazyUpdateContactQuery();
	const [createContact, { isLoading }] = useLazyCreateContactQuery();

	useEffect(() => {
		if (selectedContact) {
			setContactData(selectedContact);
		}
	}, []);

	const [accordionToggle, setAccordionToggle] = useState({
		additional: false,
		company: false,
		manager: false,
		address: false,
	});

	const [salutationList, setSalutationList] = useState([]);

	// to be removed later
	const salutationRef = useRef<any>(null);
	const jobReportsRef = useRef<any>(null);
	const streetRef = useRef<any>(null);
	const organizationRef = useRef<any>(null);
	const parentOrganizationRef = useRef<any>(null);

	const dispatch = useDispatch();

	const onSaveContact = () => {
		if (selectedContact) {
			if (selectedContact != contactData) updateContact(contactData);
		} else {
			createContact(contactData);
		}
	};

	const closeContactHandler = () => {
		dispatch(closeAddEditContact());
		dispatch(setEditContactFalse());
	};

	return (
		<section className={styles.overlay}>
			<div className={styles.addContact}>
				<div className={styles.addContact_header}>
					<span className={styles.headerTitle}>{contactNumber ? "Edit Contact" : "Add Contact"}</span>
					<button onClick={closeContactHandler}>
						<XIcon />
					</button>
				</div>
				<div className={styles.contact_data}>
					<div className={`flex justify-between items-center`}>
						<span className={styles.profile}>
							<UserIcon />
						</span>
						<button className={`footnote ${styles.uploadButton}`} style={{ color: "var(--text-primary, #1F2023)" }}>
							Upload Image
						</button>
					</div>
					<div className={styles.box}>
						<p className={`body_bold ${styles.box_heding}`} style={{ color: "var(--text-primary, #1F2023)" }}>
							General
						</p>
						<div className={`${styles.inputBox}`}>
							<label htmlFor="first_name" className={`caption_1`}>
								First Name <span style={{ color: "var(--support-danger, #EE3939)" }}>*</span>
							</label>
							<input
								type="text"
								id="first_name"
								value={contactData?.first_name}
								onChange={(event) => contactData && setContactData({ ...contactData, first_name: event.target.value })}
							/>
						</div>
						<div className={`${styles.inputBox}`}>
							<label htmlFor="last_name" className={`caption_1`}>
								Last Name <span style={{ color: "var(--support-danger, #EE3939)" }}>*</span>
							</label>
							<input
								type="text"
								id="last_name"
								value={contactData?.last_name}
								onChange={(event) => contactData && setContactData({ ...contactData, last_name: event.target.value })}
							/>
						</div>
						<div className={`${styles.inputBox}`} style={{ position: "relative", paddingBottom: "20px" }}>
							<label htmlFor="email" className={`caption_1`}>
								Email
							</label>
							<input
								type="text"
								id="email"
								value={contactData?.email || ""}
								onChange={(event) => contactData && setContactData({ ...contactData, email: event.target.value })}
							/>
							{true && (
								<p
									className={`caption_2`}
									style={{ color: "var(--text-danger, #EE3939)", position: "absolute", bottom: "0" }}>
									You have entered an invalid e-mail address.
								</p>
							)}
						</div>
					</div>

					<div className={styles.box}>
						<p
							className={`body_bold flex justify-between ${styles.box_heding}`}
							style={{ color: "var(--text-primary, #1F2023)" }}>
							<span>Numbers</span>{" "}
							{/* <span
								onClick={() => {
									setIsNumberAccordianOpen(!isNumberAccordianOpen);
								}}
								className={`cursor-pointer`}>
								{!isNumberAccordianOpen ? (
									<img src={accordionPlusImg} alt=""></img>
								) : (
									<img src={accordionMinusImg} alt=""></img>
								)}
							</span> */}
						</p>

						<div className={`${styles.inputBox}`}>
							<label htmlFor="phone_number" className={`caption_1`}>
								Phone Number <span style={{ color: "var(--support-danger, #EE3939)" }}>*</span>
							</label>
							<input
								type="text"
								id="phone_number"
								value={contactData?.phone}
								onChange={(event) => contactData && setContactData({ ...contactData, phone: event.target.value })}
							/>
						</div>
						<div className={`${styles.inputBox}`}>
							<label htmlFor="fax_number" className={`caption_1`}>
								Fax Number
							</label>
							<input
								type="text"
								id="fax_number"
								value={contactData?.fax || ""}
								onChange={(event) => contactData && setContactData({ ...contactData, fax: event.target.value })}
							/>
						</div>
					</div>

					<div className={styles.box}>
						<p
							className={`body_bold  flex justify-between ${styles.box_heding}`}
							style={{ color: "var(--text-primary, #1F2023)" }}>
							<span>Additional Fields</span>

							<span
								onClick={() => {
									setAccordionToggle((prevState) => ({ ...accordionToggle, additional: !prevState.additional }));
								}}
								className={`cursor-pointer`}>
								{!accordionToggle.additional ? (
									<img src={accordionPlusImg} alt=""></img>
								) : (
									<img src={accordionMinusImg} alt=""></img>
								)}
							</span>
						</p>
						{accordionToggle.additional && (
							<>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="birthday" className={`caption_1`}>
										Birthday
									</label>
									<input
										type="date"
										id="birthday"
										value={contactData?.birthday || ""}
										onChange={(event) =>
											contactData && setContactData({ ...contactData, birthday: event.target.value })
										}
									/>
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="position" className={`caption_1`}>
										Position
									</label>
									<input type="text" id="position" value={contactData?.job_details.position || ""} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="department" className={`caption_1`}>
										Department
									</label>
									<input type="text" id="department" value={contactData?.job_details.department} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="description" className={`caption_1`}>
										Description
									</label>
									<input type="text" id="description" value={contactData?.description} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="salutation" className={`caption_1`}>
										Salutation
									</label>
									{/* <input type="text" id="salutation" ref={salutationRef} /> */}
									<select name="" id="salutation" ref={salutationRef}>
										<option value=""></option>
										{salutationList?.map((item) => (
											<option value={item} key={item}>
												{item}
											</option>
										))}
									</select>
								</div>
							</>
						)}
					</div>

					<div className={styles.box}>
						<p
							className={`body_bold  flex justify-between ${styles.box_heding}`}
							style={{ color: "var(--text-primary, #1F2023)" }}>
							<span>Company</span>
							<span
								onClick={() => {
									setAccordionToggle((prevState) => ({ ...accordionToggle, company: !prevState.company }));
								}}
								className={`cursor-pointer`}>
								{!accordionToggle.company ? (
									<img src={accordionPlusImg} alt=""></img>
								) : (
									<img src={accordionMinusImg} alt=""></img>
								)}
							</span>
						</p>
						{accordionToggle.company && (
							<>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="organization" className={`caption_1`}>
										Organization
									</label>
									<input type="text" id="organization" ref={organizationRef} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="parent_organization" className={`caption_1`}>
										Parent Organization
									</label>
									<input type="text" id="parent_organization" ref={parentOrganizationRef} />
								</div>
							</>
						)}
					</div>
					<div className={styles.box}>
						<p
							className={`body_bold  flex justify-between ${styles.box_heding}`}
							style={{ color: "var(--text-primary, #1F2023)" }}>
							<span>Manager</span>
							<span
								onClick={() => {
									setAccordionToggle((prevState) => ({ ...accordionToggle, manager: !prevState.manager }));
								}}
								className={`cursor-pointer`}>
								{!accordionToggle.manager ? (
									<img src={accordionPlusImg} alt=""></img>
								) : (
									<img src={accordionMinusImg} alt=""></img>
								)}
							</span>
						</p>
						{accordionToggle.manager && (
							<div className={`${styles.inputBox}`}>
								<label htmlFor="reports" className={`caption_1`}>
									Reports to
								</label>
								<select name="" id="reports" ref={jobReportsRef}>
									<option value="none">none</option>
								</select>
							</div>
						)}
					</div>
					<div className={styles.box}>
						<p
							className={`body_bold  flex justify-between ${styles.box_heding}`}
							style={{ color: "var(--text-primary, #1F2023)" }}>
							<span>Address Fields</span>
							<span
								onClick={() => {
									setAccordionToggle((prevState) => ({ ...accordionToggle, address: !prevState.address }));
								}}
								className={`cursor-pointer`}>
								{!accordionToggle.address ? (
									<img src={accordionPlusImg} alt=""></img>
								) : (
									<img src={accordionMinusImg} alt=""></img>
								)}
							</span>
						</p>
						{accordionToggle.address && (
							<>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="street" className={`caption_1`}>
										Street
									</label>
									<input type="text" id="street" ref={streetRef} />
								</div>
								{/* on-hold -> the input component's styles should be edited  */}
								{/* <div className={`${styles.inputBox}`}>
									<Input underlined placeholder="Street" />
								</div> */}
								<div className={`${styles.inputBox}`}>
									<label htmlFor="city" className={`caption_1`}>
										city
									</label>
									<input type="text" id="city" value={contactData?.address.city} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="state" className={`caption_1`}>
										State
									</label>
									<input type="text" id="state" value={contactData?.address.state} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="zip" className={`caption_1`}>
										Zip
									</label>
									<input type="text" id="zip" value={contactData?.address.zipcode} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="country" className={`caption_1`}>
										Country
									</label>
									<input type="text" id="country" value={contactData?.address.country} />
								</div>
								{/* <div className={`${styles.inputBox}`}>
									<label htmlFor="mailing_address" className={`caption_1`}>
										Mailing Address
									</label>
									<input type="text" id="mailing_address" />
								</div> */}
							</>
						)}
					</div>
				</div>
				<div className={styles.buttonBox}>
					<button
						className={`footnote ${styles.cancel}`}
						style={{ color: "var(--text-primary, #1F2023)" }}
						onClick={closeContactHandler}>
						Cancel
					</button>
					<button
						className={`footnote_bold ${styles.save}`}
						style={{ color: "var(--text-on-color, #FFF)" }}
						onClick={onSaveContact}>
						{isLoading ? <PulseLoader color="white" size={6} /> : "Save"}
					</button>
				</div>
			</div>
		</section>
	);
};

export default AddContact;
