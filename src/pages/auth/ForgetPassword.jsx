import React, { useState } from "react";
import { IoMdMail } from "react-icons/io";

import { FaUnlockAlt, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import useAxios from "../../utils/useAxios";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import toast, { Toaster } from "react-hot-toast";

export default function ForgetPassword() {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const api = useAxios();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post(`${API_BASE_URL}/send_code/forget/`, { email });

			localStorage.setItem("forget_email", email);
			navigate("/auth/verifycode");
		} catch (error) {
			if (error.response.status === 404) {
				toast.error("user not found");
				console.log(error);
			} else {
				toast.error("something went wrong, please try again");
				console.log(error);
			}
		} finally {
			setLoading(false);
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col gap-5 px-6 bg-white md:min-w-[30rem] min-w-[95%] md:border-[2px] border-gray-800 rounded-2xl font-poppins py-8'>
			<div className='text-center py-3 flex flex-col items-center gap-1'>
				<FaUnlockAlt className='text-primary text-6xl' />
				<span className='md:text-5xl text-xl font-bold'>Reset Your Password</span>
			
			</div>

			<div className='flex flex-col gap-1 mt-10 mb-5'>
				<label
					className='text-md flex items-center justify-between'
					htmlFor='email'>
					Enter Your Email <IoMdMail className='text-2xl text-primary' />
				</label>
				<input
					className='py-3.5 px-4 border-b-2 focus:outline-none'
					type='email'
					name='email'
					value={email}
					required
					onChange={(e) => setEmail(e.target.value)}
					id='email'
					placeholder='Email'
				/>
			</div>
			<p className='text-sm font-poppins text-gray-500'>We'll send verification code to this email</p>
			<button
				type='submit'
				className='bg-gray-800 hover:bg-primary text-white font-medium tracking-wide text-lg py-2 rounded-lg px-10  transition-all flex justify-center items-center gap-2 group'>
				{loading ? <Spinner /> : "Submit"} {!loading && <FaArrowRight className='group-hover:translate-x-2 transition-all' />}
			</button>
			
		</form>
	);
}
