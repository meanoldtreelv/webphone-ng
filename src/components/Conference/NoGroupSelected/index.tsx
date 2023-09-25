import styles from "./NoGroupSelected.module.scss";
import noSelectedImg from "./../../../assets/images/icon/no_selected.svg";

const NoGroupSelected = () => {
	return (
		<section className={styles.noContact}>
			<div className={styles.noContact_box}>
				<img src={noSelectedImg} alt="" />
				<h1 className={styles.noContact_head}>No Group Selected</h1>
				<p className={styles.noContact_info}>To view detailed info select a group from list</p>
			</div>
		</section>
	);
};

export default NoGroupSelected;
