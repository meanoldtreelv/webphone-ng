import styles from "./NoInternet.module.scss";
import iconImg from "./../../../assets/images/img/no_voicemails.png";

const NoInternet = () => {
	return (
		<section className={styles.noVoice}>
			<span>
				<img src={iconImg} alt="" />
			</span>
			<div className={styles.noVoice_boldText}>Connection Lost</div>
			<div className={styles.noVoice_text}>Please make sure that you are connected to the internet.</div>
		</section>
	);
};

export default NoInternet;
