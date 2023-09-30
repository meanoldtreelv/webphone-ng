import React from "react";
import styles from "./SidecarManage.module.scss";
import DeleteIcon from "components/UI/Icons/Delete";
import EditIcon from "components/UI/Icons/Edit";
import ActionBtnCard from "../ActionBtnCard";
const SidecarManage = () => {
	return (
		<div className={styles.body}>
			<h2>Buttons (4)</h2>
			<ActionBtnCard />
			<ActionBtnCard />
			<ActionBtnCard />
			<ActionBtnCard />
			<ActionBtnCard />
		</div>
	);
};

export default SidecarManage;
