import styles from "./VoicemailCard.module.scss";
import playIcon from "./../../../assets/images/icon/player-play.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VoicemailCardSkeleton = () => {
	return (
		<div className={styles.card}>
			<div className={styles.card_mainCont}>
				<div className={styles.card_cont1}>
					<button>
						<Skeleton />
					</button>

					<div className={styles.card_unread}>
						<Skeleton />
					</div>
					<p className={styles.card_name}>
						<Skeleton />
					</p>
				</div>

				<div className={styles.card_cont2}>
					<p className={styles.card_ext}>
						<Skeleton />
					</p>
					<p className={styles.card_duration}>
						<Skeleton />
					</p>
					<p className={styles.card_time}>
						<Skeleton />
					</p>
                    <p className={styles.card_time}>
						<Skeleton />
					</p>
				</div>
			</div>
		</div>
	);
};

export default VoicemailCardSkeleton;
