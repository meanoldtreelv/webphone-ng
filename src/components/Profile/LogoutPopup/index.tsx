import InfoIcon from "components/UI/Icons/Info";
import styles from "./LogoutPopUp.module.scss";
import { store } from "redux/store";
import sip from "lib/sip";

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
					<button className={styles.btnCancel} onClick={()=>{store.dispatch({type:"sip/logoutPopUp", payload:false})}}>Cancel</button>
					<button className={styles.btnConfirm} onClick={sip.logout}>Logout</button>
				</div>
			</div>
		</section>
	);
};

export default LogoutPopUp;
