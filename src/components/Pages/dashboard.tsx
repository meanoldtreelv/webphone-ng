import Dialpad from "components/Keypad/Dialpad";
import LayoutWrapper from "components/LayoutWrapper";
import React from "react";
import classes from "./dashboard.module.scss";

const Dashboard = () => {
  return (
    <LayoutWrapper>
      <section className={classes.dashboard}>
        <div className={classes.contact}>
          Hello kjfdsjflksdlkf sdjflksdjflsd fsdoifdsf sdlkfsdm,f
          sdlkjfsdlkflkdsfsfklsdnfsdflknl
        </div>
        <div className={classes.dialpad}>
          <Dialpad />
        </div>
      </section>
    </LayoutWrapper>
  );
};

export default Dashboard;
