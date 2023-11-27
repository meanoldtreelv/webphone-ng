import CrossIcon from "components/UI/Icons/ChatIcons/Cross";
import styles from "./SelectedImg.module.scss";

const SelectedImg = () => {
	return (
		<div className={styles.selectedImg}>
			<img src="/img/dummy/photo.jpg" alt="" />
			<span>
				<CrossIcon />
			</span>
		</div>
	);
};

export default SelectedImg;
