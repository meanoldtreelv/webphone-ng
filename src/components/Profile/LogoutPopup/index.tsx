import InfoIcon from "components/UI/Icons/Info";
import styles from "./LogoutPopUp.module.scss";

const LogoutPopUp = () => {
	return (
		<section className={styles.popUp}>
			<div className={styles.popUp_box}>
				<div className={styles.popUp_text}>
					<InfoIcon />
					<h4>Logout ?</h4>
					<p>Are you sure that you want to logout ?</p>
				</div>
				<div className={styles.popUp_button}>
					<button className={styles.btnCancel}>Cancel</button>
					<button className={styles.btnConfirm}>Logout</button>
				</div>
			</div>
		</section>
	);
};

export default LogoutPopUp;
