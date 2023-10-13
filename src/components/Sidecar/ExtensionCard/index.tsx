import React from "react";
import styles from "./ExtensionCard.module.scss";
import StatusBarIcon from "components/UI/Icons/Status/StatusBar";
import CalenderIcon from "components/UI/Icons/Status/Calender";

const ExtensionCard = ({ extensionData }) => {
	// console.log("====================================");
	// console.log(extensionData);
	// console.log("====================================");
	return (
		<div className={styles.card}>
			<div className={styles.innerCard}>
				<h1>
					<StatusBarIcon />
					<span>{extensionData?.data?.name}</span>
					{/* <span>{extensionData?.outbound_callerid?.name}</span> */}
					{/* <CalenderIcon /> */}
				</h1>
				<p>{extensionData?.data?.extension}</p>
			</div>
		</div>
	);
};

export default ExtensionCard;
