const PlayPrevIcon = ({ color }: { color: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M22 39.875C31.8725 39.875 39.875 31.8725 39.875 22C39.875 12.1275 31.8725 4.125 22 4.125C12.1275 4.125 4.125 12.1275 4.125 22C4.125 31.8725 12.1275 39.875 22 39.875ZM29.3404 27.766L22.0356 23.5918C20.804 22.888 20.804 21.1121 22.0356 20.4083L29.3404 16.2341C30.5626 15.5357 32.0833 16.4182 32.0833 17.8259L32.0833 26.1742C32.0833 27.5819 30.5626 28.4644 29.3404 27.766ZM18.3404 27.766L11.0356 23.5918C9.80395 22.888 9.80395 21.1121 11.0356 20.4083L18.3404 16.2341C19.5626 15.5357 21.0833 16.4182 21.0833 17.8259L21.0833 26.1742C21.0833 27.5819 19.5626 28.4644 18.3404 27.766Z"
				fill={`var(--${color ? color : "icon-primary"})`}
			/>
		</svg>
	);
};

export default PlayPrevIcon;
