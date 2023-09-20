import styles from "./NoRecordSelected.module.scss";

import noSelectedImg from './../../../assets/images/icon/no_selected.svg';

const NoRecordSelected = () => {
	return (
		<section className={styles.noContact}>
			<div className={styles.noContact_box}>
				<img src={noSelectedImg} alt="" />
				<div className={`title_3_bold ${styles.noContact_head}`} style={{ color: "var(--text-primary, #1F2023)" }}>
					No Record Selected
				</div>
				<div className={`body ${styles.noContact_info}`} style={{ color: "var(--text-secondary, #5C6168)" }}>
					To view detailed info select a record item from the list
				</div>
			</div>
		</section>
	);
};

export default NoRecordSelected;
