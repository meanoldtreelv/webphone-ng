import styles from "./CallConnectorWidget.module.scss";
import Backdrop from "components/UI/Backdrop";

const CallConnectorWidget = () => {
	return (
		<div className={styles.overlay}>
			{<Backdrop />}
			<div className={styles.clio}>
				<div>
					Call Connector <span></span>
				</div>
				<div>Contacts(1)</div>
				<div className={styles.contact}>
					<span>
						<img src="/img/dummy/profile-icon.png" alt=""></img>
					</span>
					Sandra Pilon
				</div>
			</div>
		</div>
	);
};

export default CallConnectorWidget;
