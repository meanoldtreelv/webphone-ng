import React, { useEffect, useState } from "react";

const ComponentErrorBoundary = ({ children }: any) => {
	const [hasError, setHasError] = React.useState(false);
	const [error, setError] = useState<any>("");

	React.useEffect(() => {
		return () => {
			setHasError(false);
		};
	}, []);

	useEffect(() => {
		try {
			children();
		} catch (error) {
			setHasError(true);
			setError(error);
		}
	}, [children]);

	if (hasError) {
		return (
			<div>
				<h1>Something went wrong.</h1>
				<p>{String(error)}</p>
			</div>
		);
	}

	return children;
};

export default ComponentErrorBoundary;
