import BaseLayout from "layouts/BaseLayout";
import React from "react";
import styles from "./Meet.module.scss";
import Header from "components/meet/Header";
import MeetHeader from "components/meet/MeetHeader";
import MeetBox from "components/meet/MeetBox";

const Meet = () => {
	return (
		<div style={{ position: "relative", width: "100%", height: "100vh" }}>
			<BaseLayout>
				<Header />
				<MeetHeader />
				<MeetBox />
			</BaseLayout>
		</div>
	);
};

export default Meet;
