import Button from "components/UI/Forms/Button";
import { getBackendUrl } from "config/env.config";
import sip from "lib/sip";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "redux/store";
import { useLazyGetInstancesBulksQuery } from "services/callback";
import { setCookie } from "utils";

const ExtensionList = ({ instance_id }: { instance_id: string }) => {
	localStorage.setItem("instance_id", instance_id);
	store.dispatch({ type: "sip/instance_id", payload: instance_id });
	const { extAuthList, loginSelectExtension } = useSelector((state: any) => state.sip);
	const [getInstancesBulksQuery] = useLazyGetInstancesBulksQuery();
	useEffect(() => {
		getInstancesBulksQuery(instance_id).then((payload) => {
			const instancesVal = payload.data.map((instance: any) => ({
				...instance["qr-config"],
				...instance["data"],
				extension_id: instance["_id"],
				location: instance["location"]?.id,
				...(instance["outbound_callerid"] ? { outbound_callerid: instance["outbound_callerid"] } : {}),
			}));
			console.log(instancesVal);
			localStorage.setItem("instancesVal", JSON.stringify(instancesVal));
			store.dispatch({ type: "sip/extAuthList", payload: instancesVal });
		});
	}, []);

	return (
		<div style={{ gap: "0.5rem", display: "flex", flexDirection: "column", overflow: "auto", maxHeight: "18rem" }}>
			{extAuthList.map((extAuth: any, idx: number) => {
				if (idx === 0) {
					store.dispatch({ type: "sip/loginSelectExtension", payload: extAuth["user"] });
				}

				return (
					<Button
						key={extAuth["user"]}
						styles={{
							justifyContent: "flex-start",
							backgroundColor: extAuth["user"] === loginSelectExtension ? "var(--background-emphasis)" : "",
						}}
						onClick={() => {
							// store.dispatch({type:"sip/extAuth", payload:extAuth});
							store.dispatch({ type: "sip/loginSelectExtension", payload: extAuth["user"] });
						}}
						border>
						<span style={{ paddingLeft: "30px" }}>{extAuth["user"]}</span>
					</Button>
				);
			})}
		</div>
	);
};

export default ExtensionList;
