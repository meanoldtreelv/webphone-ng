import styles from "./Members.module.scss";
import MemberCard from "../MemberCard";
import UserMultiIcon from "./../../../components/UI/Icons/User/UserMulti";

const Members = () => {
	return (
		<div className={styles.members}>
			<div className={styles.membersHead}>
				<div>
					<UserMultiIcon />
				</div>
				<span>Members (9)</span>
			</div>
			<div className={styles.groupMembers}>
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
				<MemberCard />
			</div>
		</div>
	);
};

export default Members;
