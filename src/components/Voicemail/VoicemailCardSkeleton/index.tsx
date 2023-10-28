import styles from "./VoicemailCard.module.scss";
import playIcon from "./../../../assets/images/icon/player-play.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "hooks/useTheme";

const VoicemailCardSkeleton = () => {
	const theme = useTheme();

	return (
		<div className={styles.card}>
			<div className={styles.card_mainCont}>
				<div className={styles.card_cont1}>
					<button>
						<Skeleton
							highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
							baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
						/>
					</button>

					<div className={styles.card_unread}>
						<Skeleton
							highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
							baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
						/>
					</div>
					<p className={styles.card_name}>
						<Skeleton
							highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
							baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
						/>
					</p>
				</div>

				<div className={styles.card_cont2}>
					<p className={styles.card_ext}>
						<Skeleton
							highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
							baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
						/>
					</p>
					<p className={styles.card_duration}>
						<Skeleton
							highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
							baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
						/>
					</p>
					<p className={styles.card_time}>
						<Skeleton
							highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
							baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
						/>
					</p>
					<p className={styles.card_time}>
						<Skeleton
							highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
							baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
						/>
					</p>
				</div>
			</div>
		</div>
	);
};

export default VoicemailCardSkeleton;
