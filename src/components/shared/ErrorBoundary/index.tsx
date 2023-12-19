import { Component } from "react";

class GlobalErrorBoundary extends Component {
	constructor(props: any) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: any) {
		return { hasError: true };
	}

	componentDidCatch(error: any, errorInfo: any) {
		console.error(error, errorInfo);
	}

	render() {
		if (this?.state?.hasError) {
			return <p>Something went wrong.</p>;
		}

		return this?.props?.children;
	}
}

export default GlobalErrorBoundary;
