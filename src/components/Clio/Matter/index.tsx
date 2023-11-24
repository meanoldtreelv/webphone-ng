import { useState } from "react";
import styles from "./Matter.module.scss";
import ChevronRightIcon from "components/UI/Icons/Navigation/ChevronRight";
import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";
import { Link } from "react-router-dom";
import EditIcon from "components/UI/Icons/ClioIcon/Edit";
import { clioMatters } from "constants/clioConstants";
import { useDispatch, useSelector } from "react-redux";
import { setMatter } from "redux/clio/clioSlice";
import { matter } from "redux/clio/clioSelectors";

const Matter = () => {
	const [matterDetails, setMatterDetails] = useState(false);
	const dispatch = useDispatch();
	const matterDetail = useSelector(matter);

	return (
		<div className={styles.wrapper}>
			{!matterDetails && (
				<>
					{clioMatters?.data?.map((item) => (
						<div
							className={styles.matter}
							onClick={() => {
								setMatterDetails(true);
								dispatch(setMatter(item));
							}}
							key={item.id}>
							<div>
								<h4>{item?.display_number}</h4>
								<p>{item.description}</p>
							</div>
							<span className={styles.arrow_right}>
								<ChevronRightIcon />
							</span>
						</div>
					))}
				</>
			)}

			{matterDetails && (
				<div className={styles.matter_details}>
					<div className={styles.matter_name}>
						<div className={styles.left}>
							<span
								className={styles.chevron}
								onClick={() => {
									setMatterDetails(false);
								}}>
								<ChevronLeftIcon />
							</span>

							<span className={styles.name}>{matterDetail?.display_number}</span>
						</div>
						<Link to={`https://app.clio.com/nc/#/matters/${matterDetail?.id}/edit`} className={styles.seeDetails}>
							<EditIcon />
							{/* <span>See Details</span> */}
						</Link>
					</div>
					<div className={styles.box}>
						<div className={styles.heading}>
							<span>Matter Details</span>
						</div>
						<div className={styles.contact_details}>
							<div>
								<label htmlFor="">Matter Status</label>
								<p>{matterDetail?.status}</p>
							</div>
							<div>
								<label htmlFor="">Matter Description</label>
								<p>{matterDetail?.description}</p>
							</div>

							<div>
								<label htmlFor="">Open Date</label>
								<p>{matterDetail?.open_date}</p>
							</div>
							<div>
								<label htmlFor="">Closed Date</label>
								<p>{matterDetail?.closed_date}</p>
							</div>
							<div>
								<label htmlFor="">Pending Date</label>
								<p>{matterDetail?.pending_date}</p>
							</div>
							<div>
								<label htmlFor="">Location</label>

								<p>
									{matterDetail?.primary_address?.street +
										" " +
										matterDetail?.primary_address?.city +
										" " +
										matterDetail?.primary_address?.province +
										" " +
										matterDetail?.primary_address?.country +
										", " +
										matterDetail?.primary_address?.postal_code}
								</p>
							</div>
							<div>
								<label htmlFor="">Practice Area</label>
								<p>{matterDetail?.practice_area?.name}</p>
							</div>
							<div>
								<label htmlFor="">Responsible Attorney</label>
								<p>Jenna wojcek</p>
							</div>
							<div>
								<label htmlFor="">Originating Attorney</label>
								<p>Rishit Patel</p>
							</div>
						</div>
						{/* <div className={styles.heading}>
							<span>Custom Fields</span>
						</div>
						<div className={styles.contact_details}>
							<div>
								<label htmlFor="phone">Trigger new Potential</label>
								<p>No</p>
							</div>
							<div>
								<label htmlFor="">New Client</label>
								<p>No</p>
							</div>
							<div>
								<label htmlFor="">Zoho Deal ID</label>
								<p>132165</p>
							</div>
							<div>
								<label htmlFor="">Expected Revenue</label>
								<p>1,00,0000</p>
							</div>
						</div> */}
					</div>
				</div>
			)}
		</div>
	);
};

export default Matter;
