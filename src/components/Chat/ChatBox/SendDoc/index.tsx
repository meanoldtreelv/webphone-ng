import styles from "./SendDoc.module.scss";
import DocImg from "../../../../assets/images/img/doc.svg";

const SendDoc = () => {
	return (
		<div className={styles.sendDoc}>
			<div>
				<span>
					<img src={DocImg} alt="" />
				</span>
				<span className={styles.details}>
					<span>Pricing sheet 2022.dox</span>
					<b>127 kb</b>
				</span>
			</div>
		</div>
	);
};

export default SendDoc;
