import BaseLayout from "layouts/BaseLayout";
import styles from "./Sidecar.module.scss";
import SidecarSidebar from "components/Sidecar/SidecarSidebar";
import Header from "components/Sidecar/Header";
import SidecarManage from "components/Sidecar/SidecarManage";
import ButtonProgramming from "components/Sidecar/ButtonProgramming";
import ChooseActions from "components/Sidecar/ChooseActions";
import PauseDialogue from "components/Sidecar/ActionsDialogue/PauseDialogue";
import DialDialogue from "components/Sidecar/ActionsDialogue/DialDialogue";
import MainStatusDialogue from "components/Sidecar/ActionsDialogue/MainStatusDialogue";
import AdditionalStatusDialogue from "components/Sidecar/ActionsDialogue/AdditionalStatusDialogue";
import SendMessageDialogue from "components/Sidecar/ActionsDialogue/SendMessageDialogue";
import KeypressDialogue from "components/Sidecar/ActionsDialogue/KeypressDialogue";
import TransferDialogue from "components/Sidecar/ActionsDialogue/TransferDialogue";
import PromptDialog from "components/Modal/PromptDialog";

const Sidecar = () => {
	const deleteActionBtnHandler = () => {};
	return (
		<div className={styles.sidecar}>
			<BaseLayout>
				<section className={styles.sidecarManage}>
					<Header />
					<SidecarManage />
				</section>
			</BaseLayout>
			{/* <SidecarSidebar /> */}
			{/* <ButtonProgramming /> */}
			{/* <ChooseActions /> */}
			{/* <PauseDialogue /> */}
			{/* <DialDialogue /> */}
			{/* <MainStatusDialogue /> */}
			{/* <AdditionalStatusDialogue /> */}
			{/* <SendMessageDialogue /> */}
			{/* <KeypressDialogue /> */}
			{/* <TransferDialogue /> */}
			{/* <PromptDialog type="warning" title="Delete Action" actionBtnTxt="Delete" onClick={deleteActionBtnHandler}>
				Are you sure that you want to delete Transfer action from the button?
			</PromptDialog> */}
		</div>
	);
};

export default Sidecar;
