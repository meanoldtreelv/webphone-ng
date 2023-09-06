import Dialpad from "components/Keypad/Dialpad";
import LayoutWrapper from "components/LayoutWrapper";
import React from "react";
import classes from "./dashboard.module.scss";
import ContactList from "components/shared/ContactList";
import ProfileAndExtension from "components/shared/ProfileAndExtension";
import StatusMenu from "components/Profile/StatusMenu";
import { relative } from "path";
import AboutRingplan from "components/Profile/AboutRingplan";
import Dialer from "components/Keypad/Dialer";

const Dashboard = () => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <LayoutWrapper>
        <section className={classes.dashboard}>
          <div className={classes.contact}>
            <ContactList />
          </div>
          <Dialer />
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
    </div>
  );
};

export default Dashboard;
