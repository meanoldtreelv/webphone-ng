import styles from "./RecentHistoryCardSkeleton.module.scss";
import ContactProfile from "components/UI/ContactProfile";
import CallOutgoingIcon from "./../../../components/UI/Icons/Call/CallOutgoing";
import Skeleton from "react-loading-skeleton";

const RecentHistoryCardSkeleton = () => (
	<button className={styles.historyCard}>
		<div className={styles.cardLeft}>
			<div className={styles.cardLeft_circle}>
					<Skeleton height={35} width={35} borderRadius={100} />
			</div>
			<div className={styles.cardLeft_right}>
				<p>
					<Skeleton />
				</p>
				<div>
					<span>
						<Skeleton />
					</span>
					<span className={`caption_1`}>
						<Skeleton />
					</span>
				</div>
			</div>
		</div>
		<div className={styles.cardRight}>
			<p>
				<Skeleton />
			</p>
			<p>
				<Skeleton />
			</p>
		</div>
	</button>
);

export default RecentHistoryCardSkeleton;
