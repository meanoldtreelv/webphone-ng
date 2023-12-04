import styles from "./SelectedDoc.module.scss";
import DocIcon from "components/UI/Icons/ChatIcons/Doc";
import CrossIcon from "components/UI/Icons/ChatIcons/Cross";

const SelectedDoc = () => {
	return (
		<div className={styles.selectedDoc}>
			<DocIcon />
			<b>Pricing sheet 2023.dox</b>
			<span>
				<CrossIcon color="icon-on-color" />
			</span>
		</div>
	);
};

export default SelectedDoc;
