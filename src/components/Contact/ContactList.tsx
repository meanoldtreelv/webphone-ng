import React, { useEffect, useState } from "react";
import classes from "./contactList.module.scss";
import ContactCard from "./ContactCard";
import { useDispatch, useSelector } from "react-redux";
import { contactActions } from "../../store/contact";

const ContactList = () => {
	const contactLists = useSelector((state) => state.contact.contactList);
	const dispatch = useDispatch();

	// console.log("====================================");
	// console.log(contactLists, "contact data");
	// console.log("====================================");

	// Sort the array based on first name
	const sortedContactLists = [...contactLists]?.sort((a, b) => {
		const firstNameA = a.first_name || ""; // Handle null first name
		const firstNameB = b.first_name || ""; // Handle null first name

		if (firstNameA === "" && firstNameB === "") {
			return 0; // If both first names are null, consider them equal
		} else if (firstNameA === "") {
			return 1; // Put null values at the end
		} else if (firstNameB === "") {
			return -1; // Put null values at the end
		}

		return firstNameA.localeCompare(firstNameB);
	});

	console.log("====================================");
	console.log(sortedContactLists);
	console.log("====================================");

	const sortedData = [...contactLists]
		.filter((item) => item.first_name && item.first_name.startsWith("a"))
		.sort((a, b) => a.first_name.localeCompare(b.first_name));

	console.log("====================================");
	console.log(sortedData, "sorted");
	console.log("====================================");
	return (
		<div className={classes.contact}>
			<div className={classes.contact_search}>
				<input type="text" placeholder="Search number" />

				<span
					className={`cursor-pointer ${classes.add_contact}`}
					onClick={() => {
						dispatch(contactActions.openAddContact());
					}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
						<path
							d="M12 15.75V14.25C12 13.4544 11.6839 12.6913 11.1213 12.1287C10.5587 11.5661 9.79565 11.25 9 11.25H4.5C3.70435 11.25 2.94129 11.5661 2.37868 12.1287C1.81607 12.6913 1.5 13.4544 1.5 14.25V15.75M14.25 6V10.5M16.5 8.25H12M9.75 5.25C9.75 6.90685 8.40685 8.25 6.75 8.25C5.09315 8.25 3.75 6.90685 3.75 5.25C3.75 3.59315 5.09315 2.25 6.75 2.25C8.40685 2.25 9.75 3.59315 9.75 5.25Z"
							stroke="white"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>

				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={classes.search_icon}>
					<g id="line / search">
						<path
							id="Vector"
							d="M14 14L10.5354 10.5354M10.5354 10.5354C11.4731 9.59765 11.9999 8.32583 11.9999 6.9997C11.9999 5.67357 11.4731 4.40175 10.5354 3.46403C9.59765 2.52632 8.32583 1.99951 6.9997 1.99951C5.67357 1.99951 4.40175 2.52632 3.46403 3.46403C2.52632 4.40175 1.99951 5.67357 1.99951 6.9997C1.99951 8.32583 2.52632 9.59765 3.46403 10.5354C4.40175 11.4731 5.67357 11.9999 6.9997 11.9999C8.32583 11.9999 9.59765 11.4731 10.5354 10.5354Z"
							stroke="#9298A0"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</g>
				</svg>
			</div>
			<div className={classes.contact_lists}>
				{/* favourite contact heading */}
				<div>
					<p className={`caption_2 ${classes.contact_favorites}`}>
						{/* <span>
							<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="line / star">
									<path
										id="Vector"
										d="M5.73995 1.74961C5.7611 1.69802 5.79711 1.65389 5.84341 1.62284C5.88971 1.59178 5.9442 1.5752 5.99995 1.5752C6.0557 1.5752 6.11019 1.59178 6.15649 1.62284C6.20279 1.65389 6.23881 1.69802 6.25995 1.74961L7.32245 4.30511C7.34234 4.35292 7.37504 4.39433 7.41694 4.42476C7.45884 4.4552 7.50833 4.47348 7.55995 4.47761L10.319 4.69861C10.5685 4.71861 10.6695 5.03011 10.4795 5.19261L8.37745 6.99361C8.33818 7.0272 8.30892 7.07096 8.29286 7.12008C8.27681 7.16921 8.27459 7.2218 8.28645 7.27211L8.92895 9.96461C8.94187 10.0186 8.93848 10.0753 8.91923 10.1274C8.89997 10.1795 8.86571 10.2247 8.82077 10.2573C8.77583 10.2899 8.72222 10.3085 8.66673 10.3107C8.61123 10.3129 8.55632 10.2986 8.50895 10.2696L6.14645 8.82711C6.10232 8.80021 6.05164 8.78598 5.99995 8.78598C5.94827 8.78598 5.89759 8.80021 5.85345 8.82711L3.49095 10.2701C3.44358 10.2991 3.38868 10.3134 3.33318 10.3112C3.27768 10.309 3.22408 10.2904 3.17914 10.2578C3.1342 10.2252 3.09993 10.18 3.08068 10.1279C3.06142 10.0758 3.05804 10.0191 3.07095 9.96511L3.71345 7.27211C3.72537 7.22181 3.72318 7.16919 3.70712 7.12006C3.69107 7.07092 3.66177 7.02717 3.62245 6.99361L1.52045 5.19261C1.47836 5.15641 1.44791 5.10858 1.43293 5.05512C1.41795 5.00167 1.41911 4.94498 1.43626 4.89218C1.45342 4.83938 1.4858 4.79283 1.52934 4.75839C1.57287 4.72395 1.62562 4.70315 1.68095 4.69861L4.43995 4.47761C4.49158 4.47348 4.54106 4.4552 4.58297 4.42476C4.62487 4.39433 4.65756 4.35292 4.67745 4.30511L5.73995 1.74961Z"
										stroke="#5C6168"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</g>
							</svg>
							<span>Favorites (3)</span>
						</span> */}
						<span className={` ${classes.contact_sorting}`}>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="fill / sorting">
									<g id="Vector">
										<path
											d="M1.33337 3.33341C1.33337 2.96522 1.63185 2.66675 2.00004 2.66675H14C14.3682 2.66675 14.6667 2.96522 14.6667 3.33341V4.66675C14.6667 5.03494 14.3682 5.33341 14 5.33341H2.00004C1.63185 5.33341 1.33337 5.03494 1.33337 4.66675V3.33341Z"
											fill="#6C7A8B"
										/>
										<path
											d="M2.66671 7.33341C2.66671 6.96522 2.96518 6.66675 3.33337 6.66675H12.6667C13.0349 6.66675 13.3334 6.96522 13.3334 7.33341V8.66675C13.3334 9.03494 13.0349 9.33341 12.6667 9.33341H3.33337C2.96518 9.33341 2.66671 9.03494 2.66671 8.66675V7.33341Z"
											fill="#6C7A8B"
										/>
										<path
											d="M6.00004 10.6667C5.63185 10.6667 5.33337 10.9652 5.33337 11.3334V12.6667C5.33337 13.0349 5.63185 13.3334 6.00004 13.3334H10C10.3682 13.3334 10.6667 13.0349 10.6667 12.6667V11.3334C10.6667 10.9652 10.3682 10.6667 10 10.6667H6.00004Z"
											fill="#6C7A8B"
										/>
									</g>
								</g>
							</svg>
						</span>
					</p>
				</div>
				{/* favourite contact  */}
				<div>{sortedContactLists?.map((item) => <ContactCard contactData={item} key={item.id} />)}</div>

				{/* frquently contact heading  */}
				<div>
					<p className={`caption_2 ${classes.contact_favorites}`}>
						<span>
							<span>Frequently Contacted</span>
						</span>
					</p>
				</div>

				{/* frequently contact  */}
				<div>
					<ContactCard />
				</div>
				{/* namewise contact heading  */}
				<div>
					<p className={`caption_2 ${classes.contact_favorites}`}>
						<span>
							<span>A</span>
						</span>
					</p>
				</div>

				{/* frequently contact  */}
				<div>
					<ContactCard />
				</div>
			</div>
		</div>
	);
};

export default ContactList;
