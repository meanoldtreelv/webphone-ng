import Dialpad from "../../components/Dashboard/Dialpad";
import { useEffect } from "react";
import styles from "./Dashboard.module.scss";
import ContactList from "../../components/Contact/ContactList";
import ProfileAndExtension from "../../components/shared/ProfileAndExtension";
import StatusMenu from "../../components/Profile/StatusMenu";
import { relative } from "path";
import AboutRingplan from "../../components/Profile/AboutRingplan";
import Dialer from "../../components/Dashboard/Dialer";
import VideoCall from "../../components/Dashboard/VideoCall";
import EndCall from "../../components/Dashboard/EndCall";
import EditExtension from "../../components/Extension";
import KeyPad from "../../components/Dashboard/Keypad";
import AddCall from "../../components/Dashboard/AddCall";
import TransferCall from "../../components/Dashboard/TransferCall";
import Signal from "../../components/TinyComponents/Signal";
import LogoutPopUp from "../../components/Profile/LogoutPopup";
import InboundCall from "../../components/shared/InboundCall";
import {
	GET_Contact_List_API,
	// account_API,
	// callerId_API,
	// extension_API,
	// instances_API,
	// user_API,
} from "./../../effects/apiEffect";

import { useDispatch, useSelector } from "react-redux";
import BaseLayout from "./../../layouts/BaseLayout";
import { addCall, callDailer, callEnding, callInProgress, transferCall } from "./../../redux/call/callSelectors";
import { setContactList } from "./../../redux/contact/contactSlice";
import { contactLists } from "./../../redux/contact/contactSelectors";
import DTMF from "components/Dashboard/DTMF";

const Dashboard = () => {
	const dispatch = useDispatch();

	const isDialerActive = useSelector(callDailer);
	const isCallInProgress = useSelector(callInProgress);
	const isCallTransfer = useSelector(transferCall);
	const isCallAdded = useSelector(addCall);
	const isCallEnded = useSelector(callEnding);
	const { ringingInboundCalls, answeredCalls, ringingOutboundCalls } = useSelector((state: any) => state.sip)

	// useEffect(() => {
	// 	const user_id = "bfea21d6-21bd-55c9-bda6-85529ce9d06f";
	// 	const userID = "5ed668cd38d0350104cb8789";
	// 	// instances_API(
	// 	// 	(res: any) => {
	// 	// 		console.log(res, "instances API retrieve");
	// 	// 		if (res?.status?.code === 200) {
	// 	// 			console.log("success in instances retrieve");
	// 	// 		}
	// 	// 	},
	// 	// 	(err: any) => {
	// 	// 		console.error(err, "err in instances retrieve");
	// 	// 	},
	// 	// );

	// 	// account_API(
	// 	// 	(res: any) => {
	// 	// 		console.log(res, "account API retrieve");
	// 	// 		if (res?.status === 200) {
	// 	// 			console.log("success in account retrieve");
	// 	// 		}
	// 	// 	},
	// 	// 	(err: any) => {
	// 	// 		console.error(err, "err in account retrieve");
	// 	// 	},
	// 	// );

	// 	// GET_Contact_List_API(
	// 	// 	(res: any) => {
	// 	// 		console.log(res, "contact API retrieve");
	// 	// 		if (res?.status === 200) {
	// 	// 			console.log("success in contact retrieve");
	// 	// 		}
	// 	// 	},
	// 	// 	(err: any) => {
	// 	// 		console.error(err, "err in contact retrieve");
	// 	// 	},
	// 	// );

	// 	// extension_API(
	// 	// 	user_id,
	// 	// 	(res: any) => {
	// 	// 		console.log(res, "extension API retrieve");
	// 	// 		if (res?.status?.code === 200) {
	// 	// 			console.log("success in extension retrieve");
	// 	// 		}
	// 	// 	},
	// 	// 	(err: any) => {
	// 	// 		console.error(err, "err in extension retrieve");
	// 	// 	},
	// 	// );

	// 	// callerId_API(
	// 	// 	user_id,
	// 	// 	(res: any) => {
	// 	// 		console.log(res, "user API retrieve");
	// 	// 		if (res?.status?.code === 200) {
	// 	// 			console.log("success in user retrieve");
	// 	// 		}
	// 	// 	},
	// 	// 	(err: any) => {
	// 	// 		console.error(err, "err in user retrieve");
	// 	// 	},
	// 	// );

	// 	// user_API(
	// 	// 	userID,
	// 	// 	(res: any) => {
	// 	// 		console.log(res, "user API retrieve");
	// 	// 		if (res?.status?.code === 200) {
	// 	// 			console.log("success in user retrieve");
	// 	// 		}
	// 	// 	},
	// 	// 	(err: any) => {
	// 	// 		console.error(err, "err in user retrieve");
	// 	// 	},
	// 	// );
	// }, []);
	return (
		<div className={styles.dashboardWrapper}>
			<BaseLayout>
				<section className={styles.dashboard}>
					{/* this is a contact list components which is shown besides Sidebar  */}
					<div className={styles.contact}>
						{/* <ContactList /> */}
					</div>

					{/* This is a dial pad components for calling */}
					{
						answeredCalls.length < 1 && ringingOutboundCalls.length < 1 ? (
							<div className={styles.dialpad}>
								<KeyPad />
							</div>
						) : null
					}

					{/* When call is in progress this component will be shown  */}
					{/* {isCallInProgress && <Dialer />} */}

					{ (answeredCalls.length > 0 || ringingOutboundCalls.length > 0) && !isCallEnded ? <Dialer /> : null}

					{/* to add a call in progress call we will call this component */}
					{isCallAdded && <AddCall />}
					{/* <DTMF /> */}
					{/* to transfer the call to another number we call this component */}
					{isCallTransfer && <TransferCall />}

					{/* after clicking on end button this screen will be shown  */}
					{isCallEnded && <EndCall />}
					
					{/* this is a video call screen  */}
					{/* <VideoCall /> */}

					<div className={styles.profileAndExtension}>
						{/* this is a profile and extension components which is shown at top right of the screen  */}
						<ProfileAndExtension />

						{/* this is a signal component which have top show at top of the screen to show signal strength */}
						{/* <Signal /> */}
					</div>
				</section>
			</BaseLayout>
			{/* this is a status menu components to update the status like available, on lunch etc */}
			{/* <StatusMenu /> */}

			{/* this is a component to show about the ringplan  */}
			{/* <AboutRingplan /> */}

			{/* component for edit the extension  */}
			{/* {true && <EditExtension />} */}

			{/* component for logout LogoutPopUp */}
			{/* <LogoutPopUp /> */}

			{/* incoming call components */}

			{ringingInboundCalls.length > 0 ? <InboundCall /> : null}
		</div>
	);
};

export default Dashboard;
