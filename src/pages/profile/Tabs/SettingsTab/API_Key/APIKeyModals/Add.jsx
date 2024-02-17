import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import useAxios from "../../../../../../utils/useAxios";
import { useForm } from 'react-hook-form';

const AddApiKey = ({ closeModel, generate, loading }) => {
	// const [userId, setUserId] = useState("");
	const [data, setData] = useState("");
	const api = useAxios();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		// Your submit logic here
		generate(data);
	};

	useEffect(() => {
		document.body.style.overflowY = "hidden";
		return () => (document.body.style.overflowY = "auto");
	}, []);


	return (
		<div
			className='bg-black/50 backdrop-blur-sm fixed w-screen h-screen left-0 top-0 grid place-content-center z-[99999]'
			onClick={() => closeModel(false)}>
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0 }}
				className='bg-white max-w-lg mx-auto w-[95vw] h-[90vh] lg:h-[93vh] rounded-xl p-3 shadow-md flex flex-col py-8 items-center gap-10 relative'
				onClick={(e) => e.stopPropagation()}>
				<IoCloseCircleOutline
					className='absolute text-4xl right-3 top-3 cursor-pointer hover:text-red-600 transition-all duration-300'
					onClick={() => closeModel(false)}
				/>

				<p className='text-lg font-poppins font-medium underline'>Create New ApiKey</p>

				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-full'>
					<div>
						<label className='col-span-full flex flex-col gap-2'>
							Enter Api Key Name
						</label>
						<input
							{...register('key_name', { required: true })}
							placeholder='Enter Key Name'
							className='p-2 rounded-md border border-gray-700 bg-gray-50 mb-4'
						/>
					</div>
					{errors.userId && <p>User ID is required.</p>}

					<div className='flex gap-2'>

						<label className='col-span-full flex flex-col gap-2'>

							Write
						</label>
						<input
							type='checkbox'
							{...register('write')}
						/>
					</div>

					<button
						type='submit'
						disabled={loading}
						className='bg-primary text-white p-2 rounded-md mt-4'
					>
						Generate
					</button>
				</form>
			</motion.div>
		</div>
	);
};

export default AddApiKey;
