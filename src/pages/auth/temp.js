<main className='pt-10 flex flex-col justify-center items-center gap-5'>
	<form
		className='flex flex-col gap-5 px-6 bg-white md:min-w-[30rem] min-w-[95%] border shadow rounded-2xl font-poppins py-8'
		onSubmit={(e) => handleLogin(e)}>
		<div className='text-center py-3 flex flex-col items-center gap-3'>
			<IoLogIn className='text-purple-500 text-6xl' />
			<span className='text-5xl font-bold'>Wellcome</span>
			<span className='text-sm text-gray-500'>Login to your account!</span>
		</div>
		<div className='flex flex-col gap-1'>
			<label
				className='text-md flex items-center justify-between'
				htmlFor='username'>
				User Name <IoMdMail className='text-2xl text-purple-500' />
			</label>
			<input
				className='py-3.5 px-4 border-b-2 focus:outline-none'
				type='text'
				name='username'
				id='username'
				placeholder='username'
				onChange={(e) => setUsername(e.target.value)}
			/>
		</div>
		<div className='flex flex-col gap-1'>
			<label
				className='text-md flex items-center justify-between'
				htmlFor='password'>
				Password <RiLockPasswordFill className='text-2xl text-purple-500' />
			</label>
			<input
				className='py-3.5 px-4 border-b-2 focus:outline-none'
				type='password'
				name='password'
				id='password'
				placeholder='password'
				onChange={(e) => setPassword(e.target.value)}
			/>
		</div>

		<div className='w-full text-right text-sm text-purple-500'>
			<Link to='/auth/forgetpassword'>Forgot Password?</Link>
		</div>

		<button
			type='submit'
			className='bg-purple-500 text-white font-medium tracking-wide text-lg py-2 rounded-lg px-10 hover:bg-purple-600 transition-all flex justify-center items-center gap-2 group'>
			Login <FaArrowRight className='group-hover:translate-x-2 transition-all' />
		</button>
	</form>

	<div>
		Don't have an account?{" "}
		<Link
			className='text-gray-800 font-medium'
			to='/auth/signup'>
			Sign Up
		</Link>
	</div>
	
</main>;
