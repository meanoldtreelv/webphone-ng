import { Outlet } from "react-router";
import ErrorBoundary from "./../../wrappers/ErrorBoundary";

const ErrorBoundaryLayout = () => (
    <ErrorBoundary>
        <Outlet />
    </ErrorBoundary>
)

export default ErrorBoundaryLayout;