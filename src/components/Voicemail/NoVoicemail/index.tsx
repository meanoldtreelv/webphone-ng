import styles from "./NoVoicemail.module.scss";

const NoVoicemail = () => {
	return (
		<section className={styles.noVoice}>
			<span>
				<img src="/img/no_voicemails.png" alt="" />
			</span>
			<div className={`title_3_bold ${styles.noVoice_boldText}`}>No Voicemails</div>
			<div className={`body ${styles.noVoice_text}`}>When you have voicemails you’ll see them here</div>
		</section>
	);
};

export default NoVoicemail;
