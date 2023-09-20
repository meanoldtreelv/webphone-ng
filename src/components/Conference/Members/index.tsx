import styles from "./Members.module.scss";
import MemberCard from "../MemberCard";
import UserMultiIcon from "./../../../components/UI/Icons/User/UserMulti";

const Members = () => {
	return (
		<div className={styles.members}>
			<div className={`caption_2 flex gap-x-[2px] items-center ${styles.membersHead}`}>
				<span>
					<UserMultiIcon />
				</span>
                <span style={{color: "var(--text-secondary, #5C6168)", }}>Members(9)</span>
			</div>
            <div className={styles.groupMembers}>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
                <MemberCard/>
            </div>
		</div>
	);
};

export default Members;
