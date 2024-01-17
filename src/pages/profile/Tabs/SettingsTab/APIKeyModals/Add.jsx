import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import useAxios from "../../../../../utils/useAxios";

const AddUserModal = ({ closeModel }) => {
	const [loading, setLoading] = useState(false);
	const [userId, setUserId] = useState("");
	const [data, setData] = useState("");
	const api = useAxios();

	useEffect(() => {
		document.body.style.overflowY = "hidden";
		return () => (document.body.style.overflowY = "auto");
	}, []);

	async function searchUser(e) {
		e.preventDefault();
		setLoading(true);
		alert(userId);
	}

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

				<p className='text-lg font-poppins font-medium underline'>Add New User</p>

				<form
					className='flex gap-2 justify-center w-full'
					onSubmit={searchUser}>
					<input
						type='text'
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						placeholder='Enter User ID'
						className='p-2 flex-1 rounded-md border border-gray-700 bg-gray-50'
					/>

					<button
						type='submit'
						disabled={loading}
						className='text-white font-medium bg-gray-800 hover:bg-primary disabled:hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-80 px-4 py-2 rounded text-lg transition-all w-[10rem] max-h-full'>
						{loading ? <Spinner /> : "Search"}
					</button>
				</form>
			</motion.div>
		</div>
	);
};

export default AddUserModal;
