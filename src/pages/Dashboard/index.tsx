import Dialpad from "../../components/Dashboard/Dialpad";
import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import BaseLayout from "./../../layouts/BaseLayout";
import { addCall, callDailer, callInProgress, transferCall } from "./../../redux/call/callSelectors";
// import { setContactList } from "./../../redux/contact/contactSlice";
// import { contactLists } from "./../../redux/contact/contactSelectors";
import MultipleCallButton from "components/Dashboard/MultipleCallButton";
import MultipleCallListModal from "components/Dashboard/MultipleCallListModal";
import RecentsSidebar from "components/Dashboard/RecentsSidebar";
import AddContact from "components/Dashboard/AddContact";
import { getCookie, setCookie } from "utils";
import { setCallNumber } from "redux/call/callSlice";
import { setLoader } from "redux/common/commonSlice";
import { setContactList } from "redux/contact/contactSlice";
import { useLazyGetContactsQuery } from "services/contact";
import { extChange } from "redux/common/commonSelectors";

const Dashboard = () => {
	const dispatch = useDispatch();
	const [getContacts, { data: contactsData, isLoading: contactsLoading }] = useLazyGetContactsQuery();

	const isDialerActive = useSelector(callDailer);
	const isCallInProgress = useSelector(callInProgress);
	const isCallTransfer = useSelector(transferCall);
	const isCallAdded = useSelector(addCall);
	// const isCallEnded = useSelector(callEnding);
	const extChanged = useSelector(extChange);
	const {
		ringingInboundCalls,
		answeredCalls,
		ringingOutboundCalls,
		callEnding,
		logoutPopUp,
		aboutRingplan,
		showMultipleCallListModal,
		statusMenu,
	} = useSelector((state: any) => state.sip);
	const [addContact, setAddContact] = useState(false);

	useEffect(() => {
		const contactsJson = localStorage?.getItem("contacts");
		let contactsParsed: [];

		try {
			contactsParsed = JSON.parse(String(contactsJson))?.slice(0, 20);
		} catch (e) {
			contactsParsed = [];
		}

		const fetchContacts = async () => {
			await getContacts(null);
			dispatch(setLoader(false));
		};

		if (contactsParsed && contactsParsed.length) {
			dispatch(setContactList(contactsParsed));
			dispatch(setLoader(true));
			fetchContacts();
		} else {
			dispatch(setLoader(true));
			fetchContacts();
		}
	}, []);

	useEffect(() => {
		if (!contactsLoading && contactsData) {
			localStorage.setItem("contacts", JSON.stringify(contactsData));
			dispatch(setContactList(contactsData?.slice(0, 20)));
		}
	}, [contactsLoading]);

	// useEffect(() => {
	// 	dispatch(setContactList(data));

	// }, [data]);

	// useEffect(() => {
	// 	const user_id = "bfea21d6-21bd-55c9-bda6-85529ce9d06f";
	// 	const userID = "5ed668cd38d0350104cb8789";

	// 	const cnt_id = "5ed668cd38d0350104cb8789";
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
	// 		if (res?.status === 200) {
	// 			console.log("success in account retrieve");
	// 		}
	// 	},
	// 	(err: any) => {
	// 		console.error(err, "err in account retrieve");
	// 	},
	// );

	// GET_Contact_List_API(
	// 	(res: any) => {
	// 		console.log(res, "contact API retrieve");
	// 		if (res?.status === 200) {
	// 			console.log("success in contact retrieve");
	// 		}
	// 	},
	// 	(err: any) => {
	// 		console.error(err, "err in contact retrieve");
	// 	},
	// );

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

	// user_API(
	// 	userID,
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
	// }, []);
	return (
		<div className={styles.dashboardWrapper}>
			<BaseLayout>
				<section className={styles.dashboard}>
					{/* this is a contact list components which is shown besides Sidebar  */}
					<div className={styles.contact}>
						<RecentsSidebar />
					</div>

					{/* This is a dial pad components for calling */}
					{answeredCalls.length < 1 && ringingOutboundCalls.length < 1 && !(callEnding.length > 0) && (
						<div className={styles.dialpad}>
							<KeyPad addContact={setAddContact} />
						</div>
					)}

					{/* When call is in progress this component will be shown  */}
					{/* {isCallInProgress && <Dialer />} */}

					{(answeredCalls.length > 0 || ringingOutboundCalls.length > 0) && !(callEnding.length > 0) && <Dialer />}

					{/* to add a call in progress call we will call this component */}
					{/* {isCallAdded && <AddCall />} */}
					{/* <DTMF /> */}
					{/* to transfer the call to another number we call this component */}
					{/* {isCallTransfer && <TransferCall />} */}

					{/* after clicking on end button this screen will be shown  */}
					{callEnding.length > 0 && dispatch(setCallNumber("")) && (
						<EndCall name={callEnding[0].name} callTimer={callEnding[0].callTimer} number={callEnding[0].number} />
					)}

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
			{statusMenu && <StatusMenu />}

			{aboutRingplan && <AboutRingplan />}

			{/* component for edit the extension  */}
			{/* {true && <EditExtension />} */}

			{/* component for logout LogoutPopUp */}
			{logoutPopUp && <LogoutPopUp />}

			{/* incoming call components */}

			{/* <InboundCall /> */}

			{/* {ringingInboundCalls.length > 0 ? <InboundCall /> : null} */}
			{answeredCalls.length + ringingOutboundCalls.length + ringingInboundCalls.length > 1 && <MultipleCallButton />}
			{showMultipleCallListModal && <MultipleCallListModal />}
			{addContact ? <AddContact close={setAddContact} /> : null}
		</div>
	);
};

export default Dashboard;
