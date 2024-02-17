import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../components/Spinner";
import { IoLogIn } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../utils/constants";
import axios from "axios";

const GetEmail = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const navigate = useNavigate();

	const location = useLocation();
	const from = location.state?.from?.pathname || "/dashboard";

	useEffect(() => {
		if (isLoggedIn()) {
			navigate(from);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await axios.post(`${API_BASE_URL}/send_code/signup/`, { email });
			localStorage.setItem("user_email", email);
			navigate("/auth/signupdetails");
		} catch (error) {
			console.log(error);
			toast.error(`${error.response.data.error}` || "something went wrong");
		} finally {
			setLoading(false);
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

			<button
				type='submit'
				disabled={loading}
				className='hover:bg-primary text-white font-medium tracking-wide text-lg py-2 rounded-lg px-10 bg-gray-800 transition-all flex justify-center items-center gap-2 group disabled:opacity-80 disabled:cursor-not-allowed'>
				{loading ? <Spinner /> : "Sign Up"} {!loading && <FaArrowRight className='group-hover:translate-x-2 transition-all' />}
			</button>

			<div>
				Already have an account?{" "}
				<Link
					className='text-purple-500 font-medium'
					to='/auth/login'>
					Login
				</Link>
			</div>

		</form>
	);
};

export default GetEmail;
