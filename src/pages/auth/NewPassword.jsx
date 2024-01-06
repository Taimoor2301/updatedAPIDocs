import { useEffect, useState } from "react";
import { FaUnlockAlt, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function NewPassword() {
	const navigate = useNavigate();

	const [password, setPassword] = useState("");
	const [verifyPass, setVerifyPass] = useState("");
	const [error, setError] = useState({ status: false, msg: "passwords do not match" });
	const matchPass = () => {
		// check code logic here
		if (password.length > 5 && verifyPass.length > 5) {
			if (password === verifyPass) navigate("/auth/login");
			else setError((p) => ({ status: true, msg: "passwords do not match" }));
			setError((p) => ({ ...p, status: false }));
		} else setError((p) => ({ msg: "password must be atleast 6 characters long", status: true }));
	};
	return (
		<>
			<div className='text-center py-3 flex flex-col items-center gap-1'>
				<FaUnlockAlt className='text-purple-500 text-6xl' />
				<span className='text-xl md:text-5xl font-bold'>Enter New Password</span>
				<span className='text-sm text-gray-500'>taimoorali4214@gmail.com</span>
			</div>

			<div className='flex flex-col gap-5 mt-10 mb-5'>
				<input
					className='py-3.5 px-4 rounded-md border-2 border-purple-500 focus:outline-purple-500'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					name='password'
					placeholder='new password'
				/>
				<input
					className='py-3.5 px-4 rounded-md border-2 border-purple-500 focus:outline-purple-500'
					type='password'
					value={verifyPass}
					onChange={(e) => setVerifyPass(e.target.value)}
					name='verifyPass'
					placeholder='verify new password'
				/>

				{error.status && <p className='text-center text-red-500 font-poppins'>{error.msg}</p>}
			</div>

			<button
				onClick={matchPass}
				type='button'
				className='bg-purple-500 text-white font-medium tracking-wide text-lg py-2 rounded-lg px-10 hover:bg-purple-600 transition-all flex justify-center items-center gap-2 group'>
				Change Password <FaArrowRight className='group-hover:translate-x-2 transition-all' />
			</button>
		</>
	);
}
