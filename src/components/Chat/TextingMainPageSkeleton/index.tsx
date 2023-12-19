import ContactCardSkeleton from "components/Contact/ContactCardSkeleton";
import styles from "./TextingMainPageSkeleton.module.scss";

const TextingMainPageSkeleton = () => {
	return (
		<div className={styles.page}>
			<div>
				{Array(16)
					.fill(null)
					.map((item, index) => (
						<ContactCardSkeleton key={index} />
					))}
			</div>
		</div>
	);
};

export default TextingMainPageSkeleton;
