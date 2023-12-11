import { emptyFunction } from "../../../utils";
import styles from "./OnOffSwitch.module.scss";

interface SwitchProps {
	type?: any;
	restProps?: any;
	onClick?: React.MouseEventHandler<HTMLInputElement>;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	name?: string;
	checked?: boolean;
}

function OnOffSwitch({
	onClick,
	onChange,
	type = "checkbox",
	name = "",
	checked = false,
	...restProps
}: SwitchProps) {
	return (
		<label className={styles.switch}>
			<input onClick={onClick} onChange={onChange} checked={checked} type={type} {...restProps} />
			<span className={`${styles.slider} ${styles.round}`}></span>
		</label>
	);
}

export default OnOffSwitch;
