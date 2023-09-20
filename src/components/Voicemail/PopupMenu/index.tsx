import styles from "./PopupMenu.module.scss";

const PopupMenu = () => {
	return (
		<div className={`${styles.popup} w-[200px] rounded-[8px] border-2 border-[#C8D3E0] bg-white`}>
			<div
				className={`${styles.popup_row} flex items-center gap-x-2 border-b-[1px] border-[#E3EAF2] py-[11px] pl-[16px]`}>
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path
							d="M14 10C14 10.3536 13.8595 10.6928 13.6095 10.9428C13.3594 11.1929 13.0203 11.3333 12.6667 11.3333H4.66667L2 14V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V10Z"
							stroke="#6C7A8B"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
				<div className={`caption_1 ${styles.popup_rowText} ${styles.popup_sendMsg} `}>Send Message</div>
			</div>

			<div
				className={`${styles.popup_row} flex items-center gap-x-2 border-b-[1px] border-[#E3EAF2] py-[11px] pl-[16px]`}>
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path
							d="M2 3.99967H14M12.6667 3.99967V13.333C12.6667 13.9997 12 14.6663 11.3333 14.6663H4.66667C4 14.6663 3.33333 13.9997 3.33333 13.333V3.99967M5.33333 3.99967V2.66634C5.33333 1.99967 6 1.33301 6.66667 1.33301H9.33333C10 1.33301 10.6667 1.99967 10.6667 2.66634V3.99967M6.66667 7.33301V11.333M9.33333 7.33301V11.333"
							stroke="#EE3939"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
				<div className={`caption_1 ${styles.popup_rowText} ${styles.popup_delete}`}>Delete</div>
			</div>

			<div
				className={`${styles.popup_row} flex items-center gap-x-2 border-b-[1px] border-[#E3EAF2] py-[11px] pl-[16px]`}>
				<div className={` caption_1 ${styles.popup_share} ${styles.popup_rowText}`}>Share</div>
			</div>

			<div
				className={`${styles.popup_row} flex items-center gap-x-2 border-b-[1px] border-[#E3EAF2] py-[11px] pl-[16px]`}>
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
						<g clipPath="url(#clip0_2436_7081)">
							<path
								d="M8.79335 5.79202C9.22657 5.99886 9.60382 6.30664 9.89342 6.68951C10.183 7.07238 10.3765 7.51916 10.4576 7.99232C10.5388 8.46548 10.5052 8.9512 10.3596 9.40867C10.2141 9.86614 9.96093 10.282 9.62135 10.6214L6.62135 13.6213C6.05874 14.184 5.29567 14.5 4.50002 14.5C3.70436 14.5 2.9413 14.184 2.37869 13.6213C1.81607 13.0587 1.5 12.2957 1.5 11.5C1.5 10.7044 1.81607 9.9413 2.37869 9.37868L3.55002 8.20735M12.45 7.79268L13.6213 6.62135C14.184 6.05874 14.5 5.29567 14.5 4.50002C14.5 3.70436 14.184 2.9413 13.6213 2.37869C13.0587 1.81607 12.2957 1.5 11.5 1.5C10.7044 1.5 9.9413 1.81607 9.37868 2.37869L6.37868 5.37868C6.03911 5.71802 5.78593 6.13389 5.64041 6.59137C5.49488 7.04884 5.46127 7.53456 5.5424 8.00772C5.62352 8.48087 5.81701 8.92765 6.10661 9.31053C6.39621 9.6934 6.77347 10.0012 7.20669 10.208"
								stroke="#6C7A8B"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</g>
						<defs>
							<clipPath id="clip0_2436_7081">
								<rect width="16" height="16" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</span>
				<div className={` caption_1 ${styles.popup_rowText} ${styles.popup_copy}`}>Copy Link</div>
			</div>

			<div
				className={`${styles.popup_row} flex items-center gap-x-2 border-b-[1px] border-[##E3EAF2] py-[11px] pl-[16px]`}>
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path
							d="M10.5524 1.33301V3.66634C10.5524 4.40272 11.1494 4.99967 11.8858 4.99967H13.8858M5.66683 4.66629H3.66683C2.93045 4.66629 2.3335 5.26325 2.3335 5.99963V12.9996C2.3335 13.736 2.93045 14.333 3.66683 14.333H9.3335C10.0699 14.333 10.6668 13.736 10.6668 12.9996V11.6663M10.0002 1.33301H7.00016C6.26378 1.33301 5.66683 1.92996 5.66683 2.66634V10.333C5.66683 11.0693 6.26378 11.6663 7.00016 11.6663H12.5524C13.2888 11.6663 13.8858 11.0693 13.8858 10.333V5.21863C13.8858 4.865 13.7453 4.52587 13.4953 4.27582L10.943 1.72353C10.6929 1.47348 10.3538 1.33301 10.0002 1.33301Z"
							stroke="#6C7A8B"
							strokeWidth="1.5"
						/>
					</svg>
				</span>
				<div className={`caption_1 ${styles.popup_rowText} ${styles.popup_copyText}`}>Copy Text</div>
			</div>

			<div className={`${styles.popup_row} flex items-center gap-x-2 py-[11px] pl-[16px]`}>
				<span>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path
							d="M14.6668 4.66699L8.68683 8.46699C8.48101 8.59594 8.24304 8.66433 8.00016 8.66433C7.75729 8.66433 7.51932 8.59594 7.3135 8.46699L1.3335 4.66699M2.66683 2.66699H13.3335C14.0699 2.66699 14.6668 3.26395 14.6668 4.00033V12.0003C14.6668 12.7367 14.0699 13.3337 13.3335 13.3337H2.66683C1.93045 13.3337 1.3335 12.7367 1.3335 12.0003V4.00033C1.3335 3.26395 1.93045 2.66699 2.66683 2.66699Z"
							stroke="#6C7A8B"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
				<div className={`caption_1 ${styles.popup_rowText} ${styles.popup_email}`}>Share via Email</div>
			</div>
		</div>
	);
};

export default PopupMenu;
