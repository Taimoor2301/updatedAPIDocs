import { Link, useLocation } from "react-router-dom";
import { IoLogIn, IoEyeSharp } from "react-icons/io5";
import { FaArrowRight, FaUser } from "react-icons/fa";

import React, { useState, useEffect } from "react";
import { login } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../components/Spinner";
const Login = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [type, setType] = useState("password");
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	const location = useLocation();

	const from = location.state?.from?.pathname || "/dashboard";

	useEffect(() => {
		if (isLoggedIn()) {
			navigate("/");
		}
	}, []);

	const resetForm = () => {
		setUsername("");
		setPassword("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { error } = await login(username, password);
		if (error) {
			toast.error(error);
			setLoading(false);
		} else {
			// Get the current URL
			// Get the current endpoint or path
			var currentEndpoint = window.location.pathname;

			// Check if the pathname contains "auth"
			// var containsAuth = currentEndpoint.includes("auth");
			// if (containsAuth) {

			navigate(from);
			window.location.reload();
			setLoading(false);
			resetForm();
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col gap-5 px-6 bg-white md:min-w-[30rem] min-w-[95%] md:border-[2px] border-gray-800 rounded-2xl font-poppins py-8'>
			<div className='text-center py-3 flex flex-col items-center gap-3'>
				<IoLogIn className='text-primary text-6xl' />
				<span className='text-5xl font-bold'>Welcome</span>
				<span className='text-sm text-gray-500'>Create an Account!</span>
			</div>
			<div className='flex flex-col gap-1'>
				<label
					className='text-md flex items-center justify-between'
					htmlFor='username'>
					User Name <FaUser className='text-2xl text-primary' />
				</label>
				<input
					className='py-3.5 px-4 border-b-2 focus:outline-none'
					type='username'
					name='username'
					id='username'
					required
					placeholder='User Name'
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>

			<div className='flex flex-col gap-1'>
				<label
					className='text-md flex items-center justify-between'
					htmlFor='password'>
					Password{" "}
					<IoEyeSharp
						className='text-2xl text-primary'
						onClick={() => setType((prev) => (prev === "password" ? "text" : "password"))}
					/>
				</label>
				<input
					className='py-3.5 px-4 border-b-2 focus:outline-none'
					type={type}
					name='password'
					id='password'
					required
					placeholder='password'
					onChange={(e) => setPassword(e.target.value)}
				/>

				<label
					htmlFor=''
					className='flex items-center gap-2 pt-3'>
					<input type='checkbox' /> Remember me
				</label>

				<Link
					className='text-xs pt-2 underline'
					to='/auth/forgetpassword'>
					Forget Password?
				</Link>
			</div>

			<button
				type='submit'
				className='hover:bg-primary text-white font-medium tracking-wide text-lg py-2 rounded-lg px-10 bg-gray-800 transition-all flex justify-center items-center gap-2 group'>
				{loading ? <Spinner /> : "Login"} {!loading && <FaArrowRight className='group-hover:translate-x-2 transition-all' />}
			</button>

			<div className='text-gray-600'>
				Don't have an account?{" "}
				<Link
					className='text-purple-500 font-medium'
					to='/auth/signup'>
					Signup
				</Link>
			</div>

			<Toaster
				position='bottom-right'
				reverseOrder={false}
			/>
		</form>
	);
};

export default Login;
