import { ClipLoader } from "react-spinners";
import styles from "./BtnLarge.module.scss";
import { MouseEvent, ReactNode } from "react";

interface BtnLargeProps {
	btnType: "primary" | "secondary";
	isDanger: boolean;
	isDisabled: boolean;
	type?: "button" | "submit" | "reset";
	btnText?: string;
	icon?: ReactNode;
	onClick?: (event: MouseEvent<HTMLElement>) => void;
	isLoading?: boolean;
	restProps?: any;
}

const BtnLarge = ({
	btnType,
	isDanger,
	isDisabled,
	type,
	btnText,
	icon,
	onClick,
	isLoading,
	...restProps
}: BtnLargeProps) => {
	return (
		<button
			className={`${styles.button} ${btnType === "primary" && isDanger === false && styles.primary} ${
				btnType === "secondary" && isDanger === false && styles.secondary
			} ${btnType === "primary" && isDanger === true && styles.primary_danger}  ${
				btnType === "secondary" && isDanger === true && styles.secondary_danger
			} ${btnType === "primary" && isDisabled === true && styles.primary_disabled} ${
				btnType === "secondary" && isDisabled === true && styles.secondary_disabled
			} `}
			disabled={isDisabled}
			type={type}
			onClick={onClick}>
			{icon}
			{btnText}
			{isLoading && <ClipLoader color="var(--text-on-color)" size={"14px"} />}
		</button>
	);
};

export default BtnLarge;
