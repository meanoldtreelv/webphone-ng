import React from "react";
import styles from "./Matter.module.scss";
import ChevronRightIcon from "components/UI/Icons/Navigation/ChevronRight";
import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";

import { Link } from "react-router-dom";
import EditIcon from "components/UI/Icons/ClioIcon/Edit";

const Matter = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.matter}>
				<div>
					<h4>00132 - Live free or pie, LLC</h4>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
						repellendus aliquid saepe eaque dolorem.
					</p>
				</div>
				<span className={styles.arrow_right}>
					<ChevronRightIcon />
				</span>
			</div>
			<div className={styles.matter}>
				<div>
					<h4>00132 - Live free or pie, LLC</h4>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
						repellendus aliquid saepe eaque dolorem.
					</p>
				</div>
				<span className={styles.arrow_right}>
					<ChevronRightIcon />
				</span>
			</div>
			<div className={styles.matter}>
				<div>
					<h4>00132 - Live free or pie, LLC</h4>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
						repellendus aliquid saepe eaque dolorem.
					</p>
				</div>
				<span className={styles.arrow_right}>
					<ChevronRightIcon />
				</span>
			</div>

			<div className={styles.matter_details}>
				<div className={styles.matter_name}>
					<div className={styles.left}>
						<span className={styles.chevron}>
							<ChevronLeftIcon />
						</span>

						<span className={styles.name}>00132 - Live free or pie, LLC</span>
					</div>
					<Link to={"/"} className={styles.seeDetails}>
						<EditIcon />
						<span>See Details</span>
					</Link>
				</div>
				<div className={styles.box}>
					<div className={styles.heading}>
						<span>Matter Details</span>
					</div>
					<div className={styles.contact_details}>
						<div>
							<label htmlFor="">Matter Status</label>
							<p>Open</p>
						</div>
						<div>
							<label htmlFor="">Matter Description</label>
							<p>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde provident sint vero, consectetur soluta
								in veniam earum
							</p>
						</div>
						<div>
							<label htmlFor="">Responsible Attorney</label>
							<p>Jenna wojcek</p>
						</div>
						<div>
							<label htmlFor="">Originating Attorney</label>
							<p>Rishit Patel</p>
						</div>
						<div>
							<label htmlFor="">Open Date</label>
							<p>2022-05-26</p>
						</div>
						<div>
							<label htmlFor="">Closed Date</label>
							<p>2022-05-26</p>
						</div>
						<div>
							<label htmlFor="">Pending Date</label>
							<p>2022-05-26</p>
						</div>
						<div>
							<label htmlFor="">Location</label>
							<p>North Bay, ON</p>
						</div>
						<div>
							<label htmlFor="">Practice Area</label>
							<p>Wills & Estates</p>
						</div>
					</div>
					<div className={styles.heading}>
						<span>Custom Fields</span>
					</div>
					<div className={styles.contact_details}>
						<div>
							<label htmlFor="phone">Trigger new Potential</label>
							<p>No</p>
						</div>
						<div>
							<label htmlFor="">New Client</label>
							<p>No</p>
						</div>
						<div>
							<label htmlFor="">Zoho Deal ID</label>
							<p>132165</p>
						</div>
						<div>
							<label htmlFor="">Expected Revenue</label>
							<p>1,00,0000</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Matter;
