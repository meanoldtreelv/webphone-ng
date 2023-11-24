import styles from "./RecentHistoryCardSkeleton.module.scss";
import ContactProfile from "components/UI/ContactProfile";
import CallOutgoingIcon from "./../../../components/UI/Icons/Call/CallOutgoing";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "hooks/useTheme";

const RecentHistoryCardSkeleton = () => {
	const theme = useTheme();

	return (
		<button className={styles.historyCard}>
			<div className={styles.cardLeft}>
				<div className={styles.cardLeft_circle}>
					<Skeleton
						height={35}
						width={35}
						borderRadius={100}
						highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
						baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
					/>
				</div>
				<div className={styles.cardLeft_right}>
					<p>
						<Skeleton
							highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
							baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
							height={17}
						/>
					</p>
					<div>
						<span>
							<Skeleton
								highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
								baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
								height={17}
							/>
						</span>
						<span className={`caption_1`}>
							<Skeleton
								highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
								baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
								height={17}
							/>
						</span>
					</div>
				</div>
			</div>
			<div className={styles.cardRight}>
				<p>
					<Skeleton
						highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
						baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
						height={17}
					/>
				</p>
				<p className={styles.cardRight_btm}>
					<Skeleton
						highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
						baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
						height={17}
					/>
				</p>
			</div>
		</button>
	);
};

export default RecentHistoryCardSkeleton;
