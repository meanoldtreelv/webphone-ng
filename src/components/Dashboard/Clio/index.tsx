import React, { useState } from "react";
import styles from "./Clio.module.scss";
import ChevronUpIcon from "components/UI/Icons/Navigation/ChevronUp";

const Clio = () => {
	const [clio, setClio] = useState(false);
	return (
		<div className={`${styles.clio} ${clio && styles.clio_active}`}>
			<div className={styles.dropdown}>
				<span>Call/Connector</span>
				<span
					className={`${styles.chevron} ${clio && styles.active}`}
					onClick={() => {
						setClio(!clio);
					}}>
					<ChevronUpIcon />
				</span>
			</div>
		</div>
	);
};

export default Clio;
