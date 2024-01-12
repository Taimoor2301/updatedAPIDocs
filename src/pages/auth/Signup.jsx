import { Link, useLocation } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaUser, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { register } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../components/Spinner";
import { IoEyeSharp } from "react-icons/io5";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [type, setType] = useState("password");
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const navigate = useNavigate();

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
		setPassword2("");
		setEmail("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== password2) {
			return toast.error("Passwords do'nt match");
		}
		setLoading(true);
		const { error } = await register(username, password, password2, email);
		if (error) {
			toast.error(JSON.stringify(error));
		} else {
			navigate(from);
			resetForm();
		}
		setLoading(false);
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
					htmlFor='email'>
					Email <IoMdMail className='text-2xl text-primary' />
				</label>
				<input
					className='py-3.5 px-4 border-b-2 focus:outline-none'
					type='email'
					name='email'
					id='email'
					required
					placeholder='email'
					onChange={(e) => setEmail(e.target.value)}
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
			</div>

			<div className='flex flex-col gap-1'>
				<label
					className='text-md flex items-center justify-between'
					htmlFor='password2'>
					Verify Password{" "}
					<IoEyeSharp
						className='text-2xl text-primary'
						onClick={() => setType((prev) => (prev === "password" ? "text" : "password"))}
					/>
				</label>
				<input
					className='py-3.5 px-4 border-b-2 focus:outline-none'
					type={type}
					name='password2'
					id='password2'
					required
					placeholder='verify password'
					onChange={(e) => setPassword2(e.target.value)}
				/>
			</div>

			<button
				type='submit'
				className='hover:bg-primary text-white font-medium tracking-wide text-lg py-2 rounded-lg px-10 bg-gray-800 transition-all flex justify-center items-center gap-2 group'>
				{loading ? <Spinner /> : "Signup"} {!loading && <FaArrowRight className='group-hover:translate-x-2 transition-all' />}
			</button>

			<div>
				Already have an account?{" "}
				<Link
					className='text-purple-500 font-medium'
					to='/auth/login'>
					Sign in
				</Link>
			</div>

			<Toaster
				position='bottom-right'
				reverseOrder={false}
			/>
		</form>
	);
};

export default Signup;
