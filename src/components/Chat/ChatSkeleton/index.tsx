import styles from "./ChatSkeleton.module.scss";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "hooks/useTheme";

const ChatSkeleton = () => {
	const theme = useTheme();
	return (
		<button className={styles.msg}>
			<div className={styles.msg_receive}>
				<div>
					<Skeleton
						highlightColor={theme === "light-mode" ? "#f5f5f5" : "var(--background-primary)"}
						baseColor={theme === "light-mode" ? "#ebebeb" : "var(--background-tertiary)"}
					/>
				</div>
			</div>
			<div className={styles.msg_send}>
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

export default ChatSkeleton;
