import React from "react";
import classes from "./transferCallCard.module.scss";

const TransferCallCard = () => {
	return (
		<div className={classes.transfer}>
			<div
				className={`caption_2`}
				style={{
					color: "var(--text-secondary, #5C6168)",
					borderBottom: "1px solid var(--border-tertiary, #E3EAF2)",
				}}>
				Transfer
			</div>

			<div
				className={`caption_1`}
				style={{
					color: "var(--text-primary, #1F2023)",
					borderBottom: "1px solid var(--border-tertiary, #E3EAF2)",
					cursor: "pointer",
				}}>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="line / transfer">
						<path
							id="Vector"
							d="M11.3333 7.33333L14 4.66667M14 4.66667L11.3333 2M14 4.66667H6M4.66667 14L2 11.3333M2 11.3333L4.66667 8.66667M2 11.3333H10"
							stroke="#6C7A8B"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</g>
				</svg>

				<span>Transfer Call</span>
			</div>
			<div className={`caption_1`} style={{ color: "var(--text-primary, #1F2023)", cursor: "pointer" }}>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="line / transfer_2">
						<path
							id="Vector"
							d="M11.3333 7.33333L14 4.66667M14 4.66667L11.3333 2M14 4.66667H6M4.66667 14L2 11.3333M2 11.3333L4.66667 8.66667M2 11.3333H10M12.8551 11.3333H12.7072"
							stroke="#6C7A8B"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</g>
				</svg>

				<span>Transfer Attended Call</span>
			</div>
		</div>
	);
};

export default TransferCallCard;
