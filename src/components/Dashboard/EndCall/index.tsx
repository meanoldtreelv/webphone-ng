import { useEffect } from "react";
import styles from "./EndCall.module.scss";
import { useDispatch } from "react-redux";
import { dialPad } from "redux/call/callSlice";

import dummyProfileImg from './../../../assets/images/img/dummy/profile.png';

const EndCall = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		setTimeout(() => {
			dispatch(dialPad());
		}, 1000);
	});
	return (
		<div className={styles.endCall}>
			{false ? (
				<img src={dummyProfileImg} alt="" className={styles.backgroundImg} />
			) : (
				<div
					className={styles.backgroundColor}
					style={{ backgroundColor: "var(--accent-blue-tertiary, #ECF5FE)" }}></div>
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
				<div className={`large_title ${styles.profile}`}>
					{false ? (
						<span>
							<img src={dummyProfileImg} alt="" />
						</span>
					) : (
						<span>SG</span>
					)}
				</div>
				<p className={`title_1 ${styles.name}`} style={{ color: "var(--text-primary, #1F2023)" }}>
					Matt Wizz
				</p>
				<p className={`title_3 ${styles.callend}`} style={{ color: "var(--text-secondary, #5C6168)" }}>
					Call Ended
				</p>
				<p className={`body ${styles.timer}`} style={{ color: "var(--text-primary, #1F2023)" }}>
					03:45
				</p>
			</div>
		</div>
	);
};

export default EndCall;
