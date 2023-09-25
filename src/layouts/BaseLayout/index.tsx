import Sidebar from "../../components/shared/Sidebar";
import styles from "./BaseLayout.module.scss";
import ProgressCallPopUpBar from "../../components/Dashboard/ProgressCallPopup";

const BaseLayout = ({ children }: any) => {

	return (
		<div className={styles.wrapper}>
			<div className={styles.popUp} id="notification_bar">
				{/* <ProgressCallPopUpBar /> */}
			</div>
			<div>
				<div className={styles.sidebar}>
					<Sidebar />
				</div>

				<div className={styles.children}>{children}</div>
			</div>
		</div>
	);
};

export default BaseLayout;
