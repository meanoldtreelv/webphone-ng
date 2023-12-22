import styles from "./MeetSkeleton.module.scss";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "hooks/useTheme";

const MeetSkeleton = () => {
	const theme = useTheme();
	return (
		<button className={styles.skeleton}>
			<div>
				<Skeleton
					highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
					baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
				/>
			</div>
			<div>
				<Skeleton
					highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
					baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
				/>
			</div>
		</button>
	);
};

export default MeetSkeleton;
