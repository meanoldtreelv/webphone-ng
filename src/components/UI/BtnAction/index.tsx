import styles from "./BtnAction.module.scss";
import { MouseEvent, ReactNode } from "react";

interface BtnActionProps {
	btnType: "normal" | "danger";
	isDisabled: boolean;
	type?: "button" | "submit" | "reset";
	icon?: ReactNode;
	onClick?: (event: MouseEvent<HTMLElement>) => void;
	onMouseOver?: (event: MouseEvent<HTMLElement>) => void;
	onMouseOut?: (event: MouseEvent<HTMLElement>) => void;
	isActive?: boolean;
	restProps?: any;
}

const BtnAction = ({
	btnType,
	isDisabled,
	type,
	icon,
	onClick,
	onMouseOver,
	onMouseOut,
	isActive,
	...restProps
}: BtnActionProps) => {
	return (
		<button
			className={`${styles.button} ${btnType === "normal" && !isDisabled && styles.normal} ${
				btnType === "normal" && isDisabled && styles.disabled
			} ${btnType === "danger" && !isDisabled && styles.danger} ${
				btnType === "danger" && isDisabled && styles.disabled
			} ${btnType === "normal" && isActive && styles.normal_active} ${
				btnType === "danger" && isActive && styles.danger_active
			}`}
			disabled={isDisabled}
			type={type}
			onClick={onClick}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}>
			{icon}
		</button>
	);
};

export default BtnAction;
