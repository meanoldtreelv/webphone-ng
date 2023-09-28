import styles from "./GroupCard.module.scss";
import UserGroupIcon from "components/UI/Icons/User/UserGroup";
import UserIcon from "components/UI/Icons/User/UserSingle";

const GroupCard = () => (
	<div className={styles.historyCard}>
		<div className={styles.historyCard_circle}>
			<span>
				<UserGroupIcon />
			</span>
		</div>
		<div className={styles.historyCard_info}>
			<p>Team Group</p>
			<div className={styles.cardInfoDesc}>
				<div>
					<div className={styles.userIcon}>
						<UserIcon />
					</div>

					<span className={styles.descCount}>7</span>
				</div>
				<span className={styles.descText}>Conference group for our team...</span>
			</div>
		</div>
	</div>
);

export default GroupCard;
