import styles from "./StartConference.module.scss";

import noContactsImg from './../../../assets/images/icon/no_contacts.svg'
import PlusIcon from "components/UI/Icons/Plus";

const StartConference = () => {
	return (
		<section className={styles.noContact}>
			<div className={styles.noContact_box}>
				<img src={noContactsImg} alt="" />
				<div className={`title_3_bold`} style={{ color: "var(--text-primary, #1F2023)" }}>
					Start or join a conference call
				</div>
				{/* <div className={`body`} style={{ color: "var(--text-secondary, #5C6168)" }}>
					When you have contacts you’ll see them here
				</div> */}

				<span className={`body_bold ${styles.button}`} style={{ color: "var(--text-on-color, #FFF)" }}>
					<PlusIcon />
					<span>Create Conference</span>
				</span>
			</div>
		</section>
	);
};

export default StartConference;
