import React, { useState } from "react";
import styles from "./QueuesCard.module.scss";
import { toSecMinAndHr } from "helpers/formatDateTime";
import AvailableIcon from "components/UI/Icons/Status/Available";

const QueuesCard = ({ queuesData }) => {
	const [cardActive, setCardActive] = useState(false);
	return (
		<div
			className={styles.card}
			onClick={() => {
				setCardActive(!cardActive);
			}}>
			<div className={styles.cardData}>
				<span>{queuesData.name}</span>
				<span>{queuesData.calls}</span>
				<span>{toSecMinAndHr(queuesData.holdtime)}</span>
				<span>{queuesData.members.length}</span>
				<span>0</span>
			</div>
			{cardActive && (
				<>
					{queuesData?.members?.map((item) => (
						<div>
							<span>{item.name}</span>
							<span>{item.membership}</span>
							<span>{item.status === "available" && <AvailableIcon />}</span>
						</div>
					))}

					<div>
						<span>10010</span>
						<span>Jim sweere</span>
						<span>
							<AvailableIcon />
						</span>
					</div>
				</>
			)}
		</div>
	);
};

export default QueuesCard;
