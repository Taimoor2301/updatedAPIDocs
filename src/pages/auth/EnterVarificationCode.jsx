import { useEffect, useState } from "react";
import { FaUnlockAlt, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function EnterVarificationCode() {
	const [code, setCode] = useState("");
	const [error, setError] = useState({ status: false, msg: "Incorrect Code" });
	let [count, setCount] = useState(60);

	const navigate = useNavigate();
	let temp = "1234";

	useEffect(() => {
		setTimeout(() => {
			if (count > 0) setCount((p) => p - 1);
			else null;
		}, 1000);
	}, [count]);

	const handleSubmit = (e) => {
		e.preventDefault();
		// check code logic here
		if (code === temp) {
			navigate("/auth/newpassword");
			setError((p) => ({ ...p, status: false }));
		} else setError((p) => ({ ...error, status: true }));
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className='text-center py-3 flex flex-col items-center gap-1'>
				<FaUnlockAlt className='text-purple-500 text-6xl' />
				<span className='text-xl md:text-5xl font-bold'>Enter Verification code</span>
				<span className='text-sm text-gray-500'>taimoorali4214@gmail.com</span>
			</div>

			<div className='flex flex-col gap-1 mt-10 mb-5'>
				<input
					className='py-3.5 px-4 rounded-md border-2 border-purple-500 focus:outline-purple-500'
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
					className='hover:bg-purple-500 hover:text-white border-2 border-purple-500  font-medium tracking-wide py-1.5 rounded-lg px-3 text-sm transition-all flex justify-center items-center gap-2 group disabled:cursor-not-allowed'>
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
				className='bg-purple-500 text-white font-medium tracking-wide text-lg py-2 rounded-lg px-10 hover:bg-purple-600 transition-all flex justify-center items-center gap-2 group'>
				Submit <FaArrowRight className='group-hover:translate-x-2 transition-all' />
			</button>
		</form>
	);
}
