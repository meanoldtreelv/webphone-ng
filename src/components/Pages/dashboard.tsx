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
import { account_API, callerId_API, contacts_API, extension_API, instances_API, user_API } from "effects/apiEffect";
import Signal from "components/TinyComponents/Signal";
import LogoutPopUp from "components/Profile/LogoutPopUp";
import InboundCall from "components/shared/InboundCall";

const Dashboard = () => {
	useEffect(() => {
		const user_id = "bfea21d6-21bd-55c9-bda6-85529ce9d06f";
		const userID = "5ed668cd38d0350104cb8789";
		// instances_API(
		// 	(res: any) => {
		// 		console.log(res, "instances API retrieve");
		// 		if (res?.status?.code === 200) {
		// 			console.log("success in instances retrieve");
		// 		}
		// 	},
		// 	(err: any) => {
		// 		console.error(err, "err in instances retrieve");
		// 	},
		// );

		// account_API(
		// 	(res: any) => {
		// 		console.log(res, "account API retrieve");
		// 		if (res?.status?.code === 200) {
		// 			console.log("success in account retrieve");
		// 		}
		// 	},
		// 	(err: any) => {
		// 		console.error(err, "err in account retrieve");
		// 	},
		// );

		// contacts_API(
		// 	(res: any) => {
		// 		console.log(res, "contact API retrieve");
		// 		if (res?.status?.code === 200) {
		// 			console.log("success in contact retrieve");
		// 		}
		// 	},
		// 	(err: any) => {
		// 		console.error(err, "err in contact retrieve");
		// 	},
		// );

		extension_API(
			user_id,
			(res: any) => {
				console.log(res, "extension API retrieve");
				if (res?.status?.code === 200) {
					console.log("success in extension retrieve");
				}
			},
			(err: any) => {
				console.error(err, "err in extension retrieve");
			},
		);

		// callerId_API(
		// 	user_id,
		// 	(res: any) => {
		// 		console.log(res, "user API retrieve");
		// 		if (res?.status?.code === 200) {
		// 			console.log("success in user retrieve");
		// 		}
		// 	},
		// 	(err: any) => {
		// 		console.error(err, "err in user retrieve");
		// 	},
		// );

		user_API(
			userID,
			(res: any) => {
				console.log(res, "user API retrieve");
				if (res?.status?.code === 200) {
					console.log("success in user retrieve");
				}
			},
			(err: any) => {
				console.error(err, "err in user retrieve");
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
					{/* <Dialer /> */}
					{/* <VideoCall /> */}
					{/* <EndCall /> */}
					<div className={classes.dialpad}>
						<KeyPad />
					</div>
					{/* <AddCall /> */}
					{/* <TransferCall /> */}

					{/* <div className={classes.profileAndExtension}>
						<ProfileAndExtension />
						<Signal />
					</div> */}
				</section>
			</LayoutWrapper>
			{/* <StatusMenu /> */}
			{/* <AboutRingplan /> */}
			{/* {true && <EditExtension />} */}
			{/* <LogoutPopUp /> */}
			{/* <InboundCall /> */}
		</div>
	);
};

export default Dashboard;
