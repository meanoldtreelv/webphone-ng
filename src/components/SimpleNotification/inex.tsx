import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./SimpleNotification.module.scss";
import XIcon from "components/UI/Icons/X";
import { setSimpleNotification } from "redux/common/commonSlice";

interface ISimpleNotification {
	msg: string;
}

const SimpleNotification: React.FC<ISimpleNotification> = ({ msg }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setSimpleNotification(""));
          }, 3000);
          return () => clearTimeout(timer)
    }, []);

	return (
		<div className={styles.simpleNotification}>
			<p>{msg}</p>
			<button onClick={() => dispatch(setSimpleNotification(""))}>
				<XIcon stroke="white" />
			</button>
		</div>
	);
};

export default SimpleNotification;
