import { useEffect, useRef, useState } from "react";
import styles from "./AddEditContact.module.scss";
import { Add_contact_API } from "effects/apiEffect";
import { useDispatch, useSelector } from "react-redux";
// import { contactActions } from "../../../app/features/contact/contact.slice";
import { closeAddContact, setEditContactFalse} from "redux/contact/contactSlice";
import { addContactOpen, editContactNumber } from "redux/contact/contactSelectors";
import { GET_Contact_Salutation_API } from "../../../effects/apiEffect";

import accordionPlusImg from './../../../assets/images/icon/btn_accordion_plus.svg';
import accordionMinusImg from './../../../assets/images/icon/btn_accordion_minus.svg';
import XIcon from "components/UI/Icons/X";
import UserIcon from "components/UI/Icons/User/UserSingle";
// import Input from "components/UI/Forms/Input";

const AddContact = () => {
	const isAddContactOpen = useSelector(addContactOpen);
	const contactNumber = useSelector(editContactNumber);

	const [accordionToggle, setAccordionToggle] = useState({
		additional: false,
		company: false,
		manager: false,
		address: false,
	});
	
	const [salutationList, setSalutationList] = useState([]);

	const [payload, setPayload] = useState({});

	const firstNameRef = useRef<any>(null);
	const lastNameRef = useRef<any>(null);
	const phoneRef = useRef<any>(null);
	const faxRef = useRef<any>(null);
	const emailRef = useRef<any>(null);
	const birthdayRef = useRef<any>(null);
	const salutationRef = useRef<any>(null);
	const descriptionRef = useRef<any>(null);
	const jobPositionRef = useRef<any>(null);
	const jobDepartmentRef = useRef<any>(null);
	const jobReportsRef = useRef<any>(null);
	const countryRef = useRef<any>(null);
	const stateRef = useRef<any>(null);
	const cityRef = useRef<any>(null);
	const streetRef = useRef<any>(null);
	const zipcodeRef = useRef<any>(null);
	const organizationRef = useRef<any>(null);
	const parentOrganizationRef = useRef<any>(null);

	const dispatch = useDispatch();

	useEffect(() => {
		GET_Contact_Salutation_API(
			(res: any) => {
				console.log(res, "contact salutation API retrieve");
				if (res?.status === 200) {
					console.log("success in contact salutation retrieve");
					setSalutationList(res.data.possible_salutations);
				}
			},
			(err: any) => {
				console.error(err, "err in contact salutation retrieve");
			},
		);
	}, []);

	useEffect(() => {
		Add_contact_API(
			payload,
			(res: any) => {
				console.log(res, "contact API retrieve");
				if (res?.status === 201) {
					console.log("success in contact retrieve");
					dispatch(closeAddContact());
				}
			},
			(err: any) => {
				console.error(err, "err in contact retrieve");
			},
		);
	}, [payload]);

	const onSaveContact = () => {
		if (contactNumber) {
			dispatch(setEditContactFalse());
		}

		if (isAddContactOpen) {
			setPayload({
				first_name: firstNameRef.current.value || null,
				last_name: lastNameRef.current.value || null,
				phone: phoneRef.current.value || null,
				fax: faxRef.current.value || null,
				email: emailRef.current.value || null,
				birthday: birthdayRef.current.value || null,
				salutation: salutationRef.current.value || "",
				description: descriptionRef.current.value || null,
				job_details: {
					position: jobPositionRef.current.value || null,
					department: jobDepartmentRef.current.value || "",
					reports_to: jobReportsRef.current.value || null,
				},
				address: {
					country: countryRef.current.value || null,
					state: stateRef.current.value || null,
					city: cityRef.current.value || null,
					street: streetRef.current.value || null,
					zipcode: zipcodeRef.current.value || null,
				},
				organization_details: {
					organization: organizationRef.current.value || null,
					parent_organization: parentOrganizationRef.current.value || null,
				},
			});
		}
	}

	const closeContactHandler = () => {
		dispatch(closeAddContact());
		dispatch(setEditContactFalse());
	}

	return (
		<section className={styles.overlay}>
			<div className={styles.addContact}>
				<div className={`flex justify-between items-center`}>
					<span className={`sub_headline_bold`} style={{ color: "var(--text-primary, #1F2023)" }}>
						{contactNumber ? "Edit Contact" : "Add Contact"}
					</span>
					<span className={`p-1 cursor-pointer`} onClick={closeContactHandler}>
						<XIcon />
					</span>
				</div>
				<div className={styles.contact_data}>
					<div className={`flex justify-between items-center`}>
						<span className={styles.profile}>
							<UserIcon />
						</span>
						{/* <span className={`footnote ${styles.uploadButton}`} style={{ color: "var(--text-primary, #1F2023)" }}>
							Upload Image
						</span> */}
					</div>
					<div className={styles.box}>
						<p className={`body_bold ${styles.box_heding}`} style={{ color: "var(--text-primary, #1F2023)" }}>
							General
						</p>
						<div className={`${styles.inputBox}`}>
							<label htmlFor="first_name" className={`caption_1`}>
								First Name <span style={{ color: "var(--support-danger, #EE3939)" }}>*</span>
							</label>
							<input type="text" id="first_name" ref={firstNameRef} />
						</div>
						<div className={`${styles.inputBox}`}>
							<label htmlFor="last_name" className={`caption_1`}>
								Last Name <span style={{ color: "var(--support-danger, #EE3939)" }}>*</span>
							</label>
							<input type="text" id="last_name" ref={lastNameRef} />
						</div>
						<div className={`${styles.inputBox}`} style={{ position: "relative", paddingBottom: "20px" }}>
							<label htmlFor="email" className={`caption_1`}>
								Email
							</label>
							<input type="text" id="email" ref={emailRef} />
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
							<input type="text" id="phone_number" ref={phoneRef} />
						</div>
						<div className={`${styles.inputBox}`}>
							<label htmlFor="fax_number" className={`caption_1`}>
								Fax Number
							</label>
							<input type="text" id="fax_number" ref={faxRef} />
						</div>
					</div>

					<div className={styles.box}>
						<p
							className={`body_bold  flex justify-between ${styles.box_heding}`}
							style={{ color: "var(--text-primary, #1F2023)" }}>
							<span>Additional Fields</span>

							<span
								onClick={() => {
									setAccordionToggle((prevState) => ({...accordionToggle, additional: !prevState.additional}));
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
									<input type="date" id="birthday" ref={birthdayRef} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="position" className={`caption_1`}>
										Position
									</label>
									<input type="text" id="position" ref={jobPositionRef} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="department" className={`caption_1`}>
										Department
									</label>
									<input type="text" id="department" ref={jobDepartmentRef} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="description" className={`caption_1`}>
										Description
									</label>
									<input type="text" id="description" ref={descriptionRef} />
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
									setAccordionToggle((prevState) => ({...accordionToggle, company: !prevState.company}));
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
									setAccordionToggle((prevState) => ({...accordionToggle, manager: !prevState.manager}));
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
									setAccordionToggle((prevState) => ({...accordionToggle, address: !prevState.address}));
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
									<input type="text" id="city" ref={cityRef} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="state" className={`caption_1`}>
										State
									</label>
									<input type="text" id="state" ref={stateRef} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="zip" className={`caption_1`}>
										Zip
									</label>
									<input type="text" id="zip" ref={zipcodeRef} />
								</div>
								<div className={`${styles.inputBox}`}>
									<label htmlFor="country" className={`caption_1`}>
										Country
									</label>
									<input type="text" id="country" ref={countryRef} />
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
					<span
						className={`footnote ${styles.cancel}`}
						style={{ color: "var(--text-primary, #1F2023)" }}
						onClick={closeContactHandler}>
						Cancel
					</span>
					<span
						className={`footnote_bold ${styles.save}`}
						style={{ color: "var(--text-on-color, #FFF)" }}
						onClick={onSaveContact}>
						Save
					</span>
				</div>
			</div>
		</section>
	);
};

export default AddContact;
