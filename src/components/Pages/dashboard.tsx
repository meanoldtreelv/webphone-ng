import Dialpad from "components/Dashboard/Dialpad";
import LayoutWrapper from "components/LayoutWrapper";
import React, { useEffect } from "react";
import classes from "./dashboard.module.scss";
import ContactList from "components/shared/ContactList";
import ProfileAndExtension from "components/shared/ProfileAndExtension";
import StatusMenu from "components/Profile/StatusMenu";
import { relative } from "path";
import AboutRingplan from "components/Profile/AboutRingplan";
import Dialer from "components/Dashboard/Dialer";
import VideoCall from "components/Dashboard/VideoCall";
import EndCall from "components/Dashboard/EndCall";
import EditExtension from "components/Extension/EditExtension";
import KeyPad from "components/Dashboard/KeyPad";
import AddCall from "components/Dashboard/AddCall";
import TransferCall from "components/Dashboard/TransferCall";
import { account_API, instances_API } from "effects/apiEffect";

const Dashboard = () => {
	useEffect(() => {
		instances_API(
			(res: any) => {
				console.log(res, "instances API retrieve");
				if (res?.status?.code === 200) {
					console.log("success in instances retrieve");
				}
			},
			(err: any) => {
				console.error(err, "err in instances retrieve");
			},
		);

		account_API(
			(res: any) => {
				console.log(res, "account API retrieve");
				if (res?.status?.code === 200) {
					console.log("success in account retrieve");
				}
			},
			(err: any) => {
				console.error(err, "err in account retrieve");
			},
		);
	}, []);
	return (
		<div style={{ position: "relative", width: "100%", height: "100vh" }}>
			<LayoutWrapper>
				<section className={classes.dashboard}>
					<div className={classes.contact}>
						<ContactList />
					</div>
					<Dialer />
					{/* <VideoCall /> */}
					{/* <EndCall /> */}
					{/* <div className={classes.dialpad}>
						<KeyPad />
					</div> */}
					{/* <AddCall /> */}
					{/* <TransferCall /> */}

					<div className={classes.profileAndExtension}>
						<ProfileAndExtension />
					</div>
				</section>
			</LayoutWrapper>
			{/* <StatusMenu /> */}
			{/* <AboutRingplan /> */}
			{/* {true && <EditExtension />} */}
		</div>
	);
};

export default Dashboard;
