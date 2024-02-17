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
import { API_BASE_URL } from "../../utils/constants";
import axios from "axios";
import { LowerCaseValidator, MaxLengthValidator, MinLengthValidator, PasswordValidatorManager, SpecialCharacterValidator, UpperCaseValidator } from '@password-validator/core';



// Use the manager to validate passwords
// const result = pm.validate('MyPassword123!*') // { valid: true, messages: [] } --> Password is valid
// const result = pm.validate('MyPassword123'); // { valid: false, messages: ['must contain at least 2 special characters.'] } --> Password is invalid
const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);
	const [type, setType] = useState("password");
	const [type2, setType2] = useState("password");
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	const navigate = useNavigate();
	const [isAvailable, setIsAvailable] = useState(null);
	const [isValid, setIsValisd] = useState(false)
	const [validationMessage, setValidationMessage] = useState('Strong Password Contains Digits, Special Characters & Letters')
	const location = useLocation();
	const email = localStorage.getItem("user_email");
	const from = location.state?.from?.pathname || "/dashboard";
	const pm = PasswordValidatorManager.standard();
	const minLength = new MinLengthValidator(8);
	const maxLength = new MaxLengthValidator(16);
	const uppercases = new UpperCaseValidator(1);
	const lowercases = new LowerCaseValidator(2);
	const specialCharacters = new SpecialCharacterValidator(1);

	pm.register(minLength, maxLength, uppercases, lowercases, specialCharacters);


	const abortController = new AbortController();
	const checkUsernameAvailability = async (usernameToCheck, signal) => {
		// Replace this with your actual API request logic
		try {
			const response = await axios.get(`${API_BASE_URL}/checkusernames/${usernameToCheck}`, { signal });
			// console.log(response.data);
			return response.data;
		} catch (error) {
			// console.log(error)
		}

	};

	const checkUsername = async (usernameToCheck) => {
		try {
			setLoading(true);
			abortController.abort(); // Cancel the previous request
			const controller = new AbortController();
			abortController.signal.addEventListener('abort', () => controller.abort());

			const response = await checkUsernameAvailability(usernameToCheck, controller.signal);
			setIsAvailable(response.available);
		} catch (error) {
			console.error('Error checking username:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleUsernameChange = (e) => {
		const newUsername = e.target.value;
		setUsername(newUsername);

		// Debounce the function to avoid making too many requests in a short period
		const debounceTimeout = setTimeout(() => {
			checkUsername(newUsername);
		}, 500);

		// Clear the previous timeout on each change
		return () => clearTimeout(debounceTimeout);
	};

	useEffect(() => {
		if (isLoggedIn()) {
			navigate(from);
		}
	}, []);
	const handlePasswordChange = (e) => {
		const newPassword = e.target.value;
		setPassword(newPassword);

		const validationResults = pm.validate(newPassword);

		// Password is invalid, you can handle this as needed
		setIsValisd(validationResults.valid)
		setIsValisd(password2 == e.target.value)
		setValidationMessage(password2 == e.target.value && validationResults.valid ? `${validationResults.messages.join(', ')} Passwords Match` : `${validationResults.messages.join(', ')} Passwords do not match`)


	};

	const handlePassword2Change = (e) => {
		const newPassword2 = e.target.value;
		setPassword2(newPassword2);
		// Passwords don't match, you can handle this as needed
		setIsValisd(password == e.target.value)
		setValidationMessage(password == e.target.value ? "Passwords Match" : "Passwords do not match")
	}



	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2 || !isValid || !isAvailable) {
			return toast.error(!isValid ? 'Please use a valid password' : password !== password2 ? "Passwords do not match" : "Username is not available");
		}
		setLoading(true);
		const { error } = await register(username, password, email, code);
		if (error) {
			setLoading(false);
			// console.log(error);
			toast.error(`${error.response.data.error}` || "something went wrong");
		} else {
			setLoading(false);
			navigate(from);
			window.location.reload();
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
					className=' py-3.5 px-4 border-b-2 focus:outline-none'
					type='username'
					name='username'
					id='username'
					required
					placeholder='User Name'
					onChange={(e) => {
						handleUsernameChange(e)
					}}
				/>
				{isAvailable !== null && (
					<p className="text-xs">{isAvailable ? <span className="text-green-500">Username is available</span> : <span className="text-red-500">Username is not available</span>}</p>
				)}
			</div>
			<div className='flex flex-col gap-1'>
				<label
					className='text-md flex items-center justify-between'
					htmlFor='email'>
					Email <IoMdMail className='text-2xl text-primary' />
				</label>
				<input
					className=' py-3.5 px-4 border-b-2 focus:outline-none'
					value={email}
					required
					readOnly
				/>
			</div>

			<div className='flex flex-col gap-1'>
				<label
					className='text-md flex items-center justify-between'
					htmlFor='code'>
					Verification Code <FaUser className='text-2xl text-primary' />
				</label>
				<input
					className=' py-3.5 px-4 border-b-2 focus:outline-none'
					type='text'
					name='verificationcode'
					id='verificationcode'
					required
					placeholder="Verification code has been sent to your email"
					onChange={(e) => setCode(e.target.value)}
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
					className=' py-3.5 px-4 border-b-2 focus:outline-none'
					type={type}
					name='password'
					id='password'
					required
					placeholder='password'
					onChange={handlePasswordChange}
				/>
			</div>

			<div className='flex flex-col gap-1'>
				<label
					className='text-md flex items-center justify-between'
					htmlFor='password2'>
					Verify Password{" "}
					<IoEyeSharp
						className='text-2xl text-primary'
						onClick={() => setType2((prev) => (prev === "password" ? "text" : "password"))}
					/>
				</label>
				<input
					className=' py-3.5 px-4 border-b-2 focus:outline-none'
					type={type2}
					name='password2'
					id='password2'
					required
					placeholder='verify password'
					onChange={handlePassword2Change}
				/>

			</div>
			<p className={isValid ? 'text-xs w-80 text-green-500' : 'text-xs text-red-500 w-80'}>{validationMessage}</p>
			<button
				type='submit'
				disabled={loading}
				className='hover:bg-primary text-white font-medium tracking-wide text-lg py-2 rounded-lg px-10 bg-gray-800 transition-all flex justify-center items-center gap-2 group disabled:cursor-not-allowed disabled:opacity-80'>
				{loading ? <Spinner /> : "Sign up"} {!loading && <FaArrowRight className='group-hover:translate-x-2 transition-all' />}
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

export default Signup;
