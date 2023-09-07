import React from "react";
import classes from "./endCall.module.scss";

const EndCall = () => {
	return (
		<div className={classes.endCall}>
			{true ? (
				<img src="/img/dummy/profile.png" alt="" className={classes.backgroundImg} />
			) : (
				<div
					className={classes.backgroundColor}
					style={{ backgroundColor: "var(--accent-blue-tertiary, #ECF5FE)" }}></div>
			)}
			{/* {false && (
        <img
          src="/img/dummy/profile.png"
          alt=""
          className={classes.backgroundImg}
        />
      )}

      {true && (
        <div
          className={classes.backgroundColor}
          style={{ backgroundColor: "var(--accent-blue-tertiary, #ECF5FE)" }}
        ></div>
      )} */}

			<div className={classes.endBox}>
				<div className={`large_title ${classes.profile}`}>
					{false ? (
						<span>
							<img src="/img/dummy/profile.png" alt="" />
						</span>
					) : (
						<span>SG</span>
					)}
				</div>
				<p className={`title_1 ${classes.name}`} style={{ color: "var(--text-primary, #1F2023)" }}>
					Matt Wizz
				</p>
				<p className={`title_3 ${classes.callend}`} style={{ color: "var(--text-secondary, #5C6168)" }}>
					Call Ended
				</p>
				<p className={`body ${classes.timer}`} style={{ color: "var(--text-primary, #1F2023)" }}>
					03:45
				</p>
			</div>
		</div>
	);
};

export default EndCall;
