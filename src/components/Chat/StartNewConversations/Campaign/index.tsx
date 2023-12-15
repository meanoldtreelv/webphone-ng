import { useState } from "react";
import styles from "./Campaign.module.scss";
import ContactCard from "components/Contact/ContactCard";
import FromNumberPopUp from "../../FromNumberPopUp";
import ChevronDownIcon from "components/UI/Icons/ChatIcons/ChevronDown";
import UsersGroupIcon from "components/UI/Icons/ChatIcons/UsersGroup";
import PlusIcon from "components/UI/Icons/Plus";
import { useDispatch, useSelector } from "react-redux";
import { campaignMemberLists, fromNumberSelected } from "redux/chat/chatSelectors";
import {
	setAddedMemberLists,
	setIsAddMemberDialogueOpen,
	setIsStartNewConversationDialogueOpen,
} from "redux/chat/chatSlice";
import { useLazyCreateConversationObjectQuery } from "services/chat";
import { showToast } from "utils";
import BtnLarge from "components/UI/BtnLarge";

const Campaign = () => {
	const dispatch = useDispatch();
	const selectedFromNumber = useSelector(fromNumberSelected);
	const fromNumber = useSelector(fromNumberSelected);
	const campaignMemberList = useSelector(campaignMemberLists);

	const [createConversationObject, {}] = useLazyCreateConversationObjectQuery();

	const [isFromNumberPopUpOpen, setIsFromNumberPopUpOpen] = useState(false);
	const [isFromNumberHovered, setIsFromNumberHovered] = useState(false);
	const [campaignName, setCampaignName] = useState("");

	const createCampaignHandler = async () => {
		showToast("clicked", "info");
		if (campaignName.length === 0 && campaignMemberList.length < 2 && campaignMemberList?.length > 10) return;

		const recipients = campaignMemberList.map((item) => {
			return { number: item.number };
		});

		const { error, data } = await createConversationObject({
			recipients: recipients,
			from_number: fromNumber,
			conversation_type: "campaign",
			name: campaignName,
		});

		if (error) {
			showToast("something went wrong in creating campaign", "error");
		}
		if (data) {
			dispatch(setAddedMemberLists([]));
			dispatch(setIsStartNewConversationDialogueOpen(false));
		}
	};

	return (
		<>
			<div className={styles.from}>
				<span className={styles.left}>From Number</span>
				<span
					className={`${styles.right} ${isFromNumberHovered || isFromNumberPopUpOpen ? styles.active1 : ""}`}
					onMouseOver={() => {
						setIsFromNumberHovered(true);
					}}
					onMouseOut={() => {
						setIsFromNumberHovered(false);
					}}
					onClick={() => {
						setIsFromNumberPopUpOpen(!isFromNumberPopUpOpen);
					}}>
					{selectedFromNumber}
					<span className={`${isFromNumberPopUpOpen ? styles.active : ""}`}>
						<ChevronDownIcon color={`${isFromNumberHovered || isFromNumberPopUpOpen ? "text-link" : "text-primary"}`} />
					</span>
				</span>
				{isFromNumberPopUpOpen && <FromNumberPopUp />}
			</div>
			<div className={styles.input}>
				<input
					placeholder="Type campaign name here.."
					value={campaignName}
					onChange={(e) => {
						setCampaignName(e.target.value);
					}}
				/>
			</div>
			<div className={styles.contact}>
				<span>
					<UsersGroupIcon />
					<span>Members ({campaignMemberList?.length})</span>
				</span>
				{campaignMemberList?.length > 0 && (
					<div
						style={{ cursor: "pointer" }}
						onClick={() => {
							dispatch(setIsAddMemberDialogueOpen(true));
						}}>
						<PlusIcon />
					</div>
				)}
			</div>
			<div className={styles.memberBox}>
				{campaignMemberList?.length > 0 ? (
					<div>
						{campaignMemberList?.map((contact, idx) => (
							<ContactCard
								id={contact.id}
								first_name={contact.first_name}
								last_name={contact.last_name}
								phone={contact.number}
								key={idx}
							/>
						))}
					</div>
				) : (
					<div className={styles.startConversation}>
						<div>You don’t have any member here</div>
						<p>Follow this button to add members</p>
						<BtnLarge
							btnType={"primary"}
							isDanger={false}
							isDisabled={false}
							type="button"
							btnText="Add Member"
							icon={<PlusIcon color="icon-on-color" />}
							onClick={() => {
								dispatch(setIsAddMemberDialogueOpen(true));
							}}
						/>
						{/* <button
							onClick={() => {
								dispatch(setIsAddMemberDialogueOpen(true));
							}}>
							<PlusIcon color="icon-on-color" />
							<span>Add Member</span>
						</button> */}
					</div>
				)}
			</div>
			<div className={styles.footer}>
				<button
					className={`${
						campaignName && campaignMemberList?.length >= 2 && campaignMemberList?.length <= 10 && styles.active
					}`}
					onClick={createCampaignHandler}>
					Create Campaign
				</button>
			</div>
		</>
	);
};

export default Campaign;
