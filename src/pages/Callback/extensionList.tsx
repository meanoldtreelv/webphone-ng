import Button from "components/UI/Forms/Button";
import { getBackendUrl } from "config/env.config";
import sip from "lib/sip";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "redux/store";
import { useGetInstancesBulksQuery, useGetInstancesQuery } from "services/callback";

const ExtensionList = ({ uuid }: { uuid: string }) => {
	const instances = useGetInstancesBulksQuery(uuid).data;
	const { extAuthList, loginSelectExtension } = useSelector((state: any) => state.sip)
	useEffect(() => {
		if (instances) {
			store.dispatch({ type: "sip/extAuthList", payload: instances.map((instance: any) => instance["qr-config"]) })
		}
	}, [instances]);
	return (
		<div style={{ gap: "0.5rem", display: "flex", flexDirection: "column" , overflow: "auto", maxHeight: "18rem"}}>
		{extAuthList.map((extAuth: any) => (
			<Button key={extAuth["user"]} styles={{ justifyContent: "flex-start", backgroundColor:extAuth["user"]===loginSelectExtension?"#e3effa":"" }} onClick={()=>{
				// store.dispatch({type:"sip/extAuth", payload:extAuth});
				store.dispatch({type:"sip/loginSelectExtension", payload:extAuth["user"]});
			}} border>
				<span style={{ paddingLeft: "30px" }}>{extAuth["user"]}</span>
			</Button>))}
		</div>

	);
};

export default ExtensionList;
