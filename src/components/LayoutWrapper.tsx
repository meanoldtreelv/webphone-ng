import React from "react";
import Sidebar from "./shared/Sidebar";
import classes from "./layoutWrapper.module.scss";
import ProgressCallPopUpBar from "./Dashboard/ProgressCallPopUpBar";

const LayoutWrapper = ({ children }: any) => {
	return (
		<div className={classes.wrapper}>
			<div className={classes.popUp} id="notification_bar">
				<ProgressCallPopUpBar />
			</div>
			<div>
				<div className={classes.sidebar}>
					<Sidebar />
				</div>

				<div className={classes.children}>{children}</div>
			</div>
		</div>
	);
};

export default LayoutWrapper;
