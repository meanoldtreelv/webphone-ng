import styles from "./NoConversationsSelected.module.scss";
import noSelectedImg from "./../../../assets/images/icon/no_selected.svg";

const NoConversationsSelected = () => {
	return (
		<section className={styles.noContact}>
			<div className={styles.noContact_box}>
				<img src={noSelectedImg} alt="" />
				<h1>No Conversations Selected</h1>
				<p>Select a conversations to view details</p>
			</div>
		</section>
	);
};

export default NoConversationsSelected;
