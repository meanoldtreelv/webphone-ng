import { useState } from "react";
import styles from "./Group.module.scss";
import ContactCard from "components/Contact/ContactCard";
import FromNumberPopUp from "../../FromNumberPopUp";
import ChevronDownIcon from "components/UI/Icons/ChatIcons/ChevronDown";
import UsersGroupIcon from "components/UI/Icons/ChatIcons/UsersGroup";
import PlusIcon from "components/UI/Icons/Plus";
import { useDispatch, useSelector } from "react-redux";
import { addedMemberLists, fromNumberSelected } from "redux/chat/chatSelectors";
import {
	setAddedMemberLists,
	setIsAddMemberDialogueOpen,
	setIsStartNewConversationDialogueOpen,
} from "redux/chat/chatSlice";
import { useLazyCreateConversationObjectQuery } from "services/chat";
import { showToast } from "utils";
import BtnLarge from "components/UI/BtnLarge";

const Group = () => {
	const dispatch = useDispatch();
	const selectedFromNumber = useSelector(fromNumberSelected);
	const memberLists = useSelector(addedMemberLists);
	const fromNumber = useSelector(fromNumberSelected);

	const [createConversationObject, {}] = useLazyCreateConversationObjectQuery();

	const [isFromNumberPopUpOpen, setIsFromNumberPopUpOpen] = useState(false);
	const [isFromNumberHovered, setIsFromNumberHovered] = useState(false);
	const [groupName, setGroupName] = useState("");

	const createGroupHandler = async () => {
		if (groupName.length === 0 && memberLists.length < 2 && memberLists?.length > 10) return;

		const recipients = memberLists.map((item) => {
			return { number: item.number };
		});

		const { error, data } = await createConversationObject({
			recipients: recipients,
			from_number: fromNumber,
			conversation_type: "group",
			name: groupName,
		});

		if (error) {
			showToast("something went wrong in creating group", "error");
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
					placeholder="Type group name here.."
					value={groupName}
					onChange={(e) => {
						setGroupName(e.target.value);
					}}
				/>
			</div>
			<div className={styles.contact}>
				<span>
					<UsersGroupIcon />
					<span>Members ({memberLists?.length})</span>
				</span>
				{memberLists?.length > 0 && (
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
				{memberLists?.length > 0 ? (
					<div>
						{memberLists?.map((contact, idx) => (
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
					className={`${groupName && memberLists?.length >= 2 && memberLists?.length <= 10 && styles.active}`}
					onClick={createGroupHandler}>
					Create Group
				</button>
			</div>
		</>
	);
};

export default Group;
