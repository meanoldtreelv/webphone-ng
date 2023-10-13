import SearchBar from "components/UI/SearchBar";
import React, { useEffect, useState } from "react";
import ExtensionCard from "../ExtensionCard";
import { GET_user_extension_API, extension_API } from "effects/apiEffect";
import { useGetActiveExtensionsQuery, useGetAllExtensionsQuery } from "services/extension";
import OnOffSwitch from "components/UI/OnOffSwitch";
import styles from "./Extension.module.scss";

const Extension = () => {
	const [extensionList, setExtensionList] = useState([]);
	const [isActiveExtension, setIsActiveExtension] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [lists, setLists] = useState([]);
	// const cnt_id = "5ed668cd38d0350104cb8789";
	// const instance_id = "bfea21d6-21bd-55c9-bda6-85529ce9d06f";

	// todo - remove hard coded id, implement web socket
	const { data: allExtensions } = useGetAllExtensionsQuery("bfea21d6-21bd-55c9-bda6-85529ce9d06f");
	const { data: activeExtensions } = useGetActiveExtensionsQuery("bfea21d6-21bd-55c9-bda6-85529ce9d06f");

	// console.log(useGetAllExtensionsQuery("bfea21d6-21bd-55c9-bda6-85529ce9d06f"), "list extension");

	useEffect(() => {
		isActiveExtension ? setExtensionList(activeExtensions) : setExtensionList(allExtensions);

		// if (isActiveExtension) {
		// 	setExtensionList(activeExtensions);
		// 	setLists(activeExtensions);
		// } else {
		// 	setExtensionList(allExtensions);
		// 	setLists(allExtensions);
		// }
		return () => {
			// second;
		};
	}, [isActiveExtension, allExtensions, activeExtensions]);

	useEffect(() => {
		// GET_user_extension_API(
		// 	cnt_id,
		// 	(res: any) => {
		// 		console.log(res, "extension API retrieve");
		// 		if (res?.status === 200) {
		// 			console.log("success in extension retrieve");
		// 			setExtensionList(res?.data);
		// 		}
		// 	},
		// 	(err: any) => {
		// 		console.error(err, "err in extension retrieve");
		// 	},
		// );
		// extension_API(
		// 	instance_id,
		// 	(res: any) => {
		// 		console.log(res, "extension API bulk retrieve");
		// 		if (res?.status === 200) {
		// 			console.log("success in extension bulk retrieve");
		// 			setExtensionList(res?.data);
		// 			// console.log(res?.data);
		// 		}
		// 	},
		// 	(err: any) => {
		// 		console.error(err, "err in extension retrieve");
		// 	},
		// );
	}, []);

	// console.log("====================================");
	console.log(extensionList, "extensionList");
	// console.log("====================================");

	function searchExtension(searchText, extensionsList) {
		const filteredItems = extensionsList?.filter((item) => {
			return (
				item.data &&
				((typeof item.data.extension === "number" && item.data.extension.toString().includes(searchText)) || // Check if it's a number
					item?.data?.name?.includes(searchText))
			);
		});

		console.log(filteredItems, "matching items");
		return filteredItems;
	}
	useEffect(() => {
		if (extensionList?.length > 0) {
			setLists(searchExtension(searchText, extensionList));
		}
	}, [searchText, extensionList]);

	return (
		<div className={styles.extension}>
			<SearchBar
				placeholder={"search"}
				value={searchText}
				onChange={(e) => {
					setSearchText(e.target.value);
				}}
			/>

			<div className={styles.activeExtension}>
				<span>Active Extension </span>
				<OnOffSwitch
					checked={isActiveExtension}
					onClick={() => {
						setIsActiveExtension(!isActiveExtension);
					}}
				/>
			</div>

			<div className={styles.list}>
				{/* todo, interface should be added for extension lists */}
				{lists?.map((item) => <ExtensionCard extensionData={item} key={item._id} />)}
				{/* {isActiveExtension && activeExtensions?.map((item) => <ExtensionCard extensionData={item} key={item._id} />)} */}
			</div>
		</div>
	);
};

export default Extension;
