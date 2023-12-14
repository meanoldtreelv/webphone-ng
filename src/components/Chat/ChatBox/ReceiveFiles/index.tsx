import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ReceiveFiles.module.scss";
import { setImageFiles, setIsImgViewerDialogueOpen, setSelectedMsgLists } from "redux/chat/chatSlice";
import ReceiveTime from "../ReceiveTime";
import { isDeleteCheck, selectedMsgLists } from "redux/chat/chatSelectors";

const ReceiveFiles = ({ id, time, text, files }) => {
	const dispatch = useDispatch();
	const deleteCheck = useSelector(isDeleteCheck);
	const selectedMsgList = useSelector(selectedMsgLists);

	// const id = "hhi";

	const handleSelectInput = () => {
		!selectedMsgList.includes(id)
			? dispatch(setSelectedMsgLists({ type: "ADD", id }))
			: dispatch(setSelectedMsgLists({ id }));
	};
	return (
		<div className={`${styles.msgDiv} ${deleteCheck && styles.msgDiv_active}`}>
			<div className={styles.left}>
				<div className={styles.left_box}>
					<ReceiveTime time={time} />
					<div className={styles.receiveChat}>
						<span>{text ? text : ""}</span>
					</div>
					{files?.map((data, index) => {
						if (data?.mimetype === "image/png") {
							return (
								<>
									<div className={styles.receiveImg}>
										<span
											onClick={() => {
												dispatch(setImageFiles(files));
												dispatch(setIsImgViewerDialogueOpen(true));
											}}>
											<img src={data?.preview?.base64} alt="" />
										</span>
									</div>
								</>
							);
						}
						return null; // Or handle non-PNG files if needed
					})}

					{/* <div className={styles.receiveImg}>
						<span
							onClick={() => {
								dispatch(setIsImgViewerDialogueOpen(true));
							}}>
							<img src={"/img/dummy/video_call.jpeg"} alt="" />
						</span>
					</div> */}
				</div>
			</div>
			{deleteCheck && (
				<input
					type="checkbox"
					name=""
					id={id}
					checked={selectedMsgList.includes(id)}
					// value={value}
					onChange={handleSelectInput}
				/>
			)}
		</div>
	);
};

export default ReceiveFiles;
