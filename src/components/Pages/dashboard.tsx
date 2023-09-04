import Dialpad from "components/Keypad/Dialpad";
import LayoutWrapper from "components/LayoutWrapper";
import React from "react";
import classes from "./dashboard.module.scss";
import ContactList from "components/shared/ContactList";
import ProfileAndExtension from "components/shared/ProfileAndExtension";

const Dashboard = () => {
  return (
    <LayoutWrapper>
      <section className={classes.dashboard}>
        <div className={classes.contact}>
          <ContactList />
        </div>
        <div className={classes.dialpad}>
          <Dialpad />
        </div>
        <div className={classes.profileAndExtension}>
          <ProfileAndExtension />
        </div>
      </section>
    </LayoutWrapper>
  );
};

export default Dashboard;
