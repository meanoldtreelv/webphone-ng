import { emptyFunction } from "../../../utils";
import classes from "./OnOffSwitch.module.scss";

interface SwitchProps {
	type?: any;
	restProps?: any;
	onClick?: () => void;
	onChange?: () => void;
	name?: string;
	checked?: boolean;
}

function OnOffSwitch({
	onClick = emptyFunction,
	onChange = emptyFunction,
	type = "checkbox",
	name = "",
	checked = false,
	...restProps
}: SwitchProps) {
	return (
		<label className={classes.switch}>
			<input onClick={onClick} onChange={onChange} checked={checked} type={type} {...restProps} />
			<span className={`${classes.slider} ${classes.round}`}></span>
		</label>
	);
}

export default OnOffSwitch;
