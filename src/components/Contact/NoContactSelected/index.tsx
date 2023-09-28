import styles from "./NoContactSelected.module.scss";

import noSelectedImg from "./../../../assets/images/icon/no_selected.svg";

const NoContactSelected = () => {
	return (
		<section className={styles.noContact}>
			<div className={styles.noContact_box}>
				<img src={noSelectedImg} alt="" />
				<h1>No Contact Selected</h1>
				<p>Select a contact to view details</p>
			</div>
		</section>
	);
};

export default NoContactSelected;
