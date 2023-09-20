import styles from "./NoContactSelected.module.scss";

import noSelectedImg from './../../../assets/images/icon/no_selected.svg';

const NoContactSelected = () => {
	return (
		<section className={styles.noContact}>
			<div className={styles.noContact_box}>
				<img src={noSelectedImg} alt="" />
				<div className={`title_3_bold`} style={{ color: "var(--text-primary, #1F2023)" }}>
					No Contact Selected
				</div>
				<div className={`body`} style={{ color: "var(--text-secondary, #5C6168)" }}>
					Select a contact to view details
				</div>
			</div>
		</section>
	);
};

export default NoContactSelected;
