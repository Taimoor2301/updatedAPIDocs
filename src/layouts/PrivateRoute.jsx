import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const PrivateRoute = ({ children }) => {
	const loggedIn = useAuthStore((state) => state.isLoggedIn)();

	const location = useLocation();
	return loggedIn ? (
		<>{children}</>
	) : (
		<Navigate
			to='/auth/login'
			replace
			state={{ from: location }}
		/>
	);
};

export default PrivateRoute;
