import styles from "./StartConference.module.scss";

import noContactsImg from "./../../../assets/images/icon/no_contacts.svg";
import PlusIcon from "components/UI/Icons/Plus";

const StartConference = () => {
	return (
		<section className={styles.noContact}>
			<div className={styles.noContact_box}>
				<img src={noContactsImg} alt="" />
				<h1>Start or join a conference call</h1>
				{/* <div className={`body`} style={{ color: "var(--text-secondary, #5C6168)" }}>
					When you have contacts you’ll see them here
				</div> */}

				<button className={styles.button}>
					<PlusIcon />
					<span>Create Conference</span>
				</button>
			</div>
		</section>
	);
};

export default StartConference;
