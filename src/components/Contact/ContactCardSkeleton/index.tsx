import React from "react";
import styles from "./ContactCardSkeleton.module.scss";
import SuitcaseIcon from "./../../../components/UI/Icons/Suitcase";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "hooks/useTheme";

const ContactCardSkeleton = () => {
	const theme = useTheme();
	return (
		<button className={styles.contact}>
			<div className={styles.contact_circle}>
				<Skeleton
					height={35}
					width={35}
					borderRadius={100}
					highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
					baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
				/>
			</div>
			<div className={styles.contact_name}>
				<span>
					<Skeleton
						highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
						baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
					/>
				</span>

				<div>
					<Skeleton
						highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
						baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
					/>
				</div>
			</div>
		</button>
	);
};

export default ContactCardSkeleton;
