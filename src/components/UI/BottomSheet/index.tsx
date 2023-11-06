import React, { useState } from "react";
import styles from "./BottomSheet.module.scss";
import ChevronDownIcon from "../Icons/Navigation/ChevronDown";
import EllipsisHorIcon from "../Icons/EllipsisHor";

interface IBottomSheet {
	children: React.ReactNode;
	close: (slider: boolean) => void;
	anim: boolean;
	moreBtns: {
		text: string;
		icon: React.ReactNode;
	}[];
}

const BottomSheet: React.FC<IBottomSheet> = ({ children, close, anim, moreBtns }) => {
	const [dispMore, setDispMore] = useState(false);

	return (
		<div className={styles.bottomSheet}>
			<div>
				<div className={styles.dropBack}></div>
				<div className={styles.bottomSheet_main}>
					<div className={styles.bottomSheet_header}>
						<button onClick={() => close(false)} className={styles.headerClose}>
							<ChevronDownIcon />
						</button>

						<div className={styles.headerMore_wrapper}>
							<button onClick={() => setDispMore((prevState) => !prevState)} className={styles.headerMore}>
								<EllipsisHorIcon />
							</button>

							{dispMore ? (
								<div className={styles.headerMore_content}>
									<div className={styles.content_backdrop} onClick={() => setDispMore(false)}></div>
									<div className={styles.content_main}>
										{moreBtns.map((btn) => (
											<button>
												{btn.icon}
												<span>{btn.text}</span>
											</button>
										))}
									</div>
								</div>
							) : null}
						</div>
					</div>

					<div>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default BottomSheet;
