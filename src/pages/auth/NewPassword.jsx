import { useEffect, useState } from "react";
import { FaUnlockAlt, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import { login } from "../../utils/auth";
import toast, { Toaster } from "react-hot-toast";

export default function NewPassword() {
	const navigate = useNavigate();
	const [email, setEmail] = useState(localStorage.getItem("forget_email"));
	const [type, setType] = useState("password");

	const [password, setPassword] = useState("");
	const [verifyPass, setVerifyPass] = useState("");
	const [error, setError] = useState({ status: false, msg: "passwords do not match" });

	const matchPass = async (e) => {
		e.preventDefault();
		// check code logic here
		if (password.length > 5 && verifyPass.length > 5) {
			if (password === verifyPass) {
				setError({ status: false, msg: "" });

				try {
					const res = await axios.post(`${API_BASE_URL}/confirm_code/`, {
						password,
						email,
					});

					if (res.status === 200) {
						toast.success("updated successfully, please login");
						setTimeout(() => {
							navigate("/auth/login");
						}, 2000);
					}
				} catch (error) {
					console.log(error);
					toast.error("something went wrong, please try again");
				}
			} else setError((p) => ({ status: true, msg: "passwords do not match" }));
		} else setError((p) => ({ msg: "password must be atleast 6 characters long", status: true }));
	};

	return (
		<form
			onSubmit={(e) => matchPass(e)}
			className='flex flex-col gap-5 px-6 bg-white md:min-w-[30rem] min-w-[95%] md:border-[2px] border-gray-800 rounded-2xl font-poppins py-8'>
			<div className='text-center py-3 flex flex-col items-center gap-1'>
				<FaUnlockAlt className='text-purple-500 text-6xl' />
				<span className='text-xl md:text-5xl font-bold'>Enter New Password</span>
				<span className='text-sm text-gray-500'>taimoorali4214@gmail.com</span>
			</div>

			<div className='flex flex-col gap-5 mt-10 mb-5'>
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
						onChange={(e) => setVerifyPass(e.target.value)}
					/>
				</div>

				{error.status && <p className='text-center text-red-500 font-poppins'>{error.msg}</p>}
			</div>

			<button
				type='submit'
				className='bg-gray-800 text-white font-medium tracking-wide text-lg py-2 rounded-lg px-10 hover:bg-primary transition-all flex justify-center items-center gap-2 group'>
				Change Password <FaArrowRight className='group-hover:translate-x-2 transition-all' />
			</button>
			<Toaster
				position='bottom-right'
				reverseOrder={false}
			/>
		</form>
	);
}
