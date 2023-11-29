const VolumeIcon = ({ color }: { color: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
			<path
				d="M8.20501 2.24981C8.91301 1.54106 10.125 2.04281 10.125 3.04481V14.9548C10.125 15.9568 8.91301 16.4586 8.20426 15.7498L4.82926 12.3748H3.38176C2.52601 12.3748 1.64326 11.8761 1.38751 10.9461C1.21576 10.3258 1.12501 9.67331 1.12501 8.99981C1.1242 8.34228 1.21199 7.68764 1.38601 7.05356C1.64251 6.12281 2.52526 5.62481 3.38101 5.62481H4.83001L8.20501 2.24981Z"
				fill={`var(--${color ? color : "icon-primary"})`}
			/>
			<path
				d="M14.3355 3.66481C14.1864 3.66481 14.0435 3.72397 13.938 3.82931C13.8327 3.93478 13.7735 4.07775 13.7735 4.22681C13.7735 4.37587 13.8327 4.51884 13.938 4.62431C14.5127 5.19888 14.9685 5.88102 15.2795 6.63178C15.5905 7.38253 15.7506 8.18719 15.7506 8.99981C15.7506 9.81243 15.5905 10.6171 15.2795 11.3678C14.9685 12.1186 14.5127 12.8007 13.938 13.3753C13.8827 13.4268 13.8384 13.4889 13.8077 13.5579C13.7769 13.6269 13.7604 13.7014 13.7591 13.7769C13.7577 13.8524 13.7716 13.9275 13.7999 13.9975C13.8282 14.0675 13.8703 14.1312 13.9237 14.1846C13.9771 14.238 14.0408 14.2801 14.1108 14.3084C14.1808 14.3367 14.2559 14.3506 14.3314 14.3493C14.4069 14.3479 14.4814 14.3314 14.5504 14.3006C14.6194 14.2699 14.6815 14.2256 14.733 14.1703C17.589 11.3143 17.589 6.68456 14.733 3.82931C14.6275 3.72397 14.4846 3.66481 14.3355 3.66481Z"
				fill={`var(--${color ? color : "icon-primary"})`}
			/>
			<path
				d="M12.1317 5.69544C12.0634 5.72373 12.0014 5.7652 11.9492 5.81747L11.9499 5.81822C11.8446 5.92369 11.7854 6.06665 11.7854 6.21572C11.7854 6.36478 11.8446 6.50775 11.9499 6.61322C12.2633 6.92662 12.5119 7.29868 12.6815 7.70815C12.8511 8.11763 12.9384 8.5565 12.9384 8.99972C12.9384 9.44293 12.8511 9.88181 12.6815 10.2913C12.5119 10.7008 12.2633 11.0728 11.9499 11.3862C11.8474 11.4923 11.7906 11.6343 11.7918 11.7818C11.793 11.9293 11.8521 12.0704 11.9564 12.1747C12.0606 12.2791 12.2017 12.3383 12.3492 12.3397C12.4967 12.341 12.6388 12.2844 12.7449 12.182C13.1628 11.7641 13.4944 11.268 13.7206 10.722C13.9468 10.176 14.0632 9.59073 14.0632 8.99972C14.0632 8.40871 13.9468 7.82348 13.7206 7.27747C13.4944 6.73145 13.1628 6.23534 12.7449 5.81747C12.6927 5.7652 12.6306 5.72373 12.5624 5.69544C12.4941 5.66715 12.4209 5.65259 12.347 5.65259C12.2731 5.65259 12.2 5.66715 12.1317 5.69544Z"
				fill={`var(--${color ? color : "icon-primary"})`}
			/>
		</svg>
	);
};

export default VolumeIcon;
