import styles from "./NoVoicemailSearch.module.scss";
import iconImg from "./../../../assets/images/img/no_voicemails.png";

const NoVoicemailSearch = ({ str }: { str: string }) => {
	return (
		<section className={styles.noVoice}>
			<span>
				<img src={iconImg} alt="" />
			</span>
			<div className={styles.noVoice_boldText}>No Voicemails Found</div>
			<div className={styles.noVoice_text}>There is no voicemail by the name {str}</div>
		</section>
	);
};

export default NoVoicemailSearch;
