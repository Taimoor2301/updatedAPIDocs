import React from "react";
import Documentation from "./pages/Docs/Documentation";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Privacy from "./pages/privacy policy/Privacy";
import Dashboard from "./pages/profile/Dashboard";
import MainWraper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoute";
import AuthLayout from "./pages/auth/AuthLayout";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Detail from "./pages/detail/Detail";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navigation/Navbar";
import EnterverificationCode from "./pages/auth/EnterVarificationCode";
import NewPassword from "./pages/auth/NewPassword";
import About from "./pages/About/About";
import Scroll from "./components/Scroll";
import GetEmail from "./pages/auth/GetEmail";
export default function App() {
	return (
		<>
			<MainWraper>
				<Scroll />
				<Navbar />
				<Routes>
					<Route
						path='/docs'
						element={<Documentation />}
					/>
					<Route
						path='/about'
						element={<About />}
					/>

					<Route
						path='/privacy'
						element={<Privacy />}
					/>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/dashboard'
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route
						path='*'
						element={<NotFound />}
					/>
					<Route
						path='/auth'
						element={<AuthLayout />}>
						<Route
							path='login'
							element={<Login />}
						/>
						<Route
							path='signup'
							element={<GetEmail />}
						/>
						<Route
							path='signupdetails'
							element={<Signup />}
						/>
						<Route
							path='forgetpassword'
							element={<ForgetPassword />}
						/>
						<Route
							path='verifycode'
							element={<EnterverificationCode />}
						/>
						<Route
							path='newpassword'
							element={<NewPassword />}
						/>
					</Route>

					<Route
						path='/details/:id'
						element={
							<PrivateRoute>
								<Detail />
							</PrivateRoute>
						}
					/>
				</Routes>
				<Footer />
			</MainWraper>
		</>
	);
}
