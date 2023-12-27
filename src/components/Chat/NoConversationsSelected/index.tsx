import styles from "./NoConversationsSelected.module.scss";
import noSelectedImg from "./../../../assets/images/icon/no_selected.svg";
import BtnLarge from "components/UI/BtnLarge";
import QrCodeIcon from "components/UI/Icons/QrCode";
import BtnMedium from "components/UI/BtnMedium";
import BtnAction from "components/UI/BtnAction";
import ChatIcon from "components/UI/Icons/Chat";
import ChatFillIcon from "components/UI/Icons/ChatFill";
import { useState } from "react";

const NoConversationsSelected = () => {
	const [btnType, setBtnType] = useState<"normal" | "danger">("normal");
	const [btnHover, setBtnHover] = useState(false);
	const [btnActive, setBtnActive] = useState(false);
	const [btnDisabled, setBtnDisabled] = useState(false);
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
				{/* <BtnAction
					btnType={btnType}
					isDisabled={false}
					type="button"
					isActive={false}
					onMouseOut={() => {
						setBtnHover(false);
					}}
					onMouseOver={() => {
						setBtnHover(true);
					}}
					onClick={() => {
						setBtnActive(!btnActive);
					}}
					icon={
						<ChatFillIcon
							color={`${btnHover === false && btnActive === false ? "var(--icon-primary)" : ""} ${
								btnType === "normal" && btnHover === true ? "var(--primary-default)" : ""
							} ${btnType === "normal" && btnActive === true ? "var(--primary-default)" : ""} ${
								btnDisabled === true ? "var(--icon-disabled)" : ""
							}  ${btnType === "danger" && btnHover === true ? "var(--support-danger)" : ""} ${
								btnType === "danger" && btnActive === true ? "var(--support-danger)" : ""
							}`}
						/>
					}
				/> */}
			</div>
		</section>
	);
};

export default NoConversationsSelected;
