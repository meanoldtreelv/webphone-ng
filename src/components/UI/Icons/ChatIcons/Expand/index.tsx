const ExpandIcon = ({ color }: { color: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
			<path
				d="M2.8125 2.8125V6.1875M2.8125 2.8125H6.1875M2.8125 2.8125L6.75 6.75M2.8125 15.1875V11.8125M2.8125 15.1875H6.1875M2.8125 15.1875L6.75 11.25M15.1875 2.8125H11.8125M15.1875 2.8125V6.1875M15.1875 2.8125L11.25 6.75M15.1875 15.1875H11.8125M15.1875 15.1875V11.8125M15.1875 15.1875L11.25 11.25"
				stroke={`var(--${color ? color : "icon-primary"})`}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ExpandIcon;
