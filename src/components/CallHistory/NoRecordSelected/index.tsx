import styles from "./NoRecordSelected.module.scss";

import noSelectedImg from "./../../../assets/images/icon/no_selected.svg";

const NoRecordSelected = () => {
	return (
		<section className={styles.noContact}>
			<div className={styles.noContact_box}>
				<img src={noSelectedImg} alt="" />
				<h3>No Record Selected</h3>
				<p>To view detailed info select a record item from the list</p>
			</div>
		</section>
	);
};

export default NoRecordSelected;
