import { IIcon } from "constants/interfaces";

const DeleteIcon = ({ color }: IIcon) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill={`var(--${color ? color : "icon-primary"})`}>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M11 2.98533V3.13666C11.866 3.21585 12.7285 3.32972 13.5853 3.478C13.65 3.4892 13.7119 3.51304 13.7674 3.54815C13.8229 3.58327 13.8709 3.62896 13.9087 3.68263C13.9465 3.73631 13.9734 3.7969 13.9878 3.86096C14.0022 3.92503 14.0039 3.9913 13.9927 4.056C13.9815 4.12069 13.9576 4.18255 13.9225 4.23804C13.8874 4.29352 13.8417 4.34155 13.788 4.37937C13.7344 4.41719 13.6738 4.44408 13.6097 4.45848C13.5456 4.47289 13.4794 4.47454 13.4147 4.46333L13.2753 4.44L12.6053 13.1533C12.5667 13.6557 12.3399 14.125 11.9702 14.4674C11.6005 14.8098 11.1152 15 10.6113 15H5.38934C4.88547 15 4.40017 14.8098 4.03049 14.4674C3.6608 14.125 3.43397 13.6557 3.39534 13.1533L2.72467 4.44L2.58534 4.46333C2.52064 4.47454 2.45437 4.47289 2.39031 4.45848C2.32625 4.44408 2.26565 4.41719 2.21198 4.37937C2.10358 4.30298 2.02997 4.18666 2.00734 4.056C1.98471 3.92533 2.01491 3.79103 2.0913 3.68263C2.16769 3.57424 2.28401 3.50063 2.41467 3.478C3.27152 3.32955 4.13399 3.21568 5 3.13666V2.98533C5 1.94266 5.80867 1.052 6.87734 1.018C7.62581 0.994042 8.37486 0.994042 9.12334 1.018C10.192 1.052 11 1.94266 11 2.98533ZM6.90934 2.01733C7.63649 1.99407 8.36419 1.99407 9.09134 2.01733C9.59334 2.03333 10 2.456 10 2.98533V3.06066C8.6679 2.97976 7.33211 2.97976 6 3.06066V2.98533C6 2.456 6.406 2.03333 6.90934 2.01733ZM6.67267 5.98066C6.67013 5.915 6.65469 5.85048 6.62721 5.79079C6.59974 5.7311 6.56078 5.67741 6.51255 5.63277C6.46433 5.58814 6.40779 5.55344 6.34615 5.53066C6.28452 5.50788 6.219 5.49746 6.15334 5.5C6.08768 5.50253 6.02316 5.51798 5.96347 5.54545C5.90378 5.57293 5.85008 5.61189 5.80545 5.66011C5.76081 5.70834 5.72611 5.76488 5.70333 5.82652C5.68055 5.88815 5.67013 5.95367 5.67267 6.01933L5.904 12.0193C5.90913 12.1518 5.96669 12.2769 6.06402 12.367C6.11222 12.4116 6.16873 12.4463 6.23032 12.469C6.29191 12.4918 6.35739 12.5022 6.423 12.4997C6.48862 12.4971 6.5531 12.4817 6.61275 12.4542C6.6724 12.4268 6.72606 12.3878 6.77066 12.3396C6.81526 12.2914 6.84994 12.2349 6.8727 12.1733C6.89547 12.1118 6.90588 12.0463 6.90334 11.9807L6.67267 5.98066ZM10.326 6.01933C10.3309 5.95241 10.3223 5.88519 10.3006 5.82167C10.279 5.75815 10.2448 5.69964 10.2001 5.64962C10.1553 5.5996 10.101 5.5591 10.0403 5.53052C9.97957 5.50194 9.91373 5.48588 9.84668 5.48328C9.77963 5.48069 9.71274 5.49161 9.65 5.51541C9.58726 5.53921 9.52996 5.57539 9.4815 5.6218C9.43304 5.66821 9.39441 5.72391 9.36793 5.78556C9.34144 5.84721 9.32764 5.91356 9.32734 5.98066L9.096 11.9807C9.09088 12.1133 9.13864 12.2425 9.22878 12.3399C9.31892 12.4373 9.44406 12.4949 9.57667 12.5C9.70928 12.5051 9.83849 12.4574 9.93589 12.3672C10.0333 12.2771 10.0909 12.1519 10.096 12.0193L10.326 6.01933Z"
			fill={`var(--${color ? color : "icon-primary"})`}
		/>
	</svg>
);

export default DeleteIcon;
