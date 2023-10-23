import React from "react";
import XIcon from "../Icons/X";
import styles from "./BottomSheet.module.scss";

interface IBottomSheet {
	children: React.ReactNode;
}

const BottomSheet: React.FC<IBottomSheet> = ({ children }) => (
	<div className={styles.bottomSheet}>
		<div>
			<div className={styles.dropBack}></div>
			<div className={styles.bottomSheet_main}>
				<div className={styles.bottomSheet_header}>
					<button>
						<XIcon />
					</button>
				</div>

				<div>{children}</div>
			</div>
		</div>
	</div>
);

export default BottomSheet;
