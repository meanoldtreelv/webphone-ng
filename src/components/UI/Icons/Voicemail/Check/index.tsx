import checkImg from "./../../../../../assets/images/icon/check-circle.svg";
import checkActiveImg from "./../../../../../assets/images/icon/check-circle-active.svg";

const CheckIcon = ({ active = false }: { active: boolean }) => {
	return active ? <img src={checkActiveImg} alt="" /> : <img src={checkImg} alt="" />;
};

export default CheckIcon;
