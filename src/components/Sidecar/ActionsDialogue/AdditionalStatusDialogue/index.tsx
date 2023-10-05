import Backdrop from "components/UI/Backdrop";
import React from "react";
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
import styles from "../MainStatusDialogue/MainStatusDialogue.module.scss";
import Status2Icon from "components/UI/Icons/Sidecar/Status2";
import OnCall from "components/Sidecar/Status/OnCall";
import InMeeting from "components/Sidecar/Status/InMeeting";
import AFK from "components/Sidecar/Status/AFK";
import Holiday from "components/Sidecar/Status/Holiday";
import OnLunch from "components/Sidecar/Status/OnLunch";

const AdditionalStatusDialogue = () => {
	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<Status2Icon />
						<span>Additional Status</span>
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
						<OnCall />
						<OnLunch />

						<AFK />
						<Holiday />
						<span className={styles.plusIcon}>
							<PlusIcon />
						</span>
					</span>
					{/* <ChooseStatus2 /> */}
				</div>

				<div className={styles.toStatus}>
					<span>To Status:</span>
					<span>
						<InMeeting />
						<span className={styles.plusIcon}>
							<PlusIcon />
						</span>
					</span>
					{/* <ChooseStatus2 /> */}
				</div>

				<div className={styles.btnBox}>
					<button>Add Action</button>
				</div>
			</div>
		</>
	);
};

export default AdditionalStatusDialogue;
