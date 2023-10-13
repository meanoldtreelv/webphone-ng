import React, { useState } from "react";
import styles from "./Queues.module.scss";
import QueuesCard from "../QueuesCard";
import { useGetAllQueuesQuery, useGetMyQueuesQuery } from "services/queues";
import { useGetExtensionsQuery } from "services/extension";

const Queues = () => {
	const [tabSelected, setTabSelected] = useState("all_queues");

	const { data: allQueues } = useGetAllQueuesQuery("1");
	// const { data: myQueues } = useGetMyQueuesQuery("5ed668cd38d0350104cb8789");

	// todo - remove hardcoded id
	const { data: extListData } = useGetExtensionsQuery("5ed668cd38d0350104cb8789");
	console.log(allQueues, "all quesues");

	function filterQueuesWithAllUserExtNum(userExtArr, queues) {
		const matchingElements = [];

		for (let i = 0; i < queues?.length; i++) {
			const q = queues[i];
			for (let j = 0; j < userExtArr?.length; j++) {
				const e = userExtArr[j];
				if (q?.number === e?.data?.extension) {
					matchingElements.push(q);
				}
			}
		}

		return matchingElements;
	}

	console.log(filterQueuesWithAllUserExtNum(extListData, allQueues), "my queues");

	const myQueues = filterQueuesWithAllUserExtNum(extListData, allQueues);

	return (
		<div className={styles.queues}>
			<div className={styles.header}>
				<span
					className={`${tabSelected === "all_queues" && styles.activeTab}`}
					onClick={() => {
						setTabSelected("all_queues");
					}}>
					All Queues
				</span>
				<span
					className={`${tabSelected === "my_queues" && styles.activeTab}`}
					onClick={() => {
						setTabSelected("my_queues");
					}}>
					My Queues
				</span>
			</div>
			<div className={styles.header2}>
				<span>Queues</span>
				<span>Calls</span>
				<span>Wait Time</span>
				<span>Agents</span>
				<span>Available</span>
			</div>

			<div className={styles.lists}>
				{tabSelected === "all_queues" && allQueues?.map((item) => <QueuesCard key={item._id} queuesData={item} />)}
				{tabSelected === "my_queues" && myQueues?.map((item) => <QueuesCard key={item._id} queuesData={item} />)}
			</div>
		</div>
	);
};

export default Queues;
