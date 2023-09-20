import styles from "./Loader.module.scss";

import ellipse1Img from './../../../assets/images/icon/Ellipse_01.svg';
import ellipse2Img from './../../../assets/images/icon/Ellipse_02.svg';
import ellipse3Img from './../../../assets/images/icon/Ellipse_03.svg';
import ri_animImg from './../../../assets/images/icon/ri_anim.svg';

const Loader = () => {	
	return (
		<div className={styles.loader}>
			<img src={ellipse1Img} alt="" className={styles.ellipse1} />
			<img src={ellipse2Img} alt="" className={styles.ellipse2} />
			<img src={ellipse3Img} alt="" className={styles.ellipse3} />
			<img src={ri_animImg} alt="" className={styles.ri} />
		</div>
	);
};

export default Loader;
