const MinusIcon = ({ color }: { color: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path
				d="M3.3335 8H12.6668"
				stroke={`var(--${color ? color : "icon-primary"})`}
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

export default MinusIcon;
