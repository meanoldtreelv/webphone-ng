import React from "react";
import styles from "./ContactCardSkeleton.module.scss";
import SuitcaseIcon from "./../../../components/UI/Icons/Suitcase";
import Skeleton from "react-loading-skeleton";

const ContactCardSkeleton = () => (
	<button
		className={styles.contact}>
		<div className={styles.contact_circle}>
			<Skeleton height={35} width={35} borderRadius={100} />
		</div>
		<div className={styles.contact_name}>
			<span>
				<Skeleton />
			</span>

			<div>
				<Skeleton />
			</div>
		</div>
	</button>
);

export default ContactCardSkeleton;
