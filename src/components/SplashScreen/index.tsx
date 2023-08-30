import React from "react";
import classes from "./splashScreen.module.scss";

const SplashScreen = () => {
  return (
    <section className={classes.splashScreen}>
      <img src="/ri_voice.svg" alt="" className={classes.splashScreen_voice} />
      <img
        src="/ringplan_logo.svg"
        alt=""
        className={classes.splashScreen_ringplan}
      />
    </section>
  );
};

export default SplashScreen;
