import React from "react";
import style from "./voicemailFooter.module.scss";
import ShareBtnPopup from "../ShareBtnPopup";

const VoicemailFooter = () => {
	return (
		<div className={style.footer}>
			<div className={style.cont}>
				{/* <ShareBtnPopup></ShareBtnPopup> */}
				<div className={style.footer_actionBtn}>
					<span className={style.footer_action}>
						<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M18 32.3008C25.898 32.3008 32.3 25.8988 32.3001 18.0008C32.3001 10.1028 25.8981 3.70078 18.0001 3.70078C10.102 3.70078 3.70005 10.1028 3.70005 18.0008C3.70005 25.8988 10.102 32.3008 18 32.3008ZM23.8724 22.6136L18.0285 19.2742C17.0432 18.7112 17.0432 17.2904 18.0285 16.7274L23.8724 13.3881C24.8501 12.8293 26.0667 13.5353 26.0667 14.6615L26.0667 21.3401C26.0667 22.4663 24.8501 23.1723 23.8724 22.6136ZM15.0724 22.6136L9.22854 19.2742C8.24321 18.7112 8.24321 17.2904 9.22854 16.7274L15.0724 13.3881C16.0501 12.8293 17.2667 13.5353 17.2667 14.6615L17.2667 21.3401C17.2667 22.4663 16.0501 23.1723 15.0724 22.6136Z"
								fill="#C8D3E0"
							/>
						</svg>
					</span>
					<span className={style.footer_action}>
						<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M18.0001 3.7002C10.1021 3.7002 3.70007 10.1022 3.70007 18.0002C3.70007 25.8982 10.1021 32.3002 18.0001 32.3002C25.8981 32.3002 32.3001 25.8982 32.3001 18.0002C32.3001 10.1022 25.8981 3.7002 18.0001 3.7002ZM12.1334 13.6002C12.1334 12.7902 12.7901 12.1335 13.6001 12.1335H15.0667C15.8768 12.1335 16.5334 12.7902 16.5334 13.6002V22.4002C16.5334 23.2102 15.8768 23.8669 15.0667 23.8669H13.6001C12.7901 23.8669 12.1334 23.2102 12.1334 22.4002V13.6002ZM19.4667 13.6002C19.4667 12.7902 20.1234 12.1335 20.9334 12.1335H22.4001C23.2101 12.1335 23.8667 12.7902 23.8667 13.6002V22.4002C23.8667 23.2102 23.2101 23.8669 22.4001 23.8669H20.9334C20.1234 23.8669 19.4667 23.2102 19.4667 22.4002V13.6002Z"
								fill="#0C6DC7"
							/>
						</svg>
					</span>
					<span className={style.footer_action}>
						<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M18.0001 3.7002C10.1021 3.7002 3.70007 10.1022 3.70007 18.0002C3.70007 25.8982 10.1021 32.3002 18.0001 32.3002C25.8981 32.3002 32.3001 25.8982 32.3001 18.0002C32.3001 10.1022 25.8981 3.7002 18.0001 3.7002ZM12.1277 13.3874L17.9716 16.7267C18.9569 17.2898 18.9569 18.7105 17.9716 19.2736L12.1277 22.6129C11.15 23.1716 9.93341 22.4656 9.93341 21.3395V14.6608C9.93341 13.5347 11.15 12.8287 12.1277 13.3874ZM20.9277 13.3874L26.7716 16.7267C27.7569 17.2898 27.7569 18.7105 26.7716 19.2736L20.9277 22.6129C19.95 23.1716 18.7334 22.4656 18.7334 21.3395V14.6608C18.7334 13.5347 19.95 12.8287 20.9277 13.3874Z"
								fill="#0C6DC7"
							/>
						</svg>
					</span>
				</div>

				<div className={style.footer_progressBar}>
					<div className={style.footer_progress}></div>
					<div className={style.footer_cont}>
						<div className={style.footer_details}>
							<div className={`caption_1 ${style.footer_name}`} style={{color:"var(--text-primary, #1F2023)"}}>Melisa Townsend</div>
							<div className={style.footer_dat}>
								<div className={`caption_1 ${style.footer_month}`} style={{color:"var(--text-secondary, #5C6168)"}}> March</div>
								<div className={`caption_1 ${style.footer_date}`} style={{color:"var(--text-secondary, #5C6168)"}}>12,</div>
								<div className={`caption_1 ${style.footer_year}`} style={{color:"var(--text-secondary, #5C6168)"}}>2023</div>
								<div className={`caption_1 ${style.footer_time}`} style={{color:"var(--text-secondary, #5C6168)"}}>10:33</div>
								<div className={`caption_1 ${style.footer_morning}`} style={{color:"var(--text-secondary, #5C6168)"}}>AM</div>
							</div>
						</div>

						<div className={style.footer_duration}>
							<div className={`caption_1 ${style.footer_currentprogress}`} style={{color:"var(--text-primary, #1F2023)"}}>00:12 / </div>
							<div className={`caption_1 ${style.footer_totalDuration}`} style={{color:"var(--text-primary, #1F2023)"}}>0:15</div>
						</div>
					</div>
				</div>

				<div className={style.footer_otherBtns}>
					<span className={style.footer_shareBtn}>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M11.8125 3.37519C11.8124 2.85216 11.9946 2.34545 12.3277 1.94218C12.6608 1.53891 13.1239 1.26428 13.6376 1.1655C14.1512 1.06671 14.6832 1.14996 15.1421 1.40091C15.601 1.65187 15.9581 2.05486 16.1521 2.5406C16.346 3.02633 16.3647 3.56447 16.2049 4.06249C16.0451 4.56051 15.7168 4.9873 15.2764 5.26947C14.836 5.55165 14.311 5.67159 13.7918 5.60866C13.2726 5.54574 12.7915 5.30389 12.4312 4.92469L6.11549 8.43394C6.21198 8.80527 6.21198 9.1951 6.11549 9.56644L12.4312 13.0757C12.8087 12.6789 13.3179 12.4333 13.8634 12.3851C14.409 12.3368 14.9534 12.4892 15.3946 12.8137C15.8358 13.1382 16.1435 13.6124 16.26 14.1475C16.3766 14.6826 16.294 15.2419 16.0277 15.7204C15.7613 16.199 15.3296 16.564 14.8135 16.747C14.2973 16.93 13.7321 16.9185 13.2238 16.7145C12.7155 16.5106 12.2991 16.1283 12.0525 15.6393C11.8059 15.1503 11.7462 14.5881 11.8845 14.0582L5.56874 10.5497C5.25888 10.8759 4.85832 11.1018 4.4188 11.1981C3.97928 11.2944 3.52099 11.2566 3.10311 11.0898C2.68524 10.923 2.32697 10.6347 2.0746 10.2622C1.82222 9.88974 1.68732 9.45013 1.68732 9.00019C1.68732 8.55025 1.82222 8.11064 2.0746 7.73814C2.32697 7.36564 2.68524 7.07737 3.10311 6.91055C3.52099 6.74373 3.97928 6.70603 4.4188 6.80231C4.85832 6.8986 5.25888 7.12444 5.56874 7.45069L11.8845 3.94144C11.8365 3.75651 11.8124 3.56623 11.8125 3.37519Z"
								fill="#6C7A8B"
							/>
						</svg>
					</span>
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M8.835 1.5H9.165C9.56283 1.5 9.94436 1.65804 10.2257 1.93934C10.507 2.22064 10.665 2.60218 10.665 3V3.135C10.6653 3.39804 10.7347 3.65639 10.8663 3.88413C10.998 4.11186 11.1872 4.30098 11.415 4.4325L11.7375 4.62C11.9655 4.75165 12.2242 4.82096 12.4875 4.82096C12.7508 4.82096 13.0095 4.75165 13.2375 4.62L13.35 4.56C13.6942 4.36145 14.1031 4.30758 14.487 4.41023C14.8709 4.51288 15.1983 4.76365 15.3975 5.1075L15.5625 5.3925C15.7611 5.7367 15.8149 6.14562 15.7123 6.5295C15.6096 6.91337 15.3588 7.24084 15.015 7.44L14.9025 7.5075C14.6736 7.63966 14.4837 7.82995 14.352 8.05912C14.2203 8.28829 14.1515 8.54819 14.1525 8.8125V9.1875C14.1515 9.45181 14.2203 9.71171 14.352 9.94088C14.4837 10.17 14.6736 10.3603 14.9025 10.4925L15.015 10.5525C15.3588 10.7517 15.6096 11.0791 15.7123 11.463C15.8149 11.8469 15.7611 12.2558 15.5625 12.6L15.3975 12.8925C15.1983 13.2363 14.8709 13.4871 14.487 13.5898C14.1031 13.6924 13.6942 13.6386 13.35 13.44L13.2375 13.38C13.0095 13.2483 12.7508 13.179 12.4875 13.179C12.2242 13.179 11.9655 13.2483 11.7375 13.38L11.415 13.5675C11.1872 13.699 10.998 13.8881 10.8663 14.1159C10.7347 14.3436 10.6653 14.602 10.665 14.865V15C10.665 15.3978 10.507 15.7794 10.2257 16.0607C9.94436 16.342 9.56283 16.5 9.165 16.5H8.835C8.43718 16.5 8.05565 16.342 7.77434 16.0607C7.49304 15.7794 7.335 15.3978 7.335 15V14.865C7.33473 14.602 7.26529 14.3436 7.13366 14.1159C7.00202 13.8881 6.8128 13.699 6.585 13.5675L6.2625 13.38C6.03447 13.2483 5.77581 13.179 5.5125 13.179C5.2492 13.179 4.99053 13.2483 4.7625 13.38L4.65 13.44C4.3058 13.6386 3.89688 13.6924 3.513 13.5898C3.12913 13.4871 2.80166 13.2363 2.6025 12.8925L2.4375 12.6075C2.23895 12.2633 2.18508 11.8544 2.28773 11.4705C2.39038 11.0866 2.64115 10.7592 2.985 10.56L3.0975 10.4925C3.32641 10.3603 3.51633 10.17 3.64803 9.94088C3.77974 9.71171 3.84855 9.45181 3.8475 9.1875V8.805C3.84592 8.54323 3.77586 8.28643 3.64429 8.06012C3.51272 7.83382 3.32421 7.64588 3.0975 7.515L2.985 7.44C2.64115 7.24084 2.39038 6.91337 2.28773 6.5295C2.18508 6.14562 2.23895 5.7367 2.4375 5.3925L2.6025 5.1075C2.80166 4.76365 3.12913 4.51288 3.513 4.41023C3.89688 4.30758 4.3058 4.36145 4.65 4.56L4.7625 4.62C4.99053 4.75165 5.2492 4.82096 5.5125 4.82096C5.77581 4.82096 6.03447 4.75165 6.2625 4.62L6.585 4.4325C6.8128 4.30098 7.00202 4.11186 7.13366 3.88413C7.26529 3.65639 7.33473 3.39804 7.335 3.135V3C7.335 2.60218 7.49304 2.22064 7.77434 1.93934C8.05565 1.65804 8.43718 1.5 8.835 1.5ZM11.25 8.99982C11.25 10.2425 10.2426 11.2498 9 11.2498C7.75736 11.2498 6.75 10.2425 6.75 8.99982C6.75 7.75718 7.75736 6.74982 9 6.74982C10.2426 6.74982 11.25 7.75718 11.25 8.99982Z"
								fill="#6C7A8B"
							/>
						</svg>
					</span>
				</div>
			</div>
		</div>
	);
};

export default VoicemailFooter;
