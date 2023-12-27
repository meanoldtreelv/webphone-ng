import EditIcon from "components/UI/Icons/ChatIcons/Edit";
import styles from "./MoreMenuPopUp.module.scss";
import InfoIcon from "components/UI/Icons/ChatIcons/Info";
import { useDispatch, useSelector } from "react-redux";
import {
	setEditContact,
	setIsContactDetailsDialogueOpen,
	setIsEditContactDialogueOpen,
	setIsSettingDialogueOpen,
} from "redux/chat/chatSlice";
import { conversationData } from "redux/chat/chatSelectors";
import SettingsIcon from "components/UI/Icons/Sidebar/Settings";

const MoreMenuPopUp = () => {
	const dispatch = useDispatch();

	const conversationsData = useSelector(conversationData);

	return (
		<div className={styles.popUp}>
			{conversationsData?.conversation_type === "direct" && (
				<div
					onClick={() => {
						dispatch(setIsEditContactDialogueOpen(true));
						dispatch(setEditContact(conversationsData?.contactsinfo?.[0]));
					}}>
					<span>
						<EditIcon />
					</span>
					<span>Edit Contact</span>
				</div>
			)}

			<div
				onClick={() => {
					dispatch(setIsContactDetailsDialogueOpen(true));
				}}>
				<span>
					<InfoIcon />
				</span>
				<span>Details</span>
			</div>
			<div
				onClick={() => {
					dispatch(setIsSettingDialogueOpen(true));
				}}>
				<span>
					<SettingsIcon />
				</span>
				<span>Change your texting number</span>
			</div>
		</div>
	);
};

export default MoreMenuPopUp;
