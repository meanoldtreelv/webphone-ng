import Dialpad from "components/Dashboard/Dialpad";
import LayoutWrapper from "components/LayoutWrapper";
import React from "react";
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

const Dashboard = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <LayoutWrapper>
        <section className={classes.dashboard}>
          <div className={classes.contact}>
            <ContactList />
          </div>
          {/* <Dialer /> */}
          {/* <VideoCall /> */}
          <EndCall />
          {/* <div className={classes.dialpad}>
            <Dialpad />
          </div> */}
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
