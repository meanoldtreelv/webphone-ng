import XIcon from "components/UI/Icons/X";
import styles from "./EditExtension.module.scss";
import { store } from "redux/store";
import { useSelector } from "react-redux";
import { useGetAvailableNumbersQuery, useLazyEditExtensionQuery } from "services/extension";
import { useEffect, useState } from "react";
import Select from "components/UI/Forms/Select";
import Button from "components/UI/Forms/Button";
import { ClipLoader } from "react-spinners";
import { setCookie } from "utils";
import { useLazyGetInstancesBulksQuery } from "services/callback";

const EditExtension = () => {
	const { editExtension, instance_id } = useSelector((state: any) => state.sip);
	const [editExtensionQuery] = useLazyEditExtensionQuery()
	const [getInstancesBulksQuery] = useLazyGetInstancesBulksQuery()
	const [name, setName] = useState(editExtension.name);
	const [extensionNumber, setExtensionNumber] = useState("");
	const [loading, setLoading] = useState(false);

	const save = async (instance_id:string, extension_id:string, data={},)=>{ 
		if(!loading ){
			setLoading(true) 
			console.log(data)
			try {
				const payload = await editExtensionQuery({instance_id:instance_id, extension_id:extension_id, data:data}).unwrap();
				// console.log('fulfilled', payload)
				try {
					const payload = await getInstancesBulksQuery(instance_id);
					const instancesVal = payload.data.map((instance: any) => ({...instance["qr-config"] , ...instance["data"], extension_id:instance["_id"], location:instance["location"]?.id, ...(instance["outbound_callerid"]? {outbound_callerid : instance["outbound_callerid"]}: {} ) })  );
					console.log(instancesVal)
					localStorage.setItem("instancesVal", JSON.stringify(instancesVal));
					store.dispatch({ type: "sip/extAuthList", payload: instancesVal });
					store.dispatch({type:"sip/isEditBoxOpen", payload:false})
				} catch (error) {
					console.error('rejected', error);
				}
			} catch (error) {
				console.error('rejected', error);
			}
			setLoading(false)
		}
	}
	const getAvailableNumbers  = useGetAvailableNumbersQuery(instance_id)?.data
	// console.log(getAvailableNumbers)

	



	return (
		<section className={styles.editBox}>
			<div className={styles.edit}>
				<div className={styles.edit_heading}>
					<h3>Edit Extension</h3>
					<span className={styles.edit_cross} onClick={ ()=>{store.dispatch({type:"sip/isEditBoxOpen", payload:false})} }>
						<XIcon />
					</span>
				</div>
				<p className={styles.extension}>
					Extension <span>{editExtension.user}</span>
				</p>
				<div className={styles.inputBox}>
					<label htmlFor="">Number:</label>
					{getAvailableNumbers && <select defaultValue={editExtension.outbound_callerid?.number} className={styles.extension_number} onChange={(event) => {setExtensionNumber(event.target.value); console.log(extensionNumber)}}> 
						{
							getAvailableNumbers.map((item:any) => (
								<option key={item.number} value={item.number}> {item.number} </option>
								))
						}
					</select>}
					{/* <Select icon={undefined} options={
						getAvailableNumbers? getAvailableNumbers.map((item:any) => (
							{name:item.number, value:item.number}
							)) : null
					} onChange={(event) => {setExtensionNumber(event.target.value);}} defaultValue={""} /> */}
				</div>
				<div className={styles.inputBox}>
					<label htmlFor="">Name:</label>
					<input type="text" style={{cursor: "text"}} placeholder={editExtension.name} value={name} onChange={(event) => {setName(event.target.value); console.log(name) }} disabled/>
				</div>
				<div className={styles.idInfo}>ID Info</div>
				<div className={styles.callerId}>
					<p className={styles.callerId_heading}>Caller ID</p>
					<p className={styles.callerId_number}>{editExtension.name} &lt;{editExtension.outbound_callerid?.number}&gt;</p>
				</div>
				<div className={styles.deleteSave}>
					<div className={styles.edit_delete}>
						<Button children={<div style={{display: "contents"}}>{(loading && <><ClipLoader color="white" size={14} /><div>saving</div></>)||<div>save</div> }</div>} styles={{backgroundColor:"#0c6dc7", color:"#fff"}} onClick={()=>{save(instance_id, editExtension.extension_id, {data: { name: name }, outbound_callerid: {name: name, number: extensionNumber } } )}} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default EditExtension;
