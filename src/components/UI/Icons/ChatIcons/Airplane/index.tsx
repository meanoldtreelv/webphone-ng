const AirplaneIcon = ({ color }: { color: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
			<path
				d="M18.0979 10.01C18.4197 10.18 18.4094 10.6449 18.0803 10.8005L3.99973 17.4562C3.637 17.6277 3.25226 17.2653 3.40123 16.8924L5.6333 11.3067L12.6979 10.4228L5.6333 9.53886L3.35969 3.09059C3.22595 2.71129 3.62677 2.36487 3.98215 2.55262L18.0979 10.01Z"
				fill={`var(--${color ? color : "icon-primary"})`}
			/>
		</svg>
	);
};

export default AirplaneIcon;
