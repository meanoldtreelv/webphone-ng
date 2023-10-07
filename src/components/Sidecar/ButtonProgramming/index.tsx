import Backdrop from "components/UI/Backdrop";
import React from "react";
import styles from "./ButtonProgramming.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import PlusIcon from "components/UI/Icons/Plus";
import Button from "components/UI/Forms/Button";
import DialActionCard from "../Actions/Dial";
import PauseActionCard from "../Actions/Pause";
import TransferActionCard from "../Actions/Transfer";
import MergeActionCard from "../Actions/Merge";
import HangupActionCard from "../Actions/Hangup";
import KeypressActionCard from "../Actions/Keypress";
import HoldActionCard from "../Actions/Hold";
import SendMessageActionCard from "../Actions/SendMessage";
import MainStatusActionCard from "../Actions/MainStatus";
import AdditionalStatusActionCard from "../Actions/AdditionalStatus";

const ButtonProgramming = () => {
	return (
		<>
			<Backdrop />
			<div className={styles.buttonProgramming}>
				<h1 className={styles.topHeading}>
					<span>Button Programming</span>
					<span>
						<CloseIcon />
					</span>
				</h1>
				<div className={styles.btmSection}>
					<div>
						<h2>General</h2>
						<div className={styles.inputBox}>
							<label htmlFor="">Action Name</label>
							<input type="text" placeholder="button 1" />
						</div>

						<div className={styles.inputBox}>
							<label htmlFor="">Watch Extension</label>
							<input type="text" placeholder="" />
						</div>
					</div>
					<div className={styles.actionsBox}>
						<h2>
							<span>Actions</span>
							<span className={styles.blueIcon}>
								<PlusIcon />
							</span>
						</h2>
						<div className={styles.noAction}>
							<h3>You don’t any actions here</h3>
							<p>Click on Add Action to add an action</p>
						</div>
						<div className={styles.actionBox}>
							<DialActionCard />
							<PauseActionCard />
							<TransferActionCard />
							<MergeActionCard />
							<HangupActionCard />
							<KeypressActionCard />
							<HoldActionCard />
							<SendMessageActionCard />
							<MainStatusActionCard />
							<AdditionalStatusActionCard />
						</div>
					</div>
				</div>
				<div className={styles.btnBox}>
					<button>Save</button>
				</div>
			</div>
		</>
	);
};

export default ButtonProgramming;
