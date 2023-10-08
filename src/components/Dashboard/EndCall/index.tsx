import { useEffect } from "react";
import styles from "./EndCall.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { dialPad } from "redux/call/callSlice";

import dummyProfileImg from "./../../../assets/images/img/dummy/profile.png";
import { callEnding } from "redux/call/callSelectors";
import { store } from "redux/store";

const EndCall = ({ name, callTimer }: {name: string, callTimer: string}) => {
	const dispatch = useDispatch();
	useEffect(() => {
		setTimeout(() => {
			store.dispatch({type:"sip/endCall"})
		}, 1000);
	});
	return (
		<div className={styles.endCall}>
			{false ? (
				<img src={dummyProfileImg} alt="" className={styles.backgroundImg} />
			) : (
				<div className={styles.backgroundColor}></div>
			)}
			{/* {false && (
        <img
          src={dummyProfileImg}
          alt=""
          className={styles.backgroundImg}
        />
      )}

      {true && (
        <div
          className={styles.backgroundColor}
          style={{ backgroundColor: "var(--accent-blue-tertiary, #ECF5FE)" }}
        ></div>
      )} */}

			<div className={styles.endBox}>
				<div className={styles.profile}>
					{false ? (
						<span>
							<img src={dummyProfileImg} alt="" />
						</span>
					) : (
						<span>SG</span>
					)}
				</div>
				<p className={styles.name}>{name}</p>
				<p className={styles.callend}>Call Ended</p>
				<p className={styles.timer}>{callTimer}</p>
			</div>
		</div>
	);
};

export default EndCall;
