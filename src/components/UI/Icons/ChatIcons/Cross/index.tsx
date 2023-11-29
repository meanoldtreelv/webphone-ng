const CrossIcon = ({ color }: { color: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
			<g clipPath="url(#clip0_3090_1899)">
				<path
					d="M1.125 1.125L4.875 4.875M4.875 1.125L1.125 4.875"
					stroke={`var(--${color ? color : "icon-primary"})`}
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_3090_1899">
					<rect width="6" height="6" fill={`var(--${color ? color : "icon-primary"})`} />
				</clipPath>
			</defs>
		</svg>
	);
};

export default CrossIcon;
