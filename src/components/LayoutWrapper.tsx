import React from "react";
import Sidebar from "./shared/Sidebar";
import classes from "./layoutWrapper.module.scss";

const LayoutWrapper = ({ children }: any) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.sidebar}>
        <Sidebar />
      </div>

      <div className={classes.children}>{children}</div>
    </div>
  );
};

export default LayoutWrapper;
