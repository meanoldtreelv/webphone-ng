import Backdrop from "components/UI/Backdrop";
import React from "react";
import styles from "./MainStatusDialogue.module.scss";
import StatusIcon from "components/UI/Icons/Sidecar/Status";
import CloseIcon from "components/UI/Icons/Close";
import OnOffSwitch from "components/UI/OnOffSwitch";
import PlusIcon from "components/UI/Icons/Sidecar/Plus";
import ChooseStatus from "components/Sidecar/ChooseStatus";
import Available from "components/Sidecar/Status/Available";
import DNDThisPhone from "components/Sidecar/Status/DNDThisPhone";
import DND from "components/Sidecar/Status/DND";
import Away from "components/Sidecar/Status/Away";
import ChooseStatus2 from "components/Sidecar/ChooseStatus2";

const MainStatusDialogue = () => {
	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<StatusIcon />
						<span>Main Status</span>
					</span>

					<span>
						<CloseIcon />
					</span>
				</h1>

				<div className={styles.toggleBox}>
					<span>Use as a toggle</span>
					<OnOffSwitch />
				</div>

				<div className={styles.fromStatus}>
					<span>From Status:</span>
					<span>
						<DNDThisPhone />
						<DND />
						<Available />
						<span className={styles.plusIcon}>
							<PlusIcon />
						</span>
					</span>
					<ChooseStatus />
				</div>

				<div className={styles.toStatus}>
					<span>To Status:</span>
					<span>
						<Away />
						<span className={styles.plusIcon}>
							<PlusIcon />
						</span>
					</span>
				</div>

				<div className={styles.btnBox}>
					<button>Add Action</button>
				</div>
			</div>
		</>
	);
};

export default MainStatusDialogue;
