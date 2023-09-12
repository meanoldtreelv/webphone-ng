import React, { useState } from "react";
import classes from "./addContact.module.scss";

const AddContact = () => {
	const [contactType, setContactType] = useState("add_contact");
	const [isNumberAccordianOpen, setIsNumberAccordianOpen] = useState(false);
	const [isAdditionalFieldAccordianOpen, setIsAdditionalFieldAccordianOpen] = useState(false);
	const [isCompanyAccordianOpen, setIsCompanyAccordianOpen] = useState(false);
	const [isManagerAccordianOpen, setIsManagerAccordianOpen] = useState(false);
	const [isAdditionalField2AccordianOpen, setIsAdditionalField2AccordianOpen] = useState(false);

	return (
		<section className={classes.overlay}>
			<div className={classes.addContact}>
				<div className={`flex justify-between items-center`}>
					<span className={`sub_headline_bold`} style={{ color: "var(--text-primary, #1F2023)" }}>
						{contactType === "add_contact" ? "Add Contact" : "Edit Contact"}
					</span>
					<span className={`p-1`}>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
							<g clip-path="url(#clip0_2412_11469)">
								<path
									d="M11.25 6.75L6.75 11.25M6.75 6.75L11.25 11.25M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
									stroke="#6C7A8B"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_2412_11469">
									<rect width="18" height="18" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</span>
				</div>
				<div className={classes.contact_data}>
					<div className={`flex justify-between items-center`}>
						<span className={classes.profile}>
							<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
								<path
									d="M11.0826 11.0839C11.0826 15.4482 14.6254 19.0009 18.9996 19.0009C23.3738 19.0009 26.9168 15.4481 26.9167 11.0838C26.9167 6.70967 23.3738 3.16675 18.9996 3.16675C14.6255 3.16675 11.0826 6.70967 11.0826 11.0839Z"
									fill="#6C7A8B"
								/>
								<path
									d="M34.8333 30.877C34.8333 25.6023 24.2739 22.96 18.9992 22.96C13.7245 22.96 3.1651 25.6023 3.1651 30.877V33.2522C3.1651 34.1267 3.87398 34.8356 4.74844 34.8356H33.25C34.1245 34.8356 34.8333 34.1267 34.8333 33.2522V30.877Z"
									fill="#6C7A8B"
								/>
							</svg>
						</span>
						{/* <span className={`footnote ${classes.uploadButton}`} style={{ color: "var(--text-primary, #1F2023)" }}>
							Upload Image
						</span> */}
					</div>
					<div className={classes.box}>
						<p className={`body_bold ${classes.box_heding}`} style={{ color: "var(--text-primary, #1F2023)" }}>
							General
						</p>
						<div className={`${classes.inputBox}`}>
							<label htmlFor="first_name" className={`caption_1`}>
								First Name
							</label>
							<input type="text" id="first_name" />
						</div>
						<div className={`${classes.inputBox}`}>
							<label htmlFor="last_name" className={`caption_1`}>
								Last Name
							</label>
							<input type="text" id="last_name" />
						</div>
						<div className={`${classes.inputBox}`} style={{ position: "relative", paddingBottom: "20px" }}>
							<label htmlFor="email" className={`caption_1`}>
								Email
							</label>
							<input type="text" id="email" />
							{true && (
								<p
									className={`caption_2`}
									style={{ color: "var(--text-danger, #EE3939)", position: "absolute", bottom: "0" }}>
									You have entered an invalid e-mail address.
								</p>
							)}
						</div>
					</div>

					<div className={classes.box}>
						<p
							className={`body_bold flex justify-between ${classes.box_heding}`}
							style={{ color: "var(--text-primary, #1F2023)" }}>
							<span>Numbers</span>{" "}
							<span
								onClick={() => {
									setIsNumberAccordianOpen(!isNumberAccordianOpen);
								}}
								className={`cursor-pointer`}>
								{!isNumberAccordianOpen ? (
									<img src="/icon/btn_accordion_plus.svg" alt=""></img>
								) : (
									<img src="/icon/btn_accordion_minus.svg" alt=""></img>
								)}
							</span>
						</p>
						{isNumberAccordianOpen && (
							<>
								<div className={`${classes.inputBox}`}>
									<label htmlFor="phone_number" className={`caption_1`}>
										Phone Number
									</label>
									<input type="text" id="phone_number" />
								</div>
								<div className={`${classes.inputBox}`}>
									<label htmlFor="fax_number" className={`caption_1`}>
										Fax Number
									</label>
									<input type="text" id="fax_number" />
								</div>
							</>
						)}
					</div>

					<div className={classes.box}>
						<p
							className={`body_bold  flex justify-between ${classes.box_heding}`}
							style={{ color: "var(--text-primary, #1F2023)" }}>
							<span>Additional Fields</span>

							<span
								onClick={() => {
									setIsAdditionalFieldAccordianOpen(!isAdditionalFieldAccordianOpen);
								}}
								className={`cursor-pointer`}>
								{!isAdditionalFieldAccordianOpen ? (
									<img src="/icon/btn_accordion_plus.svg" alt=""></img>
								) : (
									<img src="/icon/btn_accordion_minus.svg" alt=""></img>
								)}
							</span>
						</p>
						{isAdditionalFieldAccordianOpen && (
							<>
								<div className={`${classes.inputBox}`}>
									<label htmlFor="birthday" className={`caption_1`}>
										Birthday
									</label>
									<input type="text" id="birthday" />
								</div>
								<div className={`${classes.inputBox}`}>
									<label htmlFor="position" className={`caption_1`}>
										Position
									</label>
									<input type="text" id="position" />
								</div>
								<div className={`${classes.inputBox}`}>
									<label htmlFor="department" className={`caption_1`}>
										Department
									</label>
									<input type="text" id="department" />
								</div>
							</>
						)}
					</div>

					<div className={classes.box}>
						<p
							className={`body_bold  flex justify-between ${classes.box_heding}`}
							style={{ color: "var(--text-primary, #1F2023)" }}>
							<span>Company</span>
							<span
								onClick={() => {
									setIsCompanyAccordianOpen(!isCompanyAccordianOpen);
								}}
								className={`cursor-pointer`}>
								{!isCompanyAccordianOpen ? (
									<img src="/icon/btn_accordion_plus.svg" alt=""></img>
								) : (
									<img src="/icon/btn_accordion_minus.svg" alt=""></img>
								)}
							</span>
						</p>
						{isCompanyAccordianOpen && (
							<>
								<div className={`${classes.inputBox}`}>
									<label htmlFor="organization" className={`caption_1`}>
										Organization
									</label>
									<input type="text" id="organization" />
								</div>
								<div className={`${classes.inputBox}`}>
									<label htmlFor="parent_organization" className={`caption_1`}>
										Parent Organization
									</label>
									<input type="text" id="parent_organization" />
								</div>
							</>
						)}
					</div>
					<div className={classes.box}>
						<p
							className={`body_bold  flex justify-between ${classes.box_heding}`}
							style={{ color: "var(--text-primary, #1F2023)" }}>
							<span>Manager</span>
							<span
								onClick={() => {
									setIsManagerAccordianOpen(!isManagerAccordianOpen);
								}}
								className={`cursor-pointer`}>
								{!isManagerAccordianOpen ? (
									<img src="/icon/btn_accordion_plus.svg" alt=""></img>
								) : (
									<img src="/icon/btn_accordion_minus.svg" alt=""></img>
								)}
							</span>
						</p>
						{isManagerAccordianOpen && (
							<div className={`${classes.inputBox}`}>
								<label htmlFor="organization" className={`caption_1`}>
									Reports to
								</label>
								<select name="" id="">
									<option>reports to</option>
								</select>
							</div>
						)}
					</div>
					<div className={classes.box}>
						<p
							className={`body_bold  flex justify-between ${classes.box_heding}`}
							style={{ color: "var(--text-primary, #1F2023)" }}>
							<span>Additional Fields</span>
							<span
								onClick={() => {
									setIsAdditionalField2AccordianOpen(!isAdditionalField2AccordianOpen);
								}}
								className={`cursor-pointer`}>
								{!isAdditionalField2AccordianOpen ? (
									<img src="/icon/btn_accordion_plus.svg" alt=""></img>
								) : (
									<img src="/icon/btn_accordion_minus.svg" alt=""></img>
								)}
							</span>
						</p>
						{isAdditionalField2AccordianOpen && (
							<>
								<div className={`${classes.inputBox}`}>
									<label htmlFor="state" className={`caption_1`}>
										State
									</label>
									<input type="text" id="state" />
								</div>
								<div className={`${classes.inputBox}`}>
									<label htmlFor="zip" className={`caption_1`}>
										Zip
									</label>
									<input type="text" id="zip" />
								</div>
								<div className={`${classes.inputBox}`}>
									<label htmlFor="country" className={`caption_1`}>
										Country
									</label>
									<input type="text" id="country" />
								</div>
								<div className={`${classes.inputBox}`}>
									<label htmlFor="mailing_address" className={`caption_1`}>
										Mailing Address
									</label>
									<input type="text" id="mailing_address" />
								</div>
							</>
						)}
					</div>
				</div>
				<div className={classes.buttonBox}>
					<span className={`footnote ${classes.cancel}`} style={{ color: "var(--text-primary, #1F2023)" }}>
						Cancel
					</span>
					<span className={`footnote_bold ${classes.save}`} style={{ color: "var(--text-on-color, #FFF)" }}>
						Save
					</span>
				</div>
			</div>
		</section>
	);
};

export default AddContact;
