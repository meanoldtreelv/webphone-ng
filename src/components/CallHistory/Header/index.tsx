import React from "react";
import style from "./header.module.scss";
const Header = () => {
	return (
		<section className={style.header}>
			<div className={`sub_headline_bold ${style.header_pageName}`}>Recents</div>
		</section>
	);
};

export default Header;
