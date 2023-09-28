import styles from "./NoVoicemail.module.scss";
import iconImg from "./../../../assets/images/img/no_voicemails.png";

const NoVoicemail = () => {
	return (
		<section className={styles.noVoice}>
			<span>
				<img src={iconImg} alt="" />
			</span>
			<div className={styles.noVoice_boldText}>No Voicemails</div>
			<div className={styles.noVoice_text}>When you have voicemails you'll see them here</div>
		</section>
	);
};

export default NoVoicemail;
