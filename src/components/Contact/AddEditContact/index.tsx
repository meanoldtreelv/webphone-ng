import { useEffect, useRef, useState } from "react";
import styles from "./AddEditContact.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addContact, closeAddEditContact, setEditContactFalse } from "redux/contact/contactSlice";
import { addContactOpen, editContactNumber, selectedContactData } from "redux/contact/contactSelectors";
import accordionPlusImg from "./../../../assets/images/icon/btn_accordion_plus.svg";
import accordionMinusImg from "./../../../assets/images/icon/btn_accordion_minus.svg";
import XIcon from "components/UI/Icons/X";
import UserIcon from "components/UI/Icons/User/UserSingle";
import { useLazyCreateContactQuery, useLazyUpdateContactQuery } from "services/contact";
import { IContactList } from "redux/contact/contactTypes";
import { ClipLoader } from "react-spinners";
import { convertErrorString, extractFieldName } from "helpers/extractString";
// import { setNotification } from "redux/common/commonSlice";

const AddContact = () => {
	const isAddContactOpen = useSelector(addContactOpen);
	const contactNumber = useSelector(editContactNumber);
	const [contactData, setContactData] = useState<IContactList | {}>({});
	const [contactError, setContactError] = useState<any>();
	const [contactSrvrError, setContactSrvrError] = useState<string[]>([]);
	const dispatch = useDispatch();
	const salutations = ["Mr.", "Ms.", "Mrs."];
	const contactList: any = JSON.parse(localStorage.getItem("contacts"));

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

	// to be removed later
	const salutationRef = useRef<any>(null);
	const jobReportsRef = useRef<any>(null);
	const organizationRef = useRef<any>(null);
	const parentOrganizationRef = useRef<any>(null);

	const onSaveContact = async () => {
		if (selectedContact && selectedContact != contactData) {
			await updateContact(contactData);
			console.log("why isnt this updating, that is jut weird...");
		} else {
			const { error } = await createContact(contactData);

			if (error) {
				// this should be used for local validation and be extracted to another function
				// setContactError({
				// 	...contactError,
				// 	[extractFieldName(error.response.data.detail)]: convertErrorString(error.response.data.detail),
				// });

				setContactSrvrError([convertErrorString(error.response.data.detail)]);
			} else {
				setContactSrvrError([]);
				dispatch(closeAddEditContact());
				dispatch(addContact(contactData));
			}
		}
	};

	const closeContactHandler = () => {
		dispatch(closeAddEditContact());
		dispatch(setEditContactFalse());
	};

	const zipOnChange = (event: any) => {
		if (!isNaN(event.target.value)) {
			contactData &&
				setContactData({
					...contactData,
					address: {
						...contactData.address,
						zipcode: event.target.value,
					},
				});
		}
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
					{/* <div className={`flex justify-between items-center`}>
						<span className={styles.profile}>
							<UserIcon />
						</span>
						<button className={`footnote ${styles.uploadButton}`} style={{ color: "var(--text-primary, #1F2023)" }}>
							Upload Image
						</button>
					</div> */}
					<div className={styles.box}>
						<p className={`body_bold ${styles.box_header}`} style={{ color: "var(--text-primary, #1F2023)" }}>
							General
						</p>
						<div className={`${styles.inputBox}`} style={{ position: "relative", paddingBottom: "20px" }}>
							<label htmlFor="first_name" className={`caption_1`}>
								First Name <span style={{ color: "var(--support-danger, #EE3939)" }}>*</span>
							</label>
							<input
								type="text"
								id="first_name"
								value={contactData?.first_name}
								onChange={(event) => contactData && setContactData({ ...contactData, first_name: event.target.value })}
							/>
							{contactError?.first_name ? (
								<p
									className={`caption_2`}
									style={{ color: "var(--text-danger, #EE3939)", position: "absolute", bottom: "0" }}>
									{contactError?.first_name}
								</p>
							) : null}
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
							{false && (
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
							className={`body_bold flex justify-between ${styles.box_header}`}
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
							className={`body_bold  flex justify-between ${styles.box_header}`}
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
										value={contactData?.birthday}
										onChange={(event) =>
											contactData && setContactData({ ...contactData, birthday: event.target.value })
										}
									/>
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="position" className={`caption_1`}>
										Position
									</label>
									<input type="text" id="position" value={contactData?.job_details?.position} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="department" className={`caption_1`}>
										Department
									</label>
									<input type="text" id="department" value={contactData?.job_details?.department} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="description" className={`caption_1`}>
										Description
									</label>
									<input
										type="text"
										id="description"
										value={contactData?.description}
										onChange={(event) =>
											contactData && setContactData({ ...contactData, description: event.target.value })
										}
									/>
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="salutation" className={`caption_1`}>
										Salutation
									</label>
									<select name="" id="salutation" ref={salutationRef}>
										{salutations?.map((item) => (
											<option
												value={item}
												key={item}
												selected={item === contactData?.salutation}
												onChange={(event) =>
													contactData &&
													setContactData({
														...contactData,
														salutation: item,
													})
												}>
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
							className={`body_bold  flex justify-between ${styles.box_header}`}
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
							className={`body_bold  flex justify-between ${styles.box_header}`}
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
									{contactList?.map((contact) => (
										<option value={contact?.id}>
											{contact?.first_name
												? contact?.first_name + " " + contact?.last_name
												: contact?.phone
												? contact?.phone
												: contact?.email}
										</option>
									))}
								</select>
							</div>
						)}
					</div>
					<div className={styles.box}>
						<p
							className={`body_bold  flex justify-between ${styles.box_header}`}
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
									<input
										type="text"
										id="street"
										value={contactData?.address?.street}
										onChange={(event) =>
											contactData &&
											setContactData({
												...contactData,
												address: {
													...contactData.address,
													street: event.target.value,
												},
											})
										}
									/>
								</div>
								{/* on-hold -> the input component's styles should be edited  */}
								{/* <div className={`${styles.inputBox}`}>
									<Input underlined placeholder="Street" />
								</div> */}
								<div className={`${styles.inputBox}`}>
									<label htmlFor="city" className={`caption_1`}>
										city
									</label>
									<input
										type="text"
										id="city"
										value={contactData?.address?.city}
										onChange={(event) =>
											contactData &&
											setContactData({
												...contactData,
												address: {
													...contactData.address,
													city: event.target.value,
												},
											})
										}
									/>
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="state" className={`caption_1`}>
										State
									</label>
									<input
										type="text"
										id="state"
										value={contactData?.address?.state}
										onChange={(event) =>
											contactData &&
											setContactData({
												...contactData,
												address: {
													...contactData.address,
													state: event.target.value,
												},
											})
										}
									/>
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="zip" className={`caption_1`}>
										Zip
									</label>
									<input type="text" id="zip" value={contactData?.address?.zipcode} onChange={zipOnChange} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="country" className={`caption_1`}>
										Country
									</label>
									<input
										type="text"
										id="country"
										value={contactData?.address?.country}
										onChange={(event) =>
											contactData &&
											setContactData({
												...contactData,
												address: {
													...contactData.address,
													country: event.target.value,
												},
											})
										}
									/>
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

					{contactSrvrError?.length ? (
						<div className={`${styles.box} ${styles.error_box}`}>
							<h3>Please fix the following errors:</h3>
							<ul>{contactSrvrError?.map((error) => <li>{error}</li>)}</ul>
						</div>
					) : null}
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
						{isLoading ? (
							<>
								<ClipLoader color="white" size={13} />
								<span style={{ marginLeft: "5px" }}>Saving...</span>
							</>
						) : (
							<span>Save</span>
						)}
					</button>
				</div>
			</div>
		</section>
	);
};

export default AddContact;
