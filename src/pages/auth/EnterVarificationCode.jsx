import { useEffect, useState } from "react";
import { FaUnlockAlt, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import toast, { Toaster } from "react-hot-toast";

export default function EnterVarificationCode() {
	const [code, setCode] = useState("");
	const [error, setError] = useState({ status: false, msg: "Incorrect Code" });
	const [loading, setLoading] = useState(false);
	let [count, setCount] = useState(120);
	const [email, setEmail] = useState(localStorage.getItem("forget_email"));
	const navigate = useNavigate();

	useEffect(() => {
		const t = setTimeout(() => {
			if (count > 0) setCount((p) => p - 1);
		}, 1000);
	}, [count]);

	const handleSendAgain = async (e) => {
		if (count === 0) {
			try {
				const res = await axios.post(`${API_BASE_URL}/send_code/forget/`, { email });
				localStorage.setItem("forget_email", email);
				toast.success("email sent again");
				setCount(120);
			} catch (error) {
				console.log(error);
				toast.error("something went wrong");
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await axios.put(`${API_BASE_URL}/confirm_code/`, {
				email,
				code,
			});
			if (res.status === 200) {
				navigate("/auth/newpassword");
			}
		} catch (error) {
			if (error.response.status === 401) {
				setError({ status: true, msg: "Invalid verification code" });
			} else toast.error("something went wrong, please try again");
		} finally {
			setLoading(false);
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col gap-5 px-6 bg-white md:min-w-[30rem] min-w-[95%] md:border-[2px] border-gray-800 rounded-2xl font-poppins py-8'>
			<div className='text-center py-3 flex flex-col items-center gap-1'>
				<FaUnlockAlt className='text-purple-500 text-6xl' />
				<span className='text-xl md:text-5xl font-bold'>Enter Verification code</span>
				<span className='text-sm text-gray-500'>{email}</span>
			</div>

			<div className='flex flex-col gap-1 mt-10 mb-5'>
				<input
					className='py-3.5 px-4 rounded-md border-2 border-gray-800 focus:outline-purple-none'
					type='text'
					value={code}
					onChange={(e) => setCode(e.target.value)}
					name='verificationCode'
					id='verificationCode'
					placeholder='code'
					required
				/>

				{error.status && <p className='text-center text-red-500 font-poppins'>{error.msg}</p>}
			</div>

			<div className='flex justify-center items-center gap-2 flex-col'>
				<span className='text-4xl font-poppins'>
					00:{count < 10 && "0"}
					{count}
				</span>
				<button
					type='button'
					disabled={count > 0}
					onClick={() => handleSendAgain()}
					className='hover:bg-primary text-white bg-gray-800  font-medium tracking-wide py-1.5 rounded-lg px-3 text-sm transition-all flex justify-center items-center gap-2 group disabled:cursor-not-allowed'>
					Send Again <FaArrowRight className='group-hover:translate-x-2 transition-all' />
				</button>
			</div>

			<p className='text-sm font-poppins text-gray-500'>
				Not your email?{" "}
				<Link
					to='/auth/forgetpassword'
					className='text-purple-500 px-2 underline'>
					Change Email
				</Link>
			</p>
			<button
				type='submit'
				className='bg-gray-800 text-white font-medium tracking-wide text-lg py-2 rounded-lg px-10 hover:bg-primary transition-all flex justify-center items-center gap-2 group'>
				{loading ? <Spinner /> : "Submit"} {!loading && <FaArrowRight className='group-hover:translate-x-2 transition-all' />}
			</button>
			<Toaster
				position='bottom-right'
				reverseOrder={false}
			/>
		</form>
	);
}
