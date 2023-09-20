import EditIcon from "components/UI/Icons/Edit";

const index = () => {
	return (
		<div
			className={`flex py-[11px] px-[25px] h-[54px] w-[100%] justify-between items-center`}
			style={{ opacity: "0.8", background: "var(--background-primary, #FFF)" }}>
			<span className={`sub_headline_bold`} style={{ color: "var(--text-primary, #1F2023)" }}>
				Team Group
			</span>
			<div className={`flex gap-x-[22px]`}>
				<span
					className={`flex justify-center items-center gap-x-[4px] p-[8px] `}
					style={{ borderRadius: "8px", border: "1px solid var(--border-primary, #91A0B5)" }}>
					<span>
						<EditIcon />
					</span>
					<span className={`footnote `} style={{ color: "var(--text-primary, #1F2023)" }}>
						Edit
					</span>
				</span>
				<span
					className={`footnote_bold flex justify-center items-center p-[8px]`}
					style={{
						color: "var(--text-on-color, #FFF)",
						borderRadius: "8px",
						background: "var(--primary-default, #0C6DC7)",
					}}>
					Start Conference
				</span>
			</div>
		</div>
	);
};

export default index;
