import React, { useState } from "react";
import styles from "./Clio.module.scss";
import ChevronUpIcon from "components/UI/Icons/Navigation/ChevronUp";
import ChevronRightIcon from "components/UI/Icons/Navigation/ChevronRight";
import ContactDetails from "components/Clio/ContactDetails";

const Clio = () => {
	const [clio, setClio] = useState(false);
	return (
		<div className={`${styles.clio} ${clio && styles.clio_active}`}>
			<div className={styles.dropdown}>
				<span>Clio/Connector</span>
				<span
					className={`${styles.chevron} ${clio && styles.active}`}
					onClick={() => {
						setClio(!clio);
					}}>
					<ChevronUpIcon />
				</span>
			</div>
			{false && (
				<div className={styles.clio_box}>
					<div className={styles.contactHeading}>Contacts (1)</div>
					<div className={styles.contact}>
						<div>
							<span className={styles.profile}>
								<img src="/img/dummy/girl.jpg" alt="" />
							</span>
							Sandra Pilon
						</div>

						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div className={styles.contact}>
						<div>
							<span className={styles.profile}>
								<img src="/img/dummy/girl.jpg" alt="" />
							</span>
							Sandra Pilon
						</div>

						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div className={styles.contact}>
						<div>
							<span className={styles.profile}>
								<img src="/img/dummy/girl.jpg" alt="" />
							</span>
							Sandra Pilon
						</div>

						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
				</div>
			)}
			<ContactDetails />
		</div>
	);
};

export default Clio;
