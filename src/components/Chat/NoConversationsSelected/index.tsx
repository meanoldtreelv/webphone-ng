import styles from "./NoConversationsSelected.module.scss";
import noSelectedImg from "./../../../assets/images/icon/no_selected.svg";
import BtnLarge from "components/UI/BtnLarge";
import QrCodeIcon from "components/UI/Icons/QrCode";
import BtnMedium from "components/UI/BtnMedium";

const NoConversationsSelected = () => {
	return (
		<section className={styles.noContact}>
			<div className={styles.noContact_box}>
				<img src={noSelectedImg} alt="" />
				<h1>No Conversations Selected</h1>
				<p>Select a conversations to view details</p>
				{/* <BtnLarge
					btnType={"primary"}
					isDanger={false}
					isDisabled={false}
					type="button"
					btnText=""
					icon={}
					onClick={}
				/> */}
				{/* <BtnMedium
					btnType={"primary"}
					isDanger={false}
					isDisabled={false}
					type="button"
					btnText=""
					icon={}
					onClick={}
				/> */}
			</div>
		</section>
	);
};

export default NoConversationsSelected;
