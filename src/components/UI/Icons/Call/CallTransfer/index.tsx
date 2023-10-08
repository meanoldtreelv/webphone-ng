const CallTransferIcon = ({ answered }: {answered: boolean}) => (
	<svg width="32" height="32" viewBox="0 0 32 32" fill={(answered ? "#191C1F" : "#C8D3E0" )} xmlns="http://www.w3.org/2000/svg">
		<g id="fill / call_transfer">
			<g id="Vector">
				<path d="M25.3333 2.6665L30.6667 7.99984L25.3333 13.3332V9.33317H18.6667V6.6665L25.3333 6.6665V2.6665Z" />
				<path d="M29.3333 26.56V22.56C29.3495 21.9061 29.1248 21.269 28.702 20.77C28.2791 20.2709 27.6876 19.9447 27.0399 19.8533C25.7598 19.6845 24.5029 19.3714 23.2933 18.92C22.816 18.7406 22.2974 18.7018 21.7987 18.8081C21.3001 18.9144 20.8424 19.1615 20.4799 19.52L18.7866 21.2133C15.4485 19.3152 12.6847 16.5514 10.7866 13.2133L12.4799 11.52C12.8384 11.1574 13.0855 10.6998 13.1918 10.2011C13.2981 9.70252 13.2593 9.18387 13.0799 8.70663C12.6285 7.49694 12.3154 6.24006 12.1466 4.95997C12.056 4.31923 11.7356 3.73328 11.2449 3.31134C10.7543 2.8894 10.127 2.66026 9.47992 2.66663H5.47992C5.10971 2.66698 4.74362 2.74441 4.40498 2.894C4.06633 3.04358 3.76254 3.26204 3.51294 3.53546C3.26335 3.80889 3.07342 4.13128 2.95525 4.48213C2.83709 4.83298 2.79327 5.20459 2.82659 5.5733C3.26424 9.69463 4.66656 13.6549 6.91992 17.1333C8.96704 20.3549 11.6984 23.0862 14.9199 25.1333C18.3826 27.3788 22.3237 28.7808 26.4266 29.2266C26.7964 29.2601 27.1692 29.2159 27.5209 29.0969C27.8727 28.9779 28.1957 28.7868 28.4694 28.5358C28.743 28.2848 28.9612 27.9793 29.1099 27.6391C29.2587 27.2989 29.3348 26.9313 29.3333 26.56Z" />
			</g>
		</g>
	</svg>
);

export default CallTransferIcon;
