import { useState } from "react";
import styles from "./ConversationsHeader.module.scss";
import UserStatusIcon from "components/UI/Icons/UserStatus";
import DeleteIcon from "components/UI/Icons/Delete";
import CallIcon from "components/UI/Icons/ChatIcons/Call";
import InfoIcon from "components/UI/Icons/ChatIcons/Info";
import UserGroupIcon from "components/UI/Icons/User/UserGroup";

const ConversationsHeader = () => {
	const [deleteIconHover, setDeleteIconHover] = useState(false);
	const [isdeletePopUpTrue, setIsDeletePopUpTrue] = useState(false);

	return (
		<div className={styles.header}>
			<div className={styles.left}>
				{true ? (
					<span className={styles.initials}>
						MW
						<span>
							<UserStatusIcon />
						</span>
					</span>
				) : (
					<span className={styles.initials_group}>
						<UserGroupIcon />
					</span>
				)}

				<div className={styles.contact}>
					<span className={styles.name}>Shivam Gupta</span>
					{true && <span className={styles.number}>98765431323</span>}
				</div>
			</div>
			<div className={styles.right}>
				<span>
					<CallIcon />
				</span>
				<span>
					<InfoIcon />
				</span>
				<span
					onMouseOver={() => {
						setDeleteIconHover(true);
					}}
					onMouseOut={() => {
						setDeleteIconHover(false);
					}}
					onClick={() => {
						setIsDeletePopUpTrue(!isdeletePopUpTrue);
					}}
					className={`${styles.delete} ${isdeletePopUpTrue ? styles.delete_active : ""}`}>
					<DeleteIcon color={deleteIconHover || isdeletePopUpTrue ? "support-danger-default" : "icon-primary"} />
				</span>
			</div>
		</div>
	);
};

export default ConversationsHeader;
