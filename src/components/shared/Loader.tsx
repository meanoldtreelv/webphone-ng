import React from "react";
import classes from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={classes.loader}>
      <img src="/icon/Ellipse_01.svg" alt="" className={classes.ellipse1} />
      <img src="/icon/Ellipse_02.svg" alt="" className={classes.ellipse2} />
      <img src="/icon/Ellipse_03.svg" alt="" className={classes.ellipse3} />
      <img src="/icon/ri_anim.svg" alt="" className={classes.ri} />
    </div>
  );
};

export default Loader;
